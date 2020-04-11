//Imports
const app = require('./app');
const dotenv = require('dotenv');
const JobScheduler = require('./jobs/scheduler/JobScheduler');
const Connection = require('./database/Connection');

//Obtendo variaveis de ambiente do arquivo .env
dotenv.config();

//Executando agendamento das JOBS
JobScheduler();

//Testando conexão com o banco de dados
Connection.connect();

//Porta de trabalho da API.
app.listen(process.env.PORT, () => {
    console.info(`Servidor em execução na porta ${process.env.PORT}.`)
});