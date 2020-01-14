const {Router} = require("express");
const routes = Router();
const userControllers = require("./controllers/user");
const searchUserControllers = require("./controllers/searchUser");

//users
routes.post("/users",userControllers.registerUser)
routes.get("/users",userControllers.getAllUser);
routes.put("/users",userControllers.updateUser);
routes.delete("/users/:github_username",userControllers.deleteUser);

//search
routes.get("/search",searchUserControllers.searchUserBylocationAndTechs);

module.exports = routes;