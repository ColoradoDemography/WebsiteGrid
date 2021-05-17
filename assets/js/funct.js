//Website functions fror State Demography Office
//A. Bickford 5/2021

//list of lookup statements  https://github.com/ColoradoDemography/MS_Demog_Lookups/tree/master/doc
//Utility Function

//includeHTML  taken for W3  https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function runAccordion(){

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
};
return;
}

function transpose(data) {
  let result = {};
  for (let row of data) {
    for (let [key, value] of Object.entries(row)) {
      result[key] = result[key] || [];
	result[key].push([{'name' : key, 'value' : value}]); 
    }
  }
  return result;
}

//Data Aqusition functions

//genSYA creates the single year of age data sets for inclusion in table and outputs table to DOM
function genSYA(fips,yrvalue){
	var fmt_pct = d3.format(".2%")
	var fmt_comma = d3.format(",");


//Specify fips_list
var fips_list = parseInt(fips); 
   
//extract year value 
 
  var prevyear = yrvalue - 1;
  var year10 = 2030;
  var yr_list = prevyear + "," + yrvalue + "," + year10;
 
 //Generate url
 if(fips == "000") {
 var urlstr = "https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=" + fips_list + "&year=" + yr_list + "&choice=single"
 } else {
     var urlstr = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + yr_list + "&choice=single&group=3"
 }
 
 var totaldata = [];

d3.json(urlstr).then(function(data){
   data.forEach(function(obj) {
    if(obj.age >=  0 && obj.age <= 17) {obj.age_cat = "0 to 17"; }
            if(obj.age >= 18 && obj.age <= 24) {obj.age_cat = "18 to 24";}
    if(obj.age >= 25 && obj.age <= 44) {obj.age_cat = "25 to 44"; }
    if(obj.age >= 43 && obj.age <= 64) {obj.age_cat = "45 to 64"; }
    if(obj.age >= 65) {obj.age_cat = "65 +";}
    totaldata.push({'year' : obj.year, 'age_cat' : obj.age_cat, 'totalpopulation' : parseInt(obj.totalpopulation)});
 });

 
      //  Totals
    var total_ann = d3.rollup(totaldata, v => d3.sum(v, d => d.totalpopulation), d => d.year);
var total_age = d3.rollup(totaldata, v => d3.sum(v, d => d.totalpopulation), d => d.year, d => d.age_cat);

//Flatten Arrays for output
var total_ann_flat = [];
for (let [key, value] of total_ann) {
  total_ann_flat.push({'year' : key, 'totalpopulation' : value});
    };
;

var total_age_flat = [];
for (let [key1, value] of total_age) {
for (let[key2, value2] of value) {
   total_age_flat.push({'year' : key1, 'age_cat' : key2, 'totalpopulation' : value2});
}
};

// Create table array for output
var tbl_arr = []
tbl_arr.push({'age_cat' : 'Total', 'curval' : fmt_comma(total_ann_flat[1].totalpopulation), 'pct_chg' : fmt_pct((total_ann_flat[1].totalpopulation - total_ann_flat[0].totalpopulation)/total_ann_flat[0].totalpopulation), 'forval' : fmt_comma(total_ann_flat[2].totalpopulation)});

var ages = [... new Set(total_age_flat.map(tag => tag.age_cat))];
for(i = 0; i < ages.length; i++) {
	var filt = total_age_flat.filter(function(d) {return d.age_cat == ages[i]});
	tbl_arr.push({'age_cat' : ages[i], 'curval' : fmt_comma(filt[1].totalpopulation), 'pct_chg' : fmt_pct((filt[1].totalpopulation - filt[0].totalpopulation)/filt[0].totalpopulation), 'forval' : fmt_comma(filt[2].totalpopulation)});
  };

//Generate Table
var tblcolumns1 = [
    {'text' :'Population Estimates by Age: '+ yrvalue, 'colspan' : 2},
	{'text' : "<a href='https://demography.dola.colorado.gov/population/data/sya-county/' target=_blank>SDO Single Year of Age Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Ages','Number of People','Year Over Year Change','2030 Forecast'];
// Output table 
d3.select('#PopTab').html("");
var syatab = d3.select('#PopTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = syatab.append('thead');
tbody = syatab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","50%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","25%")
   .style("text-align", "center")
   .style("font-weight", "bold");
//Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "25%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.age_cat; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.curval; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.pct_chg; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.forval; });


}); //d3.json
} //end of genSYA

//genCOC generates components of change data for table
function genCOC(fips,yrvalue){
	var fmt_pct = d3.format(".2%")
	var fmt_comma = d3.format(",");
// Extracts and summarizes COC data for output table
//Specify fips_list
var fips_list = parseInt(fips); 
   
//extract year value   
 
  var prevyear = yrvalue - 1;
  var year10 = 2030;
  var yr_list = prevyear + "," + yrvalue + "," + year10;
  
   //Generate url
 var urlstr = "https://gis.dola.colorado.gov/lookups/components?county=" + fips_list + "&year=" + yr_list
  var COCdata = [];
  d3.json(urlstr).then(function(data){
       data.forEach( function(obj){  
      COCdata.push({'year' : obj.year, 'estimate' : parseInt(obj.estimate), 'Births' : parseInt(obj.births),
                    'Deaths' : parseInt(obj.deaths), 'Net Migration' : parseInt(obj.netmig), 'natincr' : parseInt(obj.change)});
  }); 
  
var COC_T = transpose(COCdata);

var COC_fint = Object.values(COC_T);

//Extracting data for table
var tbl_arr = [];
var outname;
var prevVal;
var curVal;
var pctchg;
var forVal;

for(i = 2; i <= 4; i++){
	outname = COC_fint[i][0][0]['name'];
	prevVal = COC_fint[i][0][0]['value'];
	curVal = COC_fint[i][1][0]['value'];
    forVal = COC_fint[i][2][0]['value'];
	pctchg = (curVal - prevVal)/prevVal;
	tbl_arr.push({'coc_name' : outname, 'curval' : fmt_comma(curVal), 'pct_chg' : fmt_pct(pctchg), 'forval' : fmt_comma(forVal) });
}
//Generate Table
var tblcolumns1 = [
    {'text' :'Components of Change: '+ yrvalue, 'colspan' : 2},
	{'text' : "<a href='https://demography.dola.colorado.gov/births-deaths-migration/data/components-change/#components-of-change' target=_blank>SDO Components of Change Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Component','Number of People','Year Over Year Change','2030 Forecast'];
// Output table 
d3.select('#COCTab').html("");
var syatab = d3.select('#COCTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = syatab.append('thead');
tbody = syatab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","50%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","25%")
   .style("text-align", "center")
   .style("font-weight", "bold");
//Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "25%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.coc_name; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.curval; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.pct_chg; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.forval; });
	
  }); //d3.json  
} //end genCOC

//genRaceEth generates race and ethnicity data for table
function genRaceEth(fips,yrvalue){
	var fmt_pct = d3.format(".2%")
	var fmt_comma = d3.format(",");

//Specify fips_list
var fips_list = parseInt(fips); 
   
//extract year value 
 
  var prevyear = yrvalue - 1;
  var year10 = 2030;
  var yr_list = prevyear + "," + yrvalue //This is the list for the estimates call.  Year10 is used in the forecast call
 
var age_list = "0";
for(i = 1; i<= 100; i++){
   age_list = age_list + "," + i;
  };
  
 //Generate url
 if(fips == "000") {
 fips_list = "1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125";

 } 
//estimates urls
urlstr_hispest = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ yr_list +"&race=1,2,3,4&ethnicity=1&sex=b&group=opt7";
urlstr_nonhispest = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ yr_list +"&race=1,2,3,4&ethnicity=2&sex=b&group=opt7";

//forecast urls
urlstr_for = "https://gis.dola.colorado.gov/lookups/sya-race-forecast?age=0,18,65&county=" + fips_list + "&year=" + year10 + "&race=1,2,3,4,5&group=opt7";

var hisp_est = [];
var nonhisp_est = [];
var raceeth_for = [];
//Promise Structure
var prom = [d3.json(urlstr_hispest),d3.json(urlstr_nonhispest),d3.json(urlstr_for)];

Promise.all(prom).then(function(data){
//push out vars and count to number
data[0].forEach(function(obj) {
hisp_est.push({'year' : obj.year, 'sex' : obj.sex, 'population' : parseInt(obj.count)});
});
    data[1].forEach(function(obj) {
     nonhisp_est.push({'year' : obj.year, 'sex' : obj.sex, 'race' : obj.race, 'population' : parseInt(obj.count)});
});
    data[2].forEach(function(obj) {
     raceeth_for.push({'year' : obj.year, 'race_eth' : obj.race, 'population' : parseInt(obj.count)});
});

for(i = 0; i < raceeth_for.length; i++){
     if(raceeth_for[i].race_eth == "Asian non Hispanic"){ raceeth_for[i].race_eth = "Asian/Pacific Islander non Hispanic"};
};
   
//Rolling up the hispanic and non-hispanic datasets
var hisp_total = d3.rollup(hisp_est, v => d3.sum(v, d => d.population), d => d.year);
var nonhisp_total = d3.rollup(nonhisp_est, v => d3.sum(v, d => d.population), d => d.year, d=> d.race);

//Flattening the datasets
    var hisp_flat = [];
for (let [key, value] of hisp_total) {
  hisp_flat.push({'year' : key, 'race_eth' : 'Hispanic',  'population' : value});
    }
var nonhisp_flat = [];
for (let [key1, value] of nonhisp_total) {
for (let[key2, value2] of value) {
   nonhisp_flat.push({'year' : key1, 'race_eth' : key2 + ' non Hispanic', 'population' : value2});
}
}

var raceeth_est = hisp_flat.concat(nonhisp_flat);
var raceeth_fin = [];

raceeth_est.concat(raceeth_for).forEach(function(obj) {
    raceeth_fin.push({'year' : obj.year, 'race_eth' : obj.race_eth, 'population' : obj.population});
    });


// Create table array for output
var tbl_arr = []

var raceth = ["Hispanic", "White non Hispanic", "Black non Hispanic", "Asian/Pacific Islander non Hispanic", "American Indian non Hispanic"];

for(i = 0; i < raceth.length; i++) {
	var filt = raceeth_fin.filter(function(d) {return d.race_eth == raceth[i]});
	tbl_arr.push({'race_eth' : raceth[i], 'curval' : fmt_comma(filt[1].population), 'pct_chg' : fmt_pct((filt[1].population - filt[0].population)/filt[0].population), 'forval' : fmt_comma(filt[2].population)});
  };

//Generate Table
var tblcolumns1 = [
    {'text' :'Race/ Ethnicity: '+ yrvalue, 'colspan' : 2},
	{'text' : "<a href='https://demography.dola.colorado.gov/population/data/race-estimate/#county-race-by-age-estimates' target=_blank>SDO Race/Ethnicity Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Race/ Ethnicity','Number of People','Year Over Year Change','2030 Forecast'];
// Output table 
d3.select('#RaceTab').html("");
var syatab = d3.select('#RaceTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = syatab.append('thead');
tbody = syatab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","50%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","25%")
   .style("text-align", "center")
   .style("font-weight", "bold");
//Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "25%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.race_eth; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.curval; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.pct_chg; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.forval; });


}); //end of Promise

}; //end of genRaceEth


//genEduc generates educational attainment data for table ACS B15003

function genEduc(fips,yrvalue){

var zfmt = d3.format("03d");
var fld_list = "";
for(i = 1; i <= 25; i++) { 
    if(i == 1) {
fld_list = fld_list + "B15003_"+ zfmt(i) + "E";
      } else {
        fld_list = fld_list + ",B15003_"+ zfmt(i) + "E";
      }};

for(i = 1; i <= 25; i++) {fld_list = fld_list + ",B15003_"+ zfmt(i) + "M";};

if(fips == "000") {   
       var urlstr = "https://api.census.gov/data/"+ yrvalue + "/acs/acs5?get=" + fld_list + "&for=state:08";
   } else {
  var urlstr = "https://api.census.gov/data/" + yrvalue + "/acs/acs5?get=" + fld_list + "&for=county:" + fips + "&in=state:08";
   };
   
 
 var educdata = [];
 
 //Creating final output educ_fin
 var educ_fin = [];
 educ_fin['total'] = 0;
 educ_fin['lt_hs_e'] = 0;
 educ_fin['lt_hs_m'] = 0;
 educ_fin['hsgrad_ged_e'] = 0;
 educ_fin['hsgrad_ged_m'] = 0;
 educ_fin['some_coll_e'] = 0;
 educ_fin['some_coll_m'] = 0;
 educ_fin['aa_e'] = 0;
 educ_fin['aa_m'] = 0;
 educ_fin['ba_e'] = 0;
 educ_fin['ba_m'] = 0;
 educ_fin['ma_plus_e'] = 0;
 educ_fin['ma_plus_m'] = 0;
 
 d3.json(urlstr).then(function(data){
 educdata = data[1].map((i) => Number(i));
 for(j = 0; j < 25; j++){
 if(j == 0) { educ_fin['total'] = educdata[j]; }
 if(j >= 1 && j <= 15) {
 educ_fin['lt_hs_e'] += educdata[j];
 educ_fin['lt_hs_m'] += educdata[j+25] ** 2;
     };
 if(j >= 16 && j <= 17) {
 educ_fin['hsgrad_ged_e'] += educdata[j];
 educ_fin['hsgrad_ged_m'] += educdata[j+25] ** 2;
     };
 if(j >= 18 && j <= 19) {
 educ_fin['some_coll_e'] += educdata[j];
 educ_fin['some_coll_m'] += educdata[j+25] ** 2;
     };
 if(j == 20) {
 educ_fin['aa_e'] = educdata[j];
 educ_fin['aa_m'] = educdata[j + 25];
 };
 if(j == 21) {
             educ_fin['ba_e'] = educdata[j];
 educ_fin['ba_m'] = educdata[j + 25];
 };
 if(j >= 22 && j <= 24) {
 educ_fin['ma_plus_e'] += educdata[j];
 educ_fin['ma_plus_m'] += educdata[j+25] ** 2;
     };
 }; //Summary loop

 educ_fin['lt_hs_m'] = Math.sqrt(educ_fin['lt_hs_m']);
 educ_fin['hsgrad_ged_m'] = Math.sqrt(educ_fin['hsgrad_ged_m']);
 educ_fin['some_coll_m'] = Math.sqrt(educ_fin['some_coll_m']);
 educ_fin['ma_plus_m'] = Math.sqrt(educ_fin['ma_plus_m']);
 
return(educ_fin);
 }); //end of d3.json
}; //end of genEduc

//genIncome generates income and poverty data for table ACS  % Below Poverty, median personal income median hh  incoem
function genIncome(fips,yrvalue){
// b17024 ratio of income to fpl; B06001 median personal income; B19013_001 median household Income

var zfmt = d3.format("03d");

var inc_list = "B06011_001E,B19013_001E,B06011_001M,B19013_001M";

if(fips == "000") {   
       var povstr = "https://api.census.gov/data/"+ yrvalue + "/acs/acs5?get=group(B17024)&for=state:08";
   var incstr = "https://api.census.gov/data/"+ yrvalue + "/acs/acs5?get=" + inc_list + "&for=state:08";
   } else {
  var povstr = "https://api.census.gov/data/" + yrvalue + "/acs/acs5?get=group(B17024)&for=county:" + fips + "&in=state:08";
  var incstr = "https://api.census.gov/data/" + yrvalue + "/acs/acs5?get=" + inc_list + "&for=county:" + fips + "&in=state:08";
   };
 
var povdata = []; 
var povdata_fin = [];
povdata_fin['total_pop_e'] = 0;
povdata_fin['total_pop_m'] = 0;
povdata_fin['pct_lt_50_e'] = 0;
povdata_fin['pct_lt_50_m'] = 0;
povdata_fin['pct_50_99_e'] = 0;
povdata_fin['pct_50_99_m'] = 0;
povdata_fin['pct_100_124_e'] = 0;
povdata_fin['pct_100_124_m'] = 0;
povdata_fin['pct_125_199_e'] = 0;
povdata_fin['pct_125_199_m'] = 0;
povdata_fin['pct_200_499_e'] = 0;
povdata_fin['pct_200_499_m'] = 0;
povdata_fin['pct_500_plus_e'] = 0;
povdata_fin['pct_500_plus_m'] = 0;

var incdata  = [];

//Promise Structure
var prom = [d3.json(povstr),d3.json(incstr)];

Promise.all(prom).then(function(data){
   povdata = data[0][1].filter(function(d) {return d != null;}).map((i) => Number(i));
   incdata = data[1][1].map((i) => Number(i));
   
for(i = 0; i <= 262; i++ ){  //Summary Loop
    if(i == 0) {
      povdata_fin['total_pop_e'] = povdata[i];
      povdata_fin['total_pop_m'] = povdata[i+1];
      };
    if([4, 30,56, 82, 108, 134, 160,186, 212, 238].indexOf(i) != -1){
          povdata_fin['pct_lt_50_e'] += povdata[i];
          povdata_fin['pct_lt_50_m'] += povdata[i+1] ** 2;
        };  
      if([6, 8, 32, 34, 58, 60, 84, 86, 110, 112, 136, 138, 162, 164, 188, 190, 214, 216, 240, 242].indexOf(i) != -1){
          povdata_fin['pct_50_99_e'] += povdata[i];
          povdata_fin['pct_50_99_m'] += povdata[i+1] ** 2;
         }; 
   if([10, 36, 62, 88, 114, 140, 166, 192, 218, 244].indexOf(i) != -1){
          povdata_fin['pct_100_124_e'] += povdata[i];
          povdata_fin['pct_100_124_m'] += povdata[i+1] ** 2;
     };
   if([12, 14, 16, 18, 38, 40, 42, 44, 64, 66, 68, 70, 90, 92, 94, 96, 116, 118, 120, 122, 142, 144, 146, 148, 168, 170, 172, 174, 194, 196, 198, 200, 220, 222, 224, 226, 246, 248, 250, 252, ].indexOf(i) != -1){
          povdata_fin['pct_125_199_e'] += povdata[i];
          povdata_fin['pct_125_199_m'] += povdata[i+1] ** 2;
     };
   if([10, 36, 62, 88, 114, 140, 166, 192, 218, 24420, 22, 24, 46, 48, 50, 72, 74, 76, 98, 100, 102, 124, 126, 128, 150, 152, 154, 176, 178, 180, 202, 204, 206, 228, 230, 232, 254, 256, 258].indexOf(i) != -1){
          povdata_fin['pct_200_499_e'] += povdata[i];
          povdata_fin['pct_200_499_m'] += povdata[i+1] ** 2;
     };
   if([26, 52, 78, 104, 130, 156, 182, 208, 234, 260].indexOf(i) != -1){
          povdata_fin['pct_500_plus_e'] += povdata[i];
          povdata_fin['pct_500_plus_m'] += povdata[i+1] ** 2;
     };
}; //Summry Loop

	povdata_fin['pct_lt_50_m'] = Math.sqrt(povdata_fin['pct_lt_50_m']);
	povdata_fin['pct_50_99_m'] = Math.sqrt(povdata_fin['pct_50_99_m']);
	povdata_fin['pct_100_124_m'] = Math.sqrt(povdata_fin['pct_100_124_m']);
	povdata_fin['pct_125_199_m'] = Math.sqrt(povdata_fin['pct_125_199_m']);
	povdata_fin['pct_200_499_m'] = Math.sqrt(povdata_fin['pct_200_499_m']);
	povdata_fin['pct_500_plus_m'] = Math.sqrt(povdata_fin['pct_500_plus_m']);

   return([povdata_fin, incdata]);
 });  //Promise
}; //end of genIncome

//genHousing generates housing data for table From the SDO County Profile
function genHousing(fips, yrvalue) {
	var fmt_pct = d3.format(".2%")
	var fmt_comma = d3.format(",");
	var fmt_dec = d3.format(".2");

//Specify fips_list
var fips_list = parseInt(fips); 
   
//extract year value 
 
  var prevyear = yrvalue - 1;
  var yr_list = prevyear + "," + yrvalue;
 
 //Generate url
 if(fips == "000") {
 fips_list = "1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125";
 } 
//estimates urls
urlstr = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + yr_list + "&vars=totalhousingunits,householdpopulation,groupquarterspopulation,households,censusbuildingpermits";

var hous_tmp = [];
d3.json(urlstr).then(function(data){
 data.forEach(function(obj) {
 hous_tmp.push({'year' : obj.year,  'county' : obj.county,
     'totalhousingunits' : parseInt(obj.totalhousingunits),
     'householdpopulation' : parseInt(obj.householdpopulation),
	 'groupquarterspopulation' : parseInt(obj.groupquarterspopulation),
	 'households' : parseInt(obj.households),
	 'censusbuildingpermits' : parseInt(obj.censusbuildingpermits)});
 });

 var columnsToSum = ['totalhousingunits','householdpopulation','groupquarterspopulation', 'households', 'censusbuildingpermits']
 
      //  Totals
var housing_temp = d3.rollup(hous_tmp,
                  v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);

var housing_fin = [];
for (let [key, obj] of housing_temp) {
	housing_fin.push( {'year' : key,  
                        'totalhousingunits' : obj.totalhousingunits,
                        'householdpopulation' : obj.householdpopulation,
	                    'groupquarterspopulation' : obj.groupquarterspopulation,
	                    'households' : obj.households,
						'household_size' : obj.householdpopulation/obj.households,
	                    'censusbuildingpermits' : obj.censusbuildingpermits});
 };


var housing_T = transpose(housing_fin);

var housing_fint = Object.values(housing_T);


var tbl_arr = [];
var out_name  = "";
var currentVal = 0;
var prevVal = 0;
var cVal = 0;
var pctVal = 0;

for(i = 1; i < housing_fint.length; i++){
	currentVal = housing_fint[i][1][0]['value'];
	prevVal = housing_fint[i][0][0]['value']; 
	
	if(housing_fint[i][0][0].name == 'totalhousingunits') { out_name = "Total Housing Units";
	                                                     cVal = fmt_comma(currentVal);
														 pctVal = fmt_pct((currentVal-prevVal)/prevVal);
													   };
	if(housing_fint[i][0][0].name == 'householdpopulation') { out_name = "Household Population";
	                                                     cVal = fmt_comma(currentVal);
														 pctVal = fmt_pct((currentVal - prevVal)/prevVal);
													   };
	if(housing_fint[i][0][0].name == 'groupquarterspopulation') { out_name = "Group Quarters Population";
	                                                     cVal = fmt_comma(currentVal);
														 pctVal = fmt_pct((currentVal - prevVal)/prevVal);
													   };
	if(housing_fint[i][0][0].name == 'households') { out_name = "Households";
	                                                     cVal = fmt_comma(currentVal);
														 pctVal = fmt_pct((currentVal - prevVal)/prevVal);
													   };
	if(housing_fint[i][0][0].name == 'household_size') { out_name = "Household Size";
	                                                     cVal = fmt_dec(currentVal);
														 pctVal = "";
													   };
	if(housing_fint[i][0][0].name == 'censusbuildingpermits') { out_name = "Census Building Permits";
	                                                     cVal = fmt_comma(currentVal);
														 pctVal = fmt_pct((currentVal - prevVal)/prevVal);
													   };
	tbl_arr.push({ 'row_name' : out_name,
	               'curval' : cVal, 
	               'pct_chg' : pctVal});
};

//Generate Table
var tblcolumns1 = [
    {'text' :'Housing Characteristics: '+ yrvalue, 'colspan' : 1},
	{'text' : "<a href='https://demography.dola.colorado.gov/population/data/profile-county/' target=_blank>SDO County Profile Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Housing Type', 'Value', 'Year Over Year Change'];
// Output table 
d3.select('#HousTab').html("");
var syatab = d3.select('#HousTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = syatab.append('thead');
tbody = syatab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","33%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","33%")
   .style("text-align", "center")
   .style("font-weight", "bold");
//Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "33%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.row_name; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.curval; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.pct_chg; });

}); //d3.json
}; // End of genHousing

