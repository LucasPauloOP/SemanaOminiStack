const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(routes);

mongoose.connect("mongodb+srv://LucasPauloDev:adminadmin@cluster0-yt2qw.mongodb.net/OminiStack?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(3000);