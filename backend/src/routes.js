const {Router} = require("express");
const routes = Router();
const userControllers = require("./controllers/user");
const searchUserControllers = require("./controllers/searchUser");

routes.post("/users",userControllers.registerUser)
routes.get("/users",userControllers.getAllUser);
routes.get("/search",searchUserControllers.searchUserBylocationAndTechs);

module.exports = routes;