//Imports
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

//Configurando a API
const app = express();

//Permitindo requisições de todas as origens
app.use(cors());

//Pasta com os arquivos estáticos disponiveis na WEB da sua aplicação. Nossa View está aqui por exemplo no index.html
app.use(express.static('public'));

//Definindo tipo padrão de retorno
app.use(express.json());

//Arquivo de rotas da aplicação ( O Routes precisa ficar abaixo de cors e json por conta do esquema de execução do JavaScript)
app.use(routes);

module.exports = app;

