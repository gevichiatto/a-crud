require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const cors = require('cors');
const express = require('express');
const http = require('http');

const app = express();

app.use(cors());

app.use(require('./communications/rest/routes'));

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));