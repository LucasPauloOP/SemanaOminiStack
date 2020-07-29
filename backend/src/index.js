const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const routes = require("./routes");
require('dotenv').config();
const cors = require("cors");
const {setupWebSocket} = require("./webSocket");

app.use(cors())
app.use(express.json());
app.use(routes);
const server = http.Server(app);
setupWebSocket(server);
const mdbUrl = process.production.env.MDB_URL;

mongoose.connect(mdbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

server.listen(3000);