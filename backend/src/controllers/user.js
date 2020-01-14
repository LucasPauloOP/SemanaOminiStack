const User = require("../models/User");
const axios = require("axios");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {

    async getAllUser(request,response) {
        const users = await User.find();
        response.json(users);
    },
    
    async registerUser(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        const getUser = await User.findOne({github_username},{_id:0})
        if(getUser)
        {
            response.json({status: 400,message: "Usuário já cadastrado"})
        }
        else if(!getUser){
            const techsArray = parseStringAsArray(techs);
            const responseGithub = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = responseGithub.data
            const location = { type: "Point", coordinates: [longitude, latitude] }
            const user = await User.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            return response.json(user);
        }
    }
}