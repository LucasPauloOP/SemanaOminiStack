const express = require("express");
const app = express();

app.use(express.json());

app.get("/users", (request, response) => {
    console.log(request.query);
    return response.json({message: "koe"})
})

app.listen(3000);