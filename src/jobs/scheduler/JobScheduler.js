const cron = require('node-cron');
const JobDowloadedAndTransformationCsvDataCovidInBrazil = require('../JobDowloadedAndTransformationCsvDataCovidInBrazil');


module.exports = () => {

    console.info('Agendador de Jobs executado!');

    /**
     * Agendamento da Job que realiza o Downloaded do CSV
     * para a API trabalhar.
     * 
     * Execução de 20 em 20 mim
     * 
     */
    cron.schedule("0 */20 * * * *", async () => {
        
        await JobDowloadedAndTransformationCsvDataCovidInBrazil();
    },
    { 
        scheduled: true, 
        timezone: "America/Sao_Paulo"
    });

}