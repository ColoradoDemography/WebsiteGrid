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