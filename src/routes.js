//Imports
const express = require('express');

//Controllers
const CasesCityController = require('./controllers/CasesCityController');


// Criando instancia de rotas.
const routes = express.Router();

//Rota para obter o numero de casos por cidade.
routes.get('/api/city/cases/data.csv', CasesCityController.data);
routes.get('/api/city/cases/json', CasesCityController.index);



module.exports = routes;