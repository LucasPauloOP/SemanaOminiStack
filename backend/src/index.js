const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
require('dotenv').config();
const cors = require("cors");

app.use(cors())
app.use(express.json());
app.use(routes);
const mdbUrl = process.env.MDB_URL;

mongoose.connect(mdbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

app.listen(3000);