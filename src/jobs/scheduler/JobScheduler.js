const cron = require('node-cron');
const JobDowloadedCsv = require('../JobDowloadedCsv');


module.exports = () => {

    console.info('Agendador de Jobs executado!');

    /**
     * Agendamento da Job que realiza o Downloaded do CSV
     * para a API trabalhar.
     * 
     * Execução de 15 em 15 mim
     * 
     */
    cron.schedule("0 */1 * * * *", () => {
        
        JobDowloadedCsv();
    },
    { 
        scheduled: true, 
        timezone: "America/Sao_Paulo"
    });

}