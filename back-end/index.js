require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const cors = require('cors');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    bodyParser.json({ limit: '30mb' })(req, res, next);
});

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '30mb',
}));

app.use(cors());

app.use(require('./communications/rest/routes'));

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));

app.use(express.static("./dist"));
app.get("*", function(req, res) {
    console.log(req._parsedOriginalUrl.path, path.join(__dirname, "dist", "index.html"))
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});