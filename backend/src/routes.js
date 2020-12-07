const {Router} = require("express");
const routes = Router();
const userControllers = require("./controllers/user");
const searchUserControllers = require("./controllers/searchUser");
const convertToCsv = require("./controllers/convertToJson.js");
const { csv2json } = require("json-2-csv");

//users
routes.post("/users",userControllers.registerUser)
routes.get("/users",userControllers.getAllUser);
routes.put("/users/:github_username",userControllers.updateUser);
routes.delete("/users/:github_username",userControllers.deleteUser);

//csvtojson
const category = '/json/csv';

routes.get('/json/csv/championship', convertToCsv.getChampionship);

routes.get(`${category}/matchs/:id`, convertToCsv.getMatchs);

routes.get(`${category}/times/:id`,convertToCsv.getTeams);

routes.get(`${category}/match/one/:id`,convertToCsv.getOneMatch);

routes.get(`${category}/player/one/:id`, convertToCsv.getOnePlayer);

//search
routes.get("/search",searchUserControllers.searchUserBylocationAndTechs);

module.exports = routes;