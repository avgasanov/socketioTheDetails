const express = require('express');
const app = express();
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);
io.on('connection',(socket)=>{
    socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    socket.on('connect', () => {
        console.log('someone connected')
    })
    socket.on('TIME_TO_SERVER',(dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('TEST_TO_SERVER', (dataFromClient) => {
        console.log('TEST recived')
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer',(msg)=>{
        console.log(msg)
        io.emit('messageToClients',{text:msg.text})
    })
    socket.on('ACK_TIME_TO_SERVER', (msg, callback) => {
        console.log(msg);
        callback();
    })
})

