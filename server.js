const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 6688;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname));

let naam;
let naam2;
io.on('connection', (socket) => {
     socket.on('identity', (id) => {
         naam = id;
         console.log(id+': '+'connected');
     });
     naam = naam2;
     socket.on('disconnect', () => {
         console.log(naam+': '+'disconnected');
     });
    socket.on('seekPlus5', (seekPlus5)=>{
        io.emit('seekPlus5',seekPlus5)
    });
    socket.on('seekPlus10', (seekPlus10)=>{
        io.emit('seekPlus10',seekPlus10)
    });
    socket.on('seekPlus15', (seekPlus15)=>{
        io.emit('seekPlus15',seekPlus15)
    });
    socket.on('seekMinus5', (seekMinus5)=>{
        io.emit('seekMinus5',seekMinus5)
    });
    socket.on('seekMinus10', (seekMinus10)=>{
        io.emit('seekMinus10',seekMinus10)
    });
    socket.on('seekMinus15', (seekMinus15)=>{
        io.emit('seekMinus15',seekMinus15)
    });
    socket.on('customSeek', (customSeek)=>{
        console.log(customSeek);
        io.emit('customSeek',customSeek)
    });
    socket.on('tenthPart', (tenthPart)=>{
        io.emit('tenthPart',tenthPart)
    });
    socket.on('thirtiethPart', (thirtiethPart)=>{
        io.emit('thirtiethPart',thirtiethPart)
    });
    socket.on('sixtiethPart', (sixtiethPart)=>{
        io.emit('sixtiethPart',sixtiethPart)
    });
    socket.on('nintiethPart', (nintiethPart)=>{
        io.emit('nintiethPart',nintiethPart)
    });
    socket.on('pause', (pause)=>{
        io.emit('pause',pause)
    });
    socket.on('play', (play)=>{
        io.emit('play',play)
    });
    socket.on('stop', (stop)=>{
        io.emit('stop',stop)
    });
    socket.on('syncTime', (syncTime)=>{
        io.emit('syncTime',syncTime)
    });     
 });

server.listen(port, () => {
    console.log('listening on http://localhost:'+port);
});