const socketio = require('socket.io');
const connections = [];
const parseStringAsArray = require("./utils/parseStringAsArray");
const calculateDistance = require("./utils/calculateDistance");

let io;

exports.setupWebSocket = (server) => {
    console.log("connect WebSocket");
    io = socketio(server);

    io.on("connection", socket => {
        const {latitude,longitude, techs} = socket.handshake.query;
        connections.push({
            id: socket.id,
            coordinates:{
                latitude:Number(latitude),
                longitude:Number(longitude),
            },
            techs: parseStringAsArray(techs)
        });
    })
}

exports.findConnnections = (coordinates, techs) => {
    return connections.filter(connections => {
        return calculateDistance(coordinates, connections.coordinates) < 10 && 
        connections.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage=(to,message,data) =>{
    to.map(connection => {
        io.to(connection.id).emit(message, data)
    })
}