//Imports
const request = require('request');
const fs = require('fs');
const csvToJson = require('csvtojson');
const os = require('os');

const DataCovidInBrazilService = require('../services/DataCovidInBrazilService');
const LatANdLongCitiesBrazilService = require('../services/LatANdLongCitiesBrazilService');
const CsvService = require('../services/CsvService');


/**
 * Function para realizar o download do arquivo CSV com 
 * os dados da COVID confirmados.
 * 
 * @param {*} pathToSaveFile
 */
async function downloadLastDataCovidBrazil(pathToSaveFile){

    try {

        //Local do arquivo que será armazenado.
        let ws = fs.createWriteStream(pathToSaveFile);

        //Criando opções da requisição.
        let options = {
            url: 'https://brasil.io/dataset/covid19/caso?format=csv',
            method: 'GET',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        }

        //Precisa ser uma promise aqui se não nunca vou ter controler de quando terminou a gravação ou não.
        let result = await new Promise((resolve, reject) => {

            //Realizando requisição.
            request(options).on('error', function(error) {
            
                //Esse método é acionado quando ocorre um erro HTTP.                
                console.error(error);       
                reject(false);
            }).on('close', function(){
        
                //Esse método é chamado quando o Writer terminar e acionar o Close da requisição http.
                console.info('Download realizado com sucesso!');       
                resolve(true);
            }).pipe(

                //Aqui passamos o Writer para escrever o arquivo.
                ws
            );
        });

        //Avaliando resultados
        if(result){

            return result
        } else {

            throw 'Promise responsável por obter o csv restornou false!';
        }

    } catch (error) {
        
        throw `Ocorreu um erro quando a API tentou obter os dados atualizados do brasil.io. Error ${error}`;
    }
}

/**
 * Função responsável por ler e retornar todos os dados obtidos
 * da COVID19 no Brasil.
 * 
 * @param {*} pathToReadFile
 */
async function readCsvFileLastDataCovidBrazil(pathToReadFile){

    try{

        //Lendo dados do CSV
        const jsonLatAndLonCitiesBrazil = await csvToJson().fromFile(pathToReadFile);        

        return jsonLatAndLonCitiesBrazil;
    } catch (error) {

        throw `Ocorreu um erro inesperado quando a API tentou ler os dados obtidos da COVID19 no arquivo CSV. Error: ${error}.`;
    }
}

/**
 * Job responsável por obter os ultimos dados da COVID19 no Brasil,
 * Ler esses dados e enriquecer com a latitude e longitude de cada cidade.
 * e gerar um novo CSV de output.
 */
module.exports = async () => {

    console.info("Atualizando dados da Covid19 no Brasil...");

    try {

        const pathCsvFileLastDataCovidBrazil = "./src/csvs/dowloaded/lastDataCovidBrazil.csv";
        const pathCsvFileResultDataCovidBrazil = "./src/csvs/worked/resultDataCovidBrazil.csv";
    
        await downloadLastDataCovidBrazil(pathCsvFileLastDataCovidBrazil);
        
        const lastDataCovidBrazil = await readCsvFileLastDataCovidBrazil(pathCsvFileLastDataCovidBrazil);

        //Verificando se temos dados para começar
        if(lastDataCovidBrazil.length > 0){

            //Montando novo objeto atualizado e armazenando no banco de dados.
            for(i = 0; i < lastDataCovidBrazil.length; i ++){

                try {
                    
                    //Verificando se os dados que eu preciso do objeto existem. Se não eu vou iguinorar o dado.
                    if(lastDataCovidBrazil[i].confirmed, lastDataCovidBrazil[i].city_ibge_code, lastDataCovidBrazil[i].date){

                        const latlonCity = await LatANdLongCitiesBrazilService.findByIbgeCode(lastDataCovidBrazil[i].city_ibge_code);

                        if(latlonCity) {

                            const actualDataSaved = await DataCovidInBrazilService.selectByIbgeCode(lastDataCovidBrazil[i].city_ibge_code);
                            
                            if(actualDataSaved){

                                //Verificando se a data do dado que tá chegando é maior da que eu tenho no banco de dados
                                if(lastDataCovidBrazil[i].date >= actualDataSaved.date && actualDataSaved.confirmadeCases != lastDataCovidBrazil[i].confirmadeCases){

                                    console.info(`Atualizando dados da cidade : ${actualDataSaved.nameCity}`);

                                    const updateDataSaved = {
                                        "_id" : actualDataSaved._id,
                                        "latitude" : actualDataSaved.latitude,
                                        "longitude" : actualDataSaved.longitude,
                                        "confirmadeCases" : lastDataCovidBrazil[i].confirmed,
                                        "ibgeCodeCity" : actualDataSaved.ibgeCodeCity,
                                        "nameCity" : actualDataSaved.nameCity,
                                        "continent": actualDataSaved.continent,
                                        "date" : lastDataCovidBrazil[i].date,
                                        "__v": 0,
                                    }

                                    const returnFromUpdate = await DataCovidInBrazilService.updateData(updateDataSaved);

                                    if(returnFromUpdate){

                                        console.info(`Dados da cidade : ${returnFromUpdate.nameCity} atualizados!`);
                                    } else {
            
                                        console.error(`Não foi possivel atualizar os ddos da cidade!`);
                                    }
                                }

                            } else {

                                const newDataCovidToInsert = DataCovidInBrazilService.insert(
                                    latlonCity.latitude,
                                    latlonCity.longitude,
                                    lastDataCovidBrazil[i].confirmed,
                                    lastDataCovidBrazil[i].city_ibge_code,
                                    latlonCity.nameCity,
                                    lastDataCovidBrazil[i].date,
                                );

                                if(newDataCovidToInsert){

                                    console.info(`Novo dado da COVID19, no Brasil inserido!`);
                                } else {
        
                                    console.error(`Não foi possivel inserir este dado da COVID19`);
                                }
                            }                       
                        };
                    }

                } catch(error) {

                    console.error(`Problema ao tentar inserir o dado da posição ${i} do csv. Error ${error}`);
                }
            }

            //Gerando e armazenando novo aquivo CSV
            console.info("Iniciando gravação do arquivo de resultado.");
            const resultWrite = await CsvService.writeCsvFileResultDataCovidBrazil(pathCsvFileResultDataCovidBrazil, await DataCovidInBrazilService.selectAllDataCovidInBrazil());

            if(resultWrite === true){

                console.log('Processo concluido!');
            } else {

                console.log('O processo terminou com erros!');
            }
            
        }
    } catch (error) {

        console.error(`Ocorreu um erro inesperado ao realizar a JOB JobDowloadedAndTransformationCsvDataCovidInBrazil.js. Error : ${error}`);
    }

    console.info("Atualizando dados da Covid19 no Brasil terminada!");
}