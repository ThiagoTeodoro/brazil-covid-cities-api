const cron = require('node-cron');
const JobDowloadedAndTransformationCsvDataCovidInBrazil = require('../JobDowloadedAndTransformationCsvDataCovidInBrazil');


module.exports = () => {

    console.info('Agendador de Jobs executado!');

    /**
     * Agendamento da Job que realiza o Downloaded do CSV
     * para a API trabalhar.
     * 
     * Execução de 10 em 10 mim
     * 
     */
    cron.schedule("0 */10 * * * *", async () => {
        
        await JobDowloadedAndTransformationCsvDataCovidInBrazil();
    },
    { 
        scheduled: true, 
        timezone: "America/Sao_Paulo"
    });

}