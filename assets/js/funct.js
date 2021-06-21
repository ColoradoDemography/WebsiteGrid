//Website functions fror State Demography Office
//A. Bickford 5/2021

//list of lookup statements  https://github.com/ColoradoDemography/MS_Demog_Lookups/tree/master/doc
//Utility Function

//hideButtons  selects and hides all "dropbtn" class buttons
function hideButtons() {
	btn = document.getElementsByClassName("dropbtn"); 
	for(i = 0; i < btn.length; i++){
		btn[i].style.display = "none";
	};
}; //end of hideButtons

//showButtons  selects and shows all "dropbtn" class buttons
function showButtons() {
	btn = document.getElementsByClassName("dropbtn"); 
	for(i = 0; i < btn.length; i++){
		if(btn[i].style.display = "none") {
		btn[i].style.display = "block";
		}
	};
}; //end of showButtons

function restructure(inData) {
    var output = [];
   var WH, HP, BL, AS, AM
   var ages = [... new Set(inData.map(tag => tag.age))];

    for(i = 0; i < ages.length; i++) {
		var tmp = inData.filter(function(d) {return d.age == ages[i];});
		for(j = 0; j < tmp.length; j++) {
				  if( tmp[j].race_eth == "White NH") { WH = tmp[j].population};
				  if( tmp[j].race_eth == "Hispanic") { HP = tmp[j].population};
				  if( tmp[j].race_eth == "Black NH") { BL = tmp[j].population};
				  if( tmp[j].race_eth == "Asian/Pacific Islander NH") {AS = tmp[j].population};
				  if( tmp[j].race_eth == "American Indian NH") {AM = tmp[j].population};
				}
		output.push({ 'age' : tmp[0].age, "Hisapnic" : HP, "White NH" : WH, "Black NH" : BL, "Asian/Pacific Islander NH" : AS, "American Indian" : AM});
		};
    return output;
};


//popDropdown populaates drop down boxes
function popDropdown(level,ddid) {
   var dropdown = document.getElementById(ddid);
   
   //Counties
var county = [{'location': 'Colorado', 'fips': '000'},{'location':'Adams County', 'fips': '001'},
                {'location':'Alamosa County', 'fips': '003'},{'location':'Arapahoe County', 'fips': '005'},
				{'location':'Archuleta County', 'fips': '007'},{'location':'Baca County', 'fips': '009'},
				{'location':'Bent County', 'fips': '011'},{'location':'Boulder County', 'fips': '013'},
				{'location':'Broomfield County', 'fips': '014'},{'location':'Chaffee County', 'fips': '015'},
				{'location':'Cheyenne County', 'fips': '017'},{'location':'Clear Creek County', 'fips': '019'},
				{'location':'Conejos County', 'fips': '021'},{'location':'Costilla County', 'fips': '023'},
				{'location':'Crowley County', 'fips': '025'},{'location':'Custer County', 'fips': '027'},
				{'location':'Delta County', 'fips': '029'},{'location':'Denver County', 'fips': '031'},
				{'location':'Dolores County', 'fips': '033'},{'location':'Douglas County', 'fips': '035'},
				{'location':'Eagle County', 'fips': '037'},{'location':'Elbert County', 'fips': '039'},
				{'location':'El Paso County', 'fips': '041'},{'location':'Fremont County', 'fips': '043'},
				{'location':'Garfield County', 'fips': '045'},{'location':'Gilpin County', 'fips': '047'},
				{'location':'Grand County', 'fips': '049'},{'location':'Gunnison County', 'fips': '051'},
				{'location':'Hinsdale County', 'fips': '053'},{'location':'Huerfano County', 'fips': '055'},
				{'location':'Jackson County', 'fips': '057'},{'location':'Jefferson County', 'fips': '059'},
				{'location':'Kiowa County', 'fips': '061'},{'location':'Kit Carson County', 'fips': '063'},
				{'location':'Lake County', 'fips': '065'},{'location':'La Plata County', 'fips': '067'},
				{'location':'Larimer County', 'fips': '069'},{'location':'Las Animas County', 'fips': '071'},
				{'location':'Lincoln County', 'fips': '073'},{'location':'Logan County', 'fips': '075'},
				{'location':'Mesa County', 'fips': '077'},{'location':'Mineral County', 'fips': '079'},
				{'location':'Moffat County', 'fips': '081'},{'location':'Montezuma County', 'fips': '083'},
				{'location':'Montrose County', 'fips': '085'},{'location':'Morgan County', 'fips': '087'},
				{'location':'Otero County', 'fips': '089'},{'location':'Ouray County', 'fips': '091'},
				{'location':'Park County', 'fips': '093'},{'location':'Phillips County', 'fips': '095'},
				{'location':'Pitkin County', 'fips': '097'},{'location':'Prowers County', 'fips': '099'},
				{'location':'Pueblo County', 'fips': '101'},{'location':'Rio Blanco County', 'fips': '103'},
				{'location':'Rio Grande County', 'fips': '105'},{'location':'Routt County', 'fips': '107'},
				{'location':'Saguache County', 'fips': '109'},{'location':'San Juan County', 'fips': '111'},
				{'location':'San Miguel County', 'fips': '113'},{'location':'Sedgwick County', 'fips': '115'},
				{'location':'Summit County', 'fips': '117'},{'location':'Teller County', 'fips': '119'},
				{'location':'Washington County', 'fips': '121'},{'location':'Weld County', 'fips': '123'},
				{'location':'Yuma County', 'fips': '125'}];

//regions
var region =  [{'location' : 'Denver PMSA', 'fips' : ['001', '005', '014', '031', '035', '059']},
				  {'location' : 'Denver-Boulder Metro Area', 'fips' : ['001', '005', '013', '014', '031', '035', '059']},
				  {'location' : 'Denver-Boulder-Greely CMSA', 'fips' : ['001', '005', '013', '014', '031', '035', '059', '123']},
				  {'location' : '10 County Denver Metro Area', 'fips' : ['001', '005', '014', '019', '031', '035', '041', '047', '059', '093']},
				  {'location' : 'Central Mountains', 'fips' : ['015', '019', '027', '043', '047', '055', '065', '071', '093']},	
				  {'location' : 'Eastern Plains', 'fips' : ['009', '011', '017', '025', '039', '061', '063', '073', '075', '087', '089', '095', '099', '115', '121', '125']},
				  {'location' : 'Front Range', 'fips' : ['001', '005', '013', '014', '031', '035', '041', '059', '069', '101','119','123']},
				  {'location' : 'San Luis Valley', 'fips' : ['003', '021', '023', '079', '105', '109']},
				  {'location' : 'Western Slope', 'fips' : ['007', '029', '033', '037', '045', '049', '051', '053', '057', '067', '077', '081', '083', '085', '091', '097', '103', '107', '111', '113', '117']},
				  {'location' : 'Region  1: Northern Eastern Plains', 'fips' : ['075','087','095','115','121','125']},
				  {'location' : 'Region  2: Northern Front Range', 'fips' : ['069','123']},
				  {'location' : 'Region  3: Denver Metropolitan Area', 'fips' : ['001','005','013','014','019','031','035','047','059']},
				  {'location' : 'Region  4: Southern Front Range', 'fips' : ['041','093','119']},
				  {'location' : 'Region  5: Central Eastern Plains', 'fips' : ['017','039','063','073']},
				  {'location' : 'Region  6: Southern Eastern Plains', 'fips' : ['009','011','025','061','089','099']},
				  {'location' : 'Region  7: Pueblo County', 'fips' : ['101']},
				  {'location' : 'Region  8: San Juan Valley', 'fips' : ['003','021','023','079','105','109']},
				  {'location' : 'Region  9: Southern Western Slope', 'fips' : ['007','033','067','083','111']},
				  {'location' : 'Region 10: Central Western Slope', 'fips' : ['029','051','053','085','091','113']},
				  {'location' : 'Region 11: Northern Western Slope', 'fips' : ['045','077','081','103','107']},
				  {'location' : 'Region 12: Northern Mountains', 'fips' : ['037','049','057','097','117']},
				  {'location' : 'Region 13: Central Mountains', 'fips' : ['015','027','043','065']},
				  {'location' : 'Region 14: Southern Mountains', 'fips' : ['055','071']}];
//Municipalities and places

var municipality = [{'location' :  'Aguilar' , 'fips' : '00760'}, {'location' :  'Akron' , 'fips' : '00925'},
		{'location' :  'Alamosa' , 'fips' : '01090'}, {'location' :  'Alma' , 'fips' : '01530'},
		{'location' :  'Antonito' , 'fips' : '02355'}, {'location' :  'Arriba' , 'fips' : '03235'},
		{'location' :  'Arvada' , 'fips' : '03455'}, {'location' :  'Aspen' , 'fips' : '03620'},
		{'location' :  'Ault' , 'fips' : '03950'}, {'location' :  'Aurora' , 'fips' : '04000'},
		{'location' :  'Avon' , 'fips' : '04110'}, {'location' :  'Basalt' , 'fips' : '04935'},
		{'location' :  'Bayfield' , 'fips' : '05265'}, {'location' :  'Bennett' , 'fips' : '06090'},
		{'location' :  'Berthoud' , 'fips' : '06255'}, {'location' :  'Bethune' , 'fips' : '06530'},
		{'location' :  'Black Hawk' , 'fips' : '07025'}, {'location' :  'Blanca' , 'fips' : '07190'},
		{'location' :  'Blue River' , 'fips' : '07410'}, {'location' :  'Bonanza' , 'fips' : '07571'},
		{'location' :  'Boone' , 'fips' : '07795'}, {'location' :  'Boulder' , 'fips' : '07850'},
		{'location' :  'Bow Mar' , 'fips' : '08070'}, {'location' :  'Branson' , 'fips' : '08345'},
		{'location' :  'Breckenridge' , 'fips' : '08400'}, {'location' :  'Brighton' , 'fips' : '08675'},
		{'location' :  'Brookside' , 'fips' : '09115'}, {'location' :  'Broomfield' , 'fips' : '09280'},
		{'location' :  'Brush' , 'fips' : '09555'}, {'location' :  'Buena Vista' , 'fips' : '10105'},
		{'location' :  'Burlington' , 'fips' : '10600'}, {'location' :  'Calhan' , 'fips' : '11260'},
		{'location' :  'Campo' , 'fips' : '11645'}, {'location' :  'Cañon City' , 'fips' : '11810'},
		{'location' :  'Carbondale' , 'fips' : '12045'}, {'location' :  'Castle Pines North' , 'fips' : '12390'},
		{'location' :  'Castle Rock' , 'fips' : '12415'}, {'location' :  'Cedaredge' , 'fips' : '12635'},
		{'location' :  'Centennial' , 'fips' : '12815'}, {'location' :  'Center' , 'fips' : '12855'},
		{'location' :  'Central City' , 'fips' : '12910'}, {'location' :  'Cheraw' , 'fips' : '13460'},
		{'location' :  'Cherry Hills Village' , 'fips' : '13845'}, {'location' :  'Cheyenne Wells' , 'fips' : '14175'},
		{'location' :  'City of Creede' , 'fips' : '14765'}, {'location' :  'Coal Creek' , 'fips' : '15330'},
		{'location' :  'Cokedale' , 'fips' : '15550'}, {'location' :  'Collbran' , 'fips' : '15605'},
		{'location' :  'Colorado Springs' , 'fips' : '16000'}, {'location' :  'Columbine Valley' , 'fips' : '16385'},
		{'location' :  'Commerce City' , 'fips' : '16495'}, {'location' :  'Cortez' , 'fips' : '17375'},
		{'location' :  'Craig' , 'fips' : '17760'}, {'location' :  'Crawford' , 'fips' : '17925'},
		{'location' :  'Crested Butte' , 'fips' : '18310'}, {'location' :  'Crestone' , 'fips' : '18420'},
		{'location' :  'Cripple Creek' , 'fips' : '18530'}, {'location' :  'Crook' , 'fips' : '18640'},
		{'location' :  'Crowley' , 'fips' : '18750'}, {'location' :  'Dacono' , 'fips' : '19080'},
		{'location' :  'De Beque' , 'fips' : '19355'}, {'location' :  'Deer Trail' , 'fips' : '19630'},
		{'location' :  'Del Norte' , 'fips' : '19795'}, {'location' :  'Delta' , 'fips' : '19850'},
		{'location' :  'Denver' , 'fips' : '20000'}, {'location' :  'Dillon' , 'fips' : '20440'},
		{'location' :  'Dinosaur' , 'fips' : '20495'}, {'location' :  'Dolores' , 'fips' : '20770'},
		{'location' :  'Dove Creek' , 'fips' : '21265'}, {'location' :  'Durango' , 'fips' : '22035'},
		{'location' :  'Eads' , 'fips' : '22145'}, {'location' :  'Eagle' , 'fips' : '22200'},
		{'location' :  'Eaton' , 'fips' : '22860'}, {'location' :  'Eckley' , 'fips' : '23025'},
		{'location' :  'Edgewater' , 'fips' : '23135'}, {'location' :  'Elizabeth' , 'fips' : '23740'},
		{'location' :  'Empire' , 'fips' : '24620'}, {'location' :  'Englewood' , 'fips' : '24785'},
		{'location' :  'Erie' , 'fips' : '24950'}, {'location' :  'Estes Park' , 'fips' : '25115'},
		{'location' :  'Evans' , 'fips' : '25280'}, {'location' :  'Fairplay' , 'fips' : '25610'},
		{'location' :  'Federal Heights' , 'fips' : '26270'}, {'location' :  'Firestone' , 'fips' : '26600'},
		{'location' :  'Flagler' , 'fips' : '26765'}, {'location' :  'Fleming' , 'fips' : '26875'},
		{'location' :  'Florence' , 'fips' : '27040'}, {'location' :  'Fort Collins' , 'fips' : '27425'},
		{'location' :  'Fort Lupton' , 'fips' : '27700'}, {'location' :  'Fort Morgan' , 'fips' : '27810'},
		{'location' :  'Fountain' , 'fips' : '27865'}, {'location' :  'Fowler' , 'fips' : '27975'},
		{'location' :  'Foxfield' , 'fips' : '28105'}, {'location' :  'Fraser' , 'fips' : '28305'},
		{'location' :  'Frederick' , 'fips' : '28360'}, {'location' :  'Frisco' , 'fips' : '28690'},
		{'location' :  'Fruita' , 'fips' : '28745'}, {'location' :  'Garden City' , 'fips' : '29185'},
		{'location' :  'Genoa' , 'fips' : '29680'}, {'location' :  'Georgetown' , 'fips' : '29735'},
		{'location' :  'Gilcrest' , 'fips' : '29955'}, {'location' :  'Glendale' , 'fips' : '30340'},
		{'location' :  'Glenwood Springs' , 'fips' : '30780'}, {'location' :  'Golden' , 'fips' : '30835'},
		{'location' :  'Granada' , 'fips' : '31550'}, {'location' :  'Granby' , 'fips' : '31605'},
		{'location' :  'Grand Junction' , 'fips' : '31660'}, {'location' :  'Grand Lake' , 'fips' : '31715'},
		{'location' :  'Greeley' , 'fips' : '32155'}, {'location' :  'Green Mountain Falls' , 'fips' : '32650'},
		{'location' :  'Greenwood Village' , 'fips' : '33035'}, {'location' :  'Grover' , 'fips' : '33310'},
		{'location' :  'Gunnison' , 'fips' : '33640'}, {'location' :  'Gypsum' , 'fips' : '33695'},
		{'location' :  'Hartman' , 'fips' : '34520'}, {'location' :  'Haswell' , 'fips' : '34740'},
		{'location' :  'Haxtun' , 'fips' : '34960'}, {'location' :  'Hayden' , 'fips' : '35070'},
		{'location' :  'Hillrose' , 'fips' : '36610'}, {'location' :  'Holly' , 'fips' : '37215'},
		{'location' :  'Holyoke' , 'fips' : '37270'}, {'location' :  'Hooper' , 'fips' : '37380'},
		{'location' :  'Hot Sulphur Springs' , 'fips' : '37600'}, {'location' :  'Hotchkiss' , 'fips' : '37545'},
		{'location' :  'Hudson' , 'fips' : '37820'}, {'location' :  'Hugo' , 'fips' : '37875'},
		{'location' :  'Idaho Springs' , 'fips' : '38370'}, {'location' :  'Ignacio' , 'fips' : '38535'},
		{'location' :  'Iliff' , 'fips' : '38590'}, {'location' :  'Jamestown' , 'fips' : '39195'},
		{'location' :  'Johnstown' , 'fips' : '39855'}, {'location' :  'Julesburg' , 'fips' : '39965'},
		{'location' :  'Keenesburg' , 'fips' : '40185'}, {'location' :  'Kersey' , 'fips' : '40515'},
		{'location' :  'Kim' , 'fips' : '40570'}, {'location' :  'Kiowa' , 'fips' : '40790'},
		{'location' :  'Kit Carson' , 'fips' : '41010'}, {'location' :  'Kremmling' , 'fips' : '41560'},
		{'location' :  'La Jara' , 'fips' : '42055'}, {'location' :  'La Junta' , 'fips' : '42110'},
		{'location' :  'La Salle' , 'fips' : '43605'}, {'location' :  'La Veta' , 'fips' : '44100'},
		{'location' :  'Lafayette' , 'fips' : '41835'}, {'location' :  'Lake City' , 'fips' : '42330'},
		{'location' :  'Lakeside' , 'fips' : '42495'}, {'location' :  'Lakewood' , 'fips' : '43000'},
		{'location' :  'Lamar' , 'fips' : '43110'}, {'location' :  'Larkspur' , 'fips' : '43550'},
		{'location' :  'Las Animas' , 'fips' : '43660'}, {'location' :  'Leadville' , 'fips' : '44320'},
		{'location' :  'Limon' , 'fips' : '44980'}, {'location' :  'Littleton' , 'fips' : '45255'},
		{'location' :  'Lochbuie' , 'fips' : '45530'}, {'location' :  'Log Lane Village' , 'fips' : '45695'},
		{'location' :  'Lone Tree' , 'fips' : '45955'}, {'location' :  'Longmont' , 'fips' : '45970'},
		{'location' :  'Louisville' , 'fips' : '46355'}, {'location' :  'Loveland' , 'fips' : '46465'},
		{'location' :  'Lyons' , 'fips' : '47070'}, {'location' :  'Manassa' , 'fips' : '48060'},
		{'location' :  'Mancos' , 'fips' : '48115'}, {'location' :  'Manitou Springs' , 'fips' : '48445'},
		{'location' :  'Manzanola' , 'fips' : '48500'}, {'location' :  'Marble' , 'fips' : '48555'},
		{'location' :  'Mead' , 'fips' : '49600'}, {'location' :  'Meeker' , 'fips' : '49875'},
		{'location' :  'Merino' , 'fips' : '50040'}, {'location' :  'Milliken' , 'fips' : '50480'},
		{'location' :  'Minturn' , 'fips' : '50920'}, {'location' :  'Moffat' , 'fips' : '51250'},
		{'location' :  'Monte Vista' , 'fips' : '51635'}, {'location' :  'Montezuma' , 'fips' : '51690'},
		{'location' :  'Montrose' , 'fips' : '51745'}, {'location' :  'Monument' , 'fips' : '51800'},
		{'location' :  'Morrison' , 'fips' : '52075'}, {'location' :  'Mount Crested Butte' , 'fips' : '52570'},
		{'location' :  'Mountain View' , 'fips' : '52350'}, {'location' :  'Mountain Village' , 'fips' : '52550'},
		{'location' :  'Naturita' , 'fips' : '53120'}, {'location' :  'Nederland' , 'fips' : '53175'},
		{'location' :  'New Castle' , 'fips' : '53395'}, {'location' :  'Northglenn' , 'fips' : '54330'},
		{'location' :  'Norwood' , 'fips' : '54880'}, {'location' :  'Nucla' , 'fips' : '54935'},
		{'location' :  'Nunn' , 'fips' : '55045'}, {'location' :  'Oak Creek' , 'fips' : '55155'},
		{'location' :  'Olathe' , 'fips' : '55540'}, {'location' :  'Olney Springs' , 'fips' : '55705'},
		{'location' :  'Ophir' , 'fips' : '55870'}, {'location' :  'Orchard City' , 'fips' : '55980'},
		{'location' :  'Ordway' , 'fips' : '56145'}, {'location' :  'Otis' , 'fips' : '56365'},
		{'location' :  'Ouray' , 'fips' : '56420'}, {'location' :  'Ovid' , 'fips' : '56475'},
		{'location' :  'Pagosa Springs' , 'fips' : '56860'}, {'location' :  'Palisade' , 'fips' : '56970'},
		{'location' :  'Palmer Lake' , 'fips' : '57025'}, {'location' :  'Paoli' , 'fips' : '57245'},
		{'location' :  'Paonia' , 'fips' : '57300'}, {'location' :  'Parachute' , 'fips' : '57400'},
		{'location' :  'Parker' , 'fips' : '57630'}, {'location' :  'Peetz' , 'fips' : '58235'},
		{'location' :  'Pierce' , 'fips' : '59005'}, {'location' :  'Pitkin' , 'fips' : '59830'},
		{'location' :  'Platteville' , 'fips' : '60160'}, {'location' :  'Poncha Springs' , 'fips' : '60600'},
		{'location' :  'Pritchett' , 'fips' : '61315'}, {'location' :  'Pueblo' , 'fips' : '62000'},
		{'location' :  'Ramah' , 'fips' : '62660'}, {'location' :  'Rangely' , 'fips' : '62880'},
		{'location' :  'Raymer (New Raymer)' , 'fips' : '63045'}, {'location' :  'Red Cliff' , 'fips' : '63265'},
		{'location' :  'Rico' , 'fips' : '64090'}, {'location' :  'Ridgway' , 'fips' : '64200'},
		{'location' :  'Rifle' , 'fips' : '64255'}, {'location' :  'Rockvale' , 'fips' : '64970'},
		{'location' :  'Rocky Ford' , 'fips' : '65190'}, {'location' :  'Romeo' , 'fips' : '65740'},
		{'location' :  'Rye' , 'fips' : '66895'}, {'location' :  'Saguache' , 'fips' : '67005'},
		{'location' :  'Salida' , 'fips' : '67280'}, {'location' :  'San Luis' , 'fips' : '68105'},
		{'location' :  'Sanford' , 'fips' : '67830'}, {'location' :  'Sawpit' , 'fips' : '68655'},
		{'location' :  'Sedgwick' , 'fips' : '68930'}, {'location' :  'Seibert' , 'fips' : '69040'},
		{'location' :  'Severance' , 'fips' : '69150'}, {'location' :  'Sheridan' , 'fips' : '69645'},
		{'location' :  'Sheridan Lake' , 'fips' : '69700'}, {'location' :  'Silt' , 'fips' : '70195'},
		{'location' :  'Silver Cliff' , 'fips' : '70250'}, {'location' :  'Silver Plume' , 'fips' : '70360'},
		{'location' :  'Silverthorne' , 'fips' : '70525'}, {'location' :  'Silverton' , 'fips' : '70580'},
		{'location' :  'Simla' , 'fips' : '70635'}, {'location' :  'Snowmass Village' , 'fips' : '71755'},
		{'location' :  'South Fork' , 'fips' : '72395'}, {'location' :  'Springfield' , 'fips' : '73330'},
		{'location' :  'Starkville' , 'fips' : '73715'}, {'location' :  'Steamboat Springs' , 'fips' : '73825'},
		{'location' :  'Sterling' , 'fips' : '73935'}, {'location' :  'Stratton' , 'fips' : '74485'},
		{'location' :  'Sugar City' , 'fips' : '74815'}, {'location' :  'Superior' , 'fips' : '75640'},
		{'location' :  'Swink' , 'fips' : '75970'}, {'location' :  'Telluride' , 'fips' : '76795'},
		{'location' :  'Thornton' , 'fips' : '77290'}, {'location' :  'Timnath' , 'fips' : '77510'},
		{'location' :  'Trinidad' , 'fips' : '78610'}, {'location' :  'Two Buttes' , 'fips' : '79270'},
		{'location' :  'Vail' , 'fips' : '80040'}, {'location' :  'Victor' , 'fips' : '80865'},
		{'location' :  'Vilas' , 'fips' : '81030'}, {'location' :  'Vona' , 'fips' : '81690'},
		{'location' :  'Walden' , 'fips' : '82130'}, {'location' :  'Walsenburg' , 'fips' : '82350'},
		{'location' :  'Walsh' , 'fips' : '82460'}, {'location' :  'Ward' , 'fips' : '82735'},
		{'location' :  'Wellington' , 'fips' : '83230'}, {'location' :  'Westcliffe' , 'fips' : '83450'},
		{'location' :  'Westminster' , 'fips' : '83835'}, {'location' :  'Wheat Ridge' , 'fips' : '84440'},
		{'location' :  'Wiggins' , 'fips' : '84770'}, {'location' :  'Wiley' , 'fips' : '85045'},
		{'location' :  'Williamsburg' , 'fips' : '85155'}, {'location' :  'Windsor' , 'fips' : '85485'},
		{'location' :  'Winter Park' , 'fips' : '85705'}, {'location' :  'Woodland Park' , 'fips' : '86090'},
		{'location' :  'Wray' , 'fips' : '86310'}, {'location' :  'Yampa' , 'fips' : '86475'}]

//places
var place =[{'location' :  'Acres Green CDP' , 'fips' : '00320'}, {'location' :  'Aetna Estates CDP' , 'fips' : '00620'},
		{'location' :  'Air Force Academy CDP' , 'fips' : '00870'}, {'location' :  'Alamosa East CDP' , 'fips' : '01145'},
		{'location' :  'Allenspark CDP' , 'fips' : '01420'}, {'location' :  'Alpine CDP' , 'fips' : '01640'},
		{'location' :  'Altona CDP' , 'fips' : '01740'}, {'location' :  'Amherst CDP' , 'fips' : '01915'},
		{'location' :  'Applewood CDP' , 'fips' : '02575'}, {'location' :  'Arboles CDP' , 'fips' : '02905'},
		{'location' :  'Aristocrat Ranchettes CDP' , 'fips' : '03015'}, {'location' :  'Aspen Park CDP' , 'fips' : '03730'},
		{'location' :  'Atwood CDP' , 'fips' : '03840'}, {'location' :  'Avondale CDP' , 'fips' : '04165'},
		{'location' :  'Bark Ranch CDP' , 'fips' : '04620'}, {'location' :  'Battlement Mesa CDP' , 'fips' : '05120'},
		{'location' :  'Berkley CDP' , 'fips' : '06172'}, {'location' :  'Beulah Valley CDP' , 'fips' : '06602'},
		{'location' :  'Black Forest CDP' , 'fips' : '06970'}, {'location' :  'Blende CDP' , 'fips' : '07245'},
		{'location' :  'Blue Sky CDP' , 'fips' : '07420'}, {'location' :  'Bonanza Mountain Estates CDP' , 'fips' : '07580'},
		{'location' :  'Brandon CDP' , 'fips' : '08290'}, {'location' :  'Brick Center CDP' , 'fips' : '08530'},
		{'location' :  'Byers CDP' , 'fips' : '10985'}, {'location' :  'Capulin CDP' , 'fips' : '11975'},
		{'location' :  'Cascade-Chipita Park CDP' , 'fips' : '12325'}, {'location' :  'Castle Pines CDP' , 'fips' : '12387'},
		{'location' :  'Cathedral CDP' , 'fips' : '12450'}, {'location' :  'Catherine CDP' , 'fips' : '12460'},
		{'location' :  'Cattle Creek CDP' , 'fips' : '12470'}, {'location' :  'Chacra CDP' , 'fips' : '12945'},
		{'location' :  'Cherry Creek CDP' , 'fips' : '13590'}, {'location' :  'Cimarron Hills CDP' , 'fips' : '14587'},
		{'location' :  'Clifton CDP' , 'fips' : '15165'}, {'location' :  'Coal Creek CDP' , 'fips' : '15302'},
		{'location' :  'Coaldale CDP' , 'fips' : '15440'}, {'location' :  'Colona CDP' , 'fips' : '15825'},
		{'location' :  'Colorado City CDP' , 'fips' : '15935'}, {'location' :  'Columbine CDP' , 'fips' : '16110'},
		{'location' :  'Comanche Creek CDP' , 'fips' : '16465'}, {'location' :  'Conejos CDP' , 'fips' : '16715'},
		{'location' :  'Copper Mountain CDP' , 'fips' : '17150'}, {'location' :  'Cotopaxi CDP' , 'fips' : '17485'},
		{'location' :  'Crisman CDP' , 'fips' : '18585'}, {'location' :  'Dakota Ridge CDP' , 'fips' : '19150'},
		{'location' :  'Derby CDP' , 'fips' : '20275'}, {'location' :  'Divide CDP' , 'fips' : '20605'},
		{'location' :  'Dotsero CDP' , 'fips' : '21155'}, {'location' :  'Dove Valley CDP' , 'fips' : '21330'},
		{'location' :  'Downieville-Lawson-Dumont CDP' , 'fips' : '21390'}, {'location' :  'East Pleasant View CDP' , 'fips' : '22575'},
		{'location' :  'Edwards CDP' , 'fips' : '23300'}, {'location' :  'El Jebel CDP' , 'fips' : '23795'},
		{'location' :  'El Moro CDP' , 'fips' : '24290'}, {'location' :  'Elbert CDP' , 'fips' : '23520'},
		{'location' :  'Eldora CDP' , 'fips' : '23575'}, {'location' :  'Eldorado Springs CDP' , 'fips' : '23630'},
		{'location' :  'Ellicott CDP' , 'fips' : '24235'}, {'location' :  'Evergreen CDP' , 'fips' : '25390'},
		{'location' :  'Fairmount CDP' , 'fips' : '25550'}, {'location' :  'Florissant CDP' , 'fips' : '27095'},
		{'location' :  'Floyd Hill CDP' , 'fips' : '27175'}, {'location' :  'Fort Carson CDP' , 'fips' : '27370'},
		{'location' :  'Fort Garland CDP' , 'fips' : '27535'}, {'location' :  'Franktown CDP' , 'fips' : '28250'},
		{'location' :  'Fruitvale CDP' , 'fips' : '28800'}, {'location' :  'Fulford CDP' , 'fips' : '28830'},
		{'location' :  'Garfield CDP' , 'fips' : '29295'}, {'location' :  'Genesee CDP' , 'fips' : '29625'},
		{'location' :  'Gerrard CDP' , 'fips' : '29845'}, {'location' :  'Glendale CDP' , 'fips' : '30350'},
		{'location' :  'Gleneagle CDP' , 'fips' : '30420'}, {'location' :  'Gold Hill CDP' , 'fips' : '30945'},
		{'location' :  'Goldfield CDP' , 'fips' : '30890'}, {'location' :  'Grand View Estates CDP' , 'fips' : '31935'},
		{'location' :  'Guffey CDP' , 'fips' : '33420'}, {'location' :  'Gunbarrel CDP' , 'fips' : '33502'},
		{'location' :  'Hasty CDP' , 'fips' : '34685'}, {'location' :  'Heeney CDP' , 'fips' : '35400'},
		{'location' :  'Hidden Lake CDP' , 'fips' : '35860'}, {'location' :  'Highlands Ranch CDP' , 'fips' : '36410'},
		{'location' :  'Hoehne CDP' , 'fips' : '36940'}, {'location' :  'Holly Hills CDP' , 'fips' : '37220'},
		{'location' :  'Howard CDP' , 'fips' : '37655'}, {'location' :  'Idalia CDP' , 'fips' : '38425'},
		{'location' :  'Idledale CDP' , 'fips' : '38480'}, {'location' :  'Indian Hills CDP' , 'fips' : '38810'},
		{'location' :  'Inverness CDP' , 'fips' : '38910'}, {'location' :  'Jackson Lake CDP' , 'fips' : '39160'},
		{'location' :  'Jansen CDP' , 'fips' : '39250'}, {'location' :  'Joes CDP' , 'fips' : '39745'},
		{'location' :  'Johnson Village CDP' , 'fips' : '39800'}, {'location' :  'Ken Caryl CDP' , 'fips' : '40377'},
		{'location' :  'Keystone CDP' , 'fips' : '40550'}, {'location' :  'Kirk CDP' , 'fips' : '40900'},
		{'location' :  'Kittredge CDP' , 'fips' : '41065'}, {'location' :  'La Junta Gardens CDP' , 'fips' : '42165'},
		{'location' :  'Laird CDP' , 'fips' : '42000'}, {'location' :  'Laporte CDP' , 'fips' : '43220'},
		{'location' :  'Lazy Acres CDP' , 'fips' : '44270'}, {'location' :  'Leadville North CDP' , 'fips' : '44375'},
		{'location' :  'Lewis CDP' , 'fips' : '44595'}, {'location' :  'Leyner CDP' , 'fips' : '44695'},
		{'location' :  'Lincoln Park CDP' , 'fips' : '45145'}, {'location' :  'Loghill Village CDP' , 'fips' : '45680'},
		{'location' :  'Loma CDP' , 'fips' : '45750'}, {'location' :  'Louviers CDP' , 'fips' : '46410'},
		{'location' :  'Lynn CDP' , 'fips' : '47015'}, {'location' :  'Maybell CDP' , 'fips' : '49325'},
		{'location' :  'Maysville CDP' , 'fips' : '49490'}, {'location' :  'McCoy CDP' , 'fips' : '47345'},
		{'location' :  'Meridian CDP' , 'fips' : '50012'}, {'location' :  'Midland CDP' , 'fips' : '50380'},
		{'location' :  'Morgan Heights CDP' , 'fips' : '51975'}, {'location' :  'Mountain Meadows CDP' , 'fips' : '52210'},
		{'location' :  'Mulford CDP' , 'fips' : '52820'}, {'location' :  'Niwot CDP' , 'fips' : '53780'},
		{'location' :  'No Name CDP' , 'fips' : '53875'}, {'location' :  'Norrie CDP' , 'fips' : '53945'},
		{'location' :  'North La Junta CDP' , 'fips' : '54495'}, {'location' :  'North Washington CDP' , 'fips' : '54750'},
		{'location' :  'Orchard CDP' , 'fips' : '55925'}, {'location' :  'Orchard Mesa CDP' , 'fips' : '56035'},
		{'location' :  'Padroni CDP' , 'fips' : '56695'}, {'location' :  'Paragon Estates CDP' , 'fips' : '57445'},
		{'location' :  'Parshall CDP' , 'fips' : '57850'}, {'location' :  'Penrose CDP' , 'fips' : '58400'},
		{'location' :  'Peoria CDP' , 'fips' : '58510'}, {'location' :  'Perry Park CDP' , 'fips' : '58592'},
		{'location' :  'Peyton CDP' , 'fips' : '58675'}, {'location' :  'Phippsburg CDP' , 'fips' : '58758'},
		{'location' :  'Piedra CDP' , 'fips' : '58960'}, {'location' :  'Pine Brook Hill CDP' , 'fips' : '59240'},
		{'location' :  'Ponderosa Park CDP' , 'fips' : '60655'}, {'location' :  'Portland CDP' , 'fips' : '60765'},
		{'location' :  'Pueblo West CDP' , 'fips' : '62220'}, {'location' :  'Red Feather Lakes CDP' , 'fips' : '63320'},
		{'location' :  'Redlands CDP' , 'fips' : '63375'}, {'location' :  'Redstone CDP' , 'fips' : '63650'},
		{'location' :  'Redvale CDP' , 'fips' : '63705'}, {'location' :  'Rock Creek Park CDP' , 'fips' : '64870'},
		{'location' :  'Rollinsville CDP' , 'fips' : '65685'}, {'location' :  'Roxborough Park CDP' , 'fips' : '66197'},
		{'location' :  'Saddle Ridge CDP' , 'fips' : '66995'}, {'location' :  'Salt Creek CDP' , 'fips' : '67445'},
		{'location' :  'San Acacio CDP' , 'fips' : '67500'}, {'location' :  'Security-Widefield CDP' , 'fips' : '68847'},
		{'location' :  'Sedalia CDP' , 'fips' : '68875'}, {'location' :  'Segundo CDP' , 'fips' : '68985'},
		{'location' :  'Seven Hills CDP' , 'fips' : '69110'}, {'location' :  'Shaw Heights CDP' , 'fips' : '69480'},
		{'location' :  'Sherrelwood CDP' , 'fips' : '69810'}, {'location' :  'Smeltertown CDP' , 'fips' : '71625'},
		{'location' :  'Snyder CDP' , 'fips' : '71790'}, {'location' :  'Southern Ute CDP' , 'fips' : '72320'},
		{'location' :  'St. Ann Highlands CDP' , 'fips' : '67040'}, {'location' :  'St. Mary\'s CDP' , 'fips' : '67142'},
		{'location' :  'Stonegate CDP' , 'fips' : '74080'}, {'location' :  'Stonewall Gap CDP' , 'fips' : '74275'},
		{'location' :  'Strasburg CDP' , 'fips' : '74375'}, {'location' :  'Stratmoor CDP' , 'fips' : '74430'},
		{'location' :  'Sugarloaf CDP' , 'fips' : '74980'}, {'location' :  'Sunshine CDP' , 'fips' : '75585'},
		{'location' :  'Tabernash CDP' , 'fips' : '76190'}, {'location' :  'Tall Timber CDP' , 'fips' : '76325'},
		{'location' :  'The Pinery CDP' , 'fips' : '77235'}, {'location' :  'Todd Creek CDP' , 'fips' : '77757'},
		{'location' :  'Towaoc CDP' , 'fips' : '78280'}, {'location' :  'Towner CDP' , 'fips' : '78335'},
		{'location' :  'Trail Side CDP' , 'fips' : '78345'}, {'location' :  'Twin Lakes CDP' , 'fips' : '79100'},
		{'location' :  'Twin Lakes CDP' , 'fips' : '79105'}, {'location' :  'Upper Bear Creek CDP' , 'fips' : '79785'},
		{'location' :  'Valdez CDP' , 'fips' : '80095'}, {'location' :  'Valmont CDP' , 'fips' : '80370'},
		{'location' :  'Vernon CDP' , 'fips' : '80755'}, {'location' :  'Vineland CDP' , 'fips' : '81305'},
		{'location' :  'Watkins CDP' , 'fips' : '82905'}, {'location' :  'Welby CDP' , 'fips' : '83120'},
		{'location' :  'Weldona CDP' , 'fips' : '83175'}, {'location' :  'West Pleasant View CDP' , 'fips' : '84042'},
		{'location' :  'Westcreek CDP' , 'fips' : '83500'}, {'location' :  'Weston CDP' , 'fips' : '84000'},
		{'location' :  'Wolcott CDP' , 'fips' : '85760'}, {'location' :  'Woodmoor CDP' , 'fips' : '86117'}]

if(level == 'county') { var locarr = county};
if(level == 'region') { var locarr = region};
if(level == 'minicipality') { var locarr = municipality};
if(level == 'place') { var locarr = place};

d3.select(dropdown)
    .selectAll('option')
    .data(locarr)
    .enter()
    .append('option')
    .attr('value', d => d.fips) 
    .text(d => d.location);

}; //end of popDropdown

//includeHTML  taken from W3  https://www.w3schools.com/howto/howto_html_include.asp
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

function transpose(data) {
  let result = {};
  for (let row of data) {
    for (let [key, value] of Object.entries(row)) {
      result[key] = result[key] || [];
	result[key].push([{'name' : key, 'value' : value}]); 
    }
  }
  return result;
};



//exporttoCsv  downloads the a selected file
function exportToCsv(cname, type, rows, yr) {
        var csvFile = d3.csvFormat(rows);
		if(type == 'estimate') {
			var fileName = "Population Estimates " + cname + ".csv";
		};
		if(type == 'forecast') {
			var fileName = "Population Projections " + cname + ".csv";
		};
		if(type == 'coc') {
			var fileName = "Components of Change " + cname + ".csv";
		};
		if(type == 'netmig') {
			var fileName = "Net Migration by Age 2000-2010 " + cname + ".csv";
		};
		if(type == 'age') {
			var fileName = "Age Categories " + cname + ".csv";
		};
		if(type == 'popchng') {
			var fileName = "Population Change by Age Group " + cname + ".csv";
		};
		
		if(type == 'line'){
			var fileName = "Single Year of Age by Race " + cname +  " " + yr + ".csv";
		};
		if(type == 'white'){
			var fileName = "Single Year of Age by Race White NH " + cname +  " " + yr + ".csv";
		};
		if(type == 'hisp'){
			var fileName = "Single Year of Age by Race Hispanic " + cname +  " " + yr + ".csv";
		};
		if(type == 'black'){
			var fileName = "Single Year of Age by Race Black NH " + cname +  " " + yr + ".csv";
		};
		if(type == 'asian'){
			var fileName = "Single Year of Age by Race Asian NH " + cname +  " " + yr + ".csv";
		};
		if(type == 'amind'){
			var fileName = "Single Year of Age by Race American Indian NH " + cname +  " " + yr + ".csv";
		};
		if(type == 'netmign'){
			var fileName =  "Net Migration by Age " + cname + ".csv"
		};
		if(type == 'netmigrrate'){
			var fileName =  "Net Migration by Age " + cname + ".csv"
		};
		if(type == 'netmigwa'){
			var fileName =  "Net Migration by Year.csv"
		};
		if(type == 'netmigrwa'){
			var fileName =  "Net Migration by Year.csv"
		};
		if(type == 'nethist') {
			var fileName = "Long Term Trend Birth Death Migration " + cname + ".csv"
		};
		if(type == 'hhchart') {
			var fileName = "Household Projections Age Group x Household Type " + cname + ".csv"
		};
		if(type == 'agechart') {
			var fileName = "Household Projections Household Type x Age Group " + cname + ".csv"
		};

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };

//exportToPng  Exports plotly trace and layout to PNG file
function exportToPng(cname, type, graphDiv, yr){
	
	  	if(type == 'estimate') {
			var fileName = "Population Estimates " + cname;
		};
		if(type == 'forecast') {
			var fileName = "Population Projections " + cname;
		};
		if(type == 'coc') {
			var fileName = "Components of Change " + cname;
		};
		if(type == 'netmig') {
			var fileName = "Net Migration by Age 2000-2010 " + cname;
		};
		if(type == 'age') {
			var fileName = "Age Categories " + cname;
		};
		if(type == 'popchng') {
			var fileName = "Population Change by Age Group " + cname;
		};
		
		if(type == 'line'){
			var fileName = "Single Year of Age by Race " + cname +  " " + yr;
		};
		if(type == 'white'){
			var fileName = "Single Year of Age by Race White NH " + cname +  " " + yr;
		};
		if(type == 'hisp'){
			var fileName = "Single Year of Age by Race Hispanic " + cname +  " " + yr;
		};
		if(type == 'black'){
			var fileName = "Single Year of Age by Race Black NH " + cname +  " " + yr;
		};
		if(type == 'asian'){
			var fileName = "Single Year of Age by Race Asian NH " + cname +  " " + yr;
		};
		if(type == 'amind'){
			var fileName = "Single Year of Age by Race American Indian NH " + cname +  " " + yr;
		};
		if(type == 'netmign'){
			var fileName =  "Net Migration by Age " + cname
		};
		if(type == 'netmigrrate'){
			var fileName =  "Net Migration Rate by Age " + cname
		};
		if(type == 'netmigwa'){
			var fileName =  "Net Migration by Year "
		};
		if(type == 'netmigrwa'){
			var fileName =  "Net Migration by Year "
		};
		if(type == 'birth') {
			var fileName = "Long Term Trend Births " + cname 
		};
		if(type == 'death') {
			var fileName = "Long Term Trend Deaths " + cname 
		};
		if(type == 'mig') {
			var fileName = "Long Term Trend Net Migration " + cname 
		};
		if(type == 'hhchart') {
			var fileName = "Household Projections Age Group x Household Type " + cname 
		};
		if(type == 'agechart') {
			var fileName = "Household Projections Household Type x Age Group " + cname 
		};
		
	  Plotly.downloadImage(graphDiv, {format: 'png', width: 1000, height: 400, filename: fileName});
};

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
    if(obj.age >= 45 && obj.age <= 64) {obj.age_cat = "45 to 64"; }
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
var tblcolumns2 = ['Ages','Number','Change from '+ prevyear,'2030 forecast'];
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
var tblcolumns2 = ['Race/ Ethnicity','Number','Change from '+ prevyear,'2030 forecast'];
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

//Plotting Fuctionc
//genDEMO outputs Ploytly charts for the Demographic Dashboard
function genDEMO(fips, ctyName, yrvalue){

    const formatDate = d3.timeFormat("%B %d, %Y");
	var fips_list; 
	if(fips == "000") {
      fips_list = "1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125";
    } else {
		fips_list = parseInt(fips);
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

//Net migration by age 
   var netmigurl = 'https://gis.dola.colorado.gov/lookups/migbyage?county=' + parseInt(fips);

var prom = [d3.json(esturl),d3.json(forcurl),d3.json(netmigurl)];


Promise.all(prom).then(function(data){
var est_data = [];
var coc_data = [];
var forec_data = [];
var popchng_data = [];
var netmig_flat = [];
//ESTIMATES AND COC DATA
//push out vars 
 data[0].forEach(function(obj) {
	 est_data.push({'year' : obj.year, 'county' : parseInt(obj.countyfips), 'totalpopulation' : Number(obj.totalpopulation)});
	 coc_data.push({'year' : obj.year, 'county' : parseInt(obj.countyfips), 'totalpopulation' : Number(obj.totalpopulation),
                    'naturalincrease' : Number(obj.naturalincrease), 'netmigration' : Number(obj.netmigration)});
});


var est_flat = [];
var coc_flat = [];
//Rollup data
if(fips == "000") {
	var est_sum = d3.rollup(est_data, v => d3.sum(v, d => d.totalpopulation), d => d.year);
    var columnsToSum = ['totalpopulation', 'naturalincrease', 'netmigration']
	var coc_sum = d3.rollup(coc_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);
	
	//Flatten Arrays for output

	for (let [key, value] of est_sum) {
	  est_flat.push({'year' : key, 'totalpopulation' : value});
		};

	for (let [key, value] of coc_sum) {
		coc_flat.push({'year' :key, 'totalpopulation' : value['totalpopulation'], 'naturalincrease' : value['naturalincrease'], 'netmigration' : value['netmigration']});
	};
} else {
	var est_flat = est_data;
	var coc_flat = coc_data;
};

//Calculating total population change for coc_flat
for(i = 1; i < coc_flat.length; i++){
    coc_flat[i].popchng = coc_flat[i].totalpopulation - coc_flat[i-1].totalpopulation;
    };
//END ESTIMATES AND COC DATA

//FORECASTS AND POPULATION  CHANGE DATA
data[1].forEach(function(obj) {
    forec_data.push({'year' : obj.year,  'age' : Number(obj.age), 'totalpopulation' : Number(obj.totalpopulation)});
	});
	

//Summing up forecast
var forec_sum = d3.rollup(forec_data, v => d3.sum(v, d => d.totalpopulation), d => d.year); 
//Flatten Arrays for output
var forec_flat = [];
for (let [key, value] of forec_sum) {
  forec_flat.push({'year' : key, 'totalpopulation' : value});
    };
;
// creating pop_chng data
data[1].forEach(function(obj) {
    if(obj.age >=  0 && obj.age <= 17) {obj.age_cat = "0 to 17"; }
    if(obj.age >= 18 && obj.age <= 24) {obj.age_cat = "18 to 24";}
    if(obj.age >= 25 && obj.age <= 44) {obj.age_cat = "25 to 44"; }
    if(obj.age >= 45 && obj.age <= 64) {obj.age_cat = "45 to 64"; }
    if(obj.age >= 65 && obj.age <= 74) {obj.age_cat = "65 to 74";}
	if(obj.age >= 75 && obj.age <= 84) {obj.age_cat = "75 to 84";}
	if(obj.age >= 85) {obj.age_cat = "85 and Older";}
    popchng_data.push({'year' : obj.year, 'age_cat' : obj.age_cat, 'totalpopulation' : parseInt(obj.totalpopulation)});
});
//Rolling up by year and agecat
var popchng_sum = d3.rollup(popchng_data, v => d3.sum(v, d => d.totalpopulation), d => d.year, d => d.age_cat);

//Flatten Arrays for output

var popchng_temp = [];
for (let [key1, value] of popchng_sum) {
for (let[key2, value2] of value) {
   popchng_temp.push({'year' : key1, 'age_cat' : key2, 'totalpopulation' : value2});
}
};
//Creating data for Pop by Age latest year chart

var latestYr_flat = [];
var latestYr_sum2 = [];
var latestYr_tmp = popchng_temp.filter(function(d) {return d.year == yrvalue});

var latestYr_sum = d3.rollup(latestYr_tmp, v => d3.sum(v, d => d.totalpopulation));
latestYr_sum2.push({'year' : yrvalue, 'age_cat' : 'All Ages', 'totalpopulation' : latestYr_sum});

latestYr_flat = latestYr_sum2.concat(latestYr_tmp);

//Creating data for Pop Chng chart
var popchng_long = popchng_temp.filter(function(d) {return (d.year == 2020 || d.year == 2025)});

var popchng_tmp = [];
var popchng_flat = [];
var ages = [... new Set(popchng_long.map(tag => tag.age_cat))];

for(i = 0; i < ages.length; i++){
	var tmp = popchng_long.filter(function(d) {return d.age_cat == ages[i]});
    popchng_tmp.push({'age_cat' : ages[i], '2020' : tmp[0].totalpopulation, '2025' : tmp[1].totalpopulation}); 
}

// Rollup to creare total
 var columnsToSum = ['2020', '2025']
 var popchng_sum = d3.rollup(popchng_tmp, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])));
 var popchng_sum2 = [];
 
	popchng_sum2.push({'age_cat' : 'All Ages', '2020' : popchng_sum['2020'], '2025' : popchng_sum['2025']});

 var popchng_f = popchng_sum2.concat(popchng_tmp)
 var popchng_flat = [];
 popchng_f.forEach(function(obj){
	    popchng_flat.push({'age_cat' : obj.age_cat, '2020' : obj['2020'], '2025' : obj['2025'], 'pct_chng' : ((obj['2025']/obj['2020'])-1)});
 });
 //END FORECASTS AND POPULATON CHANGE DATA
 
//NET MIGRATION DATA
data[2].forEach( function(obj) {
	netmig_flat.push({'county' : parseInt(obj.countyfips), 'age' : Number(obj.age), 'netmigration' : Number(obj.netmigration)});
});

netmig_flat = netmig_flat.filter(function(d) {return d.age < 90;});

//Plotting 
var config = {responsive: true,
              displayModeBar: false};
//Clearing out divs
var ESTIMATE = document.getElementById("est_output");
var FORECAST = document.getElementById("forec_output");
var COC = document.getElementById("coc_output");
var MIGR = document.getElementById("mig_output");
var AGE = document.getElementById("ageest_output");
var POPCHNG = document.getElementById("popchng_output");
ESTIMATE.innerHTML = "";
FORECAST.innerHTML = "";
COC.innerHTML = "";
MIGR.innerHTML = "";
AGE.innerHTML = "";
POPCHNG.innerHTML = "";

//Estimates


var year_est_arr =[];
var pop_est_arr = [];

for(i = 0; i < est_flat.length; i++){
	year_est_arr.push(est_flat[i].year);
	pop_est_arr.push(est_flat[i].totalpopulation);
};

var est_trace = { 
               x: year_est_arr,
               y : pop_est_arr,
			   mode : 'lines+markers'
			};

var est_data = [est_trace];

var est_layout = {
		title: "Population Estimates 1985 to "+ yrvalue + ", " + ctyName,
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
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};

Plotly.newPlot(ESTIMATE, est_data, est_layout,config);

	   

//Population Projections


var year_forec_arr =[];
var pop_forec_arr = [];

for(i = 0; i < forec_flat.length; i++){
	year_forec_arr.push(forec_flat[i].year);
	pop_forec_arr.push(forec_flat[i].totalpopulation);
};

var forec_trace = { 
               x: year_forec_arr,
               y : pop_forec_arr,
			   mode : 'lines+markers'
			};

var forec_data = [forec_trace];

var forec_layout = {
		title: "Population Projections 2010 to 2050, " + ctyName ,
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
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(FORECAST, forec_data, forec_layout,config);

//Components of Change
var year_coc_arr =[];
var pop_coc_arr = [];
var incr_coc_arr = [];
var migr_coc_arr = [];

for(i = 0; i < coc_flat.length; i++){
	year_coc_arr.push(coc_flat[i].year);
	pop_coc_arr.push(coc_flat[i].popchng);
	incr_coc_arr.push(coc_flat[i].naturalincrease);
	migr_coc_arr.push(coc_flat[i].netmigration);
};

var coc_trace1 = { 
               x: year_coc_arr,
               y : pop_coc_arr,
			   name : 'Total Population Change',
			   mode : 'lines+markers',
			    marker: {
                  color: 'black',
				  symbol: 'circle',
                  size: 8
  },
  line: {
    color: 'black',
    width: 1
  }
			};
			
var coc_trace2 = { 
               x: year_coc_arr,
               y : incr_coc_arr,
			   name : 'Natural Increase',
			   mode : 'lines+markers',
			    marker: {
                  color: 'grey',
				  symbol: 'square',
                  size: 8
  },
  line: {
    color: 'grey',
    width: 1
  }
			};

var coc_trace3 = { 
               x: year_coc_arr,
               y : migr_coc_arr,
			   name : 'Net Migration',
			   mode : 'lines+markers',
			    marker: {
                  color: 'green',
				  symbol: 'diamond',
                  size: 8
  },
  line: {
    color: 'green',
    width: 1
  }
			};
var coc_data = [coc_trace1, coc_trace2, coc_trace3];

var coc_layout = {
		title: "Births, Deaths and Net Migration 1985 to " + yrvalue + ", " + ctyName,
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
			title : 'Population Change',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(COC, coc_data, coc_layout,config);

//Net Migration

var age_migr_arr =[];
var pop_migr_arr = [];

for(i = 0; i < netmig_flat.length; i++){
	age_migr_arr.push(netmig_flat[i].age);
	pop_migr_arr.push(netmig_flat[i].netmigration);
};

var migr_trace = { 
               x: age_migr_arr,
               y : pop_migr_arr,
			   type : 'bar'
			};

var migr_data = [migr_trace];

var migr_layout = {
		title: "Net Migration by Age, 2000 to 2010, " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400,
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
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(MIGR, migr_data, migr_layout,config);
//Pop by age latest year

var age_cat_arr =[];
var age_pop_arr = [];

for(i = 1; i < latestYr_flat.length; i++){
	age_cat_arr.push(latestYr_flat[i].age_cat);
	age_pop_arr.push(latestYr_flat[i].totalpopulation);
};

var age_trace = { 
               x: age_pop_arr,
               y : age_cat_arr,
			   type : 'bar',
			   orientation : 'h'
			};

var age_data = [age_trace];

var age_layout = {
		title: "Population by Age Group " + yrvalue + ", " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400,
		  xaxis: {
			title : 'Total Population',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			tickformat: ','
		  },
		  yaxis: {
            autorange : 'reversed',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(AGE, age_data, age_layout,config);
//Pop Chng 2020-2025


var popchng_cat_arr =[];
var popchng_pct_arr = [];

for(i = 0; i < popchng_flat.length; i++){
	popchng_cat_arr.push(popchng_flat[i].age_cat);
	popchng_pct_arr.push(popchng_flat[i].pct_chng);
};

var popchng_trace = { 
               x: popchng_pct_arr,
               y : popchng_cat_arr,
			   type : 'bar',
			   orientation : 'h'
			};

var popchng_data = [popchng_trace];

var popchng_layout = {
		title: "Projected Population Change by Age Group, 2020 to 2025 " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400,
		  xaxis: {
			title : 'Percent Change',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			tickformat: '%'
		  },
		  yaxis: {
            autorange : 'reversed',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(POPCHNG, popchng_data, popchng_layout,config);

//Download trigger events
//Estimates
var est_csv = document.getElementById('est_csv');
var est_png = document.getElementById('est_png');
est_csv.onclick = function() {
	  exportToCsv(ctyName, 'estimate', est_flat,0);
     }; 
est_png.onclick = function() {
	   exportToPng(ctyName, 'estimate', ESTIMATE,0);
     };
	 
//Forecasts
var forec_csv = document.getElementById('forec_csv');
var forec_png = document.getElementById('forec_png');
forec_csv.onclick = function() {
	  exportToCsv(ctyName, 'forecast', forec_flat,0);
     }; 
forec_png.onclick = function() {
	   exportToPng(ctyName, 'forecast', FORECAST,0);
     };
	 
//Components of Change
var coc_csv = document.getElementById('coc_csv');
var coc_png = document.getElementById('coc_png');
coc_csv.onclick = function() {
	  exportToCsv(ctyName, 'coc', coc_flat,0);
     }; 
coc_png.onclick = function() {
	   exportToPng(ctyName, 'coc', COC,0);
     };
	 
//Net Migration
var mig_csv = document.getElementById('mig_csv');
var mig_png = document.getElementById('mig_png');
mig_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmig', netmig_flat,0);
     }; 
mig_png.onclick = function() {
	   exportToPng(ctyName, 'netmig', MIGR,0);
     };
	 
//Age
var age_csv = document.getElementById('age_csv');
var age_png = document.getElementById('age_png');
age_csv.onclick = function() {
	  exportToCsv(ctyName, 'age', latestYr_flat,0);
     }; 
age_png.onclick = function() {
	   exportToPng(ctyName, 'age', AGE,0);
     };
	 
//popchng
var popchng_csv = document.getElementById('popchng_csv');
var popchng_png = document.getElementById('popchng_png');
popchng_csv.onclick = function() {
	  exportToCsv(ctyName, 'popchng', popchng_flat,0);
     }; 
popchng_png.onclick = function() {
	   exportToPng(ctyName, 'popchng', POPCHNG,0);
     };
}); //end of promise
} //end of genDEMO

//genRACEVIS Generates the Race/Ethncity visualization
function genRACEVIS(fips,ctyName, yrvalue) {
	var fmt_comma = d3.format(",");
    const formatDate = d3.timeFormat("%B %d, %Y");

//Specify fips_list
var fips_list = parseInt(fips); 
   
//extract year value 
 
var age_list = "0";
for(i = 1; i<= 100; i++){
   age_list = age_list + "," + i;
  };
  
 //Generate url
 if(fips == "000") {
 fips_list = "1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125";
 } 
//estimates urls
urlstr_hispest = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ yrvalue +"&race=1,2,3,4&ethnicity=1&sex=b";
urlstr_nonhispest = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ yrvalue +"&race=1,2,3,4&ethnicity=2&sex=b";

var hisp_est = [];
var nonhisp_est = [];

//Promise Structure
var prom = [d3.json(urlstr_hispest),d3.json(urlstr_nonhispest)];

Promise.all(prom).then(function(data){
	data[0].forEach(function(obj) {
hisp_est.push({'year' : obj.year, 'age' : parseInt(obj.age), 'sex' : obj.sex, 'population' : parseInt(obj.count)});
});
    data[1].forEach(function(obj) {
     nonhisp_est.push({'year' : obj.year, 'age' : parseInt(obj.age),'sex' : obj.sex, 'race' : obj.race, 'population' : parseInt(obj.count)});
});

//Rolling up the hispanic and non-hispanic datasets
var hisp_total = d3.rollup(hisp_est, v => d3.sum(v, d => d.population), d => d.age);
var nonhisp_total = d3.rollup(nonhisp_est, v => d3.sum(v, d => d.population), d => d.age, d=> d.race);

//Flattening the datasets
var hisp_flat = [];
for (let [key, value] of hisp_total) {
  hisp_flat.push({'age' : key, 'race_eth' : 'Hispanic',  'population' : value});
    }
var nonhisp_flat = [];
for (let [key1, value] of nonhisp_total) {
for (let[key2, value2] of value) {
   nonhisp_flat.push({'age' : key1, 'race_eth' : key2 + ' NH', 'population' : value2});
}
}

var race_flat = hisp_flat.concat(nonhisp_flat);

//Plotting 
var config = {responsive: true,
              displayModeBar: false};
//Clearing out divs
var LINE = document.getElementById("line_output");
var WHITE = document.getElementById("white_output");
var HISPANIC = document.getElementById("hisp_output");
var BLACK = document.getElementById("black_output");
var ASIAN = document.getElementById("asian_output");
var AMIND = document.getElementById("amind_output");
LINE.innerHTML = "";
WHITE.innerHTML = "";
HISPANIC.innerHTML = "";
BLACK.innerHTML = "";
ASIAN.innerHTML = "";
AMIND.innerHTML = "";

//line chart

var age_line_arr_w = [];
var pop_line_arr_w = [];
var age_line_arr_h = [];
var pop_line_arr_h = [];
var age_line_arr_b = [];
var pop_line_arr_b = [];
var age_line_arr_as = [];
var pop_line_arr_as = [];
var age_line_arr_ai = [];
var pop_line_arr_ai = [];

for(i = 0; i < race_flat.length; i++){
	if(race_flat[i].race_eth == "White NH" && race_flat[i].age < 85){
		age_line_arr_w.push(race_flat[i].age);
		pop_line_arr_w.push(race_flat[i].population);
	};
	if(race_flat[i].race_eth == "Hispanic" && race_flat[i].age < 85){
		age_line_arr_h.push(race_flat[i].age);
		pop_line_arr_h.push(race_flat[i].population);
	};
	if(race_flat[i].race_eth == "Black NH" && race_flat[i].age < 85){
		age_line_arr_b.push(race_flat[i].age);
		pop_line_arr_b.push(race_flat[i].population);
	};
	if(race_flat[i].race_eth == "Asian/Pacific Islander NH" && race_flat[i].age < 85){
		age_line_arr_as.push(race_flat[i].age);
		pop_line_arr_as.push(race_flat[i].population);
	};
	if(race_flat[i].race_eth == "American Indian NH" && race_flat[i].age < 85){
		age_line_arr_ai.push(race_flat[i].age);
		pop_line_arr_ai.push(race_flat[i].population);
	};
};

var white_line = { 
               x: age_line_arr_w,
               y : pop_line_arr_w,
			   name : 'White, NH',
			   mode : 'lines', 
			   line : {
					color: 'blue',
					width : 3
				}
			};

var hisp_line = { 
               x: age_line_arr_h,
               y : pop_line_arr_h,
			   name : 'Hispanic',
			   mode : 'lines', 
			   line : {
					color: 'orange',
					width : 3
				}
			};

var black_line = { 
               x: age_line_arr_b,
               y : pop_line_arr_b,
			   name : 'Black, NH',
			   mode : 'lines', 
			   line : {
					color: 'green',
					width : 3
				}
			};

var asian_line = { 
               x: age_line_arr_as,
               y : pop_line_arr_as,
			   name : 'Asian/Pacific Islander, NH',
			   mode : 'lines', 
			   line : {
					color: 'red',
					width : 3
				}
			};
			
var amind_line = { 
               x: age_line_arr_ai,
               y : pop_line_arr_ai,
			   name : 'American Indian, NH',
			   mode : 'lines', 
    		   line : {
					color: 'purple',
					width : 3
				}
			};
			
//Traces for Barcharts
var white_bar = { 
               x: age_line_arr_w,
               y : pop_line_arr_w,
			   type : 'bar',
			   marker : { color: 'blue' }
			};

var hisp_bar = { 
               x: age_line_arr_h,
               y : pop_line_arr_h,
			   type : 'bar',
			   marker : { color : 'orange'}
			};

var black_bar = { 
               x: age_line_arr_b,
               y : pop_line_arr_b,
			   type : 'bar',
			   marker : { color: 'green' }
			};

var asian_bar = { 
               x: age_line_arr_as,
               y : pop_line_arr_as,
			   type : 'bar',
			   marker : { color : 'red' }
			};
			
var amind_bar = { 
               x: age_line_arr_ai,
               y : pop_line_arr_ai,
			   type : 'bar',
			   marker : { color : 'purple' }
			};
			
var line_data = [white_line, hisp_line, black_line, asian_line, amind_line];
var white_trace = [white_bar];
var hisp_trace = [hisp_bar];
var black_trace = [black_bar];
var asian_trace = [asian_bar];
var amind_trace = [amind_bar];

var line_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue,
		  autosize: false,
		  width: 1000,
		  height: 400, 
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
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(LINE, line_data, line_layout,config);

var white_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " White, NH",
		  autosize: false,
		  width: 1000,
		  height: 400, 
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
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(WHITE, white_trace, white_layout,config);

var hisp_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " Hispanic",
		  autosize: false,
		  width: 1000,
		  height: 400, 
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
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(HISPANIC, hisp_trace, hisp_layout,config);

var black_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " Black, NH",
		  autosize: false,
		  width: 1000,
		  height: 400, 
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
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(BLACK, black_trace, black_layout,config);

var asian_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " Asian/Pacific Islander, NH",
		  autosize: false,
		  width: 1000,
		  height: 400, 
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
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(ASIAN, asian_trace, asian_layout,config);

var amind_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " American Indian, NH",
		  autosize: false,
		  width: 1000,
		  height: 400, 
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
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(AMIND, amind_trace, amind_layout,config);

//Download trigger events
// Make race_flat wide
var race_wide = restructure(race_flat);

//Line Chart
var line_csv = document.getElementById('line_csv');
var line_png = document.getElementById('line_png');
line_csv.onclick = function() {
	  exportToCsv(ctyName, 'line', race_wide, yrvalue);
     }; 
line_png.onclick = function() {
	   exportToPng(ctyName, 'line', LINE, yrvalue);
     };
	 
//WhiteChart
var white_csv = document.getElementById('white_csv');
var white_png = document.getElementById('white_png');
white_csv.onclick = function() {
	  exportToCsv(ctyName, 'white', race_flat.filter(function(d) {return d.race_eth == "White NH";}), yrvalue);
     }; 
white_png.onclick = function() {
	   exportToPng(ctyName, 'white', WHITE, yrvalue);
     };
	 
//Hispanic Chart
var hisp_csv = document.getElementById('hisp_csv');
var hisp_png = document.getElementById('hisp_png');
hisp_csv.onclick = function() {
	  exportToCsv(ctyName, 'hisp', race_flat.filter(function(d) {return d.race_eth == "Hispanic";}), yrvalue);
     }; 
hisp_png.onclick = function() {
	   exportToPng(ctyName, 'hisp', HISPANIC,yrvalue);
     };
	 
//Black Chart
var black_csv = document.getElementById('black_csv');
var black_png = document.getElementById('black_png');
black_csv.onclick = function() {
	  exportToCsv(ctyName, 'black', race_flat.filter(function(d) {return d.race_eth == "Black NH";}), yrvalue);
     }; 
black_png.onclick = function() {
	   exportToPng(ctyName, 'black', BLACK,yrvalue);
     };
	 

//asian Chart
var asian_csv = document.getElementById('asian_csv');
var asian_png = document.getElementById('asian_png');
asian_csv.onclick = function() {
	  exportToCsv(ctyName, 'asian', race_flat.filter(function(d) {return d.race_eth == "Asian NH";}), yrvalue);
     }; 
asian_png.onclick = function() {
	   exportToPng(ctyName, 'asian', ASIAN,yrvalue);
     };
	 
//Amind Chart
var amind_csv = document.getElementById('amind_csv');
var amind_png = document.getElementById('amind_png');
amind_csv.onclick = function() {
	  exportToCsv(ctyName, 'amind', race_flat.filter(function(d) {return d.race_eth == "American Indiam NH";}), yrvalue);
     }; 
amind_png.onclick = function() {
	   exportToPng(ctyName, 'amind', AMIND,yrvalue);
     };
}); //End of Promise
}; //end of genRaceVis

//genNETMIGCOMP generates the Net Migration Comparison charts 
//Uses data from NetMigrationByAgeComparison Must be updated after Census 2020 is available

function genNETMIGCOMP(fips, ctyName, yrvalue) {
	 const formatDate = d3.timeFormat("%B %d, %Y");

	var fipsNum = parseInt(fips);

//Reading Raw data
var data_csv = "../data/NetMigrationByAgeComparison.csv";
d3.csv(data_csv).then(function(data){
  var datafilt = data.filter(function(d) {return d.FIPS == fipsNum;});
  var NetMigAge = [];
  var NetMig9500 = [];
  var NetMig0010 = [];
  var NetMig1020 = [];
  var Rate9500 = [];
  var Rate0010 = [];
  var Rate1020 = [];

  datafilt.forEach(function(obj) {
	  NetMigAge.push(Number(obj.FiveYearAgeGroups));
	  NetMig9500.push(Number(obj.NetMig9500));
	  NetMig0010.push(Number(obj.NetMig0010));
	  NetMig1020.push(Number(obj.NetMig1020));
	  Rate9500.push(Number(obj.Rate9500) * 1000);
	  Rate0010.push(Number(obj.Rate0010) * 1000);
	  Rate1020.push(Number(obj.Rate1020) * 1000);
  });
  
var NetMig9500_line = { 
               x: NetMigAge,
               y : NetMig9500,
			   name : '1995 to 2000',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'blue',
				  symbol: 'circle',
                  size: 8
                },
			   line : {
					color: 'blue',
					width : 3
				}
			};

var NetMig0010_line = { 
               x: NetMigAge,
               y : NetMig0010,
			   name : '2000 to 2010',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'orange',
				  symbol: 'square',
                  size: 8
                },
			   line : {
					color: 'orange',
					width : 3
				}
			};

var NetMig1020_line = { 
               x: NetMigAge,
               y : NetMig1020,
			   name : '1995 to 2000',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'green',
				  symbol: 'diamond',
                  size: 8
                },
			   line : {
					color: 'green',
					dash : 'dash',
					width : 3
				}
			};
			
var NetMig_trace = [NetMig9500_line, NetMig0010_line, NetMig1020_line];

var Rate9500_line = { 
               x: NetMigAge,
               y : Rate9500,
			   name : '1995 to 2000',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'blue',
				  symbol: 'circle',
                  size: 8
                },
			   line : {
					color: 'blue',
					width : 3
				}
			};

var Rate0010_line = { 
               x: NetMigAge,
               y : Rate0010,
			   name : '2000 to 2010',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'orange',
				  symbol: 'square',
                  size: 8
                },
			   line : {
					color: 'orange',
					width : 3
				}
			};

var Rate1020_line = { 
               x: NetMigAge,
               y : Rate1020,
			   name : '2010 to 2020',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'green',
				  symbol: 'diamond',
                  size: 8
                },
			   line : {
					color: 'green',
					dash : 'dash',
					width : 3
				}
			};
			
var Rate_trace = [Rate9500_line, Rate0010_line, Rate1020_line];

var NetMig_layout = {
		title: "Net Migration by Age -- Net Migrants " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400, 
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
			  title : 'Net Migration',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
 
 var Rate_layout = {
		title: "Net Migration by Age -- Rates " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400, 
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
			  title : 'Net Migration Rate (per 1,000 Population)',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat:  '.2f'
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		
var config = {responsive: true,
              displayModeBar: false};
//Clearing out divs
var NETMIG = document.getElementById("netmign_output");
var NETMIGRATE = document.getElementById("netmigrrate_output");

NETMIG.innerHTML = "";
NETMIGRATE.innerHTML = "";

Plotly.newPlot(NETMIG, NetMig_trace, NetMig_layout,config);
Plotly.newPlot(NETMIGRATE, Rate_trace, Rate_layout,config);


//Button Events
//Net Migration Chart
var netmign_csv = document.getElementById('netmign_csv');
var netmign_png = document.getElementById('netmign_png');
netmign_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmign', datafilt, 0);
     }; 
netmign_png.onclick = function() {
	   exportToPng(ctyName, 'netmign', NETMIG, 0);
     };
	 
// Net Migration Rate
var netmigrrate_csv = document.getElementById('netmigrrate_csv');
var netmigrrate_png = document.getElementById('netmigrrate_png');
netmigrrate_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmigrrate', datafilt, 0);
     }; 
netmigrrate_png.onclick = function() {
	   exportToPng(ctyName, 'netmigrrate', NETMIGRATE, 0);
     };
	 

}); //End of d3.csv
} //end of genNETMIGCOMP


//genNETMIG1864 Historical NetMigration charts, inclusing working age population was net_mig 1864
//Uses data from netmig_1864x Must be updated after Census 2020 is available
function genNETMIG1864(fipsVal, ctyName, ageSeries, chartType, yrvalue){

const formatDate = d3.timeFormat("%B %d, %Y");

var data_csv = "../data/netmig_1864x.csv";

	
//Building Chart Title and filename

var titStr = "Net Migration by Year: ";

if(ctyName.length == 1) {
	titStr = titStr + ctyName[0];
   } else { 
	   for (i = 0; i < ctyName.length; i++){
		 if(i == (ctyName.length -1)){
			 titStr = titStr + " and " + ctyName[i];
		 } else {
		if (ctyName.length == 2){
			titStr = titStr +  ctyName[i] + " ";
		} else {
          titStr = titStr +  ctyName[i] + ", ";
		 }
       }
	   }
   }; 
   
//Creating second line of title
if(ageSeries == "ageall"){	   
	 var titStrTot = titStr + "<br>Total Population Counts";
	 var  titStrRate = titStr + "<br>Total Population Rate per 100";
	} else {
		var titStrTot = titStr + "<br>Working Age Population Counts (Age 18-64)";
		var titStrRate = titStr + "<br>Working Age Population Rate per 100 (Age 18-64)";
	};


	
d3.csv(data_csv).then(function(data){


	var tot_trace = [];
	var rate_trace = [];

	if(fipsVal.length == 1) {
		var datafilt = data.filter(function(d,i) {return d.fips == fipsVal[0];});
	} else {
		var datafilt = data.filter(function(d,i) {return fipsVal.indexOf(d.fips)  >= 0;});
	};


		for(i = 0; i < fipsVal.length; i++) {
			var datafilt_multi = datafilt.filter(function(d) {return d.fips == fipsVal[i];});
			var xDataYear = [];
			var yDataTot = [];
			var yDataRate = [];
			for(j = 0; j < datafilt_multi.length; j++) {
			  if(ageSeries == 'age1864'){
				  if(datafilt_multi[j].year >= 1990){
				   xDataYear.push(Number(datafilt_multi[j].year));
				   yDataTot.push(Number(datafilt_multi[j].netmigration_1864));
				   yDataRate.push(Number(datafilt_multi[j].rate_1864));
				  }
				} else {  
				  xDataYear.push(Number(datafilt_multi[j].year));
				  yDataTot.push(Number(datafilt_multi[j].netmigration_total));
				  yDataRate.push(Number(datafilt_multi[j].rate_total));
			};
			};

if(chartType == 'bar'){
		var tot_tmp = { 
					   x: xDataYear,
					   y :  yDataTot,
					   name : ctyName[i],
					   type : 'bar'
					};
		var rate_tmp = { 
					   x: xDataYear,
					   y : yDataRate,
					   name : ctyName[i],
					   type : 'bar'
					};			
	} else {
		var tot_tmp = { 
					   x: xDataYear,
					   y : yDataTot,
					   name : ctyName[i],
					   mode : 'lines+markers'
					};
		var rate_tmp = { 
					   x: xDataYear,
					   y : yDataRate,
					   name : ctyName[i],
					   mode : 'lines+markers'
					};			
};

tot_trace.push(tot_tmp);
rate_trace.push(rate_tmp);
};


	


//Generating Chart	
var config = {responsive: true,
              displayModeBar: false};
			  
	
//Clearing out Divs
var NETMIGTOT = document.getElementById("netmigtot_output");
var NETMIGRATE = document.getElementById("netmigrrate_output");

NETMIGTOT.innerHTML = "";
NETMIGRATE.innerHTML = "";

var tot_layout = {
		title: titStrTot,
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
			  title : 'Persons',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};


var rate_layout = {
		title: titStrRate,
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
			  title : 'Rate per 100 Persons',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat:  '.2f'
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		//Chart Call

Plotly.newPlot(NETMIGTOT, tot_trace, tot_layout, config);
Plotly.newPlot(NETMIGRATE, rate_trace, rate_layout, config);

//Button Events
//Net Migration Chart

var netmigwa_csv = document.getElementById('netmigwa_csv');
var netmigwa_png = document.getElementById('netmigwa_png');
netmigwa_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmigwa', datafilt, 0);
     }; 
netmigwa_png.onclick = function() {
	   exportToPng(ctyName, 'netmigwa', NETMIGTOT, 0);
     };
	 
// Net Migration Rate

var netmigrwa_csv = document.getElementById('netmigrwa_csv');
var netmigrwa_png = document.getElementById('netmigrwa_png');
netmigrwa_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmigrwa', datafilt, 0);
     }; 
netmigrwa_png.onclick = function() {
	   exportToPng(ctyName, 'netmigrwa', NETMIGRATE, 0);
     };
	 
}); //end of d3 csv
}; // end of genNETMIGWA

//genCOCHIST generates long-term COC charts
function genCOCHIST(fipsVal, ctyName) {
const formatDate = d3.timeFormat("%B %d, %Y");

//Generating urls
var ctyfips  = parseInt(fipsVal);
var yrlist = 1970;
for(i = 1971; i <= 2050; i++){
	yrlist = yrlist + "," + i;
};

if(fipsVal == "000") {
	 var dataurl = 'https://gis.dola.colorado.gov/lookups/components_region?reg_num=' + ctyfips + '&year=' + yrlist;
} else {
	var dataurl = 'https://gis.dola.colorado.gov/lookups/components?county=' + ctyfips + '&year=' + yrlist;
}
var year_est = [];
var year_forc = [];
var birth_est = [];
var birth_forc = [];
var death_est = [];
var death_forc = [];
var mig_est = [];
var mig_forc = [];
var out_data = [];

d3.json(dataurl).then(function(data){
	   for(i = 0; i < data.length; i++){
		   out_data.push({'Year' : data[i].year, 'County' : ctyName, 'Births' : Number(data[i].births), 'Deaths' : Number(data[i].deaths), 
		                  'Net Migration' : Number(data[i].netmig), 'Data Type' : data[i].datatype});
		   if(data[i].datatype == "Estimate"){
			year_est.push(data[i].year);
		    birth_est.push(Number(data[i].births));
			death_est.push(Number(data[i].deaths));
			mig_est.push(Number(data[i].netmig));
		   } else {
			year_forc.push(data[i].year);
		    birth_forc.push(Number(data[i].births));
			death_forc.push(Number(data[i].deaths));
			mig_forc.push(Number(data[i].netmig));
		   };
	   };
//Traces
var birth_tmp1 = { 
					   x: year_est,
					   y : birth_est,
					   name : 'Estimate',
					   mode : 'lines',
					   line: {
						dash: 'solid',
						color : 'black',
						width: 3
						}
					};

var birth_tmp2 = { 
					   x: year_forc,
					   y : birth_forc,
					   name : 'Forecast',
					   mode : 'lines',
					   line: {
						dash: 'dash',
						color : 'black',
						width: 3
						}
					};
var birth_trace = [birth_tmp1, birth_tmp2];

var death_tmp1 = { 
					   x: year_est,
					   y : death_est,
					   name : 'Estimate',
					   mode : 'lines',
					   line: {
						dash: 'solid',
						color : 'grey',
						width: 3
						}
					};

var death_tmp2 = { 
					   x: year_forc,
					   y : death_forc,
					   name : 'Forecast',
					   mode : 'lines',
					   line: {
						dash: 'dash',
						color : 'grey',
						width: 3
						}
					};
var death_trace = [death_tmp1, death_tmp2];

var mig_tmp1 = { 
					   x: year_est,
					   y : mig_est,
					   name : 'Estimate',
					   mode : 'lines',
					   line: {
						dash: 'solid',
						color : 'green',
						width: 3
						}
					};

var mig_tmp2 = { 
					   x: year_forc,
					   y : mig_forc,
					   name : 'Forecast',
					   mode : 'lines',
					   line: {
						dash: 'dash',
						color : 'green',
						width: 3
						}
					};
var mig_trace = [mig_tmp1, mig_tmp2];

//Generating Chart	
var config = {responsive: true,
              displayModeBar: false};
			  
	
//Clearing out Divs
var BIRTH = document.getElementById("birth_output");
var DEATH = document.getElementById("death_output");
var MIG = document.getElementById("netmig_output");

BIRTH.innerHTML = "";
DEATH.innerHTML = "";
MIG.innerHTML = "";

var birth_layout = {
		title: "Birth Estimate and Forecast " + ctyName,
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
			  title : 'Persons',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		
var death_layout = {
		title: "Death Estimate and Forecast " + ctyName,
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
			  title : 'Persons',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		
var mig_layout = {
		title: "Net Migration Estimate and Forecast " + ctyName,
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
			  title : 'Persons',
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat: ','
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		

Plotly.newPlot(BIRTH, birth_trace, birth_layout, config);
Plotly.newPlot(DEATH, death_trace, death_layout, config);
Plotly.newPlot(MIG, mig_trace, mig_layout, config);

//Button Events
//Net Migration Chart

var birth_csv = document.getElementById('birth_csv');
var birth_png = document.getElementById('birth_png');
birth_csv.onclick = function() {
	  exportToCsv(ctyName, 'nethist', out_data, 0);
     }; 
birth_png.onclick = function() {
	   exportToPng(ctyName, 'birth', BIRTH, 0);
     };
	 

var death_csv = document.getElementById('death_csv');
var death_png = document.getElementById('death_png');
death_csv.onclick = function() {
	  exportToCsv(ctyName, 'nethist', out_data, 0);
     }; 
death_png.onclick = function() {
	   exportToPng(ctyName, 'death', DEATH, 0);
     };
	 
var mig_csv = document.getElementById('netmig_csv');
var mig_png = document.getElementById('netmig_png');
mig_csv.onclick = function() {
	  exportToCsv(ctyName, 'nethist', out_data, 0);
     }; 
mig_png.onclick = function() {
	   exportToPng(ctyName, 'mig', MIG, 0);
     };
	 
}); //end of d3 json
}; //end of genCOCHIST

//genHOUSEDASH Housing Dashboard

//genHOUSEAGE  Household forecast by age and hh type
function genHOUSEAGE(fipsVal,ctyName, varType, seriesType){
	const formatDate = d3.timeFormat("%B %d, %Y");

	var fips_list = parseInt(fipsVal);
	debugger;
   var yr_trace = [2010];

 	var yr_list = 2010;
	for(i = 2011; i <= 2050; i++){
		yr_list = yr_list + "," + i;
		yr_trace.push(Number(i));
	};


var urlstr = "https://gis.dola.colorado.gov/lookups/household?county="+ fips_list + "&year=" + yr_list + "&age=0,1,2,3,4&household=0,1,2,3,4";


var dataplot = [];
var datahh = [];
var dataage = [];
var hh_arr = ["All Households", "One adult with no children", "One adult with children", "More than one adult with no children", "More than one adult with children"]
var age_arr = ["Total", "18-24", "25-44", "45-64","65 and Older"]
d3.json(urlstr).then(function(data){
   data.forEach(function(obj) {
    obj.household = hh_arr[obj.household_type_id];
    obj.age = age_arr[obj.age_group_id];
    dataplot.push({'year' : obj.year, 'household' : obj.household, 'age' : obj.age, 'total_households' : Number(obj.total_households)});
 });
 //Calculating Age by Housing Type percentage

for(i = 2010; i <= 2050;i++){
	var tmp = dataplot.filter(function(d) {return d.year == i;});

	for(j = 0; j < 5;j++){
		var tmp2 = tmp.filter(function(d) {return d.household == hh_arr[j];});
		for(k = 0; k < tmp2.length; k++){
			if(tmp2[k].age == age_arr[0]) {
			  var base_total = tmp2[k].total_households;
			} else {
			  var age_pct = tmp2[k].total_households/base_total;
			  datahh.push({'year' : tmp2[k].year, 'household' : tmp2[k].household, 'age' : tmp2[k].age, 'total_households' : Math.round(tmp2[k].total_households), 'age_pct' : age_pct});
		};
		};
    };
};

 //Calculating Housing Type by Age Group percenage

for(i = 2010; i <= 2050;i++){
	var tmp = dataplot.filter(function(d) {return d.year == i;});

	for(j = 0; j < 5;j++){
		var tmp2 = tmp.filter(function(d) {return d.age == age_arr[j];});
		for(k = 0; k < tmp2.length; k++){
			if(tmp2[k].household == hh_arr[0]) {
			  var base_total = tmp2[k].total_households;
			} else {
			  var hh_pct = tmp2[k].total_households/base_total;
			  dataage.push({'year' : tmp2[k].year, 'household' : tmp2[k].household, 'age' : tmp2[k].age, 'total_households' : Math.round(tmp2[k].total_households), 'hh_pct' : hh_pct});
		};
		};
    };
};

//Preparing charts

var tr_0 = [];  //These are the individual traces
var tr_1 = [];
var tr_2 = [];
var tr_3 = [];
var tr_4 = [];

var ch_0 = [];  //These are the chart traces 5 lines per chart
var ch_1 = [];
var ch_2 = [];
var ch_3 = [];
var ch_4 = [];

if(varType == "hhold") { //Age by HH
for(i = 0; i < hh_arr.length; i++){
	for(j = 1; j < age_arr.length; j++) {
		var tmphh = datahh.filter(function(d) {return d.household == hh_arr[i] && d.age == age_arr[j];});
		var yData = [];
		for(k = 0; k < tmphh.length; k++){
			if(seriesType == "num"){
		       yData.push(tmphh[k].total_households);
			} else {
		       yData.push(tmphh[k].age_pct);
			};	
		};	
debugger;
	if(j == 0){
   	tr_0 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 1){
   	tr_1 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 2){
   	tr_2 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};	
	if(j == 3){
   	tr_3 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 4){
   	tr_4 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};
   	} //J loop
	//Making the compined Traces
	if(i == 0) { ch_0 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 1) { ch_1 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 2) { ch_2 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 3) { ch_3 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 4) { ch_4 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
} //I Loop
} else {  //HH by Age
	for(i = 0; i < age_arr.length; i++){
	for(j = 1; j < hh_arr.length; j++) {
		
		var tmpage = dataage.filter(function(d) {return d.household == hh_arr[j] && d.age == age_arr[i];});
		var yData = [];
		for(k = 0; k < tmpage.length; k++){
			if(seriesType == "num"){
		       yData.push(tmpage[k].total_households);
			} else {
		       yData.push(tmpage[k].hh_pct);
			};	
		};	

	if(j == 0){
   	tr_0 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 1){
   	tr_1 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 2){
   	tr_2 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};	
	if(j == 3){
   	tr_3 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 4){
   	tr_4 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};
   	} //J loop
	//Making the compined Traces
	if(i == 0) { ch_0 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 1) { ch_1 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 2) { ch_2 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 3) { ch_3 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 4) { ch_4 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
} //I Loop
}; //Trace 	

//Titles
var ch_layout = [];

if(varType == "hhold") {
for(i = 0; i < hh_arr.length; i++){
	var tit_str = "Projected Households by Age and Household Type " + ctyName + " 2010 to 2050<br>Household Type: " + hh_arr[i];
	if(seriesType == "num") {
		tit_str = tit_str + " Number of Housing Units";
		y_title = "Households";
		y_ticks = ',';
    } else {
		tit_str = tit_str + " Percentage of Housing Units";
		y_title = "Percentage";
		y_ticks = ',.0%';
	};
	
//layouts
  var layout = {
		title: tit_str,
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
			linewidth: 2,
			type: 'date'
		  },
		  yaxis: {
			title : y_title,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			tickformat: y_ticks
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
ch_layout.push(layout);
};
} else {
	for(i = 0; i < age_arr.length; i++){
	var tit_str = "Projected Households by Household Type and Age " + ctyName + " 2010 to 2050<br> Age Group: " + age_arr[i];
	if(seriesType == "num") {
		tit_str = tit_str + " Number of Housing Units";
		y_title = "Households";
		y_ticks = ',';
    } else {
		tit_str = tit_str + " Percentage of Housing Units";
		y_title = "Percentage";
		y_ticks = ',.0%';
	};
	
//layouts
  var layout = {
		title: tit_str,
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
			title : y_title,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			tickformat: y_ticks
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  formatDate(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
ch_layout.push(layout);
};
};

//Generating Chart	
var config = {responsive: true,
              displayModeBar: false};
			  
	
//Clearing out Divs
var CHART0 = document.getElementById("chart0_output");
var CHART1 = document.getElementById("chart1_output");
var CHART2 = document.getElementById("chart2_output");
var CHART3 = document.getElementById("chart3_output");
var CHART4 = document.getElementById("chart4_output");

CHART0.innerHTML = "";
CHART1.innerHTML = "";
CHART2.innerHTML = "";
CHART3.innerHTML = "";
CHART4.innerHTML = "";

Plotly.newPlot(CHART0, ch_0, ch_layout[0], config);
Plotly.newPlot(CHART1, ch_1, ch_layout[1], config);
Plotly.newPlot(CHART2, ch_2, ch_layout[2], config);
Plotly.newPlot(CHART3, ch_3, ch_layout[3], config);
Plotly.newPlot(CHART4, ch_4, ch_layout[4], config);

//Button Events

var chart0_csv = document.getElementById('chart0_csv');
var chart0_png = document.getElementById('chart0_png');
var chart1_csv = document.getElementById('chart1_csv');
var chart1_png = document.getElementById('chart1_png');
var chart2_csv = document.getElementById('chart2_csv');
var chart2_png = document.getElementById('chart2_png');
var chart3_csv = document.getElementById('chart3_csv');
var chart3_png = document.getElementById('chart3_png');
var chart4_csv = document.getElementById('chart4_csv');
var chart4_png = document.getElementById('chart4_png');
if(varType == "hhold") { 
	chart0_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	chart1_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	chart2_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	chart3_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	chart4_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	
	chart0_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART0, 0); }; 
	chart1_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART1, 0); }; 
	chart2_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART2, 0); }; 
	chart3_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART3, 0); }; 
	chart4_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART4, 0); }; 
} else {
	chart0_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 
	chart1_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 
	chart2_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 
	chart3_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 
	chart4_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 

	chart0_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART0, 0); }; 
	chart1_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART1, 0); }; 
	chart2_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART2, 0); }; 
	chart3_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART3, 0); }; 
	chart4_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART4, 0); }; 
};	

}); //end of d3 json
}; //end of genHOUSEAGE