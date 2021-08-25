const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3003;

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname));
app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/public/notFound.html')
  });
let naam;
let naam2;
// let connectedusers;
let user = {};
io.on('connection', (socket) => {
    socket.on('identity', (id) => {
        naam = id;
        console.log(id + ': ' + 'connected');
        let consoleData = id + ': ' + 'connected';
        user[id] = id;
        setTimeout(function () { io.emit('consoleData', consoleData, user); }, 3000);
    });
    naam = naam2;
    socket.on('disconnect', () => {
        console.log(naam + ': ' + 'disconnected');
        let consoleData = naam + ': ' + 'disconnected';
        console.log("deleted user:" + user[naam])
        delete user[naam];
        io.emit('consoleData', consoleData, user);
    });
    socket.on('seekPlus5', (seekPlus5, plus5Press) => {
        io.emit('seekPlus5', seekPlus5, plus5Press)
    });
    socket.on('seekPlus10', (seekPlus10, plus10Press) => {
        io.emit('seekPlus10', seekPlus10, plus10Press)
    });
    socket.on('seekPlus15', (seekPlus15, plus15Press) => {
        io.emit('seekPlus15', seekPlus15, plus15Press)
    });
    socket.on('seekMinus5', (seekMinus5, minus5Press) => {
        io.emit('seekMinus5', seekMinus5, minus5Press)
    });
    socket.on('seekMinus10', (seekMinus10, minus10Press) => {
        io.emit('seekMinus10', seekMinus10, minus10Press)
    });
    socket.on('seekMinus15', (seekMinus15, minus15Press) => {
        io.emit('seekMinus15', seekMinus15, minus15Press)
    });
    socket.on('customSeek', (customSeek, customSeekLog) => {
        io.emit('customSeek', customSeek, customSeekLog)

    });
    socket.on('tenthPart', (tenthPart, percentSeekLog) => {
        io.emit('tenthPart', tenthPart, percentSeekLog)
    });
    socket.on('thirtiethPart', (thirtiethPart, percentSeekLog) => {
        io.emit('thirtiethPart', thirtiethPart, percentSeekLog)
    });
    socket.on('sixtiethPart', (sixtiethPart, percentSeekLog) => {
        io.emit('sixtiethPart', sixtiethPart, percentSeekLog)
    });
    socket.on('nintiethPart', (nintiethPart, percentSeekLog) => {
        io.emit('nintiethPart', nintiethPart, percentSeekLog)
    });
    socket.on('pause', (pause, pauseLog) => {
        io.emit('pause', pause, pauseLog)
    });
    socket.on('play', (play, playLog) => {
        io.emit('play', play, playLog)
    });
    socket.on('stop', (stop, stopLog) => {
        io.emit('stop', stop, stopLog)
    });
    socket.on('syncTime', (syncTime, syncPress) => {
        io.emit('syncTime', syncTime, syncPress);
    });
    socket.on('vidFromClient', (vidFromClient)=>{
        console.log(vidFromClient)
        io.emit('vidFromServer', vidFromClient)
    })
});

server.listen(port, () => {
    console.log('listening on http://localhost:' + port);
});