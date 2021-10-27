//Website functions fror State Demography Office Demographic Profile
//A. Bickford 9/2021

//list of lookup statements  https://github.com/ColoradoDemography/MS_Demog_Lookups/tree/master/doc

//Profile functions
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


//muni_county provides county designation for municiplaities (based oased on largest population for multi-county munis
function muni_county(muni){
var cty_n;
if(muni == '00760'){cty_n = '071'};
if(muni == '00925'){cty_n = '121'};
if(muni == '01090'){cty_n = '003'};
if(muni == '01530'){cty_n = '093'};
if(muni == '02355'){cty_n = '021'};
if(muni == '03235'){cty_n = '073'};
if(muni == '03455'){cty_n = '059'};
if(muni == '03620'){cty_n = '097'};
if(muni == '03950'){cty_n = '123'};
if(muni == '04000'){cty_n = '005'};
if(muni == '04110'){cty_n = '037'};
if(muni == '04935'){cty_n = '037'};
if(muni == '05265'){cty_n = '067'};
if(muni == '06090'){cty_n = '001'};
if(muni == '06255'){cty_n = '069'};
if(muni == '06530'){cty_n = '063'};
if(muni == '07025'){cty_n = '047'};
if(muni == '07190'){cty_n = '023'};
if(muni == '07410'){cty_n = '117'};
if(muni == '07571'){cty_n = '109'};
if(muni == '07795'){cty_n = '101'};
if(muni == '07850'){cty_n = '013'};
if(muni == '08070'){cty_n = '005'};
if(muni == '08345'){cty_n = '071'};
if(muni == '08400'){cty_n = '117'};
if(muni == '08675'){cty_n = '001'};
if(muni == '09115'){cty_n = '043'};
if(muni == '09280'){cty_n = '014'};
if(muni == '09555'){cty_n = '087'};
if(muni == '10105'){cty_n = '015'};
if(muni == '10600'){cty_n = '063'};
if(muni == '11260'){cty_n = '041'};
if(muni == '11645'){cty_n = '009'};
if(muni == '11810'){cty_n = '043'};
if(muni == '12045'){cty_n = '045'};
if(muni == '12080'){cty_n = '045'};
if(muni == '12387'){cty_n = '035'};
if(muni == '12415'){cty_n = '035'};
if(muni == '12635'){cty_n = '029'};
if(muni == '12815'){cty_n = '005'};
if(muni == '12855'){cty_n = '109'};
if(muni == '12910'){cty_n = '999'};
if(muni == '13460'){cty_n = '089'};
if(muni == '13845'){cty_n = '005'};
if(muni == '14175'){cty_n = '017'};
if(muni == '14765'){cty_n = '079'};
if(muni == '15330'){cty_n = '043'};
if(muni == '15550'){cty_n = '071'};
if(muni == '15605'){cty_n = '077'};
if(muni == '16000'){cty_n = '041'};
if(muni == '16385'){cty_n = '005'};
if(muni == '16495'){cty_n = '001'};
if(muni == '17375'){cty_n = '083'};
if(muni == '17760'){cty_n = '081'};
if(muni == '17925'){cty_n = '029'};
if(muni == '18310'){cty_n = '051'};
if(muni == '18420'){cty_n = '109'};
if(muni == '18530'){cty_n = '119'};
if(muni == '18640'){cty_n = '075'};
if(muni == '18750'){cty_n = '025'};
if(muni == '19080'){cty_n = '123'};
if(muni == '19355'){cty_n = '077'};
if(muni == '19630'){cty_n = '005'};
if(muni == '19795'){cty_n = '105'};
if(muni == '19850'){cty_n = '029'};
if(muni == '20000'){cty_n = '031'};
if(muni == '20440'){cty_n = '117'};
if(muni == '20495'){cty_n = '081'};
if(muni == '20770'){cty_n = '083'};
if(muni == '21265'){cty_n = '033'};
if(muni == '22035'){cty_n = '067'};
if(muni == '22145'){cty_n = '061'};
if(muni == '22200'){cty_n = '037'};
if(muni == '22860'){cty_n = '123'};
if(muni == '23025'){cty_n = '125'};
if(muni == '23135'){cty_n = '059'};
if(muni == '23740'){cty_n = '039'};
if(muni == '24620'){cty_n = '019'};
if(muni == '24785'){cty_n = '005'};
if(muni == '24950'){cty_n = '123'};
if(muni == '25115'){cty_n = '069'};
if(muni == '25280'){cty_n = '123'};
if(muni == '25610'){cty_n = '093'};
if(muni == '26270'){cty_n = '001'};
if(muni == '26600'){cty_n = '123'};
if(muni == '26765'){cty_n = '063'};
if(muni == '26875'){cty_n = '075'};
if(muni == '27040'){cty_n = '043'};
if(muni == '27425'){cty_n = '069'};
if(muni == '27700'){cty_n = '123'};
if(muni == '27810'){cty_n = '087'};
if(muni == '27865'){cty_n = '041'};
if(muni == '27975'){cty_n = '089'};
if(muni == '28105'){cty_n = '005'};
if(muni == '28305'){cty_n = '049'};
if(muni == '28360'){cty_n = '123'};
if(muni == '28690'){cty_n = '117'};
if(muni == '28745'){cty_n = '077'};
if(muni == '29185'){cty_n = '123'};
if(muni == '29680'){cty_n = '073'};
if(muni == '29735'){cty_n = '019'};
if(muni == '29955'){cty_n = '123'};
if(muni == '30340'){cty_n = '005'};
if(muni == '30780'){cty_n = '045'};
if(muni == '30835'){cty_n = '059'};
if(muni == '31550'){cty_n = '099'};
if(muni == '31605'){cty_n = '049'};
if(muni == '31660'){cty_n = '077'};
if(muni == '31715'){cty_n = '049'};
if(muni == '32155'){cty_n = '123'};
if(muni == '32650'){cty_n = '041'};
if(muni == '33035'){cty_n = '005'};
if(muni == '33310'){cty_n = '123'};
if(muni == '33640'){cty_n = '051'};
if(muni == '33695'){cty_n = '037'};
if(muni == '34520'){cty_n = '099'};
if(muni == '34740'){cty_n = '061'};
if(muni == '34960'){cty_n = '095'};
if(muni == '35070'){cty_n = '107'};
if(muni == '36610'){cty_n = '087'};
if(muni == '37215'){cty_n = '099'};
if(muni == '37270'){cty_n = '095'};
if(muni == '37380'){cty_n = '003'};
if(muni == '37545'){cty_n = '029'};
if(muni == '37600'){cty_n = '049'};
if(muni == '37820'){cty_n = '123'};
if(muni == '37875'){cty_n = '073'};
if(muni == '38370'){cty_n = '019'};
if(muni == '38535'){cty_n = '067'};
if(muni == '38590'){cty_n = '075'};
if(muni == '39195'){cty_n = '013'};
if(muni == '39855'){cty_n = '123'};
if(muni == '39965'){cty_n = '115'};
if(muni == '40185'){cty_n = '123'};
if(muni == '40515'){cty_n = '123'};
if(muni == '40570'){cty_n = '071'};
if(muni == '40790'){cty_n = '039'};
if(muni == '41010'){cty_n = '017'};
if(muni == '41560'){cty_n = '049'};
if(muni == '41835'){cty_n = '013'};
if(muni == '42055'){cty_n = '021'};
if(muni == '42110'){cty_n = '089'};
if(muni == '42330'){cty_n = '053'};
if(muni == '42495'){cty_n = '059'};
if(muni == '43000'){cty_n = '059'};
if(muni == '43110'){cty_n = '099'};
if(muni == '43550'){cty_n = '035'};
if(muni == '43605'){cty_n = '123'};
if(muni == '43660'){cty_n = '011'};
if(muni == '44100'){cty_n = '055'};
if(muni == '44320'){cty_n = '065'};
if(muni == '44980'){cty_n = '073'};
if(muni == '45255'){cty_n = '005'};
if(muni == '45530'){cty_n = '123'};
if(muni == '45695'){cty_n = '087'};
if(muni == '45955'){cty_n = '035'};
if(muni == '45970'){cty_n = '013'};
if(muni == '46355'){cty_n = '013'};
if(muni == '46465'){cty_n = '069'};
if(muni == '47070'){cty_n = '013'};
if(muni == '48060'){cty_n = '021'};
if(muni == '48115'){cty_n = '083'};
if(muni == '48445'){cty_n = '041'};
if(muni == '48500'){cty_n = '089'};
if(muni == '48555'){cty_n = '051'};
if(muni == '49600'){cty_n = '123'};
if(muni == '49875'){cty_n = '103'};
if(muni == '50040'){cty_n = '075'};
if(muni == '50480'){cty_n = '123'};
if(muni == '50920'){cty_n = '037'};
if(muni == '51250'){cty_n = '109'};
if(muni == '51635'){cty_n = '105'};
if(muni == '51690'){cty_n = '117'};
if(muni == '51745'){cty_n = '085'};
if(muni == '51800'){cty_n = '041'};
if(muni == '52075'){cty_n = '059'};
if(muni == '52350'){cty_n = '059'};
if(muni == '52550'){cty_n = '113'};
if(muni == '52570'){cty_n = '051'};
if(muni == '53120'){cty_n = '085'};
if(muni == '53175'){cty_n = '013'};
if(muni == '53395'){cty_n = '045'};
if(muni == '54330'){cty_n = '001'};
if(muni == '54880'){cty_n = '113'};
if(muni == '54935'){cty_n = '085'};
if(muni == '55045'){cty_n = '123'};
if(muni == '55155'){cty_n = '107'};
if(muni == '55540'){cty_n = '085'};
if(muni == '55705'){cty_n = '025'};
if(muni == '55870'){cty_n = '113'};
if(muni == '55980'){cty_n = '029'};
if(muni == '56145'){cty_n = '025'};
if(muni == '56365'){cty_n = '121'};
if(muni == '56420'){cty_n = '091'};
if(muni == '56475'){cty_n = '115'};
if(muni == '56860'){cty_n = '007'};
if(muni == '56970'){cty_n = '077'};
if(muni == '57025'){cty_n = '041'};
if(muni == '57245'){cty_n = '095'};
if(muni == '57300'){cty_n = '029'};
if(muni == '57400'){cty_n = '045'};
if(muni == '57630'){cty_n = '035'};
if(muni == '58235'){cty_n = '075'};
if(muni == '59005'){cty_n = '123'};
if(muni == '59830'){cty_n = '051'};
if(muni == '60160'){cty_n = '123'};
if(muni == '60600'){cty_n = '015'};
if(muni == '61315'){cty_n = '009'};
if(muni == '62000'){cty_n = '101'};
if(muni == '62660'){cty_n = '041'};
if(muni == '62880'){cty_n = '103'};
if(muni == '63045'){cty_n = '123'};
if(muni == '63265'){cty_n = '037'};
if(muni == '64090'){cty_n = '033'};
if(muni == '64200'){cty_n = '091'};
if(muni == '64255'){cty_n = '045'};
if(muni == '64970'){cty_n = '043'};
if(muni == '65190'){cty_n = '089'};
if(muni == '65740'){cty_n = '021'};
if(muni == '66895'){cty_n = '101'};
if(muni == '67005'){cty_n = '109'};
if(muni == '67280'){cty_n = '015'};
if(muni == '67830'){cty_n = '021'};
if(muni == '68105'){cty_n = '023'};
if(muni == '68655'){cty_n = '113'};
if(muni == '68930'){cty_n = '115'};
if(muni == '69040'){cty_n = '063'};
if(muni == '69150'){cty_n = '123'};
if(muni == '69645'){cty_n = '005'};
if(muni == '69700'){cty_n = '061'};
if(muni == '70195'){cty_n = '045'};
if(muni == '70250'){cty_n = '027'};
if(muni == '70360'){cty_n = '019'};
if(muni == '70525'){cty_n = '117'};
if(muni == '70580'){cty_n = '111'};
if(muni == '70635'){cty_n = '039'};
if(muni == '71755'){cty_n = '097'};
if(muni == '72395'){cty_n = '105'};
if(muni == '73330'){cty_n = '009'};
if(muni == '73715'){cty_n = '071'};
if(muni == '73825'){cty_n = '107'};
if(muni == '73935'){cty_n = '075'};
if(muni == '74485'){cty_n = '063'};
if(muni == '74815'){cty_n = '025'};
if(muni == '75640'){cty_n = '013'};
if(muni == '75970'){cty_n = '089'};
if(muni == '76795'){cty_n = '113'};
if(muni == '77290'){cty_n = '001'};
if(muni == '77510'){cty_n = '069'};
if(muni == '78610'){cty_n = '071'};
if(muni == '79270'){cty_n = '009'};
if(muni == '80040'){cty_n = '037'};
if(muni == '80865'){cty_n = '119'};
if(muni == '81030'){cty_n = '009'};
if(muni == '81690'){cty_n = '063'};
if(muni == '82130'){cty_n = '057'};
if(muni == '82350'){cty_n = '055'};
if(muni == '82460'){cty_n = '009'};
if(muni == '82735'){cty_n = '013'};
if(muni == '83230'){cty_n = '069'};
if(muni == '83450'){cty_n = '027'};
if(muni == '83835'){cty_n = '001'};
if(muni == '84440'){cty_n = '059'};
if(muni == '84770'){cty_n = '087'};
if(muni == '85045'){cty_n = '099'};
if(muni == '85155'){cty_n = '043'};
if(muni == '85485'){cty_n = '123'};
if(muni == '85705'){cty_n = '049'};
if(muni == '86090'){cty_n = '119'};
if(muni == '86310'){cty_n = '125'};
if(muni == '86475'){cty_n = '107'};
if(muni == '86750'){cty_n = '125'};
return cty_n;
} //end of muni_county
   
//cdp_county returns county code for cdp
function cdp_county(cdp) {
	if(cdp == '06172'){cty = '001'};
if(cdp == '20275'){cty = '001'};
if(cdp == '54750'){cty = '001'};
if(cdp == '69480'){cty = '001'};
if(cdp == '69810'){cty = '001'};
if(cdp == '77757'){cty = '001'};
if(cdp == '79100'){cty = '001'};
if(cdp == '83120'){cty = '001'};
if(cdp == '74375'){cty = '001'};
if(cdp == '82905'){cty = '001'};
if(cdp == '01145'){cty = '003'};
if(cdp == '00620'){cty = '005'};
if(cdp == '08530'){cty = '005'};
if(cdp == '10985'){cty = '005'};
if(cdp == '13590'){cty = '005'};
if(cdp == '16465'){cty = '005'};
if(cdp == '21330'){cty = '005'};
if(cdp == '37220'){cty = '005'};
if(cdp == '38910'){cty = '005'};
if(cdp == '58510'){cty = '005'};
if(cdp == '16110'){cty = '005'};
if(cdp == '02905'){cty = '007'};
if(cdp == '34685'){cty = '011'};
if(cdp == '01420'){cty = '013'};
if(cdp == '01740'){cty = '013'};
if(cdp == '04620'){cty = '013'};
if(cdp == '07580'){cty = '013'};
if(cdp == '18585'){cty = '013'};
if(cdp == '23575'){cty = '013'};
if(cdp == '23630'){cty = '013'};
if(cdp == '30350'){cty = '013'};
if(cdp == '30945'){cty = '013'};
if(cdp == '33502'){cty = '013'};
if(cdp == '35860'){cty = '013'};
if(cdp == '44270'){cty = '013'};
if(cdp == '44695'){cty = '013'};
if(cdp == '52210'){cty = '013'};
if(cdp == '53780'){cty = '013'};
if(cdp == '57445'){cty = '013'};
if(cdp == '59240'){cty = '013'};
if(cdp == '67040'){cty = '013'};
if(cdp == '69110'){cty = '013'};
if(cdp == '74980'){cty = '013'};
if(cdp == '75585'){cty = '013'};
if(cdp == '76325'){cty = '013'};
if(cdp == '80370'){cty = '013'};
if(cdp == '15302'){cty = '013'};
if(cdp == '29295'){cty = '015'};
if(cdp == '39800'){cty = '015'};
if(cdp == '49490'){cty = '015'};
if(cdp == '71625'){cty = '015'};
if(cdp == '21390'){cty = '019'};
if(cdp == '27175'){cty = '019'};
if(cdp == '67142'){cty = '019'};
if(cdp == '79785'){cty = '019'};
if(cdp == '11975'){cty = '021'};
if(cdp == '16715'){cty = '021'};
if(cdp == '27535'){cty = '023'};
if(cdp == '67500'){cty = '023'};
if(cdp == '00320'){cty = '035'};
if(cdp == '12387'){cty = '035'};
if(cdp == '28250'){cty = '035'};
if(cdp == '31935'){cty = '035'};
if(cdp == '36410'){cty = '035'};
if(cdp == '46410'){cty = '035'};
if(cdp == '50012'){cty = '035'};
if(cdp == '58592'){cty = '035'};
if(cdp == '66197'){cty = '035'};
if(cdp == '68875'){cty = '035'};
if(cdp == '74080'){cty = '035'};
if(cdp == '77235'){cty = '035'};
if(cdp == '83500'){cty = '035'};
if(cdp == '21155'){cty = '037'};
if(cdp == '23300'){cty = '037'};
if(cdp == '23795'){cty = '037'};
if(cdp == '28830'){cty = '037'};
if(cdp == '47345'){cty = '037'};
if(cdp == '85760'){cty = '037'};
if(cdp == '00870'){cty = '041'};
if(cdp == '06970'){cty = '041'};
if(cdp == '12325'){cty = '041'};
if(cdp == '14587'){cty = '041'};
if(cdp == '24235'){cty = '041'};
if(cdp == '27370'){cty = '041'};
if(cdp == '30420'){cty = '041'};
if(cdp == '58675'){cty = '041'};
if(cdp == '64870'){cty = '041'};
if(cdp == '68847'){cty = '041'};
if(cdp == '74430'){cty = '041'};
if(cdp == '86117'){cty = '041'};
if(cdp == '23520'){cty = '039'};
if(cdp == '60655'){cty = '039'};
if(cdp == '15440'){cty = '043'};
if(cdp == '17485'){cty = '043'};
if(cdp == '37655'){cty = '043'};
if(cdp == '45145'){cty = '043'};
if(cdp == '58400'){cty = '043'};
if(cdp == '05120'){cty = '045'};
if(cdp == '12460'){cty = '045'};
if(cdp == '12470'){cty = '045'};
if(cdp == '12945'){cty = '045'};
if(cdp == '52820'){cty = '045'};
if(cdp == '53875'){cty = '045'};
if(cdp == '65685'){cty = '047'};
if(cdp == '57850'){cty = '049'};
if(cdp == '76190'){cty = '049'};
if(cdp == '12450'){cty = '053'};
if(cdp == '58960'){cty = '053'};
if(cdp == '02575'){cty = '059'};
if(cdp == '03730'){cty = '059'};
if(cdp == '19150'){cty = '059'};
if(cdp == '22575'){cty = '059'};
if(cdp == '25390'){cty = '059'};
if(cdp == '25550'){cty = '059'};
if(cdp == '29625'){cty = '059'};
if(cdp == '38480'){cty = '059'};
if(cdp == '38810'){cty = '059'};
if(cdp == '40377'){cty = '059'};
if(cdp == '41065'){cty = '059'};
if(cdp == '84042'){cty = '059'};
if(cdp == '08290'){cty = '061'};
if(cdp == '78335'){cty = '061'};
if(cdp == '72320'){cty = '067'};
if(cdp == '44375'){cty = '065'};
if(cdp == '79105'){cty = '065'};
if(cdp == '43220'){cty = '069'};
if(cdp == '63320'){cty = '069'};
if(cdp == '24290'){cty = '071'};
if(cdp == '36940'){cty = '071'};
if(cdp == '39250'){cty = '071'};
if(cdp == '47015'){cty = '071'};
if(cdp == '68985'){cty = '071'};
if(cdp == '74275'){cty = '071'};
if(cdp == '80095'){cty = '071'};
if(cdp == '84000'){cty = '071'};
if(cdp == '03840'){cty = '075'};
if(cdp == '56695'){cty = '075'};
if(cdp == '15165'){cty = '077'};
if(cdp == '28800'){cty = '077'};
if(cdp == '45750'){cty = '077'};
if(cdp == '56035'){cty = '077'};
if(cdp == '63375'){cty = '077'};
if(cdp == '49325'){cty = '081'};
if(cdp == '44595'){cty = '083'};
if(cdp == '78280'){cty = '083'};
if(cdp == '63705'){cty = '085'};
if(cdp == '07420'){cty = '087'};
if(cdp == '39160'){cty = '087'};
if(cdp == '51975'){cty = '087'};
if(cdp == '55925'){cty = '087'};
if(cdp == '66995'){cty = '087'};
if(cdp == '71790'){cty = '087'};
if(cdp == '78345'){cty = '087'};
if(cdp == '83175'){cty = '087'};
if(cdp == '42165'){cty = '089'};
if(cdp == '54495'){cty = '089'};
if(cdp == '15825'){cty = '091'};
if(cdp == '45680'){cty = '091'};
if(cdp == '60765'){cty = '091'};
if(cdp == '33420'){cty = '093'};
if(cdp == '01915'){cty = '095'};
if(cdp == '53945'){cty = '097'};
if(cdp == '63650'){cty = '097'};
if(cdp == '86200'){cty = '097'};
if(cdp == '04165'){cty = '101'};
if(cdp == '06602'){cty = '101'};
if(cdp == '07245'){cty = '101'};
if(cdp == '15935'){cty = '101'};
if(cdp == '62220'){cty = '101'};
if(cdp == '67445'){cty = '101'};
if(cdp == '81305'){cty = '101'};
if(cdp == '01640'){cty = '105'};
if(cdp == '29845'){cty = '105'};
if(cdp == '58758'){cty = '107'};
if(cdp == '17150'){cty = '117'};
if(cdp == '35400'){cty = '117'};
if(cdp == '40550'){cty = '117'};
if(cdp == '20605'){cty = '119'};
if(cdp == '27095'){cty = '119'};
if(cdp == '30890'){cty = '119'};
if(cdp == '50380'){cty = '119'};
if(cdp == '03015'){cty = '123'};
if(cdp == '38425'){cty = '125'};
if(cdp == '39745'){cty = '125'};
if(cdp == '40900'){cty = '125'};
if(cdp == '42000'){cty = '125'};
if(cdp == '80755'){cty = '125'};
return cty;
} //end of cdp_county				  


//RegionNum takes the names of selected regions and returns a list of region numbers
function RegionNumber(nam) {
	   var regionlst = '0';
	   var regNum;
for(i = 0; i < nam.length; i++) {
	if(nam[i] == 'Denver PMSA'){ regionNum = '20'};
	if(nam[i] == 'Denver-Boulder Metro Area'){ regionNum = '21'};
	if(nam[i] == 'Denver-Boulder-Greely CMSA'){ regionNum = '22'};
	if(nam[i] == '10 County Denver Metro Area'){ regionNum = '23'};
	if(nam[i] == 'Central Mountains'){ regionNum = '15'};
	if(nam[i] == 'Eastern Plains'){ regionNum = '16'};
	if(nam[i] == 'Front Range'){ regionNum = '17'};
	if(nam[i] == 'San Luis Valley'){ regionNum = '18'};
	if(nam[i] == 'Western Slope'){ regionNum = '19'};
	if(nam[i] == 'Region 1: Northern Eastern Plains'){ regionNum = '1'};
	if(nam[i] == 'Region 2: Northern Front Range'){ regionNum = '2'};
	if(nam[i] == 'Region 3: Denver Metropolitan Area'){ regionNum = '3'};
	if(nam[i] == 'Region 4: Southern Front Range'){ regionNum = '4'};
	if(nam[i] == 'Region 5: Central Eastern Plains'){ regionNum = '5'};
	if(nam[i] == 'Region 6: Southern Eastern Plains'){ regionNum = '6'};
	if(nam[i] == 'Region 7: Pueblo County'){ regionNum = '7'};
	if(nam[i] == 'Region 8: San Juan Valley'){ regionNum = '8'};
	if(nam[i] == 'Region 9: Southern Western Slope'){ regionNum = '9'};
	if(nam[i] == 'Region 10: Central Western Slope'){ regionNum = '10'};
	if(nam[i] == 'Region 11: Northern Western Slope'){ regionNum = '11'};
	if(nam[i] == 'Region 12: Northern Mountains'){ regionNum = '12'};
	if(nam[i] == 'Region 13: Central Mountains'){ regionNum = '13'};
	if(nam[i] == 'Region 14: Southern Mountains'){ regionNum = '14'};
    regionlst = regionlst + "," + regionNum;
};
return(regionlst);
}; //End of RegionNumber

//RegionName takes the region number and returns the name
function regionName(reg) {
	 if(reg == 0) { name = "Colorado"};
	 if(reg == 20){name = 'Denver PMSA'};
	 if(reg == 21){name = 'Denver-Boulder Metro Area'};
	 if(reg == 22){name = 'Denver-Boulder-Greely CMSA'};
	 if(reg == 23){name = '10 County Denver Metro Area'};
	 if(reg == 15){name = 'Central Mountains'};
	 if(reg == 16){name = 'Eastern Plains'};
	 if(reg == 17){name = 'Front Range'};
	 if(reg == 18){name = 'San Luis Valley'};
	 if(reg == 19){name = 'Western Slope'};
	 if(reg == 1){name = 'Region 1: Northern Eastern Plains'};
	 if(reg == 2){name = 'Region 2: Northern Front Range'};
	 if(reg == 3){name = 'Region 3: Denver Metropolitan Area'};
	 if(reg == 4){name = 'Region 4: Southern Front Range'};
	 if(reg == 5){name = 'Region 5: Central Eastern Plains'};
	 if(reg == 6){name = 'Region 6: Southern Eastern Plains'};
	 if(reg == 7){name = 'Region 7: Pueblo County'};
	 if(reg == 8){name = 'Region 8: San Juan Valley'};
	 if(reg == 9){name = 'Region 9: Southern Western Slope'};
	 if(reg == 10){name = 'Region 10: Central Western Slope'};
	 if(reg == 11){name = 'Region 11: Northern Western Slope'};
	 if(reg == 12){name = 'Region 12: Northern Mountains'};
	 if(reg == 13){name = 'Region 13: Central Mountains'};
	 if(reg == 14){name = 'Region 14: Southern Mountains'};
return name;
}; //End of Regionname

//regioncty  reegion array
function regionCOL(inReg) {
	var fips = []; 
     if(inReg == 'Denver PMSA'){fips.push({'fips' : ['001', '005', '014', '031', '035', '059'], 'color' : '#008000 '})};
	 if(inReg == 'Denver-Boulder Metro Area'){fips.push({'fips' : ['001', '005', '013', '014', '031', '035', '059'], 'color' : '#006600'})};
	 if(inReg == 'Denver-Boulder-Greely CMSA'){fips.push({'fips' : ['001', '005', '013', '014', '031', '035', '059', '123'], 'color' : ' #009900'})};
	 if(inReg == '10 County Denver Metro Area'){fips.push({'fips' : ['001', '005', '014', '019', '031', '035', '041', '047', '059', '093'], 'color' : '#00cc00'})};
	 if(inReg == 'Central Mountains'){fips.push({'fips' : ['015', '019', '027', '043', '047', '055', '065', '071', '093'], 'color' : ' #00ff00'})};	
	 if(inReg == 'Eastern Plains'){fips.push({'fips' :['009', '011', '017', '025', '039', '061', '063', '073', '075', '087', '089', '095', '099', '115', '121', '125'], 'color' : '#E4D00A'})};
	 if(inReg == 'Front Range'){fips.push({'fips' :['001', '005', '013', '014', '031', '035', '041', '059', '069', '101','119','123'], 'color' : '#66ff66'})};
	 if(inReg == 'San Luis Valley'){fips.push({'fips' :['003', '021', '023', '079', '105', '109'], 'color' : '#99ff99'})};
	 if(inReg == 'Western Slope'){fips.push({'fips' :['007', '029', '033', '037', '045', '049', '051', '053', '057', '067', '077', '081', '083', '085', '091', '097', '103', '107', '111', '113', '117'], 'color' : '#ccfecc'})};
	 if(inReg == 'Region 1: Northern Eastern Plains'){fips.push({'fips' :['075','087','095','115','121','125'], 'color' : '#89CFF0'})};
	 if(inReg == 'Region 2: Northern Front Range'){fips.push({'fips' :['069','123'], 'color' : '#7393B3'})};
	 if(inReg == 'Region 3: Denver Metropolitan Area'){fips.push({'fips' :['001','005','013','014','019','031','035','047','059'], 'color' : '#5F9EA0'})};
	 if(inReg == 'Region 4: Southern Front Range'){fips.push({'fips' :['041','093','119'], 'color' : '#0f3c78'})};
	 if(inReg == 'Region 5: Central Eastern Plains'){fips.push({'fips' :['017','039','063','073'], 'color' : '#134b96'})};
	 if(inReg == 'Region 6: Southern Eastern Plains'){fips.push({'fips' :['009','011','025','061','089','099'], 'color' : '#175bb4'})};
	 if(inReg == 'Region 7: Pueblo County'){fips.push({'fips' :['101'], 'color' : ' #1b6ad2'})};
	 if(inReg == 'Region 8: San Juan Valley'){fips.push({'fips' :['003','021','023','079','105','109'], 'color' : ' #2c7be3'})};
	 if(inReg == 'Region 9: Southern Western Slope'){fips.push({'fips' :['007','033','067','083','111'], 'color' : '#4a8ee7'})};
	 if(inReg == 'Region 10: Central Western Slope'){fips.push({'fips' :['029','051','053','085','091','113'], 'color' : '#68a0eb'})};
	 if(inReg == 'Region 11: Northern Western Slope'){fips.push({'fips' :['045','077','081','103','107'], 'color' : '#86b3ef'})};
	 if(inReg == 'Region 12: Northern Mountains'){fips.push({'fips' :['037','049','057','097','117'], 'color' : '#a4c6f3'})};
	 if(inReg == 'Region 13: Central Mountains'){fips.push({'fips' :['015','027','043','065'], 'color' : '#c2d9f7'})};
	 if(inReg == 'Region 14: Southern Mountains'){fips.push({'fips' :['055','071'], 'color' : '#e0ecfb'})};
	 return fips;
	};


//countyName  Returns a county name from the fips code
function countyName(cty){
	if(cty == 0) {name = "Colorado"};
	if(cty == 1){name = 'Adams County'};
	if(cty == 3){name = 'Alamosa County'};
	if(cty == 5){name = 'Arapahoe County'};
	if(cty == 7){name = 'Archuleta County'};
	if(cty == 9){name = 'Baca County'};
	if(cty == 11){name = 'Bent County'};
	if(cty == 13){name = 'Boulder County'};
	if(cty == 14){name = 'Broomfield County'};
	if(cty == 15){name = 'Chaffee County'};
	if(cty == 17){name = 'Cheyenne County'};
	if(cty == 19){name = 'Clear Creek County'};
	if(cty == 21){name = 'Conejos County'};
	if(cty == 23){name = 'Costilla County'};
	if(cty == 25){name = 'Crowley County'};
	if(cty == 27){name = 'Custer County'};
	if(cty == 29){name = 'Delta County'};
	if(cty == 31){name = 'Denver County'};
	if(cty == 33){name = 'Dolores County'};
	if(cty == 35){name = 'Douglas County'};
	if(cty == 37){name = 'Eagle County'};
	if(cty == 39){name = 'Elbert County'};
	if(cty == 41){name = 'El Paso County'};
	if(cty == 43){name = 'Fremont County'};
	if(cty == 45){name = 'Garfield County'};
	if(cty == 47){name = 'Gilpin County'};
	if(cty == 49){name = 'Grand County'};
	if(cty == 51){name = 'Gunnison County'};
	if(cty == 53){name = 'Hinsdale County'};
	if(cty == 55){name = 'Huerfano County'};
	if(cty == 57){name = 'Jackson County'};
	if(cty == 59){name = 'Jefferson County'};
	if(cty == 61){name = 'Kiowa County'};
	if(cty == 63){name = 'Kit Carson County'};
	if(cty == 65){name = 'Lake County'};
	if(cty == 67){name = 'La Plata County'};
	if(cty == 69){name = 'Larimer County'};
	if(cty == 71){name = 'Las Animas County'};
	if(cty == 73){name = 'Lincoln County'};
	if(cty == 75){name = 'Logan County'};
	if(cty == 77){name = 'Mesa County'};
	if(cty == 79){name = 'Mineral County'};
	if(cty == 81){name = 'Moffat County'};
	if(cty == 83){name = 'Montezuma County'};
	if(cty == 85){name = 'Montrose County'};
	if(cty == 87){name = 'Morgan County'};
	if(cty == 89){name = 'Otero County'};
	if(cty == 91){name = 'Ouray County'};
	if(cty == 93){name = 'Park County'};
	if(cty == 95){name = 'Phillips County'};
	if(cty == 97){name = 'Pitkin County'};
	if(cty == 99){name = 'Prowers County'};
	if(cty == 101){name = 'Pueblo County'};
	if(cty == 103){name = 'Rio Blanco County'};
	if(cty == 105){name = 'Rio Grande County'};
	if(cty == 107){name = 'Routt County'};
	if(cty == 109){name = 'Saguache County'};
	if(cty == 111){name = 'San Juan County'};
	if(cty == 113){name = 'San Miguel County'};
	if(cty == 115){name = 'Sedgwick County'};
	if(cty == 117){name = 'Summit County'};
	if(cty == 119){name = 'Teller County'};
	if(cty == 121){name = 'Washington County'};
	if(cty == 123){name = 'Weld County'};
	if(cty == 125){name = 'Yuma County'};
return name;
}; //end of countyName

//muniName Returns Municipality name from FIPS code
function muniName(muni){
	var name;
	if(muni == 0) {name = 'Colorado'};
	if(muni == 760){name = 'Aguilar town'};
	if(muni == 925){name = 'Akron town'};
	if(muni == 1090){name = 'Alamosa city'};
	if(muni == 1530){name = 'Alma town'};
	if(muni == 2355){name = 'Antonito town'};
	if(muni == 3235){name = 'Arriba town'};
	if(muni == 3455){name = 'Arvada city'};
	if(muni == 3620){name = 'Aspen city'};
	if(muni == 3950){name = 'Ault town'};
	if(muni == 4000){name = 'Aurora city'};
	if(muni == 4110){name = 'Avon town'};
	if(muni == 4935){name = 'Basalt town'};
	if(muni == 5265){name = 'Bayfield town'};
	if(muni == 6090){name = 'Bennett town'};
	if(muni == 6255){name = 'Berthoud town'};
	if(muni == 6530){name = 'Bethune town'};
	if(muni == 7025){name = 'Black Hawk city'};
	if(muni == 7190){name = 'Blanca town'};
	if(muni == 7410){name = 'Blue River town'};
	if(muni == 7571){name = 'Bonanza town'};
	if(muni == 7795){name = 'Boone town'};
	if(muni == 7850){name = 'Boulder city'};
	if(muni == 8070){name = 'Bow Mar town'};
	if(muni == 8345){name = 'Branson town'};
	if(muni == 8400){name = 'Breckenridge town'};
	if(muni == 8675){name = 'Brighton city'};
	if(muni == 9115){name = 'Brookside town'};
	if(muni == 9280){name = 'Broomfield city'};
	if(muni == 9555){name = 'Brush city'};
	if(muni == 10105){name = 'Buena Vista town'};
	if(muni == 10600){name = 'Burlington city'};
	if(muni == 11260){name = 'Calhan town'};
	if(muni == 11645){name = 'Campo town'};
	if(muni == 11810){name = 'Cañon City city'};
	if(muni == 12045){name = 'Carbondale town'};
	if(muni == 12390){name = 'Castle Pines North city'};
	if(muni == 12415){name = 'Castle Rock town'};
	if(muni == 12635){name = 'Cedaredge town'};
	if(muni == 12815){name = 'Centennial city'};
	if(muni == 12855){name = 'Center town'};
	if(muni == 12910){name = 'Central City city'};
	if(muni == 13460){name = 'Cheraw town'};
	if(muni == 13845){name = 'Cherry Hills Village city'};
	if(muni == 14175){name = 'Cheyenne Wells town'};
	if(muni == 14765){name = 'City of Creede town'};
	if(muni == 15330){name = 'Coal Creek town'};
	if(muni == 15550){name = 'Cokedale town'};
	if(muni == 15605){name = 'Collbran town'};
	if(muni == 16000){name = 'Colorado Springs city'};
	if(muni == 16385){name = 'Columbine Valley town'};
	if(muni == 16495){name = 'Commerce City city'};
	if(muni == 17375){name = 'Cortez city'};
	if(muni == 17760){name = 'Craig city'};
	if(muni == 17925){name = 'Crawford town'};
	if(muni == 18310){name = 'Crested Butte town'};
	if(muni == 18420){name = 'Crestone town'};
	if(muni == 18530){name = 'Cripple Creek city'};
	if(muni == 18640){name = 'Crook town'};
	if(muni == 18750){name = 'Crowley town'};
	if(muni == 19080){name = 'Dacono city'};
	if(muni == 19355){name = 'De Beque town'};
	if(muni == 19630){name = 'Deer Trail town'};
	if(muni == 19795){name = 'Del Norte town'};
	if(muni == 19850){name = 'Delta city'};
	if(muni == 20000){name = 'Denver city'};
	if(muni == 20440){name = 'Dillon town'};
	if(muni == 20495){name = 'Dinosaur town'};
	if(muni == 20770){name = 'Dolores town'};
	if(muni == 21265){name = 'Dove Creek town'};
	if(muni == 22035){name = 'Durango city'};
	if(muni == 22145){name = 'Eads town'};
	if(muni == 22200){name = 'Eagle town'};
	if(muni == 22860){name = 'Eaton town'};
	if(muni == 23025){name = 'Eckley town'};
	if(muni == 23135){name = 'Edgewater city'};
	if(muni == 23740){name = 'Elizabeth town'};
	if(muni == 24620){name = 'Empire town'};
	if(muni == 24785){name = 'Englewood city'};
	if(muni == 24950){name = 'Erie town'};
	if(muni == 25115){name = 'Estes Park town'};
	if(muni == 25280){name = 'Evans city'};
	if(muni == 25610){name = 'Fairplay town'};
	if(muni == 26270){name = 'Federal Heights city'};
	if(muni == 26600){name = 'Firestone town'};
	if(muni == 26765){name = 'Flagler town'};
	if(muni == 26875){name = 'Fleming town'};
	if(muni == 27040){name = 'Florence city'};
	if(muni == 27425){name = 'Fort Collins city'};
	if(muni == 27700){name = 'Fort Lupton city'};
	if(muni == 27810){name = 'Fort Morgan city'};
	if(muni == 27865){name = 'Fountain city'};
	if(muni == 27975){name = 'Fowler town'};
	if(muni == 28105){name = 'Foxfield town'};
	if(muni == 28305){name = 'Fraser town'};
	if(muni == 28360){name = 'Frederick town'};
	if(muni == 28690){name = 'Frisco town'};
	if(muni == 28745){name = 'Fruita city'};
	if(muni == 29185){name = 'Garden City town'};
	if(muni == 29680){name = 'Genoa town'};
	if(muni == 29735){name = 'Georgetown town'};
	if(muni == 29955){name = 'Gilcrest town'};
	if(muni == 30340){name = 'Glendale city'};
	if(muni == 30780){name = 'Glenwood Springs city'};
	if(muni == 30835){name = 'Golden city'};
	if(muni == 31550){name = 'Granada town'};
	if(muni == 31605){name = 'Granby town'};
	if(muni == 31660){name = 'Grand Junction city'};
	if(muni == 31715){name = 'Grand Lake town'};
	if(muni == 32155){name = 'Greeley city'};
	if(muni == 32650){name = 'Green Mountain Falls town'};
	if(muni == 33035){name = 'Greenwood Village city'};
	if(muni == 33310){name = 'Grover town'};
	if(muni == 33640){name = 'Gunnison city'};
	if(muni == 33695){name = 'Gypsum town'};
	if(muni == 34520){name = 'Hartman town'};
	if(muni == 34740){name = 'Haswell town'};
	if(muni == 34960){name = 'Haxtun town'};
	if(muni == 35070){name = 'Hayden town'};
	if(muni == 36610){name = 'Hillrose town'};
	if(muni == 37215){name = 'Holly town'};
	if(muni == 37270){name = 'Holyoke city'};
	if(muni == 37380){name = 'Hooper town'};
	if(muni == 37545){name = 'Hotchkiss town'};
	if(muni == 37600){name = 'Hot Sulphur Springs town'};
	if(muni == 37820){name = 'Hudson town'};
	if(muni == 37875){name = 'Hugo town'};
	if(muni == 38370){name = 'Idaho Springs city'};
	if(muni == 38535){name = 'Ignacio town'};
	if(muni == 38590){name = 'Iliff town'};
	if(muni == 39195){name = 'Jamestown town'};
	if(muni == 39855){name = 'Johnstown town'};
	if(muni == 39965){name = 'Julesburg town'};
	if(muni == 40185){name = 'Keenesburg town'};
	if(muni == 40515){name = 'Kersey town'};
	if(muni == 40570){name = 'Kim town'};
	if(muni == 40790){name = 'Kiowa town'};
	if(muni == 41010){name = 'Kit Carson town'};
	if(muni == 41560){name = 'Kremmling town'};
	if(muni == 41835){name = 'Lafayette city'};
	if(muni == 42055){name = 'La Jara town'};
	if(muni == 42110){name = 'La Junta city'};
	if(muni == 42330){name = 'Lake City town'};
	if(muni == 42495){name = 'Lakeside town'};
	if(muni == 43000){name = 'Lakewood city'};
	if(muni == 43110){name = 'Lamar city'};
	if(muni == 43550){name = 'Larkspur town'};
	if(muni == 43605){name = 'La Salle town'};
	if(muni == 43660){name = 'Las Animas city'};
	if(muni == 44100){name = 'La Veta town'};
	if(muni == 44320){name = 'Leadville city'};
	if(muni == 44980){name = 'Limon town'};
	if(muni == 45255){name = 'Littleton city'};
	if(muni == 45530){name = 'Lochbuie town'};
	if(muni == 45695){name = 'Log Lane Village town'};
	if(muni == 45955){name = 'Lone Tree city'};
	if(muni == 45970){name = 'Longmont city'};
	if(muni == 46355){name = 'Louisville city'};
	if(muni == 46465){name = 'Loveland city'};
	if(muni == 47070){name = 'Lyons town'};
	if(muni == 48060){name = 'Manassa town'};
	if(muni == 48115){name = 'Mancos town'};
	if(muni == 48445){name = 'Manitou Springs city'};
	if(muni == 48500){name = 'Manzanola town'};
	if(muni == 48555){name = 'Marble town'};
	if(muni == 49600){name = 'Mead town'};
	if(muni == 49875){name = 'Meeker town'};
	if(muni == 50040){name = 'Merino town'};
	if(muni == 50480){name = 'Milliken town'};
	if(muni == 50920){name = 'Minturn town'};
	if(muni == 51250){name = 'Moffat town'};
	if(muni == 51635){name = 'Monte Vista city'};
	if(muni == 51690){name = 'Montezuma town'};
	if(muni == 51745){name = 'Montrose city'};
	if(muni == 51800){name = 'Monument town'};
	if(muni == 52075){name = 'Morrison town'};
	if(muni == 52350){name = 'Mountain View town'};
	if(muni == 52550){name = 'Mountain Village town'};
	if(muni == 52570){name = 'Mount Crested Butte town'};
	if(muni == 53120){name = 'Naturita town'};
	if(muni == 53175){name = 'Nederland town'};
	if(muni == 53395){name = 'New Castle town'};
	if(muni == 54330){name = 'Northglenn city'};
	if(muni == 54880){name = 'Norwood town'};
	if(muni == 54935){name = 'Nucla town'};
	if(muni == 55045){name = 'Nunn town'};
	if(muni == 55155){name = 'Oak Creek town'};
	if(muni == 55540){name = 'Olathe town'};
	if(muni == 55705){name = 'Olney Springs town'};
	if(muni == 55870){name = 'Ophir town'};
	if(muni == 55980){name = 'Orchard City town'};
	if(muni == 56145){name = 'Ordway town'};
	if(muni == 56365){name = 'Otis town'};
	if(muni == 56420){name = 'Ouray city'};
	if(muni == 56475){name = 'Ovid town'};
	if(muni == 56860){name = 'Pagosa Springs town'};
	if(muni == 56970){name = 'Palisade town'};
	if(muni == 57025){name = 'Palmer Lake town'};
	if(muni == 57245){name = 'Paoli town'};
	if(muni == 57300){name = 'Paonia town'};
	if(muni == 57400){name = 'Parachute town'};
	if(muni == 57630){name = 'Parker town'};
	if(muni == 58235){name = 'Peetz town'};
	if(muni == 59005){name = 'Pierce town'};
	if(muni == 59830){name = 'Pitkin town'};
	if(muni == 60160){name = 'Platteville town'};
	if(muni == 60600){name = 'Poncha Springs town'};
	if(muni == 61315){name = 'Pritchett town'};
	if(muni == 62000){name = 'Pueblo city'};
	if(muni == 62660){name = 'Ramah town'};
	if(muni == 62880){name = 'Rangely town'};
	if(muni == 63045){name = 'Raymer (New Raymer) town'};
	if(muni == 63265){name = 'Red Cliff town'};
	if(muni == 64090){name = 'Rico town'};
	if(muni == 64200){name = 'Ridgway town'};
	if(muni == 64255){name = 'Rifle city'};
	if(muni == 64970){name = 'Rockvale town'};
	if(muni == 65190){name = 'Rocky Ford city'};
	if(muni == 65740){name = 'Romeo town'};
	if(muni == 66895){name = 'Rye town'};
	if(muni == 67005){name = 'Saguache town'};
	if(muni == 67280){name = 'Salida city'};
	if(muni == 67830){name = 'Sanford town'};
	if(muni == 68105){name = 'San Luis town'};
	if(muni == 68655){name = 'Sawpit town'};
	if(muni == 68930){name = 'Sedgwick town'};
	if(muni == 69040){name = 'Seibert town'};
	if(muni == 69150){name = 'Severance town'};
	if(muni == 69645){name = 'Sheridan city'};
	if(muni == 69700){name = 'Sheridan Lake town'};
	if(muni == 70195){name = 'Silt town'};
	if(muni == 70250){name = 'Silver Cliff town'};
	if(muni == 70360){name = 'Silver Plume town'};
	if(muni == 70525){name = 'Silverthorne town'};
	if(muni == 70580){name = 'Silverton town'};
	if(muni == 70635){name = 'Simla town'};
	if(muni == 71755){name = 'Snowmass Village town'};
	if(muni == 72395){name = 'South Fork town'};
	if(muni == 73330){name = 'Springfield town'};
	if(muni == 73715){name = 'Starkville town'};
	if(muni == 73825){name = 'Steamboat Springs city'};
	if(muni == 73935){name = 'Sterling city'};
	if(muni == 74485){name = 'Stratton town'};
	if(muni == 74815){name = 'Sugar City town'};
	if(muni == 75640){name = 'Superior town'};
	if(muni == 75970){name = 'Swink town'};
	if(muni == 76795){name = 'Telluride town'};
	if(muni == 77290){name = 'Thornton city'};
	if(muni == 77510){name = 'Timnath town'};
	if(muni == 78610){name = 'Trinidad city'};
	if(muni == 79270){name = 'Two Buttes town'};
	if(muni == 80040){name = 'Vail town'};
	if(muni == 80865){name = 'Victor city'};
	if(muni == 81030){name = 'Vilas town'};
	if(muni == 81690){name = 'Vona town'};
	if(muni == 82130){name = 'Walden town'};
	if(muni == 82350){name = 'Walsenburg city'};
	if(muni == 82460){name = 'Walsh town'};
	if(muni == 82735){name = 'Ward town'};
	if(muni == 83230){name = 'Wellington town'};
	if(muni == 83450){name = 'Westcliffe town'};
	if(muni == 83835){name = 'Westminster city'};
	if(muni == 84440){name = 'Wheat Ridge city'};
	if(muni == 84770){name = 'Wiggins town'};
	if(muni == 85045){name = 'Wiley town'};
	if(muni == 85155){name = 'Williamsburg town'};
	if(muni == 85485){name = 'Windsor town'};
	if(muni == 85705){name = 'Winter Park town'};
	if(muni == 86090){name = 'Woodland Park city'};
	if(muni == 86310){name = 'Wray city'};
	if(muni == 86475){name = 'Yampa town'};
	if(muni == 86750){name = 'Yuma city'};
return name;
};  //end of muniName

//cdpName returns CDP Name from fips code
function cdpName(cdp){
	var name;
	if(cdp == 0) {name = 'Colorado'};
	if(cdp == 320){name = 'Acres Green CDP'};
	if(cdp == 620){name = 'Aetna Estates CDP'};
	if(cdp == 870){name = 'Air Force Academy CDP'};
	if(cdp == 1145){name = 'Alamosa East CDP'};
	if(cdp == 1420){name = 'Allenspark CDP'};
	if(cdp == 1640){name = 'Alpine CDP'};
	if(cdp == 1740){name = 'Altona CDP'};
	if(cdp == 1915){name = 'Amherst CDP'};
	if(cdp == 2575){name = 'Applewood CDP'};
	if(cdp == 2905){name = 'Arboles CDP'};
	if(cdp == 3015){name = 'Aristocrat Ranchettes CDP'};
	if(cdp == 3730){name = 'Aspen Park CDP'};
	if(cdp == 3840){name = 'Atwood CDP'};
	if(cdp == 4165){name = 'Avondale CDP'};
	if(cdp == 4620){name = 'Bark Ranch CDP'};
	if(cdp == 5120){name = 'Battlement Mesa CDP'};
	if(cdp == 6172){name = 'Berkley CDP'};
	if(cdp == 6602){name = 'Beulah Valley CDP'};
	if(cdp == 6970){name = 'Black Forest CDP'};
	if(cdp == 7245){name = 'Blende CDP'};
	if(cdp == 7420){name = 'Blue Sky CDP'};
	if(cdp == 7580){name = 'Bonanza Mountain Estates CDP'};
	if(cdp == 8290){name = 'Brandon CDP'};
	if(cdp == 8530){name = 'Brick Center CDP'};
	if(cdp == 10985){name = 'Byers CDP'};
	if(cdp == 11975){name = 'Capulin CDP'};
	if(cdp == 12325){name = 'Cascade-Chipita Park CDP'};
	if(cdp == 12387){name = 'Castle Pines CDP'};
	if(cdp == 12450){name = 'Cathedral CDP'};
	if(cdp == 12460){name = 'Catherine CDP'};
	if(cdp == 12470){name = 'Cattle Creek CDP'};
	if(cdp == 12945){name = 'Chacra CDP'};
	if(cdp == 13590){name = 'Cherry Creek CDP'};
	if(cdp == 14587){name = 'Cimarron Hills CDP'};
	if(cdp == 15165){name = 'Clifton CDP'};
	if(cdp == 15302){name = 'Coal Creek CDP'};
	if(cdp == 15440){name = 'Coaldale CDP'};
	if(cdp == 15825){name = 'Colona CDP'};
	if(cdp == 15935){name = 'Colorado City CDP'};
	if(cdp == 16110){name = 'Columbine CDP'};
	if(cdp == 16465){name = 'Comanche Creek CDP'};
	if(cdp == 16715){name = 'Conejos CDP'};
	if(cdp == 17150){name = 'Copper Mountain CDP'};
	if(cdp == 17485){name = 'Cotopaxi CDP'};
	if(cdp == 18585){name = 'Crisman CDP'};
	if(cdp == 19150){name = 'Dakota Ridge CDP'};
	if(cdp == 20275){name = 'Derby CDP'};
	if(cdp == 20605){name = 'Divide CDP'};
	if(cdp == 21155){name = 'Dotsero CDP'};
	if(cdp == 21330){name = 'Dove Valley CDP'};
	if(cdp == 21390){name = 'Downieville-Lawson-Dumont CDP'};
	if(cdp == 22575){name = 'East Pleasant View CDP'};
	if(cdp == 23300){name = 'Edwards CDP'};
	if(cdp == 23520){name = 'Elbert CDP'};
	if(cdp == 23575){name = 'Eldora CDP'};
	if(cdp == 23630){name = 'Eldorado Springs CDP'};
	if(cdp == 23795){name = 'El Jebel CDP'};
	if(cdp == 24235){name = 'Ellicott CDP'};
	if(cdp == 24290){name = 'El Moro CDP'};
	if(cdp == 25390){name = 'Evergreen CDP'};
	if(cdp == 25550){name = 'Fairmount CDP'};
	if(cdp == 27095){name = 'Florissant CDP'};
	if(cdp == 27175){name = 'Floyd Hill CDP'};
	if(cdp == 27370){name = 'Fort Carson CDP'};
	if(cdp == 27535){name = 'Fort Garland CDP'};
	if(cdp == 28250){name = 'Franktown CDP'};
	if(cdp == 28800){name = 'Fruitvale CDP'};
	if(cdp == 28830){name = 'Fulford CDP'};
	if(cdp == 29295){name = 'Garfield CDP'};
	if(cdp == 29625){name = 'Genesee CDP'};
	if(cdp == 29845){name = 'Gerrard CDP'};
	if(cdp == 30350){name = 'Glendale CDP'};
	if(cdp == 30420){name = 'Gleneagle CDP'};
	if(cdp == 30890){name = 'Goldfield CDP'};
	if(cdp == 30945){name = 'Gold Hill CDP'};
	if(cdp == 31935){name = 'Grand View Estates CDP'};
	if(cdp == 33420){name = 'Guffey CDP'};
	if(cdp == 33502){name = 'Gunbarrel CDP'};
	if(cdp == 34685){name = 'Hasty CDP'};
	if(cdp == 35400){name = 'Heeney CDP'};
	if(cdp == 35860){name = 'Hidden Lake CDP'};
	if(cdp == 36410){name = 'Highlands Ranch CDP'};
	if(cdp == 36940){name = 'Hoehne CDP'};
	if(cdp == 37220){name = 'Holly Hills CDP'};
	if(cdp == 37655){name = 'Howard CDP'};
	if(cdp == 38425){name = 'Idalia CDP'};
	if(cdp == 38480){name = 'Idledale CDP'};
	if(cdp == 38810){name = 'Indian Hills CDP'};
	if(cdp == 38910){name = 'Inverness CDP'};
	if(cdp == 39160){name = 'Jackson Lake CDP'};
	if(cdp == 39250){name = 'Jansen CDP'};
	if(cdp == 39745){name = 'Joes CDP'};
	if(cdp == 39800){name = 'Johnson Village CDP'};
	if(cdp == 40377){name = 'Ken Caryl CDP'};
	if(cdp == 40550){name = 'Keystone CDP'};
	if(cdp == 40900){name = 'Kirk CDP'};
	if(cdp == 41065){name = 'Kittredge CDP'};
	if(cdp == 42000){name = 'Laird CDP'};
	if(cdp == 42165){name = 'La Junta Gardens CDP'};
	if(cdp == 43220){name = 'Laporte CDP'};
	if(cdp == 44270){name = 'Lazy Acres CDP'};
	if(cdp == 44375){name = 'Leadville North CDP'};
	if(cdp == 44595){name = 'Lewis CDP'};
	if(cdp == 44695){name = 'Leyner CDP'};
	if(cdp == 45145){name = 'Lincoln Park CDP'};
	if(cdp == 45680){name = 'Loghill Village CDP'};
	if(cdp == 45750){name = 'Loma CDP'};
	if(cdp == 46410){name = 'Louviers CDP'};
	if(cdp == 47015){name = 'Lynn CDP'};
	if(cdp == 47345){name = 'McCoy CDP'};
	if(cdp == 49325){name = 'Maybell CDP'};
	if(cdp == 49490){name = 'Maysville CDP'};
	if(cdp == 50012){name = 'Meridian CDP'};
	if(cdp == 50380){name = 'Midland CDP'};
	if(cdp == 51975){name = 'Morgan Heights CDP'};
	if(cdp == 52210){name = 'Mountain Meadows CDP'};
	if(cdp == 52820){name = 'Mulford CDP'};
	if(cdp == 53780){name = 'Niwot CDP'};
	if(cdp == 53875){name = 'No Name CDP'};
	if(cdp == 53945){name = 'Norrie CDP'};
	if(cdp == 54495){name = 'North La Junta CDP'};
	if(cdp == 54750){name = 'North Washington CDP'};
	if(cdp == 55925){name = 'Orchard CDP'};
	if(cdp == 56035){name = 'Orchard Mesa CDP'};
	if(cdp == 56695){name = 'Padroni CDP'};
	if(cdp == 57445){name = 'Paragon Estates CDP'};
	if(cdp == 57850){name = 'Parshall CDP'};
	if(cdp == 58400){name = 'Penrose CDP'};
	if(cdp == 58510){name = 'Peoria CDP'};
	if(cdp == 58592){name = 'Perry Park CDP'};
	if(cdp == 58675){name = 'Peyton CDP'};
	if(cdp == 58758){name = 'Phippsburg CDP'};
	if(cdp == 58960){name = 'Piedra CDP'};
	if(cdp == 59240){name = 'Pine Brook Hill CDP'};
	if(cdp == 60655){name = 'Ponderosa Park CDP'};
	if(cdp == 60765){name = 'Portland CDP'};
	if(cdp == 62220){name = 'Pueblo West CDP'};
	if(cdp == 63320){name = 'Red Feather Lakes CDP'};
	if(cdp == 63375){name = 'Redlands CDP'};
	if(cdp == 63650){name = 'Redstone CDP'};
	if(cdp == 63705){name = 'Redvale CDP'};
	if(cdp == 64870){name = 'Rock Creek Park CDP'};
	if(cdp == 65685){name = 'Rollinsville CDP'};
	if(cdp == 66197){name = 'Roxborough Park CDP'};
	if(cdp == 66995){name = 'Saddle Ridge CDP'};
	if(cdp == 67040){name = 'St. Ann Highlands CDP'};
	if(cdp == 67142){name = "St. Mary's CDP"};
	if(cdp == 67445){name = 'Salt Creek CDP'};
	if(cdp == 67500){name = 'San Acacio CDP'};
	if(cdp == 68847){name = 'Security-Widefield CDP'};
	if(cdp == 68875){name = 'Sedalia CDP'};
	if(cdp == 68985){name = 'Segundo CDP'};
	if(cdp == 69110){name = 'Seven Hills CDP'};
	if(cdp == 69480){name = 'Shaw Heights CDP'};
	if(cdp == 69810){name = 'Sherrelwood CDP'};
	if(cdp == 71625){name = 'Smeltertown CDP'};
	if(cdp == 71790){name = 'Snyder CDP'};
	if(cdp == 72320){name = 'Southern Ute CDP'};
	if(cdp == 74080){name = 'Stonegate CDP'};
	if(cdp == 74275){name = 'Stonewall Gap CDP'};
	if(cdp == 74375){name = 'Strasburg CDP'};
	if(cdp == 74430){name = 'Stratmoor CDP'};
	if(cdp == 74980){name = 'Sugarloaf CDP'};
	if(cdp == 75585){name = 'Sunshine CDP'};
	if(cdp == 76190){name = 'Tabernash CDP'};
	if(cdp == 76325){name = 'Tall Timber CDP'};
	if(cdp == 77235){name = 'The Pinery CDP'};
	if(cdp == 77757){name = 'Todd Creek CDP'};
	if(cdp == 78280){name = 'Towaoc CDP'};
	if(cdp == 78335){name = 'Towner CDP'};
	if(cdp == 78345){name = 'Trail Side CDP'};
	if(cdp == 79100){name = 'Twin Lakes CDP'};
	if(cdp == 79105){name = 'Twin Lakes CDP'};
	if(cdp == 79785){name = 'Upper Bear Creek CDP'};
	if(cdp == 80095){name = 'Valdez CDP'};
	if(cdp == 80370){name = 'Valmont CDP'};
	if(cdp == 80755){name = 'Vernon CDP'};
	if(cdp == 81305){name = 'Vineland CDP'};
	if(cdp == 82905){name = 'Watkins CDP'};
	if(cdp == 83120){name = 'Welby CDP'};
	if(cdp == 83175){name = 'Weldona CDP'};
	if(cdp == 83500){name = 'Westcreek CDP'};
	if(cdp == 84000){name = 'Weston CDP'};
	if(cdp == 84042){name = 'West Pleasant View CDP'};
	if(cdp == 85760){name = 'Wolcott CDP'};
	if(cdp == 86117){name = 'Woodmoor CDP'};
	if(cdp == 86200){name = 'Woody Creek CDP'};
return name;
}; //end of cdpName

//Community Profile Functions


//selGeo selects Municipalities and CDPs formatting in sel1 of profile
function selGeo(fipsArr,ctyData,type){
	 if(type == "county") {
	5766
	var chkval =  ctyData.properties.COUNTYFP;
	 } else {
	 	  var ckkval = ctyData.placefp; 
	 };
 	return (fipsArr.includes(chkval))
}
//end selGeo

//selColor  Sets fill color for counties and regions
function selColor(fipsArr,names,ctyData,type){
	var outColor = '#FFFFFF';
	var chkval =  ctyData.properties.COUNTYFP;

if(type == "Regional Comparison"){
	for(i = 0; i < names.length; i ++){
		 var regionSel = regionCOL(names[i]);
		 var regFips = regionSel[0].fips;
		 var regColor = regionSel[0].color;
		 if(regFips.includes(chkval)) {outColor = regColor;};
		 };
} else {
	if(fipsArr.includes(chkval)){
		outColor = '#008000';
	};
};
return outColor;
};
//end of selColor


//calcpopGR calculates population table entries for profile
function calcpopGR(inData,prevData,type, yrVal) {
   var output = [];
   var geog, name, year1, est1, year2, est2, popch, gr;
   
   if(type == 'region'){
      var geogdat = [... new Set(inData.map(tag => tag.reg_num))]; 
   };
  
    if(type == 'county'){
      var geogdat = [... new Set(inData.map(tag => tag.countyfips))]; 
   };
   if(type == 'muni'){
	  if(inData.length > 2){
		  //extracting Multi County Places
		  var tmpData = inData.filter(function(d) {return d.municipalityname.includes('(Total)');});
		  if(tmpData.length != 0){
		      var remData = inData.filter(function(d) {return d.placefips != tmpData[0].placefips;});
			  tmpData = tmpData.concat(remData);
		  } else {
			  var tmpData = inData;
		  };
		  var geogdat = [... new Set(tmpData.map(tag => tag.placefips))];
	  } else {		  
      var geogdat = [... new Set(inData.map(tag => tag.placefips))]; 
	  };
   };   
   if(type == 'cdp'){
      var geogdat = [... new Set(inData.map(tag => tag.geonum))]; 
   };  
 //Selecting out geographies  

for(i = 0; i < geogdat.length; i++){
   if(type == 'region'){
		var tmp = inData.filter(function(d) {return d.reg_num == geogdat[i];}); 
   };
    if(type == 'county'){
			var tmp = inData.filter(function(d) {return d.countyfips == geogdat[i];});
   };
   if(type == 'muni'){
	   		if(inData.length > 2){
            var tmp = tmpData.filter(function(d) {return d.placefips == geogdat[i];});
		} else {
	      var tmp = inData.filter(function(d) {return d.placefips == geogdat[i];});
		};
   };
   if(type == 'cdp'){
	  var tmp = prevData.filter(function(d) {return d.geonum == geogdat[i];});
      var tmp2 = inData.filter(function(d) {return d.geonum == geogdat[i];});
  };   
    
   for(j = 0; j < tmp.length; j++){
		 if(type == 'region') {
			 geog = tmp[j].reg_num;
			 name = regionName(geog);
			 if(j == 0){
				 var year1 = +tmp[j].year;
				 var est1 = +tmp[j].estimate;
			 } else {
				 var year2 = +tmp[j].year;
				 var est2 = +tmp[j].estimate;
			 };
		 };
		 if(type == 'county') {
			 geog = tmp[j].countyfips;
			 name = countyName(geog);
			 if(j == 0){
				 var year1 = +tmp[j].year;
				 var est1 = +tmp[j].estimate;
			 } else {
				 var year2 = +tmp[j].year;
				 var est2 = +tmp[j].estimate;
			 };
		 };		
		 if(type == 'muni') {
			 geog = tmp[j].placefips;	
			 name = muniName(geog);
			 if(j == 0){
				 var year1 = +tmp[j].year;
				 var est1 = +tmp[j].totalpopulation;
			 } else {
				 var year2 = +tmp[j].year;
				 var est2 = +tmp[j].totalpopulation;
			 };
		 };	
		 if(type == 'cdp') {
			 geog = tmp[j].geonum;
			 if(geog == 108){
				 geog = 0;
			 } else {
				 geog = geog - 10800000;
			 };
			 name = cdpName(geog);

			 var year1 = 2010;
			 var est1 = tmp[j].b01001001;
			 var yrx = yrVal.substr(-2);
			 var year2 = Number(yrx) + 2000;
			 var est2 = tmp2[j].b01001001;
		 };		 
	 }; //End of j

   popch = est2 - est1;
   gr = popch/est1;
   output.push({'geography' : geog, 'name' : name, 'curyr' : year2, 'prevyr' : year1,  'est' : est2, 'popch' : popch, 'growth' : gr});
 }; // end of i

 return output;
}; //End calcpopGR

//procMedian  Gathers and calculates median income  or house value from ACS records
function procMedian(inData,variable, geog, names){

var fipsnum;
var medvalue = [];

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
if(geog == "region"){
	var filtvalue = medvalue.filter(function(d) {return d.fips !=  0;});
	var cty_list = [... new Set(filtvalue.map(tag => +tag.fips))];
	var rangeArr = [];
	for(l = 0; l < filtvalue.length; l++){
			 rangeArr.push(filtvalue[l].value);
		};			 
    var range = d3.extent(rangeArr);
	var medVal = (range[1] + range[0])/2;

	var regionNumber = regMatch(cty_list);
	var regionNam = regionName(regionNumber);
	var regionDat = {fips : regionNumber, name : regionNam, value : medVal};
	medvalue.splice(1,0,regionDat);
};

if(geog == 'regioncomp'){
	var medOut = medvalue.filter(function(d) {return d.fips ==  0;});

	for(i = 0; i < names.length; i++){
		 var selRegion = regionCOL(names[i]);
		 var regFips = selRegion[0].fips;
		 for(j = 0; j < regFips.length;j++){
			  regFips[j] = parseInt(regFips[j]);
		 };
		var medfilt = medvalue.filter(function(d) {return regFips.includes(d.fips);});
        var rangeArr = [];
		for(l = 0; l < medfilt.length; l++){
			 rangeArr.push(medfilt[l].value);
		};	
	
        var range = d3.extent(rangeArr);
	    var medVal = (range[1] + range[0])/2;
		var cty_list = [... new Set(medfilt.map(tag => +tag.fips))];
        var regionNumber = regMatch(cty_list);
	    var regionNam = regionName(regionNumber);
	    var regionDat = {fips : regionNumber, name : regionNam, value : medVal};
		medOut.push(regionDat);
		for(k = 0; k < medfilt.length;k++){
			medOut.push(medfilt[k]);
	    };
	};
	var medvalue = medOut;
};

return medvalue;
}; //end of procMedian

//procPCT Generates percentages from ACS data
function procPCT(inData,stub,geog,names){
var fipsnum;
var pctvalue = [];

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


if(geog == "region"){
	var columnsToSum = ['dem', 'num'];
	var filtvalue = pctvalue.filter(function(d) {return d.fips !=  0;});
	var cty_list = [... new Set(filtvalue.map(tag => +tag.fips))];

	var regSum = d3.rollup(filtvalue,
                  v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])));
	var pctval = regSum.num/regSum.dem;

	var regionNumber = regMatch(cty_list);
	var regionNam = regionName(regionNumber);
	var regionDat = {fips : regionNumber, name : regionNam, dem : regSum.dem, num : regSum.num, pct : pctval};
	pctvalue.splice(1,0,regionDat);
};

if(geog == 'regioncomp'){
		var columnsToSum = ['dem', 'num'];
		var povOut = pctvalue.filter(function(d) {return d.fips ==  0;});

		for(i = 0; i < names.length; i++){
		 var selRegion = regionCOL(names[i]);
		 var regFips = selRegion[0].fips;
		 for(j = 0; j < regFips.length;j++){
			  regFips[j] = parseInt(regFips[j]);
		 };
		var povfilt = pctvalue.filter(function(d) {return regFips.includes(d.fips);});
		var cty_list = [... new Set(povfilt.map(tag => +tag.fips))];
		
		var regSum = d3.rollup(povfilt, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])));
		var pctval = regSum.num/regSum.dem;
		var regionNumber = regMatch(cty_list);
	    var regionNam = regionName(regionNumber);
	    var regionDat = {fips : regionNumber, name : regionNam, dem : regSum.dem, num : regSum.num, pct : pctval};
        povOut.push(regionDat);
		for(k = 0; k < povfilt.length;k++){
			povOut.push(povfilt[k]);
	    };
	};
   var	pctvalue = povOut;

};
	
return pctvalue;
    }; //end of procPCT
//regMatch  Returns region code from a set of county fips codes
function regMatch(incty){
	
	const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
	
	var arr20 = [1, 5, 14, 31, 35, 59];
	var arr21 = [1, 5, 13, 14, 31, 35, 59];
	var arr22 = [1, 5, 13, 14, 31, 35, 59, 123];
	var arr23 = [1, 5, 14, 19, 31, 35, 41, 47, 59, 93];
	var arr15 = [15, 19, 27, 43, 47, 55, 65, 71, 93];
	var arr16 = [9, 11, 17, 25, 39, 61, 63, 73, 75, 87, 89, 95, 99, 115, 121, 125];
	var arr17 = [1, 5, 13, 14, 31, 35, 41, 59, 69, 101,119,123];
	var arr18 = [3, 21, 23, 79, 105, 109];
	var arr19 = [7, 29, 33, 37, 45, 49, 51, 53, 57, 67, 77, 81, 83, 85, 91, 97, 103, 107, 111, 113, 117];
	var arr01 = [75,87,95,115,121,125];
	var arr02 = [69,123];
	var arr03 = [1,5,13,14,19,31,35,47,59];
	var arr04 = [41,93,119];
	var arr05 = [17,39,63,73];
	var arr06 = [9,11,25,61,89,99];
	var arr07 = [101];
	var arr08 = [3,21,23,79,105,109];
	var arr09 = [7,33,67,83,111];
	var arr10 = [29,51,53,85,91,113];
	var arr11 = [45,77,81,103,107];
	var arr12 = [37,49,57,97,117];
	var arr13 = [15,27,43,65];
	var arr14 = [55,71];
	var region;
	if(equals(incty,arr20)) { region = 20};
	if(equals(incty,arr21)) { region = 21};
	if(equals(incty,arr22)) { region = 22};
	if(equals(incty,arr23)) { region = 23};
	if(equals(incty,arr15)) { region = 15};
	if(equals(incty,arr16)) { region = 16};
	if(equals(incty,arr17)) { region = 17};
	if(equals(incty,arr18)) { region = 18};
	if(equals(incty,arr19)) { region = 19};
	if(equals(incty,arr01)) { region = 1};
	if(equals(incty,arr02)) { region = 2};
	if(equals(incty,arr03)) { region = 3};
	if(equals(incty,arr04)) { region = 4};
	if(equals(incty,arr05)) { region = 5};
	if(equals(incty,arr06)) { region = 6};
	if(equals(incty,arr07)) { region = 7};
	if(equals(incty,arr08)) { region = 8};
	if(equals(incty,arr09)) { region = 9};
	if(equals(incty,arr10)) { region = 10};
	if(equals(incty,arr11)) { region = 11};
	if(equals(incty,arr12)) { region = 12};
	if(equals(incty,arr13)) { region = 13};
	if(equals(incty,arr14)) { region = 14};
return region;
};

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

function generateTab(header, body,footer, tabTitle, fileName) {


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


function genProfile(lvl,fipsArr,valSec, names,outputMap,outputTab) {
var descript = "Colorado Demographic Profile "+ lvl + ": ";
	descript = descript + names[0];

for(i = 1; i < names.length; i++){
	  descript = descript + ", " + names[i];
};

  var finDescript  = descript + "<br>Basic Statistics";
  var tabDescript = descript + ": Basic Statistics";
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

   outputMap.innerHTML = "";
   outputTab.innerHTML = "";
   
     //Add Download buttons...
   AddProfileBtns(outputMap,'sel1');

   //Add heading to DOM
    var sel1heading = document.createElement("H2");
   sel1heading.innerHTML = finDescript;
   outputMap.appendChild(sel1heading);

  var outSVG =  genSel1map(lvl, fipsArr, names, outputMap);

    genSel1tab(lvl, fipsArr, names, tabDescript, outputTab,curyear);
  
};

   
//Setting Event Listeners
document.getElementById("sel1btn").addEventListener("click", function() {
  outputMap.innerHTML = "";
   outputTab.innerHTML = "";
   
     //Add Download buttons...
   AddProfileBtns(outputMap,'sel1');

   //Add heading to DOM
   var sel1heading = document.createElement("H2");
   sel1heading.innerHTML = descript + "<br>Basic Statistics";
   outputMap.appendChild(sel1heading);
   
   var outSVG =  genSel1map(lvl, fipsArr, names, outputMap);
   genSel1tab(lvl, fipsArr, names, tabDescript, outputTab,curyear);
     });
	 

 //Need to export final description, svg and datatable here
  

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
                .style("opacity", function() {return selGeo(fipsArr,d,"county") ? 1 : 0;}); 
            div.text(function() {return selGeo(fipsArr,d,"county") ? d.properties.NAMELSAD : "";}) 
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
	
	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];


    var fips_list = [];
		for(i = 0; i < fipsArr.length; i++) {
		  fips_list.push(parseInt(fipsArr[i]));
	}
	
	if(muniList.includes(level)) {
		var muni_cty = [];
		for(i = 0; i < fipsArr.length; i++){
			   muni_cty.push(parseInt(muni_county(fipsArr[i])));
		};
	    var muni_cty_acs = ['08'];
		for(i = 0; i < fipsArr.length; i++){
			   muni_cty_acs.push('08' + muni_county(fipsArr[i]));
	    };
	}
	
	if(placeList.includes(level)) {
		var cdp_cty = [];
		for(i = 0; i < fipsArr.length; i++){
			   cdp_cty.push(parseInt(cdp_county(fipsArr[i])));
		};
		var cdp_cty_acs = ['08'];
		for(i = 0; i < fipsArr.length; i++){
			   cdp_cty_acs.push('08' + cdp_county(fipsArr[i]));
	    };

	}
	
    var jobs_list = [0];
	for(i = 0; i < fipsArr.length; i++){
			   jobs_list.push(parseInt(fipsArr[i]));
		}

	var fipsACS = [];
	for(i = 0; i < fipsArr.length; i++) {
		  fipsACS.push("08" + fipsArr[i]);
	};

	
	   //Generate url
  if(regList.includes(level))  { 
	 var reg_list = RegionNumber(nameArr);
	 fipsACS.unshift('08');
	 
   	 var popREG = 'https://gis.dola.colorado.gov/lookups/components_region?reg_num=' + reg_list + '&year=' + yrlist;
   	 var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + fips_list + '&year=' + yrlist;
	 var jobsCTY = 'https://gis.dola.colorado.gov/lookups/jobs?county='+jobs_list+'&year='+ curYr +'&sector=0';
	 //median Income ACS  b19013001

	 var incCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;

	 var prom = [d3.json(popREG),d3.json(popCTY),d3.json(jobsCTY),d3.json(incCTY),
	             d3.json(hvalCTY), d3.json(povCTY), d3.json(natCTY)];
  }
 
if(ctyList.includes(level)){
	fips_list.unshift(0);
	fipsACS.unshift('08');
   	 var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + fips_list + '&year=' + yrlist;
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
	  if(level == "Region"){
		 //Population Growth
		 var reggr = calcpopGR(data[0],data[0],'region',curACS);
		 var ctygr = calcpopGR(data[1].filter(function(d){return d.countyfips != '0';}),data[1],'county',curACS);
		 var tabgr = reggr.concat(ctygr);

		 //Jobs
		 var jobscty = data[2].filter(function(d) {return d.area_code != 0;});
		 var cty_list = [... new Set(jobscty.map(tag => tag.area_code))]; 
	 
		 var cty_jobs = [];
		 for(i = 0; i < data[2].length; i++){
			 cty_jobs.push({'area_code' : data[2][i].area_code, 'population_year' : data[2][i].population_year, 'total_jobs' : +data[2][i].total_jobs});
		 };
//Building Regional Values
		 var pop_year = data[2][0].population_year;
		 var reg_val = regMatch(cty_list);
		 var jobs_reg = d3.rollup(jobscty, v => d3.sum(v, d => +d.total_jobs));
		 var reg_jobs = {area_code : reg_val, population_year : pop_year, total_jobs : jobs_reg};
		 
		 cty_jobs.splice(1,0,reg_jobs);

		 var median_income = procMedian(data[3].data,'b19013001','region',nameArr);
		 //Median House Value
		 var median_home = procMedian(data[4].data,'b25077001','region',nameArr);
		 
		 //pct poverty
		 var poverty = procPCT(data[5].data,'b17001','region',nameArr);

		 //pct native
		 var coNative = procPCT(data[6].data,'b05002','region',nameArr);



}; //level = region

//Regional Comparison
if(level == "Regional Comparison"){
		 var reggr = calcpopGR(data[0],data[0],'region',curACS);  //output records for regional records
		 var ctygr = calcpopGR(data[1].filter(function(d){return d.countyfips != '0';}),data[1],'county',curACS);
		 var tabgr = regCombine(reggr,ctygr);

		 //Jobs
		 
		 var cty_reg_jobs = [];
		 
		 var jobscty = data[2].filter(function(d) {return d.area_code != 0;});
		 var cty_list = [... new Set(jobscty.map(tag => tag.area_code))]; 
	 
		 var cty_jobs = [];
		 for(i = 0; i < data[2].length; i++){
			 cty_jobs.push({'area_code' : data[2][i].area_code, 'population_year' : data[2][i].population_year, 'total_jobs' : +data[2][i].total_jobs});
		 };
		 
//Building Regional Values
         var cty_reg_jobs = cty_jobs.filter(function(d) {return d.area_code == 0;});	 
		 var pop_year = data[2][0].population_year;
         for(a = 0; a < nameArr.length; a++){
			 var selRegion = regionCOL(nameArr[a]);
			 var regFips = selRegion[0].fips;
			 for(j = 0; j < regFips.length;j++){
				  regFips[j] = parseInt(regFips[j]);
			 };
			 var ctyFilt = cty_list.filter(function(d) {return regFips.includes(d);});
			 var cty_jobs_filt = cty_jobs.filter(function(d) {return regFips.includes(d.area_code);});
			 var reg_val = regMatch(ctyFilt);

			 var jobs_reg = d3.rollup(cty_jobs_filt, v => d3.sum(v, d => +d.total_jobs));
			 var reg_jobs = {area_code : reg_val, population_year : pop_year, total_jobs : jobs_reg};

		     cty_reg_jobs.push(reg_jobs);
			 for(n = 0; n < cty_jobs_filt.length; n++){
				 cty_reg_jobs.push(cty_jobs_filt[n]);
			 };  
		 };
		 var cty_jobs = cty_reg_jobs;

		 
		 //Median Income
		 var median_income = procMedian(data[3].data,'b19013001','regioncomp',nameArr);
		 //Median House Value
		 var median_home = procMedian(data[4].data,'b25077001','regioncomp',nameArr);
		 
		 //pct poverty
		 var poverty = procPCT(data[5].data,'b17001','regioncomp',nameArr);

		 //pct native
		 var coNative = procPCT(data[6].data,'b05002','regioncomp',nameArr);

};

if(ctyList.includes(level)){
		 //Population Growth
		 var tabgr = calcpopGR(data[0],data[0],'county',curACS);

		 //Jobs
		 var jobscty = data[1];
		 var cty_list = [... new Set(jobscty.map(tag => tag.area_code))]; 
		 
		 var cty_jobs = [];
		 for(i = 0; i < data[1].length; i++){
			 cty_jobs.push({'area_code' : data[1][i].area_code, 'population_year' : data[1][i].population_year, 'total_jobs' : +data[1][i].total_jobs});
		 };

		 //Median Income
		 var median_income = procMedian(data[2].data,'b19013001','county',nameArr);
		 //Median House Value
		 var median_home = procMedian(data[3].data,'b25077001','county',nameArr);
		 
		 //pct poverty
		 var poverty = procPCT(data[4].data,'b17001','county',nameArr);

		 //pct native
		 var coNative = procPCT(data[5].data,'b05002','county',nameArr);



}; //level = county	  

if(muniList.includes(level)){
		 //Population Growth
		 var ctygr = calcpopGR(data[0],data[0],'county',curACS);
		 var munigr = calcpopGR(data[1],data[1],'muni',curACS);
		 if(level == 'Municipality'){
             var tabgr = ctygr.concat(munigr);
		 } else {
			 var tabgr = munigr;
		 };
 
		 //Median Income
		 var median_income_CTY = procMedian(data[2].data,'b19013001','county',nameArr);
		 var median_income_MUNI = procMedian(data[3].data,'b19013001','muni',nameArr);
		 if(level == 'Municipality'){
			var median_income = median_income_CTY.concat(median_income_MUNI);
		 } else {
			 var median_income = median_income_MUNI;
		 };
		 
		 //Median House Value
		 var median_home_CTY = procMedian(data[4].data,'b25077001','county',nameArr);
		 var median_home_MUNI = procMedian(data[5].data,'b25077001','muni',nameArr);
		 if(level == 'Municipality'){
			 var median_home = median_home_CTY.concat(median_home_MUNI);
		 } else {
			var median_home = median_home_MUNI;
		 };
		 //pct poverty
		 var poverty_CTY = procPCT(data[6].data,'b17001','county',nameArr);
		 var poverty_MUNI = procPCT(data[7].data,'b17001','muni',nameArr);
		 if(level == 'Municipality'){ 
			var poverty = poverty_CTY.concat(poverty_MUNI);
		 } else {
			var poverty = poverty_MUNI;
		 };
		 
		 //pct native
		 var coNative_CTY = procPCT(data[8].data,'b05002','county',nameArr);
		 var coNative_MUNI = procPCT(data[9].data,'b05002','muni',nameArr);
         if(level == 'Municipality'){
			 var coNative = coNative_CTY.concat(coNative_MUNI);
		 } else {
			 var coNative = coNative_MUNI;
		 };


}; //level = municipality	  

if(placeList.includes(level)){

		 //Population Growth
		 var ctygr = calcpopGR(data[0],data[0],'county',curACS);
		 var cdpgr = calcpopGR(data[1].data,data[2].data,'cdp',curACS);
		 if(level == 'Census Designated Place') {
			 var tabgr = ctygr.concat(cdpgr);
		 } else {
		     var tabgr = cdpgr;
		 };
		 
		 //Median Income
		 var median_income_CTY = procMedian(data[3].data,'b19013001','county',nameArr);
		 var median_income_CDP = procMedian(data[4].data,'b19013001','cdp',nameArr);
		 if(level == 'Census Designated Place') {  
		    var median_income = median_income_CTY.concat(median_income_CDP);
		 } else {
			var median_income = median_income_CDP;
         };
		 
		 //Median House Value
		 var median_home_CTY = procMedian(data[5].data,'b25077001','county',nameArr);
		 var median_home_CDP = procMedian(data[6].data,'b25077001','cdp',nameArr);
		 if(level == 'Census Designated Place') {
			var median_home = median_home_CTY.concat(median_home_CDP);
		 } else {
			 var median_home = median_home_CDP;
		 }; 
			
		 //pct poverty
		 var poverty_CTY = procPCT(data[7].data,'b17001','county',nameArr);
		 var poverty_CDP = procPCT(data[8].data,'b17001','cdp',nameArr);
         if(level == 'Census Designated Place') {
			var poverty = poverty_CTY.concat(poverty_CDP);
		 } else {
			var poverty = poverty_CDP;
		 };
		 
		 //pct native
		 var coNative_CTY = procPCT(data[9].data,'b05002','county',nameArr);
		 var coNative_CDP = procPCT(data[10].data,'b05002','cdp',nameArr);
         if(level == 'Census Designated Place') {
			var coNative = coNative_CTY.concat(coNative_CDP);
		 } else {
			var coNative = coNative_CDP;
		 };


}; //level = Censusu Designated Places	 

//data table format changing font width

var curyr = [... new Set(tabgr.map(tag => tag.curyr))];
var prevyr = [... new Set(tabgr.map(tag => tag.prevyr))];
if(muniList.includes(level) || placeList.includes(level)){
		var labels = [
			   {'title' : 'Geography'},
			   {'title': 'Population ('+curyr[0]+')*'},
			   {'title': 'Population Change (' + prevyr[0] + ' to ' + curyr[0] + ')*'},
			   {'title': 'Percentage Change (' + prevyr[0] + ' to ' + curyr[0] + ')*'},
			   {'title': 'Median Household Income^'},
			   {'title': 'Median Home Value^'},
			   {'title': 'Percentage of Population with incomes below poverty line.^'},
			   {'title': 'Percentage of Population born in Colorado^'}
				  ];
		
  } else {
	  var labels = [
       {'title' : 'Geography'},
       {'title': 'Population ('+curyr[0]+')*'},
       {'title': 'Population Change (' + prevyr[0] + ' to ' + curyr[0] + ')*'},
       {'title': 'Percentage Change (' + prevyr[0] + ' to ' + curyr[0] + ')*'},
       {'title': 'Total Employment (' + curyr[0] + ')*'},
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
					 fmt_comma(tabgr[i].est),
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
                 fmt_comma(tabgr[i].est),
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
               ['^U.S. Census Bureau, '+fmt_yr(curYr - 4) + '-' + fmt_yr(curYr) +" American Community Survey"],
               ['Print Date : ' + fmt_date(new Date)]
			   ];

var ftrString = "<tfoot><tr>";
for(i = 0; i < tblfoot.length; i++){
	    ftrString = ftrString + "<td>" + tblfoot[i] + "</td>";
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
		"bSort" : false,
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
		"bSort" : false,
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