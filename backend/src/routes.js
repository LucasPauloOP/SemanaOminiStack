const {Router} = require("express");
const routes = Router();
const userControllers = require("./controllers/user");
const searchUserControllers = require("./controllers/searchUser");
const convertToCsv = require("./controllers/convertToJson.js");

//users
routes.post("/users",userControllers.registerUser)
routes.get("/users",userControllers.getAllUser);
routes.put("/users/:github_username",userControllers.updateUser);
routes.delete("/users/:github_username",userControllers.deleteUser);

//csvtojson
routes.get('/json/csv', convertToCsv.convertCsvToJson);

//search
routes.get("/search",searchUserControllers.searchUserBylocationAndTechs);

module.exports = routes;