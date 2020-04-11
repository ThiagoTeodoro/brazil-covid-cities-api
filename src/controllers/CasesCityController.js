//Imports
const DataCovidInBrazilService = require('../services/DataCovidInBrazilService');
const fs = require('fs');

module.exports= {

    /**
     * Controlador para obter os dados de casos confirmados por cidade em CSV
     * 
     * @param {*} request 
     * @param {*} response 
     */
    data(request, response){

        var contents = fs.readFileSync('./src/csvs/worked/resultDataCovidBrazil.csv', 'utf8');
        response.set("Content-Type", "text/plain; charset=utf-8");
        response.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
        return response.send(contents);
    },

    /**
     * Controlador para obter os dados de casos confirmados por cidade em JSON
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response){
        
        return response.json(await DataCovidInBrazilService.selectAllDataCovidInBrazil());
    }

}