//Website functions fror State Demography Office Demographic Profile
//A. Bickford 9/2021

//list of lookup statements  https://github.com/ColoradoDemography/MS_Demog_Lookups/tree/master/doc

//Profile functions

//Join function from http://learnjsdata.com/combine_data.html

function join(lookupTable, mainTable, lookupKey, mainKey, select) {
    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) { // loop through l items
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j++) { // loop through m items
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
};

//profileContent provides descriptive names for checked profile boxes...
function profileContent(invalue) {
	var outname;
	switch(invalue) {
	case "sel1" :
	  outname = "Basic Statistics";
	  break;
	case "sel2":
	   outname = "Population Trends";
	   break;
	case "sel3" :
	   outname = "Population Characteristics: Age";
	   break;
	case "sel4" :
	   outname = "Population Characteristics: Income, Education and Race";
	   break;
	case "sel5" :
	   outname = "Housing and Households";
	   break;
	case "sel6" : 
		outname = "Commuting and Job Growth";
		break;
	case "sel7" :
		outname = "Employment by Industry";
		break;
	case "sel8" :
		outname = "Employment Forecast and Wage Information";
		break;
	}
	return(outname);
}; //end of profileContent



//Community Profile Functions


//selGeo selects Municipalities and CDPs formatting in sel1 of profile
function selGeo(fipsArr,ctyData,type){
	
		const regList = ['Region', 'Regional Comparison'];
		const ctyList = ['County', 'County Comparison']	

	 if(ctyList.includes(type) || regList.includes(type)) {
		var chkval =  ctyData.properties.COUNTYFP;
	 } else {
	 	  var ckkval = ctyData.placefp; 
	 };
	if (regList.includes(type)) {
		var regFips = regionCOL(fipsArr);
		return (regFips[0].fips.includes(chkval));
	  } else {
 	    return (fipsArr.includes(chkval));
	  }
}
//end selGeo

//selColor  Sets fill color for counties and regions
function selColor(fipsArr,names,ctyData,type){
	var outColor = '#FFFFFF';
	var chkval =  ctyData.properties.COUNTYFP;
var regList = ['Region', 'Regional Comparison'];

if(regList.includes(type)){
	for(i = 0; i < fipsArr.length; i ++){
		 var regionSel = regionCOL(fipsArr[i]);
			 var regFips = regionSel[0].fips;
			 var regColor = regionSel[0].color;
			 if(regFips.includes(chkval)) {outColor = regColor;};
		 }
} else {
	if(fipsArr.includes(chkval)){
		outColor = '#008000';
	};
};
return outColor;
};
//end of selColor


//calcpopGR calculates population table entries for profile  dat
function calcpopGR(inData,fipsArr,type, yrVal) {
   var outtab = []; //This array contains all entries for all yeats
   var geog, name, year1, est1, year2, est2, popch, gr;
   
    var regList = ['Region', 'Regional Comparison'];	
  	var ctyList = ['County', 'County Comparison'];
    var muniList = ['Municipality', 'Municipal Comparison'];
	var placeList = ['Census Designated Place', 'Census Designated Place Comparison'];


   if(regList.includes(type)){
	  
	  for(i = 0; i < fipsArr.length; i++) {
	     var tmp_l = regionCOL(parseInt(fipsArr[i]));
		 var tmp_list = [];
		 for(j = 0; j < tmp_l[0].fips.length; j++) {
			 tmp_list.push(parseInt(tmp_l[0].fips[j]));
		 }
	     var cty_filt = inData.filter(function(d) {return (tmp_list.includes(d.countyfips));});
	     var cty_data  = [];
		 for(k = 0; k < cty_filt.length; k++){
			 cty_data.push({'fips' : cty_filt[k].countyfips, 'name' : countyName(cty_filt[k].countyfips), 'year' : cty_filt[k].year, 'estimate' : parseInt(cty_filt[k].estimate)});
		 }
		 //Rollup
         var reg_sum = d3.rollup(cty_data, v => d3.sum(v, d => d.estimate), d => d.year);		 
		 
		 //Flatten
		 var region_data = [];
		for (let [key, value] of reg_sum) {
		  region_data.push({ fips: -100 - parseInt(fipsArr[i]), 'name' : regionName(parseInt(fipsArr[i])), 'year' : key, 'estimate' : value});
			};

		 var reg_cty = region_data.concat(cty_data);
		 outtab = outtab.concat(reg_cty);
	  }
   };
  
    if(ctyList.includes(type)){
      for(i = 0; i < inData.length; i++){
		   outtab.push({'fips' : inData[i].countyfips, 'name' : countyName(inData[i].countyfips), 'year' : inData[i].year, 'estimate' : parseInt(inData[i].estimate)});
	  };
   };
   if(muniList.includes(type)){
	  if(inData.length > 2){
		  //extracting Multi County Places
		  var tmpData = inData.filter(function(d) {return d.municipalityname.includes('(Total)');});
		  if(tmpData.length != 0){
		      var remData = inData.filter(function(d) {return d.placefips != tmpData[0].placefips;});
			  tmpData = tmpData.concat(remData);
		  } else {
			  var tmpData = inData;
		  };
	  } else {		  
      var tmpData = inData; 
	  };
      for(i = 0; i < tmpData.length; i++){
		   outtab.push({'fips' : tmpData[i].placefips, 'name' : muniName(tmpData[i].placefips), 'year' : tmpData[i].year,  'estimate' : parseInt(tmpData[i].totalpopulation)});
	  };

   };   
   if(placeList.includes(type)){
       for(i = 0; i < inData.length; i++){
		   outtab.push({'fips' : inData[i].placefips, 'name' : cdpName(inData[i].placefips), 'year' : inData[i].year,  'estimate' : parseInt(inData[i].estimate)});
	  };
   };  
 //Selecting out geographies  

//Creating output table  THis works for two years need to difna solution for multiple years....


var output = [];
var uniqyr = [...new Set(outtab.map(d => d.year))];
var yr1 = uniqyr[0];
var yr2 = uniqyr[1];
var uniqids = [...new Set(outtab.map(d => d.fips))];
for(i = 0; i < uniqids.length; i++) {
	var id = outtab.filter(d => d.fips == uniqids[i]);
	var est1 = id[0].estimate;
	var est2 = id[1].estimate;
	var diff = est2 - est1;
	var pctdiff = diff/est1;
    output.push({'fips' : id[0].fips, "name" : id[0].name, yr1 : est1, yr2 : est2, "popch" : diff, "growth" : pctdiff});
}


 return output;
}; //End calcpopGR

//procMedian  Gathers and calculates median income  or house value from ACS records
function procMedian(inData,fipsArr,variable, geog, names){

var fipsnum;
var medvalue = [];

	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];


for(i = 0; i < inData.length; i++) {
	 if(inData[i].geonum == 108) {
			 fipsnum = 0;
		} else {
			 fipsnum = inData[i].geonum - 108000;
		};

	if(variable == 'b19013001'){  //Median income
	    medvalue.push({'fips' : fipsnum, 'name' : inData[i].geoname, 'value' : +inData[i].b19013001});
	};
	if(variable == 'b25077001'){  //Median home value
	      medvalue.push({'fips' : fipsnum, 'name' : inData[i].geoname, 'value' : +inData[i].b25077001});
	};
}; 	//i loop

//Calculating regional median and adding to output data set...
if(regList.includes(geog)){
	var med_out = [];
	for(i = 0; i < fipsArr.length;i++){
		var med_tmp = [];
		var regionDat = []
		var fipslist = regionCOL(fipsArr[i]);
		var tmp_list = [];
		 for(j = 0; j < fipslist[0].fips.length; j++) {
			 tmp_list.push(parseInt(fipslist[0].fips[j]));
		 }
		var filtvalue = medvalue.filter(function(d) {return tmp_list.includes(d.fips)});
		var rangeArr = [];
		for(l = 0; l < filtvalue.length; l++){
				 rangeArr.push(filtvalue[l].value);
			};			 
		var range = d3.extent(rangeArr);
		var medVal = (range[1] + range[0])/2;
		var regionNumber = -100 - parseInt(fipsArr[i]);
		var regionNam = regionName(fipsArr[i]);
		regionDat.push({fips : regionNumber, name : regionNam, value : medVal});
	    med_tmp = regionDat.concat(filtvalue);
		var med_out = med_out.concat(med_tmp);
	}; //i loop
};

if(regList.includes(geog)){
  return med_out;
} else {
   return medvalue;
}
}; //end of procMedian

//procPCT Generates percentages from ACS data
function procPCT(inData,fipsArr, stub,geog,names){
var fipsnum;
var pctvalue = [];
	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];

for(i = 0; i < inData.length; i++) {
	 if(inData[i].geonum == 108) {
			 fipsnum = 0;
		} else {
			 fipsnum = inData[i].geonum - 108000;
		};

	if(stub == 'b17001'){  //Poverty
	    pctvalue.push({'fips' : fipsnum, 'name' : inData[i].geoname, 'dem' : +inData[i].b17001001, 'num' : +inData[i].b17001002, 'pct' : +inData[i].b17001002/+inData[i].b17001001});
	};
	if(stub == 'b05002'){  //Native Colorado
	    pctvalue.push({'fips' : fipsnum, 'name' : inData[i].geoname, 'dem' : +inData[i].b05002001, 'num' : +inData[i].b05002003, 'pct' : +inData[i].b05002003/+inData[i].b05002001});
	};
}; //i

if(regList.includes(geog)){
	var pct_out = [];
	for(i = 0; i < fipsArr.length;i++){
		var pct_tmp = [];
		var regionDat = []
		var fipslist = regionCOL(fipsArr[i]);
		var tmp_list = [];
		 for(j = 0; j < fipslist[0].fips.length; j++) {
			 tmp_list.push(parseInt(fipslist[0].fips[j]));
		 }
		var filtvalue = pctvalue.filter(function(d) {return tmp_list.includes(d.fips)});
		var columnsToSum = ['dem', 'num'];
		var regSum = d3.rollup(filtvalue,
					  v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])));
		var pctval = regSum.num/regSum.dem;
		var regionNumber = -100 - parseInt(fipsArr[i]);
		var regionNam = regionName(fipsArr[i]);
		regionDat.push({fips : regionNumber, name : regionNam, dem : regSum.dem, num : regSum.num, pct : pctval});
	    pct_tmp = regionDat.concat(filtvalue);
		var pct_out = pct_out.concat(pct_tmp);
	}; //i loop
};

if(regList.includes(geog)){
  return pct_out;
} else {
   return pctvalue;
}
    }; //end of procPCT

//regCombine Combines regional comparisons data
function regCombine(regData,ctyData) {

	var outData = [];
	for(i = 0; i < regData.length; i++){
		var seldata = regData[i];
		if(regData[i].name == 'Colorado') {			
			outData.push(seldata);
		} else {
		 outData.push(seldata);
		 var selRegion = regionCOL(seldata.name);
		 var regFips = selRegion[0].fips;
		 for(j = 0; j < regFips.length;j++){
			  regFips[j] = parseInt(regFips[j]);
		 };
		 var tmpData = ctyData.filter(function(d) {return regFips.includes(d.geography);});
		 for(k = 0; k < tmpData.length; k++){
			 outData.push(tmpData[k]);
		 };
		};	
	};
return outData;
};

//dlmap Downloads the  sel 1 Map
function dlMap(){

   var descript = document.getElementById('profile-content1')
   var descriptTxt = descript.childNodes[1].textContent;
   var fnTxt = descriptTxt.replace("Basic", " Basic");
   var outFileName = fnTxt + ".png";

   	var count_node = d3.select(descript).select("svg").node();
	count_node.setAttribute("viewBox", "0 0 925 500");
	saveSvgAsPng(count_node, outFileName);
};
//AddProfileBtns  Adds the download buttons and images to the DOM
function AddProfileBtns(divname,btnprefix) {

var btnDiv = divname;
var newDiv = document.createElement('div');
	newDiv.className = 'dropdown AClass';
var dlBtn = document.createElement('button');
	dlBtn.setAttribute('id', btnprefix);
	dlBtn.className = 'dropbtn';
var btnImg = document.createElement('i');
	btnImg.className = 'fas fas fa-download fa-2x'
	btnImg.style.color = 'black';
var btnDiv2 = document.createElement('div');
	btnDiv2.className = 'dropdown-content';

var linkpng = document.createElement('a');
	linkpng.setAttribute('href','#');
	linkpng.setAttribute('id', btnprefix + '_png');
	linkpng.setAttribute('onclick','dlMap();');
	linkpng.innerHTML = 'Download Image (PNG)';
	
var linkpdf = document.createElement('a');
	linkpdf.setAttribute('href','#');
	linkpdf.setAttribute('id', btnprefix + '_pdf');
	linkpdf.innerHTML = 'Download Full Report (pdf)';



dlBtn.appendChild(btnImg);

btnDiv2.appendChild(linkpng);

newDiv.appendChild(dlBtn);
newDiv.appendChild(btnDiv2);

btnDiv.appendChild(newDiv);

};

//Functions to export d3 SVG to PNG for eventual download  http://bl.ocks.org/Rokotyan/0556f8facbaf344507cdc45dc3622177
// Below are the functions that handle actual exporting:
// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
function getSVGString( svgNode ) {

	svgNode.setAttribute('xmlns','http://www.w3.org/2000/svg');
	svgNode.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
	var cssStyleText = getCSSStyles( svgNode );
	appendCSS( cssStyleText, svgNode );

	var serializer = new XMLSerializer();
	var svgString = serializer.serializeToString(svgNode);
	svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
	svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

	return svgString;

	function getCSSStyles( parentElement ) {
		var selectorTextArr = [];

		// Add Parent element Id and Classes to the list
		selectorTextArr.push( '#'+parentElement.id );
		for (var c = 0; c < parentElement.classList.length; c++)
				if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
					selectorTextArr.push( '.'+parentElement.classList[c] );

		// Add Children element Ids and Classes to the list
		var nodes = parentElement.getElementsByTagName("*");
		for (var i = 0; i < nodes.length; i++) {
			var id = nodes[i].id;
			if ( !contains('#'+id, selectorTextArr) )
				selectorTextArr.push( '#'+id );

			var classes = nodes[i].classList;
			for (var c = 0; c < classes.length; c++)
				if ( !contains('.'+classes[c], selectorTextArr) )
					selectorTextArr.push( '.'+classes[c] );
		}

		// Extract CSS Rules
		var extractedCSSText = "";
		for (var i = 0; i < document.styleSheets.length; i++) {
			var s = document.styleSheets[i];
			
			try {
			    if(!s.cssRules) continue;
			} catch( e ) {
		    		if(e.name !== 'SecurityError') throw e; // for Firefox
		    		continue;
		    	}

			var cssRules = s.cssRules;
			for (var r = 0; r < cssRules.length; r++) {
				if ( contains( cssRules[r].selectorText, selectorTextArr ) )
					extractedCSSText += cssRules[r].cssText;
			}
		}
		

		return extractedCSSText;

		function contains(str,arr) {
			return arr.indexOf( str ) === -1 ? false : true;
		}

	}

	function appendCSS( cssText, element ) {
		var styleElement = document.createElement("style");
		styleElement.setAttribute("type","text/css"); 
		styleElement.innerHTML = cssText;
		var refNode = element.hasChildNodes() ? element.children[0] : null;
		element.insertBefore( styleElement, refNode );
	}
}


function svgString2Image( svgString, width, height, format, callback ) {
	var format = format ? format : 'png';

	var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");

	canvas.width = width;
	canvas.height = height;

	var image = new Image();
	image.onload = function() {
		context.clearRect ( 0, 0, width, height );
		context.drawImage(image, 0, 0, width, height);

		canvas.toBlob( function(blob) {
			var filesize = Math.round( blob.length/1024 ) + ' KB';
			if ( callback ) callback( blob, filesize );
		});

		
	};

	image.src = imgsrc;
}  

//save SVG  Serializes and outputr SVG in current div (i.e., created by genSel1Map)

function saveSVG(svgdiv) {
   //Serialize svg...
   var svgNode = svgdiv.node();
   var outSVG = getSVGString(svgNode);

return outSVG;
};

//Export2Word  from https://www.codexworld.com/export-html-to-word-doc-docx-using-javascript/
function Export2Word(intab, filename = ''){

	filename = filename.replace(".docx","");
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+intab+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
	};
//End of Export2Word
//generateTab creates html table and the passes table to the Export2Word function

function generateTab(header, body, footer, tabTitle, fileName) {


//Header
var table = "<table border= '1'><thead><tr align='center'>";
for(i = 0; i < header[0].length; i++){
	table = table + '<th>' + header[0][i] + '</th>';
}
table = table + "</tr></thead>";

//body

table = table + "<tbody><tr>";
for(i = 0; i < body.length; i++){
	for(j = 0; j < body[i].length;j++){
		if(j == 0){
		  table = table + "<td>" + body[i][j] + "</td>";
		} else {
		  table = table + "<td align='right'>" + body[i][j] + "</td>";
		}
	}
	table = table + '</tr>';
}
table = table + '</tbody>';

//footer

table = table + "<tfoot>>";
for(a = 0; a < footer.length; a++){
	table = table + '<tr><td colspan = ' + body[0].length + '>' + footer[a] + '</td></tr>';
}
table = table + "</tfoot></table>";

Export2Word(table, filename = fileName);

 }; //end of generateTab


 //Data Table WordButton creator
 
$.fn.dataTable.ext.buttons.word = {
    className: 'buttons-word',
 
   action: function ( e, dt, node, config ) {
	            var colhd = dt.columns().header().toArray().map(x => x.innerText);
				var colft = dt.footer().toArray().map(x => x.innerText);
				
				var table = dt.rows().data();
				var tabTitle = config.titleAttr;
				var fileName = tabTitle + ".docx";
			
			//flattening the table componets
            var colHead =[];
			colHead[0] = colhd;
				
			
			var colFoot = colft.toString().split("\t");

			generateTab(colHead,table,colFoot,tabTitle,fileName);
			} //action function....
   };//Data Table WordButton creator


function genProfile(lvl,fipsArr,valSec, names) {
var descript = "Colorado Demographic Profile "+ lvl + ": ";
	descript = descript + names[0];

for(i = 1; i < names.length; i++){
	  descript = descript + ", " + names[i];
};

//Defininf the output p[anels
var PROFILE_1 = document.getElementById('profile-content1');
var PROFILE_2 = document.getElementById('profile-content2');
var PROFILE_3 = document.getElementById('profile-content3');
var PROFILE_4 = document.getElementById('profile-content4');
	 
	 
 //Create an array that holds the contenrnts 

//Selecting Maximum Year
var yrstr = "https://gis.dola.colorado.gov/lookups/componentYRS";
d3.json(yrstr).then(function(yeardata){
    var maxest = yeardata.filter(function(d){return d.datatype == 'Estimate'});
	var yrsList = maxest.map(function(d){return d.year;});
    var curyear = d3.max(yrsList) - 1;  //THIS is for testing, to insure the results are for 2019 ACS

//Triggering the first button  Expand these for each button...
var firstbtn = valSec[0];
if(firstbtn == 'sel1') {
 var finDescript  = descript + "<br>Basic Statistics";
  var tabDescript = descript + ": Basic Statistics";

   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   
     //Add Download buttons...
   AddProfileBtns(PROFILE_1,'sel1');

   //Add heading to DOM
    var sel1heading = document.createElement("H2");
   sel1heading.innerHTML = finDescript;
   PROFILE_1.appendChild(sel1heading);

  var outSVG =  genSel1map(lvl, fipsArr, names, PROFILE_1);

    genSel1tab(lvl, fipsArr, names, tabDescript, PROFILE_2,curyear);
};

 //Need to export final description, svg and datatable here
  
//Population Trends Button
if(firstbtn == 'sel2') { 
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel2display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
//Pull the data from Components of Change... Perhjaps bers county muni time series
}

//Setting Event Listeners
document.getElementById("sel1btn").addEventListener("click", function() {
  PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   
     //Add Download buttons...
   AddProfileBtns(PROFILE_1,'sel1');

   //Add heading to DOM
   var sel1heading = document.createElement("H2");
   sel1heading.innerHTML = descript + "<br>Basic Statistics";
   PROFILE_1.appendChild(sel1heading);
   
   var outSVG =  genSel1map(lvl, fipsArr, names, PROFILE_1);
   genSel1tab(lvl, fipsArr, names, tabDescript, PROFILE_2,curyear);
     }); //end of sel1btn listener
	 
document.getElementById("sel2btn").addEventListener("click", function() {
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel2display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
}); //end of sel2btn listener
}); //End of Promise 
}; //end of genProfile
	
	
//genSel1map The first tab, map
function genSel1map(level, fipsArr,nameArr,outputProfile){

	const fmt_date = d3.timeFormat("%B %d, %Y");
	const fmt_pct = d3.format(".2%")
	const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,");
    const fmt_yr = d3.format("00");

  
	const ctyList = ['Region', 'County', 'Regional Comparison', 'County Comparison']	
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];
	const ctyPath = '../data/County_GEN_2014.geojson';
	const placecentroid = '../data/place_centroids.csv';
	
	//Set up projections and other mappy stuff
	var width = 600;
    var height = 300;

//Create a list of counties from the region lists

var prom = [d3.json(ctyPath),d3.csv(placecentroid)]

Promise.all(prom).then(function(data){

	let projection = d3.geoMercator();
    projection.fitSize([width, height], data[0]);
    let geoGenerator = d3.geoPath().projection(projection);
	

var centData = []
for(i = 0; i < data[1].length; i++){
if(fipsArr.includes(data[1][i].placefp)){
	centData.push({'placefp' : data[1][i].placefp, 'name' : data[1][i].namelsad, 'long' : +data[1][i].x, 'lat' :+data[1][i].y});
	};
}

//Appending the svg
var div = d3.select(outputProfile).append("div").attr("class","tooltip").style("opacity",0);
var coMap = d3.select(outputProfile).append('svg').attr('width', width).attr('height', height);
    	

if(ctyList.includes(level)) {

  //Plotting County Map
 coMap.append("g")
      .selectAll("path")
	  .data(data[0].features)
	  .enter()
      .append("path")
	  .attr('class','cty')
	  .attr('d', geoGenerator) 
	  .attr('stroke', '#000')
	  .attr('fill',function(d){ return selColor(fipsArr,nameArr,d,level);})
      .on("mouseover", function(event,d,i) {  
            div.transition()        
                .duration(200)      
                .style("opacity", function() {return selGeo(fipsArr,d,level) ? 1 : 0;}); 
            div.text(function() {return selGeo(fipsArr,d,level) ? d.properties.NAMELSAD : "";}) 
                .style("left", (event.pageX) + "px")     
                .style("top", (event.pageY - 28) + "px");    
            })                  
        .on("mouseout", function() {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });
} else { //Muni and CDP map
		 coMap.append("g")
			  .selectAll("path")
			  .data(data[0].features)
			  .enter()
			  .append("path")
			  .attr('class','cty')
			  .attr('d', geoGenerator) 
			  .attr('stroke', '#000')
			  .attr('fill','#FFFFFF');
			  
	coMap.selectAll("myCircles")
		  .data(centData)
		  .enter()
		  .append("circle")
			.attr("cx", function(d){ return projection([d.long, d.lat])[0];})
			.attr("cy", function(d){ return projection([d.long, d.lat])[1];})
			.attr("r", 5)
			.style("fill", '#008000')
			.attr("stroke",  '#000000')
			.attr('stroke-width', 2)
			.style("opacity", 1 ) 
			.on("mouseover", function(event,d,i) {
					div.transition()        
						.duration(200)      
						.style("opacity", 1 ); 
					div.text(d.name) 
						.style("left", (event.pageX) + "px")     
						.style("top", (event.pageY - 28) + "px");    
			})                  
           .on("mouseout", function(d) {       
					div.transition(d)        
						.duration(500)      
						.style("opacity", 0);  			
            });	
};

var savedSVG = saveSVG(coMap);
return savedSVG;
}); //end of Promise
 
}; //end of genSel1map


function genSel1tab(level, fipsArr, nameArr, fileName, outputPro, curYr) {

	const fmt_date = d3.timeFormat("%B %d, %Y");
	const fmt_dec = d3.format(".3");
	const fmt_pct = d3.format(".1%");
	const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");
	

	var curACS = "acs" + fmt_yr(curYr - 2004) + fmt_yr(curYr - 2000);
	var prevACS = "acs0610";
    const yrlist = "2010,"+curYr;
	const yrlistARR = yrlist.split(",");
	
	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];


if(regList.includes(level)) {
    var fips_list = [];
		for(i = 0; i < fipsArr.length; i++) {
		  var regNum = parseInt(fipsArr[i]);
		  var tmplist = regionCOL(regNum);
		  for(j = 0; j < tmplist[0].fips.length; j++){
			  fips_list.push(tmplist[0].fips[j]);
		  }
		}
}
if(ctyList.includes(level)) {
    var fips_list = [];
	var fipsACS = [];
		for(i = 0; i < fipsArr.length; i++) {
		  fips_list.push(parseInt(fipsArr[i]));
		  fipsACS.push('08' + fipsArr[i]);
	}
}
	if(muniList.includes(level)) {
		var fips_list =[];
		var muni_cty = [];
		var fipsACS = [];
		for(i = 0; i < fipsArr.length; i++){
			fips_list.push(parseInt(fipsArr[i]));
			muni_cty.push(parseInt(muni_county(fipsArr[i])));
			fipsACS.push("08" + fipsArr[i]);
		};
	    var muni_cty_acs = ['08'];
		for(i = 0; i < fipsArr.length; i++){
			   muni_cty_acs.push('08' + muni_county(fipsArr[i]));
	    };
	}
	
	if(placeList.includes(level)) {
		var cdp_cty = [];
		var fipsACS = [];
		for(i = 0; i < fipsArr.length; i++){
			cdp_cty.push(parseInt(cdp_county(fipsArr[i])));
			fipsACS.push("08" + fipsArr[i]);

		};
		var cdp_cty_acs = ['08'];
		for(i = 0; i < fipsArr.length; i++){
			   cdp_cty_acs.push('08' + cdp_county(fipsArr[i]));
	    };

	}
	
  //Generate urls
  if(regList.includes(level))  { 
	var jobs_list = [];
	var fipsACS = [];

	for(i = 0; i < fips_list.length; i++){
	  jobs_list.push(parseInt(fips_list[i]));
	  fipsACS.push("08" + fips_list[i]);
    };

	 fipsACS.unshift('08');
   	 var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + jobs_list + '&year=' + yrlist;
	 var jobsCTY = 'https://gis.dola.colorado.gov/lookups/jobs?county='+jobs_list+'&year='+ curYr +'&sector=0';
	 

	 //median Income ACS  b19013001
	 var incCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;

	 var prom = [d3.json(popCTY),d3.json(jobsCTY),d3.json(incCTY),
	             d3.json(hvalCTY), d3.json(povCTY), d3.json(natCTY)];
  }

if(ctyList.includes(level)){
	fips_list.unshift(0);
	fipsACS.unshift('08');
   	 var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + fips_list + '&year=' + yrlist;
	 var jobsCTY = 'https://gis.dola.colorado.gov/lookups/jobs?county='+fips_list+'&year='+ curYr +'&sector=0';
	 //median Income ACS  b19013001
	 var incCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;


	 var prom = [d3.json(popCTY),d3.json(jobsCTY),d3.json(incCTY),
	             d3.json(hvalCTY), d3.json(povCTY), d3.json(natCTY)];
  };


if(muniList.includes(level)){
	 muni_cty.unshift(0);
	 var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + muni_cty + '&year=' + yrlist;
	 var popMUNI = 'https://gis.dola.colorado.gov/lookups/munipophousing?year=' + yrlist + '&placefips=' + fips_list + '&compressed=yes';
   	
	 //median Income ACS  b19013001
	 var incCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + muni_cty_acs;
	 var incMUNI = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + muni_cty_acs;
	 var hvalMUNI = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + muni_cty_acs; 
	 var povMUNI = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + muni_cty_acs;
	 var natMUNI = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;

	 var prom = [d3.json(popCTY),d3.json(popMUNI),d3.json(incCTY),d3.json(incMUNI),
	             d3.json(hvalCTY),d3.json(hvalMUNI), d3.json(povCTY), d3.json(povMUNI), 
				 d3.json(natCTY),d3.json(natMUNI)];
  }
  
 if(placeList.includes(level)){
	 cdp_cty.unshift(0);

	 var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + cdp_cty + '&year=' + yrlist;
	 var popCDPprev = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + prevACS + '&schema=data&type=json&field=b01001001&geoid=' + fipsACS;
   	 var popCDPcur = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b01001001&geoid=' + fipsACS;
	 //median Income ACS  b19013001
	 var incCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + cdp_cty_acs;
	 var incCDP = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + cdp_cty_acs;
	 var hvalCDP = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + cdp_cty_acs; 
	 var povCDP = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + cdp_cty_acs;
	 var natCDP = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;

	 var prom = [d3.json(popCTY),d3.json(popCDPcur),d3.json(popCDPprev),
	             d3.json(incCTY),d3.json(incCDP),
	             d3.json(hvalCTY),d3.json(hvalCDP), d3.json(povCTY), d3.json(povCDP), 
				 d3.json(natCTY),d3.json(natCDP)];
  }

  Promise.all(prom).then(function(data){

	  
	  if(regList.includes(level)){
		 //Population Growth

		 var tabgr = calcpopGR(data[0],fipsArr,level,yrlistARR);
		 

		 //Jobs
		 var cty_jobs = [];

		 for(i = 0; i < fipsArr.length; i++) {
			 var reg_cty = regionCOL(+fipsArr[i]);
			 var fips_num =  reg_cty[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
			 var reg_data = data[1].filter( d => fips_num.includes(d.area_code));
			 var cty_list = [... new Set(reg_data.map(tag => tag.area_code))]; 
		 
			 for(j = 0; j < reg_data.length; j++){
				 cty_jobs.push({'area_code' : reg_data[j].area_code, 'population_year' : reg_data[j].population_year, 'total_jobs' : +reg_data[j].total_jobs});
			 }; //J loop
	//Building Regional Values

	         var reg_jobs = [];
			 var pop_year = cty_jobs[0].population_year;
			 var reg_val = -100 - parseInt(fipsArr[i])
			 var jobs_reg = d3.rollup(cty_jobs, v => d3.sum(v, d => d.total_jobs));
			 reg_jobs.push({area_code : reg_val, population_year : pop_year, total_jobs : jobs_reg});
			 var tmp_jobs = reg_jobs.concat(cty_jobs);
			 cty_jobs = cty_jobs.concat(tmp_jobs);
		 } //i loop
		 
		 var median_income = procMedian(data[2].data,fipsArr,'b19013001',level,nameArr);
		 //Median House Value
		 var median_home = procMedian(data[3].data,fipsArr,'b25077001',level,nameArr);
		 
		 //pct poverty
		 var poverty = procPCT(data[4].data,fipsArr,'b17001',level,nameArr);

		 //pct native
		 var coNative = procPCT(data[5].data,fipsArr,'b05002',level,nameArr);

}; //level = region

if(ctyList.includes(level)){
		 //Population Growth
		 var tabgr = calcpopGR(data[0],fips_list,level,yrlistARR);

		 //Jobs
		 var jobscty = data[1];
		 var cty_list = [... new Set(jobscty.map(tag => tag.area_code))]; 
		 
		 var cty_jobs = [];
		 for(i = 0; i < data[1].length; i++){
			 cty_jobs.push({'area_code' : data[1][i].area_code, 'population_year' : data[1][i].population_year, 'total_jobs' : +data[1][i].total_jobs});
		 };

		 //Median Income
		 var median_income = procMedian(data[2].data,fipsArr,'b19013001','county',nameArr);
		 //Median House Value
		 var median_home = procMedian(data[3].data,fipsArr,'b25077001','county',nameArr);
		 
		 //pct poverty
		 var poverty = procPCT(data[4].data,fipsArr,'b17001','county',nameArr);

		 //pct native
		 var coNative = procPCT(data[5].data,fipsArr,'b05002','county',nameArr);
}; //level = county	  

if(muniList.includes(level)){
		 //Population Growth
		 var ctygr  = calcpopGR(data[0],fips_list,"County",yrlistARR);
		 var munigr = calcpopGR(data[1],fips_list,level,yrlistARR);
		 if(level == 'Municipality'){
             var tabgr = ctygr.concat(munigr);
		 } else {
			 var tabgr = munigr;
		 };
 
		 //Median Income
		 var median_income_CTY = procMedian(data[2].data,fipsArr,'b19013001','county',nameArr);
		 var median_income_MUNI = procMedian(data[3].data,fipsArr,'b19013001','muni',nameArr);
		 if(level == 'Municipality'){
			var median_income = median_income_CTY.concat(median_income_MUNI);
		 } else {
			 var median_income = median_income_MUNI;
		 };
		 
		 //Median House Value
		 var median_home_CTY = procMedian(data[4].data,fipsArr,'b25077001','county',nameArr);
		 var median_home_MUNI = procMedian(data[5].data,fipsArr,'b25077001','muni',nameArr);
		 if(level == 'Municipality'){
			 var median_home = median_home_CTY.concat(median_home_MUNI);
		 } else {
			var median_home = median_home_MUNI;
		 };
		 //pct poverty
		 var poverty_CTY = procPCT(data[6].data,fipsArr,'b17001','county',nameArr);
		 var poverty_MUNI = procPCT(data[7].data,fipsArr,'b17001','muni',nameArr);
		 if(level == 'Municipality'){ 
			var poverty = poverty_CTY.concat(poverty_MUNI);
		 } else {
			var poverty = poverty_MUNI;
		 };
		 
		 //pct native
		 var coNative_CTY = procPCT(data[8].data,fipsArr,'b05002','county',nameArr);
		 var coNative_MUNI = procPCT(data[9].data,fipsArr,'b05002','muni',nameArr);
         if(level == 'Municipality'){
			 var coNative = coNative_CTY.concat(coNative_MUNI);
		 } else {
			 var coNative = coNative_MUNI;
		 };


}; //level = municipality	  

if(placeList.includes(level)){
//Building population data set
var prevPop = [];
var prevYr = 2000 + parseInt(data[2].source.substr(5,2));
 prevPop.push({'placefips' : data[2].data[0].place, 'year' : prevYr,  'estimate' : parseInt(data[2].data[0].b01001001)});

var curPop = [];
var curYr = 2000 + parseInt(data[1].source.substr(5,2));
 curPop.push({'placefips' : data[1].data[0].place, 'year' : curYr,  'estimate' : parseInt(data[1].data[0].b01001001)});
var placePop = prevPop.concat(curPop);


		 //Population Growth
		 var ctygr = calcpopGR(data[0],fips_list,"County",yrlistARR);
		 var cdpgr = calcpopGR(placePop,fips_list,level,yrlistARR);
		 if(level == 'Census Designated Place') {
			 var tabgr = ctygr.concat(cdpgr);
		 } else {
		     var tabgr = cdpgr;
		 };
		 
		 //Median Income
		 var median_income_CTY = procMedian(data[3].data,fipsArr,'b19013001','county',nameArr);
		 var median_income_CDP = procMedian(data[4].data,fipsArr,'b19013001','cdp',nameArr);
		 if(level == 'Census Designated Place') {  
		    var median_income = median_income_CTY.concat(median_income_CDP);
		 } else {
			var median_income = median_income_CDP;
         };
		 
		 //Median House Value
		 var median_home_CTY = procMedian(data[5].data,fipsArr,'b25077001','county',nameArr);
		 var median_home_CDP = procMedian(data[6].data,fipsArr,'b25077001','cdp',nameArr);
		 if(level == 'Census Designated Place') {
			var median_home = median_home_CTY.concat(median_home_CDP);
		 } else {
			 var median_home = median_home_CDP;
		 }; 
			
		 //pct poverty
		 var poverty_CTY = procPCT(data[7].data,fipsArr,'b17001','county',nameArr);
		 var poverty_CDP = procPCT(data[8].data,fipsArr,'b17001','cdp',nameArr);
         if(level == 'Census Designated Place') {
			var poverty = poverty_CTY.concat(poverty_CDP);
		 } else {
			var poverty = poverty_CDP;
		 };
		 
		 //pct native
		 var coNative_CTY = procPCT(data[9].data,fipsArr,'b05002','county',nameArr);
		 var coNative_CDP = procPCT(data[10].data,fipsArr,'b05002','cdp',nameArr);
         if(level == 'Census Designated Place') {
			var coNative = coNative_CTY.concat(coNative_CDP);
		 } else {
			var coNative = coNative_CDP;
		 };


}; //level = Censusu Designated Places	 

//data table format changing font width

var curyr = yrlistARR[1];
var prevyr = yrlistARR[0];
if(muniList.includes(level) || placeList.includes(level)){
		var labels = [
			   {'title' : 'Geography'},
			   {'title': 'Population ('+curyr+')*'},
			   {'title': 'Population Change (' + prevyr + ' to ' + curyr + ')*'},
			   {'title': 'Percentage Change (' + prevyr + ' to ' + curyr + ')*'},
			   {'title': 'Median Household Income^'},
			   {'title': 'Median Home Value^'},
			   {'title': 'Percentage of Population with incomes below poverty line.^'},
			   {'title': 'Percentage of Population born in Colorado^'}
				  ];
		
  } else {
	  var labels = [
       {'title' : 'Geography'},
       {'title': 'Population ('+curyr+')*'},
       {'title': 'Population Change (' + prevyr + ' to ' + curyr + ')*'},
       {'title': 'Percentage Change (' + prevyr + ' to ' + curyr + ')*'},
       {'title': 'Total Employment (' + curyr + ')*'},
       {'title': 'Median Household Income^'},
       {'title': 'Median Home Value^'},
       {'title': 'Percentage of Population with incomes below poverty line.^'},
       {'title': 'Percentage of Population born in Colorado^'}
		  ];
  };

var outtab = [];
if(muniList.includes(level) || placeList.includes(level)){
	for(i = 0; i < tabgr.length; i++){ 
	   outtab.push([ tabgr[i].name,
					 fmt_comma(tabgr[i].yr2),
					 fmt_comma(tabgr[i].popch),
					 fmt_pct(tabgr[i].growth),
					 fmt_dollar(median_income[i].value),
					 fmt_dollar(median_home[i].value),
					 fmt_pct(poverty[i].pct),
					 fmt_pct(coNative[i].pct)
	   ]);
	};
} else {
	for(i = 0; i < tabgr.length; i++){ 
        outtab.push([ tabgr[i].name,
                 fmt_comma(tabgr[i].yr2),
                 fmt_comma(tabgr[i].popch),
				 fmt_pct(tabgr[i].growth),
                 fmt_comma(cty_jobs[i].total_jobs),
                 fmt_dollar(median_income[i].value),
                 fmt_dollar(median_home[i].value),
                 fmt_pct(poverty[i].pct),
                 fmt_pct(coNative[i].pct)
   ]);
	};
}; 

//Processing Table Rows for regions

if(regList.includes(level)) {
	 for(k = 0; k < outtab.length; k++){
		 if(nameArr.includes(outtab[k][0])) {
			 for(l = 0; l < outtab[k].length; l++){
				 outtab[k][l] = "<b>"+outtab[k][l]+"</b>";
			 };
		 };
	 };
};

//Creating Footer

var tblfoot = [
               ["Sources: * Colorado State Demography Office"],
               ['^U.S. Census Bureau, '+fmt_yr(curyr - 4) + '-' + fmt_yr(curyr) +" American Community Survey"],
               ['Print Date : ' + fmt_date(new Date)]
			   ];

var ftrString = "<tfoot><tr>";
for(i = 0; i < tblfoot.length; i++){
	    ftrString = ftrString + "<tr><td colspan='9'>" + tblfoot[i] + "</td></tr>";
	};	
ftrString = ftrString + "</tr></tfoot>";

$(outputPro).append("<table id='summtab' class='DTTable' width='100%'></table>");



if(muniList.includes(level) || placeList.includes(level)){
	$('#summtab').append(ftrString);
	$('#summtab').DataTable( {
		dom: 'Bfrtip',
       buttons: [
		{  
                extend: 'word',
				text :'Word',
                titleAttr: fileName,
				footer : true
            },
            {  
                extend: 'excelHtml5',
                title: fileName,
				footer : true
            },
			{
                extend: 'csvHtml5',
                title: fileName,
				footer : true
            },
            {
                extend: 'pdfHtml5',
                title: fileName,
				footer : true
            }
        ],
		"order": [],
		"bSort" : true,
		data: outtab,
		columns : labels,
		columnDefs: [
		{   
			'targets': 0, 'className': 'dt-body-left',
			'targets' : [1,2,3,4,5,6,7], 'className': 'dt-body-right' 
		},
		{ 'targets': 0, 'width': '20%' ,
		  'targets' : [1,2,3,4,5,6,7], 'width' :'10%'
		}  
		]
	} );
} else {
	$('#summtab').append(ftrString);
	$('#summtab').DataTable( {
				dom: 'Bfrtip',
        buttons: [
		{  
                extend: 'word',
				text :'Word',
                titleAttr: fileName,
				footer : true
            },
            {  
                extend: 'excelHtml5',
                title: fileName,
				footer : true
            },
			{
                extend: 'csvHtml5',
                title: fileName,
				footer: true
            },
            {
                extend: 'pdfHtml5',
                title: fileName,
				footer: true
            }
        ],
		"order": [],
		"bSort" : true,
		data: outtab,
		columns : labels,
		columnDefs: [
		{   
			'targets': 0, 'className': 'dt-body-left',
			'targets' : [1,2,3,4,5,6,7,8], 'className': 'dt-body-right' 
		},
		{ 'targets': 0, 'width': '20%' ,
		  'targets' : [1,2,3,4,5,6,7,8], 'width' :'10%'
		}  
		]
	} );
};

  }); //End of Promise
};  //End of genSel1Tab

//genSel2display  Outputs objects for the second panel of the profile... 
function genSel2display(geotype, fipsArr, names, curyear, PRO_1, PRO_2, PRO_3, PRO_4) {
 	const fmt_date = d3.timeFormat("%B %d, %Y");
	const fmt_dec = d3.format(".3");
	const fmt_pct = d3.format(".1%");
	const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");



	if(geotype == "region"){
		var fips_tmp = regionCOL(parseInt(fips));
	    fips_list = fips_tmp[0].fips;
		for(i = 0; i < fips_list.length; i++){
			 fips_list[i] = parseInt(fips_list[i]);
		}
	} else {
	if(fips == "000") {
      fips_list = [1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125];
    } else {
		fips_list = [parseInt(fips)];
	};		
	};

	var fips_list; 
	if(fipsArr == "000") {
      fips_list = "1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125";
    } else {
		fips_list = parseInt(fipsArr);
	};		
//Estimates and components of change chart

	var yr_list = 1985;
	for(i = 1986; i <= yrvalue; i++){
		yr_list = yr_list + "," + i;
	};
	
	var esturl = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + yr_list + "&vars=totalpopulation,naturalincrease,netmigration";
	
//forecasts and age projections
   var forc_yrs = 2010;
   	for(i = 2011; i <= 2050; i++){
		forc_yrs = forc_yrs + "," + i;
	};

    if(fips == "000") {
		var forcurl = "https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=0&year=" + forc_yrs + "&choice=single"
	} else {
		var forcurl = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + forc_yrs + "&choice=single&group=3"
	}; 

var prom = [d3.json(esturl),d3.json(forcurl)];


Promise.all(prom).then(function(data){

// Generate data set for output Table
var sel_yr = []
for(i = 1990; i <= yrvalue;i++){
	if(i % 5 == 0) {
		sel_yr.push[i];
	}
}
if(sel_yr[sel_yr.length] != yrvalue) {
	sel_yr.push(yrvalue);
};

var tab_data = data[0].filter(function(d) {return sel_yr.includes(d.year)});

//Output charts
	estPlot(data[0],PRO_2,yrvalue, fips, ctyName);
	forecastPlot(data[1], PRO_3, yrvalue, fips, ctyName);
	cocPlot(data[0],PRO_4, yrvalue, fips, ctyName);
}); //End of Promise
}; //end genSel2display