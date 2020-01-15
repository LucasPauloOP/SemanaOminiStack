const User = require("../models/User");
const axios = require("axios");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {

	async getAllUser(request, response) {
		const users = await User.find();
		response.json(users);
	},

	async registerUser(request, response) {
		const { github_username, techs, latitude, longitude } = request.body;
		const getUser = await User.findOne({ github_username }, { _id: 0 })
		if (getUser) {
			response.json({ status: 400, message: "Usuário já cadastrado" })
		}
		else if (!getUser) {
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
	},

	async updateUser(request, response) {
		var { name, avatar_url, bio, techs } = request.body;
		const { github_username } = request.params;
		var user = await User.findOne({github_username})
		
		if(techs)
		{
			techs = parseStringAsArray(techs);
		}

		const updateData = {
			...user,
			name: name || user.name,
			avatar_url: avatar_url || user.avatar_url,
			bio : bio || user.bio,
			techs : techs || user.techs
		}

		console.log("Antes de dar update",user);

		user = await User.updateOne({github_username},{$set:{...user,updateData}},{new:true})
		console.log(">>>>>",user);
		
		return response.json(user);

	},

	async deleteUser(request, response) {

		const { github_username } = request.params
		const deleteInformation = await User.deleteOne({ github_username });

		if(!deleteInformation.deletedCount)
			return response.json({status:403, message:"Não possui usuário com este github username"})

		if(deleteInformation.deletedCount)
			return response.json({status: 200, message:"Deletado com sucesso"});
	}

}