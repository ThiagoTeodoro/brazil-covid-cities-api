const os = require('os');
const fs = require('fs');


/**
 * Classe de serviço para manipular nossos CSV's
 */
module.exports = {

    /**
     * Função responsável por gravar o arquivo resultado da 
     * oparação de ETL dos dados da covid no brasil por cidade
     * 
     * @param {*} fullPathFile
     * @returns {boolean}
     */
    writeCsvFileResultDataCovidBrazil(fullPathFile, dataToWrite){

        return new Promise((resolve, reject) => {

            try{

                if(fullPathFile, dataToWrite){

                    //Escrevendo o CSV
                    let csvFile = "";
                    csvFile += "homelat,homelon,homecontinent,n" + os.EOL;
                    
                    for(i = 0; i < dataToWrite.length; i++){
                        csvFile = csvFile + dataToWrite[i].latitude + "," + dataToWrite[i].longitude + "," + dataToWrite[i].continent + "," + dataToWrite[i].confirmadeCases + os.EOL
                    }

                    fs.writeFile(fullPathFile, csvFile, (error) => {
                        if(error){
                            
                            console.error(`Ocorreu um erro ao tentar escrever o arquivo! Error ${error}`);
                            reject(false);
                        }

                        console.info('Arquivo resultdo gravado com sucesso!');
                        resolve(true);
                    });                                        
                } else {
    
                    console.error(`Parâmetros obrigatórios não enviados. Favor conferir o envio do caminho e dos dados a serem escritos.`);
                    reject(false);
                }
            } catch (error) {
                
                console.error(`Ocorreu um erro ao tentar executar writeCsvFileResultDataCovidBrazil. Error : ${error}`);
                reject(false);
            }
        });
    }


}