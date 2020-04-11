//Imports
const LatAndLonCitiesBrazil = require('../models/LatAndLonCitiesBrazil');

module.exports = {

    /**
     * Serviço para a inserção de novas cidades na coleção
     * latAndLonCitiesBrazil.
     * 
     * Será levantada uma exception.
     * 
     * @param {*} ibgeCode 
     * @param {*} latitude 
     * @param {*} longitude 
     * @param {*} nameCity 
     */
    async insert(ibgeCode, latitude, longitude, nameCity ){

        try {

            if(ibgeCode, latitude, longitude, nameCity){

                return await LatAndLonCitiesBrazil.create({
                    "ibgeCode" : ibgeCode,
                    "latitude" : latitude,
                    "longitude" : longitude,
                    "nameCity" : nameCity
                });
            } else {

                throw `Parametros obrigatórios não enviados. Favor checar o envio de parâmetros.`
            }
        } catch (error) {

            throw `Ocorreu um erro inesperado ao tentar cadastrar a nova cidade! Error : ${error}.`;
        }

    },

    /**
     * Serviço responsável por retornar a longide e latitude de uma cidade por codigo do 
     * IBGE.
     * 
     * @param {*} ibgeCode 
     */
    async findByIbgeCode(ibgeCode){

        try {

            const latLonCity = await LatAndLonCitiesBrazil.findOne({"ibgeCode": ibgeCode});

            return latLonCity;
        } catch (erro) {

            throw `Ocorreu um erro inesperado ao tentar encontrar a cidade ${nameCity}. Error : ${error}.`;
        }
    }


}