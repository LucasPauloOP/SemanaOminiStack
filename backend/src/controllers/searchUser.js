const User = require("../models/User");
const parseStringAsArray = require("../utils/parseStringAsArray");
module.exports = {
    async searchUserBylocationAndTechs(request, response) {
        var {latitude, longitude, techs} = request.query;
        techs = parseStringAsArray(techs);

        const users = await User.find({
            techs:{$in: techs},
            location:{
                $near:{
                    $geometry:{
                        type:"Point",
                        coordinates:[longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        }) 
        response.json(users)
    }
}