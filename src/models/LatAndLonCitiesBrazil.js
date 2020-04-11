//Imports
const mongoose = require('mongoose');


const LatAndLonCitiesBrazilSchema = new mongoose.Schema({
    ibgeCode: Number,
    latitude: Number,
    longitude: Number,
    nameCity: String,        
}, { minimize: false });

module.exports = mongoose.model('latAndLonCitiesBrazil', LatAndLonCitiesBrazilSchema);