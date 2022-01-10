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

//fixNEG fixes formatting ssue for negative numbers in word tables  based on fmt type (pct, num, cur) returns formatted value 
function fixNEG(invalue,fmt){
	const fmt_pct = d3.format(".1%")
	const fmt_comma = d3.format(",");
	const fmt_dollar = d3.format("$,");

    if(fmt == 'pct') {
		tmp_val = invalue/100;
	} else {
	    tmp_val = invalue;
	}
	if(tmp_val < 0) {
		 tmp_val = tmp_val * -1;
		 if(fmt == 'pct') { fin_val = "-" + fmt_pct(tmp_val);};
		 if(fmt == 'num') { fin_val = "-" + fmt_comma(tmp_val);};
		 if(fmt == 'cur') { fin_val = "-" + fmt_dollar(tmp_val);};
	} else {
		 if(fmt == 'pct') { fin_val = fmt_pct(tmp_val);};
		 if(fmt == 'num') { fin_val = fmt_comma(tmp_val);};
		 if(fmt == 'cur') { fin_val = fmt_dollar(tmp_val);};
    }

   return fin_val;
}; //end of fixNEG


// Calculate 5-year growth rate	table
function growth_tab(level, inData,fileName, outDiv1){
	const fmt_pct = d3.format(".1%")
	const fmt_comma = d3.format(",");
	const fmt_date = d3.timeFormat("%B %d, %Y");
	const regList = ['Region', 'Regional Comparison'];
	

var geomap = [...new Set(inData.map(d => d.fips))];
var outDataPop = [];
var outDataGr = [];

for(i = 0; i < geomap.length; i++) {
	var tmp_dat = inData.filter(d => d.fips == geomap[i]);

	 	outDataPop.push({'fips' : tmp_dat[0].fips, 'name' : tmp_dat[0].name, 'year' : tmp_dat[0].year, 'totalpopulation' : tmp_dat[0].totalpopulation});
	 	outDataGr.push({'fips' : tmp_dat[0].fips, 'name' : tmp_dat[0].name, 'year' : tmp_dat[0].year, 'growthrate' : '-'});

	for(j = 1; j < tmp_dat.length; j++) {
		if( tmp_dat[j].totalpopulation == 0 || tmp_dat[j-1].totalpopulation == 0) {
			gr_rate = "-";
		} else {
		var pop_ratio = tmp_dat[j].totalpopulation/tmp_dat[j-1].totalpopulation;
		var yr_ratio = 1/(tmp_dat[j].year - tmp_dat[j-1].year);
		var gr_rate = (Math.pow(pop_ratio,yr_ratio)-1) * 100;
		}
		var tmp_pop = [];
		var tmp_gr = [];
		    tmp_pop.push({'fips' : tmp_dat[j].fips, 'name' : tmp_dat[j].name, 'year' : tmp_dat[j].year, 'totalpopulation' : tmp_dat[j].totalpopulation});
			tmp_gr.push({'fips' : tmp_dat[j].fips, 'name' : tmp_dat[j].name, 'year' : tmp_dat[j].year, 'growthrate' : gr_rate});
	outDataPop = outDataPop.concat(tmp_pop);
	outDataGr = outDataGr.concat(tmp_gr);
     } //j
   } //i 


   
//Restructure data based on fips code

var places = [...new Set(outDataPop.map(d => d.fips))];
var years = [...new Set(outDataPop.map(d => d.year))];
var tab_data_Pop = [];
var tab_data_Gr = [];

for(x = 0; x < places.length;x++){
	var filtPop = outDataPop.filter(d => d.fips == places[x]);
	var filtGr = outDataGr.filter(d => d.fips == places[x]);


	var arrLen = filtPop.length + 1;
	var outarrPop = new Array(1).fill(new Array(arrLen));
	var outarrGr = new Array(1).fill(new Array(arrLen));
	outarrPop[0][0] = x;
	outarrPop[0][1] = filtPop[0].name;
	outarrGr[0][0] = x;
	outarrGr[0][1] = filtPop[0].name;


	for(z = 0; z < filtPop.length; z++){
		 var pos = z  + 2;

		 outarrPop[0][pos] = filtPop[z].totalpopulation;
		 outarrGr[0][pos] = filtGr[z].growthrate;
	} //z
	tab_data_Pop = tab_data_Pop.concat(outarrPop);
	tab_data_Gr = tab_data_Gr.concat(outarrGr);

} //x


//Producing  datatables...
//Column headings

var headString = "<thead><tr><th>Index</th><th>Geography</th>"
for(i = 0; i < years.length;i++) {
	headString = headString + "<th>"+years[i]+"</th>"
}
headString = headString + "</tr></thead>";

//footer
//Creating Footer
var ftrMsg = "Source: Colorado State Demography Office Print Date : " + fmt_date(new Date);
var ftrString = "<tfoot><tr><td colspan = '" + tab_data_Pop[0].length + "'>"+ ftrMsg + "</td></tr>";

//Processing Table Rows for regions

if(regList.includes(level)) {
	tab_data_Pop[0][1] = "<b>"+tab_data_Pop[0][1]+"</b>";
	tab_data_Gr[0][1] = "<b>"+tab_data_Gr[0][1]+"</b>";
};
//Generating final tables
var	tabpop = "<tr>";
var	tabgr =  "<tr>";

for(i = 0; i < tab_data_Pop.length;i++){
	if(i > 0) {
		tabpop = tabpop + '<tr>';
		tabgr = tabgr + '<tr>';
	}
	for(j = 0; j < tab_data_Pop[i].length;j++){
		tabpop = tabpop + '<td>' + tab_data_Pop[i][j] + '</td>';
		tabgr = tabgr + '<td>' + tab_data_Gr[i][j] + '</td>';
	}
	tabpop = tabpop + "</tr>";
	tabgr = tabgr + "</tr>";
}

var tabpop_fin = headString + tabpop + ftrString;
var tabgr_fin = headString + tabgr + ftrString;

//Appending tables to the DOM and processing them with DataTables
$(outDiv1).append("<table id='growthtab1' class='DTTable' width='100%'></table>");
$(outDiv1).append("<table id='growthtab2' class='DTTable' width='100%'></table>");

$("#growthtab1").append(tabpop_fin);
$
$("#growthtab2").append(tabgr_fin);

//Population Table

 $('#growthtab1').DataTable( {
		"columnDefs" : [
		{'targets' : [2, 3, 4, 5, 6, 7, 8], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0, '','')},
		{   
			'targets': [0,1], 'className': 'dt-body-left',
			'targets' : [2, 3, 4, 5, 6, 7, 8], 'className': 'dt-body-right'
		},
		{ 'targets': 1, 'width': '20%' ,
		  'targets' : [2, 3, 4, 5, 6, 7, 8], 'width' :'10%'
		}  
		],
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
				footer : false,
				messageBottom : ftrMsg,
				customize : function (xlsx) {
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var col = $('col', sheet);
					col.each(function () { $(this).attr('width', 20); })
				}
        },
		{
                extend: 'csvHtml5',
                title: fileName
        },
        {
                extend: 'pdfHtml5',
                title: fileName,
				orientation : 'landscape',
				footer : false,
				messageBottom : ftrMsg,
				exportOptions: { columns: ':visible'},
				customize: function (doc) {
					var rowCount = doc.content[1].table.body.length;
					var colCount = doc.content[1].table.body[1].length;
                      for (i = 1; i < rowCount; i++) {
						for(j = 0; j < colCount; j++){
                          if(j < 2) {
						      doc.content[1].table.body[i][j].alignment = 'left';
						  } else {
                              doc.content[1].table.body[i][j].alignment = 'right';
						  }
						}
						}
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
			} //customize
		}
     ],  //buttons
		"order": []
	} );

//  Growth table...

 $('#growthtab2').DataTable( {
		"columnDefs" : [
		{'targets' : [2, 3, 4, 5, 6, 7, 8], 'type' : 'num',
		render: DataTable.render.number( '', '.', 1, '','%' )},
		{   
			'targets': [0,1], 'className': 'dt-body-left',
			'targets' : [2, 3, 4, 5, 6, 7, 8], 'className': 'dt-body-right'
		},
		{ 'targets': 1, 'width': '20%' ,
		  'targets' : [2, 3, 4, 5, 6, 7, 8], 'width' :'10%'
		}  
		],
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
				footer : false,
				messageBottom : ftrMsg,
				customize : function (xlsx) {
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var col = $('col', sheet);
					col.each(function () { $(this).attr('width', 20); })
				}
        },
		{
                extend: 'csvHtml5',
                title: fileName
				
        },
        {
                extend: 'pdfHtml5',
                title: fileName,
				orientation : 'landscape',
				footer : true,
				messageBottom : ftrMsg,
				exportOptions: { columns: ':visible'},
				customize: function (doc) {
					var rowCount = doc.content[1].table.body.length;
					var colCount = doc.content[1].table.body[1].length;
                      for (i = 1; i < rowCount; i++) {
						for(j = 0; j < colCount; j++){
                          if(j < 2) {
						      doc.content[1].table.body[i][j].alignment = 'left';
						  } else {
                              doc.content[1].table.body[i][j].alignment = 'right';
						  }
						}
						}
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
			}
		}
     ],  //buttons
		"order": []
	} );

 }; //growth_tab

//pgSetup  adds elements to Plot divs

function pgSetup(level, gridPanel,headerTxt, multi, ctyFips,ctyName) {
		var idxval = gridPanel.charAt(gridPanel.length - 1);
		//Create objects
		//Page heading
		var pgHead = document.createElement("H3");
	    var pgText = document.createTextNode(headerTxt)
			pgHead.appendChild(pgText);
			
			//Regional dropdown
			var reglist = document.createElement('select');
			reglist.id = 'RegSelect'+ idxval;
			if(multi) {
			reglist.setAttribute('multiple',true);
			}
			reglist.setAttribute('fips','name');
			for(j = 0; j < ctyFips.length; j++){
				  var opt = document.createElement('option');
				  opt.innerHTML = ctyName[j];
				  opt.value = ctyFips[j];
				  reglist.appendChild(opt);
			} //i
		   // Regional Button
		   var regbtn = document.createElement('button');
			  regbtn.id = 'RegBtn' + idxval;
			  regbtn.className = 'databutton';
			  regbtn.innerHTML = 'Generate Plot';
			//Regional text
		   var regtxt = document.createElement('p');
		       regtxt.id = 'regtext' + idxval;
			   regtxt.className = 'entry_text';
			   if(multi){
				regtxt.innerHTML = '<b>Select One or More Geographies</b><br>';
			   } else {
			    regtxt.innerHTML = '<b>Select Geography</b><br>';
			   }



			// Download Button
			var dlbtn = document.createElement('button');
			 dlbtn.id = 'profiledl' + idxval;
			 dlbtn.className = 'dropbtn';
			 dlbtn.innerHTML = '<i class="fas fas fa-download fa-2x" style="color: black;">';

			 //Data Items
			 var data_li = document.createElement('li');
			 var data_link = document.createElement('a');
				 data_link.href = '#';
				 data_link.id = 'profileDat' + idxval;
				 var data_Text = document.createTextNode("Download Data (CSV)");
				 data_link.appendChild(data_Text);
			     data_li.appendChild(data_link);
			//Image Items
			 var img_li = document.createElement('li');
			 var img_link = document.createElement('a');
				 img_link.href = '#';
				 img_link.id = 'profileImg' + idxval;
			 var img_Text = document.createTextNode("Download Image (PNG)");
				 img_link.appendChild(img_Text);
			     img_li.appendChild(img_link);
			//Source Items
			 var src_li = document.createElement('li');
			 var src_link = document.createElement('a');
			     
				 if(level == "Region") {
					 if(headerTxt == "Regional Population Estimates"){
						var src_txt = document.createTextNode('Regional Total Population Estimates');
						src_link.href = 'https://coloradodemography.github.io/population/data/regional-data-lookup/';
					 }
					 if(headerTxt == "Regional Population Forecast"){
						var src_txt = document.createTextNode('Regional Total Population Forecasts');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
					 if(headerTxt == "Regional Components of Change"){
						var src_txt = document.createTextNode('Regional Components of Change');
						src_link.href = 'https://coloradodemography.github.io/births-deaths-migration/data/components-change-regions/';
                     }
					 if(headerTxt == "Regional Age Estimates and Forecasts"){
						var src_txt = document.createTextNode('Regional Age Estimates and Forecasts');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
				 } else {
					var src_txt = document.createTextNode('County Total Population Lookup');
				    src_link.href = 'https://coloradodemography.github.io/population/data/county-data-lookup/';
				 }
				 src_link.appendChild(src_txt);
				 src_link.id = 'profileSrc' + idxval;
			     src_li.appendChild(src_link);

			 //Download List
			 var dllist = document.createElement('ul');
			     dllist.className = 'dd-list';
				 
           dllist.appendChild(data_li);
		   dllist.appendChild(img_li)
		   dllist.appendChild(src_li);

		   var dlcontent = document.createElement('div');
		       dlcontent.className = 'dropdown-content';
			   dlcontent.appendChild(dllist);
   //dropdown list wrapper
       var dlwrap = document.createElement('div');
		   dlwrap.className = "dropdown AClass";
		   dlwrap.appendChild(dlbtn);
		   dlwrap.appendChild(dlcontent);
		   
   //Creating table wrapper  
		var tbl = document.createElement("table");
		    tbl.style.width = "40%";
			tbl.style.border = "0px solid black";
			
		var tblbody = document.createElement("tbody");
		var tblrow = document.createElement("tr");
			
		var tabcell1 = document.createElement("td");
			tabcell1.style.border = "0px solid black";
			tabcell1.style.verticalAlign = "top";
			tabcell1.style.align = 'left';
			tabcell1.appendChild(dlwrap);
			
		var tabcell2 = document.createElement("td");
			tabcell2.style.border = "0px solid black";
			tabcell2.style.verticalAlign = "top";
			tabcell2.style.align = 'left';
			tabcell2.appendChild(regtxt)
			tabcell2.appendChild(reglist);
			
		var tabcell3 = document.createElement("td");
			tabcell3.style.border = "0px solid black";
			tabcell3.style.verticalAlign = "top";
			tabcell3.style.align = 'left';
			tabcell3.appendChild(regbtn);
		
		tblrow.appendChild(tabcell1);
		if(level == "Region") {
			tblrow.appendChild(tabcell2);
			tblrow.appendChild(tabcell3);
		}
		
		tblbody.appendChild(tblrow);
		tbl.appendChild(tblbody);
		
		//Plotdiv   
			var plotdiv = document.createElement('div');
			    plotdiv.id = 'PlotDiv' + idxval
				
//writing to DOM
       var outDiv = document.getElementById(gridPanel);
	   outDiv.appendChild(pgHead);
	   outDiv.appendChild(tbl);
	   outDiv.appendChild(plotdiv);
} //pgSetup

//genRegEst Generates estimate plot for regions...
function genRegEst(inData,DDsel,estDiv) {
	   const fmt_date = d3.timeFormat("%B %d, %Y");
var config = {responsive: true,
              displayModeBar: false};
			  
//Generates the list of selected places
  var fipsList = [], opt;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }

var pltSort = inData.sort(function(a, b){ return d3.ascending(a['year'], b['year']); })
		.sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });
	

var pltData = pltSort.filter(item => fipsList.includes(item.fips));

	var est_data = [];
	var ctyNames;
	for(i = 0; i < fipsList.length; i++) {
		var filtPlot = pltData.filter(item => item.fips == fipsList[i]);
		var year_est_arr = filtPlot.map(item => item.year);
		var pop_est_arr = filtPlot.map(item => item.totalpopulation);
	 est_data.push({x : year_est_arr,
	                y : pop_est_arr,
					name : filtPlot[0].name,
	                mode : 'lines+markers'});
	 if(i == 0) {
			ctyNames = filtPlot[0].name;
		} else {
			if(i%4 == 0){
			ctyNames = ctyNames + ",<br>" + filtPlot[0].name;	
			} else {
			ctyNames = ctyNames + ", " + filtPlot[0].name;
			}
		}

	} //i

	var est_layout = {
		title: "Population Estimates " + year_est_arr[0] + " to " + year_est_arr[(year_est_arr.length - 1)] + ", " + ctyNames,
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Year',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  yaxis: {
			title : 'Total Population',
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		
Plotly.newPlot(estDiv, est_data, est_layout,config);
//Download Events

var profileDat2 = document.getElementById('profileDat2');
var profileImg2 = document.getElementById('profileImg2');
profileDat2.onclick = function() {exportToCsv(ctyNames[0], 'estimate', pltData,0)};
profileImg2.onclick = function() {exportToPng(ctyNames[0], 'estimate', estDiv,0)};
	
}; //genRegEst			

//gerRegEstSetup sets up the regional estimates plot
function genRegEstSetup(level, inData, est_div, fipsList, ctyNameList) {

  pgSetup(level, est_div,"Regional Population Estimates",true,fipsList, ctyNameList)

   //Initial Plot
    var dd = document.getElementById("RegSelect2");
   var btn = document.getElementById("RegBtn2");
   dd.selectedIndex = 0;
   var selvalue = [];
   selvalue.push(+dd.value);

   genRegEst(inData,dd, "PlotDiv2");

   btn.addEventListener('click', function() {
	   genRegEst(inData,dd, "PlotDiv2")
       });
	   
};  //genRegEstSetup


//genRegFore Generates forecast plot for regions...
function genRegFore(inData,DDsel,forecDiv) {
	   const fmt_date = d3.timeFormat("%B %d, %Y");
var config = {responsive: true,
              displayModeBar: false};
			  

//Generates the list of selected places
  var fipsList = [], opt;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }

var pltSort = inData.sort(function(a, b){ return d3.ascending(a['year'], b['year']); })
		.sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });
	

var pltData = pltSort.filter(item => fipsList.includes(item.fips));

	var forec_data = [];
	var ctyNames;
	for(i = 0; i < fipsList.length; i++) {
		var filtPlot = pltData.filter(item => item.fips == fipsList[i]);
		var year_forec_arr = filtPlot.map(item => item.year);
		var pop_forec_arr = filtPlot.map(item => item.totalpopulation);
	 forec_data.push({x : year_forec_arr,
	                y : pop_forec_arr,
					name : filtPlot[0].name,
	                mode : 'lines+markers'});
	 if(i == 0) {
			ctyNames = filtPlot[0].name;
		} else {
			if(i%4 == 0){
			ctyNames = ctyNames + ",<br>" + filtPlot[0].name;	
			} else {
			ctyNames = ctyNames + ", " + filtPlot[0].name;
			}
		}

	} //i

	var forec_layout = {
		title: "Population Forecast " + year_forec_arr[0] + " to " + year_forec_arr[(year_forec_arr.length - 1)] + ", " + ctyNames,
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Year',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  yaxis: {
			title : 'Total Population',
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		
Plotly.newPlot(forecDiv, forec_data, forec_layout,config);
//Download Events

var profileDat3 = document.getElementById('profileDat3');
var profileImg3 = document.getElementById('profileImg3');
profileDat3.onclick = function() {exportToCsv(ctyNames[0], 'forecast', pltData,0)};
profileImg3.onclick = function() {exportToPng(ctyNames[0], 'forecast', forecDiv,0)};
 	
}; //genRegFore			

//genRegForeSetup sets up the regional forecast plot
function genRegForeSetup(level, inData, fore_div, fipsList, ctyNameList) {

  pgSetup(level, fore_div,"Regional Population Forecasts",true,fipsList, ctyNameList)

   //Initial Plot
    var dd = document.getElementById("RegSelect3");
   var btn = document.getElementById("RegBtn3");
   dd.selectedIndex = 0;
   var selvalue = [];
   selvalue.push(+dd.value);

   genRegFore(inData,dd, "PlotDiv3");

   btn.addEventListener('click', function() {
	   genRegFore(inData,dd, "PlotDiv3")
       });
	   
};  //genRegForeSetup

//genRegcoc Generates coccast plot for regions...
function genRegcoc(inData,DDsel,cocDiv) {
	   const fmt_date = d3.timeFormat("%B %d, %Y");
var config = {responsive: true,
              displayModeBar: false};
			  

//Generates the list of selected places
  var fipsList = [], opt;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }

var pltSort = inData.sort(function(a, b){ return d3.ascending(a['year'], b['year']); })
		.sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });
	

var pltData = pltSort.filter(item => fipsList.includes(item.fips));

	var coc_trace = [];
	var birth_trace = [];
	var death_trace = [];
	var netmig_trace = [];
	var ctyNames;
	

	for(i = 0; i < fipsList.length; i++) {
		var filtPlot = pltData.filter(item => item.fips == fipsList[i]);
		var year_coc_arr = filtPlot.map(item => item.year);
		var birth_coc_arr = filtPlot.map(item => item.births);
		var death_coc_arr = filtPlot.map(item => item.deaths);
		var netmig_coc_arr = filtPlot.map(item => item.netmigration);

	 birth_trace.push({x : year_coc_arr,
	                y : birth_coc_arr,
					name : "Births",
	                mode : 'lines+markers',
					marker: {
						symbol: 'circle',
						size: 8
                }});
	 death_trace.push({x : year_coc_arr,
	                y : death_coc_arr,
					name : "Deaths",
	                mode : 'lines+markers',
					marker: {
						symbol: 'square',
						size: 8
                }});
	 netmig_trace.push({x : year_coc_arr,
	                y : netmig_coc_arr,
					name : "Net Migration",
	                mode : 'lines+markers',
					marker: {
						symbol: 'diamond',
						size: 8
                }});
	coc_trace = coc_trace.concat(birth_trace);
	coc_trace = coc_trace.concat(death_trace);
	coc_trace = coc_trace.concat(netmig_trace);
	
	ctyNames = filtPlot[0].name;
	
	} //i


	var coc_layout = {
		title: "Births, Deaths and Net Migration " + year_coc_arr[0] + " to " + year_coc_arr[(year_coc_arr.length - 1)] + ", " + ctyNames,
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Year',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  yaxis: {
			title : 'Population',
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		
Plotly.newPlot(cocDiv, coc_trace, coc_layout,config);
//Download Events

var profileDat4 = document.getElementById('profileDat4');
var profileImg4 = document.getElementById('profileImg4');
profileDat4.onclick = function() {exportToCsv(ctyNames, 'coc', pltData,0)};
profileImg4.onclick = function() {exportToPng(ctyNames, 'coc', cocDiv,0)};
 	
}; //genRegcoc			

//genRegcocSetup sets up the regional components of Change plot
function genRegcocSetup(level, inData, coc_div, fipsList, ctyNameList) {

  pgSetup(level, coc_div,"Regional Components of Change",false,fipsList, ctyNameList)

   //Initial Plot
    var dd = document.getElementById("RegSelect4");
   var btn = document.getElementById("RegBtn4");
   dd.selectedIndex = 0;
   var selvalue = [];
   selvalue.push(+dd.value);

   genRegcoc(inData,dd, "PlotDiv4");

   btn.addEventListener('click', function() {
	   genRegcoc(inData,dd, "PlotDiv4")
       });
	   
};  //genRegcocSetup


//genAgeEst Generates Age plot for regions...
function genAgeEst(inData,DDsel,ageDiv) {
	   const fmt_date = d3.timeFormat("%B %d, %Y");
var config = {responsive: true,
              displayModeBar: false};
			  
//Generates the list of selected places
  var fipsList = [], opt;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }

var pltSort = inData.sort(function(a, b){ return d3.ascending(a['age'], b['age']); })
        .sort(function(a, b){ return d3.ascending(a['year'], b['year']); })
		.sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });
	

var pltData = pltSort.filter(item => fipsList.includes(item.fips));
    var year_data = [...new Set(pltData.map(d => d.year))];
	var age_data = [];
	var ctyNames;
	for(i = 0; i < year_data.length; i++) {
		var filtPlot = pltData.filter(item => item.year == year_data[i]);
		var age_est_arr = filtPlot.map(item => item.age);
		var pop_est_arr = filtPlot.map(item => item.totalpopulation);
	 if(i == 0){
		age_data.push({x : age_est_arr,
	                y : pop_est_arr,
					name : year_data[i],
	                type : 'bar'
				})
	 } else {
	 age_data.push({x : age_est_arr,
	                y : pop_est_arr,
					name : year_data[i],
	                type : 'bar',
					xaxis : "x" + (i + 1),
					yaxis : "y" + (i + 1)
					});
	}
	} //i
	 ctyNames = filtPlot[0].name;
	
	 
	var age_layout = {
		title: "Age Estimates and Forecasts: " + ctyNames,
		  autosize: false,
		  width: 1000,
		  height: 1200, 
		  xaxis: {
			title : 'Age',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  yaxis: {
			title : 'Total Population',
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
		  xaxis2: {
			title : 'Age',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  yaxis2: {
			title : 'Total Population',
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
		  xaxis3: {
			title : 'Age',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  yaxis3: {
			title : 'Total Population',
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
		  xaxis4: {
			title : 'Age',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  yaxis4: {
			title : 'Total Population',
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
		  grid: {
				rows: 4,
				columns: 1,
				pattern: 'independent',
				roworder: 'top to bottom'},
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
	Plotly.newPlot(ageDiv, age_data, age_layout,config);

//Download Events

var profileDat2 = document.getElementById('profileDat2');
var profileImg2 = document.getElementById('profileImg2');
profileDat2.onclick = function() {exportToCsv(ctyNames, 'age', pltData,0)};
profileImg2.onclick = function() {exportToPng(ctyNames, 'age', ageDiv,0)};
	
}; //genAgeEst			

//gerAgeSetup sets up the regional estimates plot
function genAgeSetup(level, inData, age_div, fipsList, ctyNameList) {
  pgSetup(level, age_div,"Regional Age Estimates and Forecasts",false,fipsList, ctyNameList)

   //Initial Plot
    var dd = document.getElementById("RegSelect2");
   var btn = document.getElementById("RegBtn2");
   dd.selectedIndex = 0;
   var selvalue = [];
   selvalue.push(+dd.value);

   genAgeEst(inData,dd, "PlotDiv2");

   btn.addEventListener('click', function() {
	   genAgeEst(inData,dd, "PlotDiv2")
       });
	   
};  //genAgeSetup

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
	var numdiff = est2 - est1;
	var pctdiff = numdiff/est1;
    output.push({'fips' : id[0].fips, 'name' : id[0].name, 'yr1' : est1, 'yr2' : est2, 'popch' : numdiff, 'growth' : pctdiff});
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
		var tmp_list = fipslist[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
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
		var tmp_list = fipslist[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
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


    var preHtml = "<html xmlns:office='urn:schemas-microsoft-com:office:office,  xmlns:word='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
                  "<head><style> " +       
                  "@page Section1 {size:841.7pt 595.45pt;mso-page-orientation:landscape;margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;} " +
                  "div.Section1 {page:Section1;} " +
                  "</style> </head> <body><div class=Section1>";

    var postHtml = "</div></body></html>";
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
	const fmt_date = d3.timeFormat("%B %d, %Y");
    const fmt_yr = d3.format("00");


//Header
var table = "<table border= '1' width= 100%><thead><tr align='center'>";
for(i = 1; i < header[0].length; i++){
	table = table + '<th>' + header[0][i] + '</th>';
}
table = table + "</tr></thead>";

//body

table = table + "<tbody><tr>";
for(i = 0; i < body.length; i++){
	for(j = 1; j < body[i].length;j++){
		if(j == 1){
		  table = table + "<td>" + body[i][j] + "</td>"; //This is the place name,...
		} else {
		  var fmt_val = ""
		  if(tabTitle.includes("Basic Statistics")) {
			 if(body[i].length == 10){
			  if(j == 2) {fmt_val = fixNEG(body[i][j],'num')};
			  if(j == 3) {fmt_val = fixNEG(body[i][j],'num')};
			  if(j == 4) {fmt_val = fixNEG(body[i][j],'pct')};
              if(j == 5) {fmt_val = fixNEG(body[i][j],'num')};
			  if(j == 6) {fmt_val = fixNEG(body[i][j],'cur')};
			  if(j == 7) {fmt_val = fixNEG(body[i][j],'cur')};
			  if(j == 8) {fmt_val = fixNEG(body[i][j],'pct')};
			  if(j == 9) {fmt_val = fixNEG(body[i][j],'pct')};
			  } else {
			  if(j == 2) {fmt_val = fixNEG(body[i][j],'num')};
			  if(j == 3) {fmt_val = fixNEG(body[i][j],'num')};
			  if(j == 4) {fmt_val = fixNEG(body[i][j],'pct')};
			  if(j == 5) {fmt_val = fixNEG(body[i][j],'cur')};
			  if(j == 6) {fmt_val = fixNEG(body[i][j],'cur')};
			  if(j == 7) {fmt_val = fixNEG(body[i][j],'pct')};
			  if(j == 8) {fmt_val = fixNEG(body[i][j],'pct')};
			 } 
		  } //Basc Stats
		if(tabTitle.includes("Population Growth")) {
			if(body[i][2] === '-') {  //This is the pct growth table
				 if(j > 2) {
					   fmt_val = fixNEG(body[i][j],'pct')
				     } else {
				        fmt_val = body[i][j];
				    }
     	    } else {
				fmt_val = fixNEG(body[i][j],'num')
			};
		};  //Pop Growth
		  table = table + "<td align='right'>" + fmt_val + "</td>";
		 };
		} // j loop
	table = table + '</tr>';
	} //i loop
table = table + '</tbody>';

table = table.replaceAll("NaN%","-");
table = table.replaceAll("NaN","-");
//footer

table = table + "<tfoot>";
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

//Defining the output p[anels
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
    var curyear = d3.max(yrsList);

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
}

//Age Panel button
if(firstbtn == 'sel3') { 
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel3display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
}
//Setting Event Listeners  For a click on a section button...
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

document.getElementById("sel3btn").addEventListener("click", function() {
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel3display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
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
	const fmt_yr = d3.format("00");

	var curACS = "acs1519";  //UPDATE THIS 
	var prevACS = "acs0610";
    const yrlist = "2010,"+curYr;
	const yrlistARR = yrlist.split(",");
	
	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];

if(regList.includes(level)) {

		for(i = 0; i < fipsArr.length; i++) {
		  var regNum = parseInt(fipsArr[i]);
		  var tmplist = regionCOL(regNum);
		  var fips_list =  tmplist[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
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
	  jobs_list.push(fips_list[i]);
	  fipsACS.push("08" + tmplist[0].fips[i]);
    };

	 fipsACS.unshift('08');
   	 var popREG = 'https://gis.dola.colorado.gov/lookups/components?county=' + jobs_list + '&year=' + yrlist;
	 var jobsREG = 'https://gis.dola.colorado.gov/lookups/jobs?county='+jobs_list+'&year='+ curYr +'&sector=0';
	 

	 //median Income ACS  b19013001
	 var incREG = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalREG = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povREG = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natREG = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;

	 var prom = [d3.json(popREG), d3.json(jobsREG), d3.json(incREG),
	             d3.json(hvalREG), d3.json(povREG), d3.json(natREG)];
  };

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
			 cty_jobs = tmp_jobs;
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
		       {'title' : 'Index'},
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
	   {'title' : 'Index'},
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
	for(k = 0; k < tabgr.length; k++){ 
	   outtab.push([ k,
	                 tabgr[k].name,
					 tabgr[k].yr2,
					 tabgr[k].popch,
					 tabgr[k].growth *100,
					 median_income[k].value,
					 median_home[k].value,
					 poverty[k].pct *100,
					 coNative[k].pct * 100
	   ]);
	};
} else { 

	for(var k = 0; k < tabgr.length; k++){ 
	
        outtab.push([ k,
		         tabgr[k].name,
                 tabgr[k].yr2,
                 tabgr[k].popch ,
				 tabgr[k].growth * 100,
                 cty_jobs[k].total_jobs,
                 median_income[k].value,
                 median_home[k].value,
                 poverty[k].pct * 100,
                 coNative[k].pct * 100
		]);

	};
}; 


//Processing Table Rows for regions

if(regList.includes(level)) {
	outtab[0][1] = "<b>"+outtab[0][1]+"</b>";
	 };

//Creating Footer

var acsyr1 = parseInt(curACS.substr(3,2)) + 2000;
var acsyr2 = parseInt(curACS.substr(5,2)) + 2000;
var tblfoot = [
               ["Sources: * Colorado State Demography Office"],
               ['^U.S. Census Bureau, '+fmt_yr(acsyr1) + '-' + fmt_yr(acsyr2) +" American Community Survey"],
               ['Print Date : ' + fmt_date(new Date)]
			   ];

var ftrString = "<tfoot><tr>";
for(i = 0; i < tblfoot.length; i++){
	if(muniList.includes(level)){
	    ftrString = ftrString + "<tr><td colspan='9'>" + tblfoot[i] + "</td></tr>";
	} else {
	    ftrString = ftrString + "<tr><td colspan='10'>" + tblfoot[i] + "</td></tr>";
	}
	};	
ftrString = ftrString + "</tr></tfoot>";

var ftrMsg = "Sources: * Colorado State Demography Office " + "^U.S. Census Bureau, "+fmt_yr(acsyr1) + "-" + fmt_yr(acsyr2) +" American Community Survey" +
   "Print Date : " + fmt_date(new Date);

$(outputPro).append("<table id='summtab' class='DTTable' width='100%'></table>");



if(muniList.includes(level) || placeList.includes(level)){
	$('#summtab').append(ftrString);
	$('#summtab').DataTable( {
		"columnDefs" : [
		{'targets' : [2, 3], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0, '' )},
		{'targets' : [5,6], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0,  '$' )},
		{'targets' : [4,7,8], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 1, '','%' )},
		{   
			'targets': [0,1], 'className': 'dt-body-left',
			'targets' : [2,3,4,5,6,7,8], 'className': 'dt-body-right'
		},
		{ 'targets': 1, 'width': '20%' ,
		  'targets' : [2, 3,4,5,6,7,8], 'width' :'10%'
		}  
		],
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
				footer : false,
				messageBottom : ftrMsg,
				customize : function (xlsx) {
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var col = $('col', sheet);
					col.each(function () { $(this).attr('width', 20); })
				}
        },
		{
                extend: 'csvHtml5',
                title: fileName
        },
        {
                extend: 'pdfHtml5',
                title: fileName,
				orientation : 'landscape',
				footer : true,
				messageBottom : ftrMsg,
				exportOptions: { columns: ':visible'},
				customize: function (doc) {
					var rowCount = doc.content[1].table.body.length;
					var colCount = doc.content[1].table.body[1].length;
                      for (i = 1; i < rowCount; i++) {
						for(j = 0; j < colCount; j++){
                          if(j < 2) {
						      doc.content[1].table.body[i][j].alignment = 'left';
						  } else {
                              doc.content[1].table.body[i][j].alignment = 'right';
						  }
						}
						}
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
			}
		}
     ],  //buttons
		"order": [],
		data: outtab,
		columns : labels
	} );
} else {
	$('#summtab').append(ftrString);
	$('#summtab').DataTable( {
		"columnDefs" : [
		{'targets' : [2, 3,5], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0, '' )},
		{'targets' : [6,7], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0,  '$' )},
		{'targets' : [4,8,9], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 1, '','%' )},
		{   
			'targets': [0,1], 'className': 'dt-body-left',
			'targets' : [2,3,4,5,6,7,8,9], 'className': 'dt-body-right'
		},
		{ 'targets': 1, 'width': '20%' ,
		  'targets' : [2, 3,4,5,6,7,8,9], 'width' :'10%'
		}  
		],
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
				footer : false,
				messageBottom : ftrMsg,
				customize : function (xlsx) {
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var col = $('col', sheet);
					col.each(function () { $(this).attr('width', 20); })
				}
        },
		{
                extend: 'csvHtml5',
                title: fileName
        },
        {
                extend: 'pdfHtml5',
                title: fileName,
				orientation : 'landscape',
				footer : true,
				messageBottom : ftrMsg,
				exportOptions: { columns: ':visible'},
				customize: function (doc) {
					var rowCount = doc.content[1].table.body.length;
					var colCount = doc.content[1].table.body[1].length;
                      for (i = 1; i < rowCount; i++) {
						for(j = 0; j < colCount; j++){
                          if(j < 2) {
						      doc.content[1].table.body[i][j].alignment = 'left';
						  } else {
                              doc.content[1].table.body[i][j].alignment = 'right';
						  }
						}
						}
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
			}
		}
     ],  //buttons
		"order": [],
		data: outtab,
		columns : labels
	} );
};

  }); //End of Promise
};  //End of genSel1Tab

//genSel2display  Outputs objects for the Population Trends panel of the profile... 
// STILL NEED TO WWIRE UP COUNTIES
function genSel2display(geotype, fipsArr, names, curyear, PRO_1, PRO_2, PRO_3, PRO_4) {
 	const fmt_date = d3.timeFormat("%B %d, %Y");
	const fmt_dec = d3.format(".3");
	const fmt_pct = d3.format(".1%");
	const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");

	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];

//Charts are not avaialble for Municiplities...
if(regList.includes(geotype)){
	
		var fips_tmp = regionCOL(parseInt(fipsArr));
	    var fips_list =  fips_tmp[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
	} else {
	if(fipsArr == "000") {
      fips_list = [1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125];
    } else {
		fips_list = [parseInt(fipsArr)];
	};		
	};

//Estimates and components of change chart

const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
	var yr_list = range(1985,curyear);	
	var esturl = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + yr_list + "&vars=totalpopulation,births,deaths,netmigration";
	
//forecasts and age projections
   var forc_yrs = range(2010,2050);	

    if(fipsArr == "000") {
		var forcurl = "https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=0&year=" + forc_yrs + "&choice=single"
	} else {
		var forcurl = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + forc_yrs + "&choice=single&group=3"
	}; 

var prom = [d3.json(esturl),d3.json(forcurl)];


Promise.all(prom).then(function(data){
//Growth Table
// Generate data set for output Table
var sel_yr = range(1990,curyear);
var sel_yr5 = [];
for(i = 0; i < sel_yr.length;i++){
	if(sel_yr[i] % 5 == 0) {
		sel_yr5.push(sel_yr[i]);
	}
};
if(sel_yr5[sel_yr5.length] != curyear) {
	sel_yr5.push(curyear);
};

var tab_data = data[0].filter(function(d) {return sel_yr5.includes(d.year)});

if(regList.includes(geotype)) {
var fileName = "Population Growth Table " + regionName(fipsArr);
var regionNum = -100 - parseInt(fipsArr);
var tab_cty_data = []
for(i = 0; i< tab_data.length; i++){
	 tab_cty_data.push({ 'fips' : tab_data[i].countyfips, 'name' : countyName(tab_data[i].countyfips), 'year' : tab_data[i].year, 'totalpopulation' : +tab_data[i].totalpopulation})
}

//Rolling up data for table
var tab_reg_sum = d3.rollup(tab_cty_data, v => d3.sum(v, d => d.totalpopulation), d => d.year);

//Flatten Arrays for output
var tab_reg_data = [];
for (let [key, value] of tab_reg_sum) {
  tab_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key, 'totalpopulation' : value});
    };

var tab_gr = tab_reg_data.concat(tab_cty_data) //This is 5 year data

//Estimates data
//Creating Single year data for the places and counties
var est_cty_data = []
for(i = 0; i< data[0].length; i++){
	 est_cty_data.push({ 'fips' : data[0][i].countyfips, 'name' : countyName(data[0][i].countyfips), 'year' : data[0][i].year, 'totalpopulation' : +data[0][i].totalpopulation})
}

//Rolling up data for table
var est_reg_sum = d3.rollup(est_cty_data, v => d3.sum(v, d => d.totalpopulation), d => d.year);

//Flatten Arrays for output
var est_reg_data = [];
for (let [key, value] of est_reg_sum) {
  est_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key, 'totalpopulation' : value});
    };

var est_data = est_reg_data.concat(est_cty_data) //This is single year data
var fipsList = [...new Set(est_data.map(d => d.fips))];
var ctyNameList = [...new Set(est_data.map(d => d.name))];

//Generating Forecast data   
//This is Forecast by SYA
var forec_data = [];
for(i = 0; i< data[1].length; i++){
	 forec_data.push({ 'fips' : data[1][i].countyfips, 'name' : countyName(data[1][i].countyfips), 'year' : data[1][i].year, 'age' : +data[1][i].age, 'totalpopulation' : +data[1][i].totalpopulation})
}

//rolling up for counties and region
var forec_reg_sum = d3.rollup(forec_data, v => d3.sum(v, d => d.totalpopulation), d => d.year);
var forec_cty_sum = d3.rollup(forec_data, v => d3.sum(v, d => d.totalpopulation), d => d.year, d => d.fips);
//Flatten Arrays for output
var forec_reg_data = [];
for (let [key, value] of forec_reg_sum) {
  forec_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key, 'totalpopulation' : value});
    };
	

var forec_cty_data = [];
for (let [key1, value] of forec_cty_sum) {
for (let[key2, value2] of value) {
   forec_cty_data.push({'fips' : key2, 'name' : countyName(key2), 'year' : key1, 'totalpopulation' : value2});
}
};

var forec_data = forec_reg_data.concat(forec_cty_data);

//Components of Change
var columnsToSum = ['births', 'deaths', 'netmigration'];
var coc_cty_data = []
for(i = 0; i< data[0].length; i++){
	 coc_cty_data.push({ 'fips' : data[0][i].countyfips, 'name' : countyName(data[0][i].countyfips), 'year' : data[0][i].year, 
	 'births' : +data[0][i].births, 'deaths' : +data[0][i].deaths, 'netmigration' : +data[0][i].netmigration})
}

//Rolling up data for table
var coc_reg_sum =  d3.rollup(data[0], v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year)

//Flatten Arrays for output
var coc_reg_data = [];
for (let [key, value] of coc_reg_sum) {
  coc_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key, 'births' : value.births, 'deaths' : value.deaths, 'netmigration' : value.netmigration});
    };

var coc_data = coc_reg_data.concat(coc_cty_data) //This is single year data

//Output

growth_tab(geotype, tab_gr,fileName, PRO_1);  
//Plots
genRegEstSetup(geotype,est_data,PRO_2.id, fipsList, ctyNameList);
genRegForeSetup(geotype,forec_data,PRO_3.id, fipsList, ctyNameList);
genRegcocSetup(geotype,coc_data,PRO_4.id, fipsList, ctyNameList);
}; //regList

/*
COUNTY Charts...To BE Completed
 	estPlot(est_data, geotype, PRO_2.id, curyear, fipsList, ctyNameList);
	var	fore_Data = forecastPlot(data[1], "profile", PRO_3, yrvalue, fips, ctyName);
	cocPlot(data[0],"profile",PRO_4, curyear, fips, ctyName);
*/

}); //End of Promise

}; //end genSel2display

//genSel3 Display  Produces age panel charts
//Age estimates and forecasts facet chart
//Age Pyramid

function genSel3display(geotype, fipsArr, names, curyear, PRO_1, PRO_2, PRO_3, PRO_4) {
 	const fmt_date = d3.timeFormat("%B %d, %Y");
	const fmt_dec = d3.format(".3");
	const fmt_pct = d3.format(".1%");
	const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");

	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];

//Charts are not avaialble for Municiplities...
if(regList.includes(geotype)){
	
		var fips_tmp = regionCOL(parseInt(fipsArr));
	    var fips_list =  fips_tmp[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
	} else {
	if(fipsArr == "000") {
      fips_list = [1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125];
    } else {
		fips_list = [parseInt(fipsArr)];
	};		
	};

const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
	
//forecasts and age projections
   var forc_yrs = range(2010,2050);	
	var forcurlCO = "https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=0&year=" + forc_yrs + "&choice=single"
	var forcurlCty = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + forc_yrs + "&choice=single&group=3"


var prom = [d3.json(forcurlCO), d3.json(forcurlCty)];

Promise.all(prom).then(function(data){
//Selecting year range
//State data
	var COagecuryr = data[0].filter(item => item.year == curyear);
	var COage10 = data[0].filter(item => item.year%10 == 0).filter(item => item.year > curyear);
	var COage = COagecuryr.concat(COage10);
	var CO_age_data = [];
	for(i = 0; i < COage.length; i++){
	   CO_age_data.push({ fips : COage[i].reg_num,
							geo_name : COage[i].region,
							year : COage[i].year,
							age : COage[i].age,
							malepopulation : +COage[i].malepopulation,
							femalepopulation : +COage[i].femalepopulation, 
							totalpopulation : +COage[i].totalpopulation });
	};
	
//County data
	var Ctyagecuryr = data[1].filter(item => item.year == curyear);
	var Ctyage10 = data[1].filter(item => item.year%10 == 0).filter(item => item.year > curyear);
	var Ctyage = Ctyagecuryr.concat(Ctyage10);
	var cty_age_data = [];
	for(i = 0; i < Ctyage.length; i++){
	   cty_age_data.push({ fips : Ctyage[i].countyfips,
							name : Ctyage[i].county,
							year : Ctyage[i].year,
							age : Ctyage[i].age,
							malepopulation : +Ctyage[i].malepopulation,
							femalepopulation : +Ctyage[i].femalepopulation, 
							totalpopulation : +Ctyage[i].totalpopulation });
	};

//Generating regional total
if(regList.includes(geotype)) {
var columnsToSum = ['malepopulation', 'femalepopulation', 'totalpopulation'];
//Rolling up data for table
var age_reg_sum =  d3.rollup(cty_age_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year, d => d.age)

//Flatten Arrays for output
var age_reg_data = [];
var regionNum = -101;

for (let [key1, value] of age_reg_sum) {
for (let[key2, value2] of value) {
   age_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key1, 'age' : key2,
     'malepopulation' : value2.malepopulation, 'femalepopulation' : value2.femalepopulation, 'totalpopulation' : value2.totalpopulation});
}
};
	
var reg_age_data = age_reg_data.concat(cty_age_data) //This is single year data


var fipsList = [...new Set(reg_age_data.map(d => d.fips))];
var ctyNameList = [...new Set(reg_age_data.map(d => d.name))];
//Sample SYA chart...

genAgeSetup(geotype,reg_age_data,PRO_2.id, fipsList, ctyNameList);
};
	
}); //End of Promise
} // End of selGen3display