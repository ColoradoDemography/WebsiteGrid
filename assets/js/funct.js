//Website functions fror State Demography Office
//A. Bickford 5/2021

//list of lookup statements  https://github.com/ColoradoDemography/MS_Demog_Lookups/tree/master/doc

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


var tblcolumns1 = [
    {'text' :'Population Estimates by Age: '+ yrvalue, 'colspan' : 2},
	{'text' : "<a href='https://demography.dola.colorado.gov/population/data/race-estimate/#county-race-by-age-estimates' target=_blank>SDO Single Year of Age</a>", 'colspan' : 2}
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
	.attr("border-spacing","0px")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .html(function(m) { return m.age_cat; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
      .html(function(m) { return m.curval; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
       .html(function(m) { return m.pct_chg; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
      .html(function(m) { return m.forval; });


}); //d3.json
} //end of genSYA

//genCOC generates components of change data fro table
function genCOC(fips,yrvalue){

// Extracts and summarizes SYA data for output table
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
      COCdata.push({'year' : obj.year, 'estimate' : parseInt(obj.estimate), 'bitths' : parseInt(obj.births),
                    'deaths' : parseInt(obj.deaths), 'netmig' : parseInt(obj.netmig), 'natincr' : parseInt(obj.chnage)});
  }); 
  

  return(COCdata);
  }); //d3.json  
} //end genCOC

//genRaceEth generates race and ethnicity data for table
function genRaceEth(fips,yrvalue){

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
console.log(urlstr_for);
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
var raceeth_tmp = [];
raceeth_est.concat(raceeth_for).forEach(function(obj) {
    raceeth_tmp.push({'sortkey' : obj.year + obj.race_eth, 'year' : obj.year, 'race_eth' : obj.race_eth, 'population' : obj.population});
    });

    var raceeth_fin = raceeth_tmp.sort(function(a, b){return a.sortkey - b.sortkey});

return(raceeth_fin);

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
return(housing_fin);

}); //d3.json
}; // End of genHousing

