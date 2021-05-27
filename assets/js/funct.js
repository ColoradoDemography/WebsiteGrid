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
// runAccordion manages the accordion functionalits of the page
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

//educData reads in the ACS Education data file and output the summary file information
function educData(indata,fips) {
 //extract data from indata object
	var proc_data = [];
	for(i = 0; i < indata.data.length; i++) {
	   proc_data.push(indata.data[i]);
	};

	var outdata = [];
	 
	for(a = 0; a < proc_data.length; a++){ 
	 	 var temp = [];
	 if(fips == "000"){
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'total_est' : Number(proc_data[a].b15003001),
			 'total_moe' : Number(proc_data[a].b15003_moe001),
			 'baplus_est' : Number(proc_data[a].b15003022) + Number(proc_data[a].b15003023) + Number(proc_data[a].b15003024) + Number(proc_data[a].b15003025),
			 'baplus_moe' : Number(proc_data[a].b15003_moe022)**2 + Number(proc_data[a].b15003_moe023)**2 + Number(proc_data[a].b15003_moe024)**2 + Number(proc_data[a].b15003_moe025)**2,
			 'baplus_est_pct' : 0,
			 'baplus_moe_pct' : 0
		});
	 } else {
			temp.push({
			'county' : Number(proc_data[a].county),
			 'total_est' : Number(proc_data[a].b15003001),
			 'total_moe' : Number(proc_data[a].b15003_moe001),
			 'baplus_est' : Number(proc_data[a].b15003022) + Number(proc_data[a].b15003023) + Number(proc_data[a].b15003024) + Number(proc_data[a].b15003025),
			 'baplus_moe' : Number(proc_data[a].b15003_moe022)**2 + Number(proc_data[a].b15003_moe023)**2 + Number(proc_data[a].b15003_moe024)**2 + Number(proc_data[a].b15003_moe025)**2,
			 'baplus_est_pct' : 0,
			 'baplus_moe_pct' : 0
			 });
	 };

	 temp[0]['baplus_moe'] = Math.sqrt(temp[0]['baplus_moe']);
	 temp[0]['baplus_est_pct'] = temp[0]['baplus_est']/temp[0]['total_est'];
	 temp[0]['baplus_moe_pct'] = temp[0]['baplus_moe']/temp[0]['total_est'];
	 outdata.push(temp);	
    }; //end of a loop


  //flatten 
var outdata_flat = [];
for(i = 0; i < outdata.length; i++){
	if(fips == "000") {
		outdata_flat.push ({
			'state' : outdata[i][0].state,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'baplus_est' : outdata[i][0].baplus_est,
			 'baplus_moe' : outdata[i][0].baplus_moe,
			 'baplus_est_pct' : outdata[i][0].baplus_est_pct,
			 'baplus_moe_pct' : outdata[i][0].baplus_moe_pct 
		});
	} else {
		outdata_flat.push ({
			'county' : outdata[i][0].county,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'baplus_est' : outdata[i][0].baplus_est,
			 'baplus_moe' : outdata[i][0].baplus_moe,
			 'baplus_est_pct' : outdata[i][0].baplus_est_pct,
			 'baplus_moe_pct' : outdata[i][0].baplus_moe_pct 
		});
    };
	};
 //removing Puerto Rico and the District of Columbia
 
 if(fips == "000"){
   var outdata2 = outdata_flat.sort(function(a, b){ return d3.ascending(a['state'], b['state']); });
   var outdata3 = outdata2.filter(function(d) {return d.state != 11 & d.state != 72;});
 } else {
	var outdata3 = outdata_flat.sort(function(a, b){ return d3.ascending(a['county'], b['county']); });
 };	
 
  return(outdata3);
}; //end of educData

//povData reads in the ACS Poverty data file and output the summary file information
function povData(indata,fips) {
  //extract data from indata object
	var proc_data = [];
	for(i = 0; i < indata.data.length; i++) {
	   proc_data.push(indata.data[i]);
	};

	var outdata = [];
	for(a = 0; a < proc_data.length; a++){ 

	 var temp = [];
	 if(fips == "000"){
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'total_est' : Number(proc_data[a].b06012001),
			 'total_moe' : Number(proc_data[a].b06012_moe001),
			 'pov_est' : Number(proc_data[a].b06012002),
			 'pov_moe' : Number(proc_data[a].b06012_moe001),
			 'pov_est_pct' : Number(proc_data[a].b06012002)/Number(proc_data[a].b06012001),
			 'pov_moe_pct' : Number(proc_data[a].b06012_moe002)/Number(proc_data[a].b06012001)
		});
	 } else {
		temp.push({
			 'county' : Number(proc_data[a].county),
			 'total_est' : Number(proc_data[a].b06012001),
			 'total_moe' : Number(proc_data[a].b06012_moe001),
			 'pov_est' : Number(proc_data[a].b06012002),
			 'pov_moe' : Number(proc_data[a].b06012_moe001),
			 'pov_est_pct' : Number(proc_data[a].b06012002)/Number(proc_data[a].b06012001),
			 'pov_moe_pct' : Number(proc_data[a].b06012_moe002)/Number(proc_data[a].b06012001)
		 });
	 };
	
	 outdata.push(temp);	
    }; //end of a loop

 //flatten 
var outdata_flat = [];
for(i = 0; i < outdata.length; i++){
	if(fips == "000") {
		outdata_flat.push ({
			'state' : outdata[i][0].state,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'pov_est' : outdata[i][0].pov_est,
			 'pov_moe' : outdata[i][0].pov_moe,
			 'pov_est_pct' : outdata[i][0].pov_est_pct,
			 'pov_moe_pct' : outdata[i][0].pov_moe_pct 
		});
	} else {
		outdata_flat.push ({
			'county' : outdata[i][0].county,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'pov_est' : outdata[i][0].pov_est,
			 'pov_moe' : outdata[i][0].pov_moe,
			 'pov_est_pct' : outdata[i][0].pov_est_pct,
			 'pov_moe_pct' : outdata[i][0].pov_moe_pct 
		});
    };
	};
 //removing Puerto Rico and the District of Columbia
 
 if(fips == "000"){
   var outdata2 = outdata_flat.sort(function(a, b){ return d3.ascending(a['state'], b['state']); });
   var outdata3 = outdata2.filter(function(d) {return d.state != 11 & d.state != 72;});
 } else {
	var outdata3 = outdata_flat.sort(function(a, b){ return d3.ascending(a['county'], b['county']); });
 };	
 
  return(outdata3);
}; //end of povData

//incData reads in the ACS Median Household Income, Median Home Value and Median Gross Rent data file and output the summary file information
function incData(indata, type, fips) {  //Type: HH: Household Income, MORT: home value, RENT : gross rent
	  //extract data from indata object
	var proc_data = [];
	for(i = 0; i < indata.data.length; i++) {
	   proc_data.push(indata.data[i]);
	};
	
	var outdata = [];
	for(a = 0; a < proc_data.length; a++){ 
	 	 var temp = [];
	 if(fips == "000"){
		if(type == "HH") {
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'inc_est' : Number(proc_data[a].b19013001),
			 'inc_moe' : Number(proc_data[a].b19013_moe001)
		});
		 };
		if(type == "MORT") {
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'inc_est' : Number(proc_data[a].b25097001),
			 'inc_moe' : Number(proc_data[a].b25097_moe001)
		});
		 };
		if(type == "RENT") {
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'inc_est' : Number(proc_data[a].b25064001),
			 'inc_moe' : Number(proc_data[a].b25064_moe001)
		});
		 };
	 } else {
		if(type == "HH") {
	    temp.push({
			 'county' : Number(proc_data[a].county),
			 'inc_est' : Number(proc_data[a].b19013001),
			 'inc_moe' : Number(proc_data[a].b19013_moe001)
		});
		 };
		if(type == "MORT") {
	    temp.push({
			 'county' : Number(proc_data[a].county),
			 'inc_est' : Number(proc_data[a].b25097001),
			 'inc_moe' : Number(proc_data[a].b25097_moe001)
		});
		 };
		if(type == "RENT") {
	    temp.push({
			 'county' : Number(proc_data[a].county),
			 'inc_est' : Number(proc_data[a].b25064001),
			 'inc_moe' : Number(proc_data[a].b25064_moe001)
		});
		 };
	 };
	
	 outdata.push(temp);	
    }; //end of a loop

 //flatten 
var outdata_flat = [];
for(i = 0; i < outdata.length; i++){
	if(fips == "000") {
		outdata_flat.push ({
			'state' : outdata[i][0].state,
			 'inc_est' : outdata[i][0].inc_est,
			 'inc_moe' : outdata[i][0].inc_moe
		});
	} else {
		outdata_flat.push ({
			'county' : outdata[i][0].county,
			 'inc_est' : outdata[i][0].inc_est,
			 'inc_moe' : outdata[i][0].inc_moe
		});
    };
	};
 //removing Puerto Rico and the District of Columbia
 
 if(fips == "000"){
   var outdata2 = outdata_flat.sort(function(a, b){ return d3.ascending(a['state'], b['state']); });
   var outdata3 = outdata2.filter(function(d) {return d.state != 11 & d.state != 72;});
 } else {
	var outdata3 = outdata_flat.sort(function(a, b){ return d3.ascending(a['county'], b['county']); });
 };	
 
  return(outdata3);
}; //end of incData

//returnRank returns the ranked value of selected field
function returnRank(indata,fips){
	var rval = 0;
	for(i = 0; i < indata.length; i++){
		if(fips == "000") {
			if(indata[i]['state'] == 8){
				rval = i + 1;
			};
		} else {
			if(indata[i]['county'] == parseInt(fips)){
				rval = i + 1;
			};
		};
	};
 return(rval);
};  //end of returnRank 

//chkDiff checjs for significant increase or decrease in quantity
function chkDiff(curpct,curmoe, prevpct, prevmoe) {
	var prev_low = prevpct - prevmoe;
	var prev_high = prevpct + prevmoe;
	var outcome = 'equal';
	
	if(curpct > prevpct && curpct > prev_high) {
		outcome = 'increase';
	}
	if(curpct < prevpct && curpct < prev_low) {
		outcome = 'decrease';
	}
return(outcome);
}; //end of chkDiff

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
var tblcolumns2 = ['Ages','Number','Change from '+ prevyear,'2030 Forecast'];
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
  var yr_list = prevyear + "," + yrvalue;
  
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
	pctchg = (curVal - prevVal)/prevVal;
	tbl_arr.push({'coc_name' : outname, 'prevval' : fmt_comma(prevVal), 'curval' : fmt_comma(curVal), 'pct_chg' : fmt_pct(pctchg)});
}
//Generate Table
var tblcolumns1 = [
    {'text' :'Components of Change', 'colspan' : 2},
	{'text' : "<a href='https://demography.dola.colorado.gov/births-deaths-migration/data/components-change/#components-of-change' target=_blank>SDO Components of Change Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Component','Number,  ' + prevyear,'Number,  ' + yrvalue,'Change'];
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
      .html(function(m) { return m.prevval; });
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
	 if(obj.race ==  "Asian/Pacific Islander") {obj.race ="Asian/ Pacific Islander";}
     nonhisp_est.push({'year' : obj.year, 'sex' : obj.sex, 'race' : obj.race, 'population' : parseInt(obj.count)});
});
    data[2].forEach(function(obj) {
     raceeth_for.push({'year' : obj.year, 'race_eth' : obj.race, 'population' : parseInt(obj.count)});
});



for(i = 0; i < raceeth_for.length; i++){
	if(raceeth_for[i].race_eth == "White non Hispanic"){ raceeth_for[i].race_eth = "White NH"};
	if(raceeth_for[i].race_eth == "Black non Hispanic"){ raceeth_for[i].race_eth = "Black NH"};
	if(raceeth_for[i].race_eth == "American Indian non Hispanic"){ raceeth_for[i].race_eth = "American Indian NH"};
     if(raceeth_for[i].race_eth == "Asian non Hispanic"){ raceeth_for[i].race_eth = "Asian/ Pacific Islander NH"};
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
   nonhisp_flat.push({'year' : key1, 'race_eth' : key2 + ' NH', 'population' : value2});
}
}

var raceeth_est = hisp_flat.concat(nonhisp_flat);
var raceeth_fin = [];

raceeth_est.concat(raceeth_for).forEach(function(obj) {
    raceeth_fin.push({'year' : obj.year, 'race_eth' : obj.race_eth, 'population' : obj.population});
    });


// Create table array for output
var tbl_arr = []

var raceth = ["Hispanic", "White NH", "Black NH", "Asian/ Pacific Islander NH", "American Indian NH"];

for(i = 0; i < raceth.length; i++) {
	var filt = raceeth_fin.filter(function(d) {return d.race_eth == raceth[i]});
	tbl_arr.push({'race_eth' : raceth[i], 'curval' : fmt_comma(filt[1].population), 'pct_chg' : fmt_pct((filt[1].population - filt[0].population)/filt[0].population), 'forval' : fmt_comma(filt[2].population)});
  };


//Generate Table
var tblcolumns1 = [
    {'text' :'Race/ Ethnicity: '+ yrvalue, 'colspan' : 2},
	{'text' : "<a href='https://demography.dola.colorado.gov/population/data/race-estimate/#county-race-by-age-estimates' target=_blank>SDO Race/Ethnicity Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Race/ Ethnicity','Number','Change from '+ prevyear,'2030 Forecast'];
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


//genACS Pulls multiple data sources from the ACS 5-year files to create final table
//Poverty  B06012
//Educ ACS B15003
//Median Household income  B19013_001
//Median Home Value B25097
//Median Gross Rent B25064

function genACS(fips,yrvalue){

var fmt_pct = d3.format(".2%")
var fmt_dollar = d3.format("$,");
var fmt_yr = d3.format("00");

var prevyr = yrvalue - 5;
var curACS = "acs" + fmt_yr(yrvalue - 2004) + fmt_yr(yrvalue - 2000);
var prevACS = "acs" + fmt_yr(prevyr - 2004) + fmt_yr(prevyr - 2000);


if(fips == "000") { 
       var povstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS + "&schema=data&table=b06012&moe=yes&sumlev=40&type=json";
	   var povstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS + "&schema=data&table=b06012&moe=yes&sumlev=40&type=json";

       var educstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS + "&schema=data&table=b15003&moe=yes&sumlev=40&type=json";
	   var educstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS + "&schema=data&table=b15003&moe=yes&sumlev=40&type=json";
	   
       var incstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS + "&schema=data&table=b19013&moe=yes&sumlev=40&type=json";
	   var incstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS + "&schema=data&table=b19013&moe=yes&sumlev=40&type=json";
	   
	   var homestr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b25097&moe=yes&sumlev=40&type=json";
	   var homestr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b25097&moe=yes&sumlev=40&type=json";
	   
       var rentstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b25064&moe=yes&sumlev=40&type=json";
	   var rentstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b25064&moe=yes&sumlev=40&type=json";
   } else {
	  var povstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b06012&moe=yes&sumlev=50&type=json&state=8";
	  var povstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b06012&moe=yes&sumlev=50&type=json&state=8";

      var educstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b15003&moe=yes&sumlev=50&type=json&state=8";
	  var educstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b15003&moe=yes&sumlev=50&type=json&state=8";
	  
      var incstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b19013&moe=yes&sumlev=50&type=json&state=8";
	  var incstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b19013&moe=yes&sumlev=50&type=json&state=8";
	  
      var homestr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b25097&moe=yes&sumlev=50&type=json&state=8";
	  var homestr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b25097&moe=yes&sumlev=50&type=json&state=8";
	  
      var rentstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b25064&moe=yes&sumlev=50&type=json&state=8";
	  var rentstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b25064&moe=yes&sumlev=50&type=json&state=8";
   };
   
 //Poverty Variables and Objects
 var pov_cur = [];
 var pov_prev = [];
 var pov_comp = [];
 var pov_rank = [];
 var povRank;
 var povDiff;
 
//Education Variables and Objects
 var educ_cur = [];
 var educ_prev = [];
 var educ_comp = [];
 var educ_rank = [];
 var educRank;
 var educDiff;
 
 //Household Income Variables and Objects
 var inc_cur = [];
 var inc_prev = [];
 var inc_comp = [];
 var inc_rank = [];
 var incRank;
 var incDiff;
 
//Median Home Value Variables and Objects
 var home_cur = [];
 var home_prev = [];
 var home_comp = [];
 var home_rank = [];
 var homeRank;
 var homeDiff;
 
 //Median Gross Rent Variables and Objects
 var rent_cur = [];
 var rent_prev = [];
 var rent_comp = [];
 var rent_rank = [];
 var rentRank;
 var rentDiff;
 
 //Promise Structure
var prom = [d3.json(povstr_prev),d3.json(povstr_cur),d3.json(educstr_prev),d3.json(educstr_cur),
            d3.json(incstr_prev),d3.json(incstr_cur),d3.json(homestr_prev),d3.json(homestr_cur),
			d3.json(rentstr_prev),d3.json(rentstr_cur)];

Promise.all(prom).then(function(data){
	
//Poverty Processing
    pov_prev = povData(data[0],fips);
	pov_cur = povData(data[1],fips);

//Calculate rank 
	pov_rank = pov_cur.sort(function(a, b){ return d3.ascending(b['pov_est_pct'], a['pov_est_pct']); });
	povRank = returnRank(pov_rank,fips);
	 
	//Comparing current and previous values
	if(fips == "000") {
		pov_comp = pov_cur.filter(function(d) {return d.state == 8;})
		pov_comp.push(pov_prev.filter(function(d) {return d.state == 8;}));
	} else {
		pov_comp = pov_cur.filter(function(d) {return d.county == parseInt(fips);})
		pov_comp.push(pov_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	
	povDiff = chkDiff(pov_comp[0]['pov_est_pct'], pov_comp[0]['pov_moe_pct'], pov_comp[1][0]['pov_est_pct'], pov_comp[1][0]['pov_moe_pct']);

//Education Processing

    educ_prev = educData(data[2],fips);
	educ_cur = educData(data[3],fips);
 
	//Calculate rank 
	educ_rank = educ_cur.sort(function(a, b){ return d3.ascending(b['baplus_est_pct'], a['baplus_est_pct']); });
	educRank = returnRank(educ_rank,fips);
	
//Comparing current and previous values
	if(fips == "000") {
		educ_comp = educ_cur.filter(function(d) {return d.state == 8;})
		educ_comp.push(educ_prev.filter(function(d) {return d.state == 8;}));
	} else {
		educ_comp = educ_cur.filter(function(d) {return d.county == parseInt(fips);})
		educ_comp.push(educ_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	educDiff = chkDiff(educ_comp[0]['baplus_est_pct'], educ_comp[0]['baplus_moe_pct'], educ_comp[1][0]['baplus_est_pct'], educ_comp[1][0]['baplus_moe_pct']);

//Median Household Income Processing

    inc_prev = incData(data[4],"HH",fips);
	inc_cur = incData(data[5],"HH",fips);
	
	//Calculate rank 
	inc_rank = inc_cur.sort(function(a, b){ return d3.ascending(b['inc_est'], a['inc_est']); });
	incRank = returnRank(inc_rank,fips);
	
//Comparing current and previous values
	if(fips == "000") {
		inc_comp = inc_cur.filter(function(d) {return d.state == 8;})
		inc_comp.push(inc_prev.filter(function(d) {return d.state == 8;}));
	} else {
		inc_comp = inc_cur.filter(function(d) {return d.county == parseInt(fips);})
		inc_comp.push(inc_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	incDiff = chkDiff(inc_comp[0]['inc_est'], inc_comp[0]['inc_moe'], inc_comp[1][0]['inc_est'], inc_comp[1][0]['inc_moe']);
	
//Median Home Value  Processing
	
    home_prev = incData(data[6],"MORT",fips);
	home_cur = incData(data[7],"MORT",fips);
	
	//Calculate rank 
	home_rank = home_cur.sort(function(a, b){ return d3.ascending(b['inc_est'], a['inc_est']); });
	homeRank = returnRank(home_rank,fips);
	
//Comparing current and previous values
	if(fips == "000") {
		home_comp = home_cur.filter(function(d) {return d.state == 8;})
		home_comp.push(home_prev.filter(function(d) {return d.state == 8;}));
	} else {
		home_comp = home_cur.filter(function(d) {return d.county == parseInt(fips);})
		home_comp.push(home_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	homeDiff = chkDiff(home_comp[0]['inc_est'], home_comp[0]['inc_moe'], home_comp[1][0]['inc_est'], home_comp[1][0]['inc_moe']);
	
//Median Gorss Rent Processing

    rent_prev = incData(data[8],"RENT",fips);
	rent_cur = incData(data[9],"RENT",fips);

	//Calculate rank 
	rent_rank = rent_cur.sort(function(a, b){ return d3.ascending(b['inc_est'], a['inc_est']); });
	rentRank = returnRank(rent_rank,fips);
	
//Comparing current and previous values
	if(fips == "000") {
		rent_comp = rent_cur.filter(function(d) {return d.state == 8;})
		rent_comp.push(rent_prev.filter(function(d) {return d.state == 8;}));
	} else {
		rent_comp = rent_cur.filter(function(d) {return d.county == parseInt(fips);})
		rent_comp.push(rent_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	rentDiff = chkDiff(rent_comp[0]['inc_est'], rent_comp[0]['inc_moe'], rent_comp[1][0]['inc_est'], rent_comp[1][0]['inc_moe']);

//Building Table Array

var tbl_arr = [];
var censstub = "https://data.census.gov/cedsci/table?q=";

var tabno = ["B06012","B15003","B19013","B25097","B25064"];
var tabname = ["% living in Poverty","% with BA+",
              "Median Household Income", "Median Home Value", "Median Gross Rent"];

if(fips == "000") {
    var censgeo = "&g=0400000US08&tid=ACSDT5Y2019.";
} else {
	var censgeo = "&g=0500000US08"+ fips +"&tid=ACSDT5Y2019.";
};


for(i = 0; i < 5; i++){
	var topic = "<a href='" + censstub + tabno[i] + censgeo + tabno[i] +"' target=_blank>" + tabname[i] + "</a>"
	if(i == 0) {//poverty
	  var value = fmt_pct(pov_comp[0]['pov_est_pct']);
	  if(povDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: red;'></i>";
	  };
	  if(povDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: green;'></i>";
	  };
	  if(povDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = povRank;
	}; 

	if(i == 1) {//education
	  var value = fmt_pct(educ_comp[0]['baplus_est_pct']);
	  if(educDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: green;'></i>";
	  };
	  if(educDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: red;'></i>";
	  };
	  if(educDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = educRank;
	}; 

	if(i == 2) {//Household Income
	  var value = fmt_dollar(inc_comp[0]['inc_est']);
	  if(incDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: green;'></i>";
	  };
	  if(incDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: red;'></i>";
	  };
	  if(incDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = incRank;
	}; 

	if(i == 3) {//homevalue
	  var value = fmt_dollar(home_comp[0]['inc_est']);
	  if(homeDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: green;'></i>";
	  };
	  if(homeDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: red;'></i>";
	  };
	  if(homeDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = homeRank;
	}; 
	
	if(i == 4) {//gross rent
	  var value = fmt_dollar(rent_comp[0]['inc_est']);
	  if(rentDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: green;'></i>";
	  };
	  if(rentDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: red;'></i>";
	  };
	  if(rentDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = rentRank;
	}; 
	tbl_arr.push({ 'topic' : topic,
	               'value' : value, 
	               'diff' : diffIcon,
				   'rank' : rank});
}; //tbl_arr i loop

var curyr4 = yrvalue - 4;
var prevyr4 = prevyr - 4;

//Generate Table
var tblcolumns1 = [
    {'text' :'Selected Statistics: '+ yrvalue, 'colspan' :2},
	{'text' : "<a href='https://data.census.gov/cedsci/' target=_blank>American Community Survey "+ curyr4 + "-" + yrvalue + " 5-year data</a>", 'colspan' : 2}
	];

if(fips == "000"){	
     var tblcolumns2 = ['Topic', 'Value', 'Change from ' + prevyr4 + "-" + prevyr + " ACS","U. S. Rank"];
} else {
	 var tblcolumns2 = ['Topic', 'Value', 'Change from ' + prevyr4 + "-" + prevyr + " ACS","County Rank"];
};

// Output table 
d3.select('#ACSTab').html("");
var syatab = d3.select('#ACSTab')
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
   .style("width","20%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","20%")
   .style("text-align", "center")
   .style("font-weight", "bold");
   
 //Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "20%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.topic; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.value; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.diff; });
 rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.rank; });
 }); //end of promise
}; //end of genACS


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
	if(housing_fint[i][0][0].name == 'censusbuildingpermits') { out_name = "Annual Building Permits";
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
var tblcolumns2 = ['Housing Type', 'Value', 'Change from ' + prevyear];
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

