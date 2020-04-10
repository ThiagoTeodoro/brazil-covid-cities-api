const request = require('request');
const csv = require('csv-parser');
const fs = require('fs');


/**
 * Function para realizar o download do arquivo CSV com 
 * os dados da COVID confirmados.
 */
async function downloadCsvDataCovid(){

    try {

        //Local do arquivo que será armazenado.
        let ws = fs.createWriteStream('./src/csvs/dowloaded/ultimosDados.csv');

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
                console.info('Dowload realizado com sucesso!');       
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
 * A FUNÇÃO DA JOB MUDOU VAMOS REESCREVER!!!
 */
module.exports = async () => {


    try {

        console.log(await downloadCsvDataCovid());


        // CRIAR UM  .ENV PARA ARMAZENAR AS VARIAVEIS DE AMBIENT PARA POR ENDEREÇO DO MONGO TIRAR ESSE FILE DO GIT TÁ.... POR QUE NÃO PODE FICAR LÁ
        // LÁ SE VAI POR SÓ O TEMPLATE NÃO PODE POR O FILE FINAL

        // FAZER UM ESQUEMA QUE VAI ARMAZENAR OS DADOS OBTIDOS COVID 
        // TODA VEZ QUE FOR ARMAZENAR PRECISA DELTAR TUDO ANTES
        
        // A MESMA COISA PARA AS CIDADES

        // FEITO ISSO BLZ AGORA É SÓ VER O MODELO QUE PRECISA RETORNAR PRO D3
        // E EM SEGUIDA GERAR O CSV DE SAIDA
        // (ANALISA O CSV ANTES PARA VER SE OS DADOS ESTÃO DE ACORDO!!!!!!!!!)

        // O ENDPOINT SÓ VAI FORNECER ESSE NOVO CSV.....





    } catch (error) {

        console.error(error);

    }

       
}