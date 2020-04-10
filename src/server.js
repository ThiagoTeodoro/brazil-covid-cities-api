const app = require('./app');
const JobScheduler = require('./jobs/scheduler/JobScheduler');

//Executando agendamento das JOBS
JobScheduler();

//Porta de trabalho da API.
app.listen(3333);