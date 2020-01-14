const express = require("express");
const app = express();

app.get("/", (request, response) => {
    return response.json({message: "koe"})
})

app.listen(3000);