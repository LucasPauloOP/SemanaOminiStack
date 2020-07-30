const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const routes = require("./routes");
const dotenv = require('dotenv');
const cors = require("cors");
const {setupWebSocket} = require("./webSocket");
const environment = require('../' + process.env.NODE_ENV + '.env.js');

app.use(cors())
app.use(express.json());
app.use(routes);
const server = http.Server(app);
setupWebSocket(server);
const mdbUrl = environment.MDB_URL;

mongoose.connect(mdbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

console.log('conectado na porta 3000')

server.listen(3000);