//Imports
const DataCovidInBrazil = require('../models/DataCovidInBrazil');

module.exports = {

    /**
     * Serviço responsável por remover todos dos documentos da coleção
     * dataCovidInBrazil.
     * 
     * @param {*} document 
     * @returns {boolean}
     */
    async removeAllDocuments(){

        try {

            await DataCovidInBrazil.deleteMany({});
            
            return true;
        } catch (error) {

            throw `Ocorreu um erro quando a API tentou excluir todos os documentos da coleção. Error ${error}.`;
        }
    },

    /**
     * Serviço responsável por realizar a inserção de um novo dado da COVID19
     * no brasil.
     * 
     * @param {*} latitude 
     * @param {*} longitude 
     * @param {*} confirmadeCases 
     * @param {*} ibgeCodeCity 
     * @param {*} nameCity 
     */
    async insert( latitude, longitude, confirmadeCases,  ibgeCodeCity, nameCity, date){        

        try {

            if(latitude, longitude, confirmadeCases, ibgeCodeCity, nameCity, date){

                return await DataCovidInBrazil.create({
                    "latitude": latitude,
                    "longitude": longitude,
                    "confirmadeCases": confirmadeCases,
                    "ibgeCodeCity": ibgeCodeCity,
                    "nameCity": nameCity,
                    "continent": "South America",
                    "date": date
                });

            } else {

                throw `Parametros obrigatórios não enviados. Favor checar o envio de parâmetros.`
            }
        } catch (error) {

            throw `Ocorreu um erro inesperado ao tentar cadastrar o novo dado da covid no brasil! Error : ${error}.`;
        }

    },


    /**
     * Serviço responsável por selecionar uma dado da covid por codigo da cidade
     * no IBGE.
     * 
     * Se não for encontrado vai retornar null,
     * 
     * @param {*} ibgeCodeCity 
     */
    async selectByIbgeCode(ibgeCodeCity){

        try {

            return await DataCovidInBrazil.findOne({"ibgeCodeCity": ibgeCodeCity})
        } catch (error){

            throw `Ocorreu um erro ao tentar selecionar a cidade por codígo do IBGE. Error : ${error}.`;
        }
    },

    /**
     * Serviço para realizar o update de um dado da covid no Brasil.
     * 
     * @param {*} document 
     */
    async updateData(document){

        try{

            if(document){

                const updateDataCovid = await DataCovidInBrazil.findOneAndUpdate(
                    { "_id": document._id },
                    document,
                    { new : true, useFindAndModify: false }
                );

                return updateDataCovid;
            }

        } catch(error) {

            throw `Ocorreu um erro ao tentar realizar o update do dado ${document}. Error : ${error}.`;
        }
    },


    /**
     * Return all data in collection dataCovidInBrazil.
     * 
     */
    async selectAllDataCovidInBrazil() {

        const data = await DataCovidInBrazil.find({});

        return data;
    }



}