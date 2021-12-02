const cors = require('cors');
const express = require('express');
const http = require('http');

const app = express();

app.use(cors());

//rotas

app.get("/", function(req, res) {
    res.send("<h1>Servidor está vivo</h1>");
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));