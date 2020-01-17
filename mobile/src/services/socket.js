import socketio from "socket.io-client";

const socket= socketio("http://19.19.19.106:3000",{
    autoConnect: false
});

export function subscribe(subscribeFunction) {
    socket.on("novo-usuário", subscribeFunction);
}

export function connect(latitude, longitude, techs){
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }
    socket.connect();
}

export function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}


