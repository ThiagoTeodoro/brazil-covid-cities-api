//Imports
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Getting the ENV variables
dotenv.config();


/**
 * Função para conectar no banco de dados mongo.
 * 
 * @param {*} uri 
 */
async function connectMongooseToDatabase(uri) {

    try {

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

    } catch (error) {

        /**
         * Using console.error because when used process.exit(0) just
         * console.error is shown.
         */
        console.error(`An error unexpected occurred : ${error}`);
        console.error('Closing the application...');
        process.exit(0)
    }
}

module.exports = {

    /**
     * Função responsável por fornecer e valiadr a conexão com o banco de dados.
     * 
     * --- 
     *     Esse processo é critico para a aplicação, por tanto
     *     se não obter sucesso vamos forçar a aplicação
     *     a encerrar.
     * ---
     */
    async connect() {

        try  {

            console.info(`Connecting in the Database...`);

            //Connectando no banco de dados.
            await connectMongooseToDatabase(process.env.URI_DATABASE);

        } catch (error) {

            //Ocorreu um erro, e aplicação não pode ficar sem acesso ao banco de dados, encerrando aplicação!
            console.error(`An error occurred when the api tried to connect to the database. Error : ${error}`);
            console.error('Closing the application...');
            process.exit(0)
        }
    },    
}