//Imports
const mongoose = require('mongoose');


const DataCovidInBrazilSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    confirmadeCases: Number,
    ibgeCodeCity: Number,
    nameCity: String,
    continent: String,
    date: Date
}, { minimize: false })

module.exports = mongoose.model('dataCovidInBrazil', DataCovidInBrazilSchema);
