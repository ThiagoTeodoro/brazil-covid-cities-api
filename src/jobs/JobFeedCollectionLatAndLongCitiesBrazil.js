//Imports
const csv = require('csvtojson');
const LatANdLongCitiesBrazilService = require('../services/LatANdLongCitiesBrazilService');

/**
 * Job para aliementar a coleção latAndLonCitiesBrazil
 */
module.exports = async () => {

    try {
        
        //Lendo dados do CSV
        const jsonLatAndLonCitiesBrazil = await csv().fromFile('./src/csvs/dowloaded/latLonCitiesBrazil.csv');

        for(i = 0; i < jsonLatAndLonCitiesBrazil.length; i++){
            
            const cityInserted = await LatANdLongCitiesBrazilService.insert(
                Number(jsonLatAndLonCitiesBrazil[i].codigo_ibge),
                Number(jsonLatAndLonCitiesBrazil[i].latitude),
                Number(jsonLatAndLonCitiesBrazil[i].longitude),
                jsonLatAndLonCitiesBrazil[i].nome,
            )

            if(cityInserted){

                console.info("Cidade inserida com sucesso!");
            } else {

                console.error("Ocorreu um erro ao tentar inserir a cidade!");
            }
        }                
    } catch (error) {

        console.error(`Ocorreu um erro ao executar a Job JobFeedCollectionLatAndLongCitiesBrazil.js. Error : ${error}`);
    }

       
}