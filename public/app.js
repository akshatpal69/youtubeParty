/***************************************************************** Variables ********************************************************/
let username;
let identity;
let socket = io();
let videoIdentity = prompt("Please enter the video ID", "o24QIHHJzyc");
let firebaseConfig = {
    apiKey: "AIzaSyA_IqKvFoEP78YY5SzU0S1eRIi1y-dyQvw",
    authDomain: "learnfirebase-8bf03.firebaseapp.com",
    databaseURL: "https://learnfirebase-8bf03.firebaseio.com",
    projectId: "learnfirebase-8bf03",
    storageBucket: "learnfirebase-8bf03.appspot.com",
    messagingSenderId: "8432021767",
    appId: "1:8432021767:web:9bf6a4aa80b9a98840d5a2",
    measurementId: "G-5VCE2R946Z"
};
let messageBox = document.getElementById("message");
let tag = document.createElement('script');
let firstScriptTag = document.getElementsByTagName('script')[0];
let player;
let printStatus = document.getElementById('status');
let pause = document.getElementById("pause");
let play = document.getElementById("play");
let stop = document.getElementById("stop");
let time = document.getElementById("time");
let plus5 = document.getElementById("plus5");
let plus10 = document.getElementById("plus10");
let plus15 = document.getElementById("plus15");
let minus5 = document.getElementById("minus5");
let minus10 = document.getElementById("minus10");
let minus15 = document.getElementById("minus15");
let customSeek = document.getElementById("customSeek");
let ten = document.getElementById("ten");
let thirty = document.getElementById("thirty");
let sixty = document.getElementById("sixty");
let ninty = document.getElementById("ninty");
let syncBtn = document.getElementById("sync");
let logs = document.getElementById("logs");
/***************************************************************** SOCKET.IO ************************************************************/

window.addEventListener("load", function (username) {
    username = localStorage.getItem('Name');
    let uid = '';
    if (username == null || username == undefined) {
        uid = prompt("enter name");
        localStorage.setItem('Name', uid);
    }
    identity = localStorage.getItem('Name');
    console.log('identity set to: '+identity);
});



window.addEventListener("load", function (e) {
    e.preventDefault();
    socket.emit('identity', identity);
    console.log('identity emitted')
});
window.addEventListener("load", function (e) {
    e.preventDefault();
    this.setTimeout(() => {
        scrollToBottom('messageModule');
    }, 2500);
});
/////////////////////////////////////////////////////////CONTROL BUTTONS EVENTS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
socket.on('seekPlus5', (seekPlus5) => {
    if (seekPlus5 == 'seekPlus5') {
        plus5fn();
    }
});
socket.on('seekPlus10', (seekPlus10) => {
    if (seekPlus10 == 'seekPlus10') {
        plus10fn();
    }
});
socket.on('seekPlus15', (seekPlus15) => {
    if (seekPlus15 == 'seekPlus15') {
        plus15fn();
    }
});
socket.on('seekMinus5', (seekMinus5) => {
    if (seekMinus5 == 'seekMinus5') {
        minus5fn();
    }
});
socket.on('seekMinus10', (seekMinus10) => {
    if (seekMinus10 == 'seekMinus10') {
        minus10fn();
    }
});
socket.on('seekMinus15', (seekMinus15) => {
    if (seekMinus15 == 'seekMinus15') {
        minus15fn();
    }
});
socket.on('customSeek', (customSeekValue) => {
    customSeekfn(customSeekValue);
});
socket.on('tenthPart', (tenthPart) => {
    if (tenthPart == 'tenthPart') {
        tenthPartfn();
    }
});
socket.on('thirtiethPart', (thirtiethPart) => {
    if (thirtiethPart == 'thirtiethPart') {
        thirtiethPartfn();
    }
});
socket.on('sixtiethPart', (sixtiethPart) => {
    if (sixtiethPart == 'sixtiethPart') {
        sixtiethPartfn();
    }
});
socket.on('nintiethPart', (nintiethPart) => {
    if (nintiethPart == 'nintiethPart') {
        nintiethPartfn();
    }
});
socket.on('pause', (pause) => {
    if (pause == 'pause') {
        pauseVideo();
    }
});
socket.on('play', (play) => {
    if (play == 'play') {
        playVideo();
    }
});
socket.on('stop', (stop) => {
    if (stop == 'stop') {
        stopVideo();
    }
});
socket.on('syncTime', (syncTime, syncPress) => {
    player.seekTo(syncTime, true);
    let html;
    html = "<li>"+ syncPress+"</li>";
    logs.innerHTML += html;
});
socket.on('consoleData',(consoleData, user)=>{
    console.log('datareceived')
   
    // let html = "";
    // html += "<li id='log-messages'><b>"+consoleData+"<b></br>";
    let connectedUsers = "";
    connectedUsers= printObj(user);
    document.getElementById("connectedUsers").innerHTML = connectedUsers;
    // document.getElementById("logs").innerHTML += html;
    function printObj(user) {
      console.log('  printUser fncalled')
        var string = '';
        for(var key in user) {
            if(typeof user[key] == 'string') {
                string+= user[key] + '</br>';
            }
            else {
                string+= user[key] + '</br>';
            }
        }
        return string;
    }
})
/********************************************************* FIREBASE *******************************************************************/


firebase.initializeApp(firebaseConfig);

messageBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log('enter pressed')
        let message = document.getElementById("message").value;
        scrollToBottom('messageModule');

        // save in database
        firebase.database().ref("messages").push().set({
            "sender": identity,
            "message": message
        });
        messageBox.value = '';
        // prevent form from submitting
        return false;
    }
});

// listen for incoming messages
firebase.database().ref("messages").on("child_added", function (snapshot) {
    let html = "";
    // give each message a unique ID
    html += "<li id='message-" + snapshot.key + "'>";
    html += "<b>" + snapshot.val().sender + "</b>: " + snapshot.val().message.replace(/(.{1,25})/g, '$1<br/>');
    html += "</li>";
    document.getElementById("messages").innerHTML += html;
});

/*********************************************************** YOUTUBE ********************************************************************/

document.getElementById("player").src = "https://www.youtube.com/embed/" + videoIdentity + "?enablejsapi=1&autoplay=1"; //&autoplay=1
console.log('video idetity set to:'+videoIdentity)
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
let controlIdentity = localStorage.getItem('Name');
syncBtn.addEventListener("click", function () {
    console.log('sync event invoked')
    let syncTime = Math.round(player.getCurrentTime());
    console.log('synced');
    let syncPress = controlIdentity+" pressed syncbutton";
    socket.emit('syncTime', syncTime, syncPress);
});
plus5.addEventListener("click", () => {
    console.log('plus5 event invoked')
    socket.emit('seekPlus5', 'seekPlus5');
});
plus10.addEventListener("click", () => {
    console.log('plus10 event invoked')
    socket.emit('seekPlus10', 'seekPlus10');
});
plus15.addEventListener("click", () => {
    console.log('plus15 event invoked')
    socket.emit('seekPlus15', 'seekPlus15');
});
minus5.addEventListener("click", () => {
    console.log('minus5 event invoked')
    socket.emit('seekMinus5', 'seekMinus5');
});
minus10.addEventListener("click", () => {
    console.log('minus10 event invoked')
    socket.emit('seekMinus10', 'seekMinus10');
});
minus15.addEventListener("click", () => {
    console.log('minus15 event invoked')
    socket.emit('seekMinus15', 'seekMinus15');
});
customSeek.addEventListener('keypress', function (e) {
    console.log('customseek event invoked')
    let customSeekValue = customSeek.value;
    if (e.key === 'Enter') {
        socket.emit('customSeek', customSeekValue);
    }
});
ten.addEventListener("click", () => {
    console.log('tenthPart event invoked')
    socket.emit('tenthPart', 'tenthPart');
});
thirty.addEventListener("click", () => {
    console.log('thirtiethPart event invoked')
    socket.emit('thirtiethPart', 'thirtiethPart');
});
sixty.addEventListener("click", () => {
    console.log('sixtiethPart event invoked')
    socket.emit('sixtiethPart', 'sixtiethPart');
});
ninty.addEventListener("click", () => {
    console.log('nintiethPart event invoked')
    socket.emit('nintiethPart', 'nintiethPart');
});
pause.addEventListener("click", function () {
    console.log('pause event invoked')
    socket.emit('pause', 'pause');
});
play.addEventListener("click", function () {
    console.log('play event invoked')
    socket.emit('play', 'play');
});
stop.addEventListener("click", function () {
    console.log('stop event invoked')
    socket.emit('stop', 'stop');
    printStatus.innerHTML = "stopped";
});
function tenthPartfn() {
    let tenth = player.getDuration() / 10;
    player.seekTo(tenth, true)
    console.log('tenthPartfn function executed')
}
function thirtiethPartfn() {
    let tenth = player.getDuration() / 10;
    let thirtieth = tenth * 3;
    player.seekTo(thirtieth, true)
    console.log('thirtiethPartfn function executed')
}
function sixtiethPartfn() {
    let tenth = player.getDuration() / 10;
    let sixtieth = tenth * 6;
    player.seekTo(sixtieth, true)
    console.log('sixtiethPartfn function executed')
}
function nintiethPartfn() {
    let tenth = player.getDuration() / 10;
    let nintieth = tenth * 9;
    player.seekTo(nintieth, true)
    console.log('nintiethPartfn function executed')
}
function onPlayerReady(event) {
    document.getElementById('player').style.borderColor = '#FF6D00';
    
}
function changeBorderColor(playerStatus) {
    let color;
    if (playerStatus == -1) {
        color = "#37474F"; // unstarted = gray
    } else if (playerStatus == 0) {
        color = "#FFFF00"; // ended = yellow
        printStatus.innerHTML = "ended";
    } else if (playerStatus == 1) {
        color = "#33691E"; // playing = green
        printStatus.innerHTML = "playing";
    } else if (playerStatus == 2) {
        color = "#DD2C00"; // paused = red
        printStatus.innerHTML = "paused";
    } else if (playerStatus == 3) {
        color = "#AA00FF"; // buffering = purple
        printStatus.innerHTML = "buffering";
    } else if (playerStatus == 5) {
        color = "#FF6DOO"; // video cued = orange
    }
    if (color) {
        document.getElementById('player').style.borderColor = color;
    }
}
function onPlayerStateChange(event) {
    changeBorderColor(event.data);
}
function pauseVideo() {
    player.pauseVideo();
    console.log('pauseVideo function executed')
}
function playVideo() {
    player.playVideo();
    console.log('playVideo function executed')
}
function stopVideo() {
    player.stopVideo();
    console.log('stopVideo function executed')
}
function plus5fn() {
    player.seekTo(Math.round(player.getCurrentTime() + 5), true)
    console.log('plus5fn function executed')
}
function plus10fn() {
    player.seekTo(Math.round(player.getCurrentTime() + 10), true)
    console.log('plus15fn function executed')
}
function plus15fn() {
    player.seekTo(Math.round(player.getCurrentTime() + 15), true)
    console.log('plus15fn function executed')
}
function minus5fn() {
    player.seekTo(Math.round(player.getCurrentTime() - 5), true)
    console.log('minus5fn function executed')
}
function minus10fn() {
    player.seekTo(Math.round(player.getCurrentTime() - 10), true)
    console.log('minus10fn function executed')
}
function minus15fn() {
    player.seekTo(Math.round(player.getCurrentTime() - 15), true)
    console.log('minus15fn function executed')
}
function customSeekfn(value) {
    player.seekTo(Math.round(value), true);
    console.log('customSeekfn function executed')
}
function scrollToBottom(id) {
    let div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
    console.log('scrollToBottom executed');
}