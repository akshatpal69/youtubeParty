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
    console.log('identity set to: ' + identity);
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
socket.on('seekPlus5', (seekPlus5, plus5Press) => {
    if (seekPlus5 == 'seekPlus5') {
        let html;
        html = "<li>" + plus5Press + "</li>";
        logs.innerHTML += html;
        plus5fn();
    }
});
socket.on('seekPlus10', (seekPlus10, plus10Press) => {
    if (seekPlus10 == 'seekPlus10') {
        let html;
        html = "<li>" + plus10Press + "</li>";
        logs.innerHTML += html;
        plus10fn();
    }
});
socket.on('seekPlus15', (seekPlus15, plus15Press) => {
    if (seekPlus15 == 'seekPlus15') {
        let html;
        html = "<li>" + plus15Press + "</li>";
        logs.innerHTML += html;
        plus15fn();
    }
});
socket.on('seekMinus5', (seekMinus5, minus5Press) => {
    if (seekMinus5 == 'seekMinus5') {
        let html;
        html = "<li>" + minus5Press + "</li>";
        logs.innerHTML += html;
        minus5fn();

    }
});
socket.on('seekMinus10', (seekMinus10, minus10Press) => {
    if (seekMinus10 == 'seekMinus10') {
        let html;
        html = "<li>" + minus10Press + "</li>";
        logs.innerHTML += html;
        minus10fn();
    }
});
socket.on('seekMinus15', (seekMinus15, minus15Press) => {
    if (seekMinus15 == 'seekMinus15') {
        let html;
        html = "<li>" + minus15Press + "</li>";
        logs.innerHTML += html;
        minus15fn();
    }
});
socket.on('customSeek', (customSeekValue, customSeekLog) => {
    let html;
    html = "<li>" + customSeekLog + "</li>";
    logs.innerHTML += html;
    customSeekfn(customSeekValue);
});
socket.on('tenthPart', (tenthPart, percentSeekLog) => {
    if (tenthPart == 'tenthPart') {
        let html;
        html = "<li>" + percentSeekLog + "</li>";
        logs.innerHTML += html;
        customSeekfn(customSeekValue);
        tenthPartfn();
    }
});
socket.on('thirtiethPart', (thirtiethPart, percentSeekLog) => {
    if (thirtiethPart == 'thirtiethPart') {
        let html;
        html = "<li>" + percentSeekLog + "</li>";
        logs.innerHTML += html;
        customSeekfn(customSeekValue);
        thirtiethPartfn();
    }
});
socket.on('sixtiethPart', (sixtiethPart, percentSeekLog) => {
    if (sixtiethPart == 'sixtiethPart') {
        let html;
        html = "<li>" + percentSeekLog + "</li>";
        logs.innerHTML += html;
        customSeekfn(customSeekValue);
        sixtiethPartfn();
    }
});
socket.on('nintiethPart', (nintiethPart, percentSeekLog) => {
    if (nintiethPart == 'nintiethPart') {
        let html;
        html = "<li>" + percentSeekLog + "</li>";
        logs.innerHTML += html;
        customSeekfn(customSeekValue);
        nintiethPartfn();
    }
});
socket.on('pause', (pause, pauseLog) => {
    if (pause == 'pause') {
        let html;
        html = "<li>" + pauseLog + "</li>";
        logs.innerHTML += html;
        pauseVideo();
    }
});
socket.on('play', (play, playLog) => {
    if (play == 'play') {
        let html;
        html = "<li>" + playLog + "</li>";
        logs.innerHTML += html;
        playVideo();
    }
});
socket.on('stop', (stop, stopLog) => {
    if (stop == 'stop') {
        let html;
        html = "<li>" + stopLog + "</li>";
        logs.innerHTML += html;
        stopVideo();
    }
});
socket.on('syncTime', (syncTime, syncPress) => {
    player.seekTo(syncTime, true);
    let html;
    html = "<li>" + syncPress + "</li>";
    logs.innerHTML += html;
});
socket.on('consoleData', (consoleData, user) => {
    console.log('datareceived')

    // let html = "";
    // html += "<li id='log-messages'><b>"+consoleData+"<b></br>";
    let connectedUsers = "";
    connectedUsers = printObj(user);
    document.getElementById("connectedUsers").innerHTML = connectedUsers;
    // document.getElementById("logs").innerHTML += html;
    function printObj(user) {
        console.log('  printUser fncalled')
        var string = '';
        for (var key in user) {
            if (typeof user[key] == 'string') {
                string += user[key] + '</br>';
            }
            else {
                string += user[key] + '</br>';
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
console.log('video idetity set to:' + videoIdentity)
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
    let syncPress = controlIdentity + " pressed syncbutton";
    socket.emit('syncTime', syncTime, syncPress);
});
plus5.addEventListener("click", () => {
    console.log('plus5 event invoked')
    let plus5Press = controlIdentity + " seeked +5 seconds";
    socket.emit('seekPlus5', 'seekPlus5', plus5Press);
});
plus10.addEventListener("click", () => {
    console.log('plus10 event invoked')
    let plus10Press = controlIdentity + " seeked +10 seconds";
    socket.emit('seekPlus10', 'seekPlus10', plus10Press);
});
plus15.addEventListener("click", () => {
    console.log('plus15 event invoked')
    let plus15Press = controlIdentity + " seeked +15 seconds";
    socket.emit('seekPlus15', 'seekPlus15', plus15Press);
});
minus5.addEventListener("click", () => {
    console.log('minus5 event invoked')
    let minus5Press = controlIdentity + " seeked -5 seconds";
    socket.emit('seekMinus5', 'seekMinus5', minus5Press);
});
minus10.addEventListener("click", () => {
    console.log('minus10 event invoked')
    let minus10Press = controlIdentity + " seeked -10 seconds";
    socket.emit('seekMinus10', 'seekMinus10', minus10Press);
});
minus15.addEventListener("click", () => {
    console.log('minus15 event invoked')
    let minus15Press = controlIdentity + " seeked -15 seconds";
    socket.emit('seekMinus15', 'seekMinus15', minus15Press);
});
customSeek.addEventListener('keypress', function (e) {
    console.log('customseek event invoked')
    let customSeekValue = customSeek.value;
    let customSeekLog = controlIdentity + " seeked to " + customSeekValue + " seconds";
    if (e.key === 'Enter') {
        socket.emit('customSeek', customSeekValue, customSeekLog);
        customSeek.value = '';
    }
});
ten.addEventListener("click", () => {
    console.log('tenthPart event invoked')
    let percentSeekLog = controlIdentity + " seeked to 10% of the video";
    socket.emit('tenthPart', 'tenthPart', percentSeekLog);
});
thirty.addEventListener("click", () => {
    console.log('thirtiethPart event invoked')
    let percentSeekLog = controlIdentity + " seeked to 30% of the video";
    socket.emit('thirtiethPart', 'thirtiethPart', percentSeekLog);
});
sixty.addEventListener("click", () => {
    console.log('sixtiethPart event invoked')
    let percentSeekLog = controlIdentity + " seeked to 60% of the video";
    socket.emit('sixtiethPart', 'sixtiethPart', percentSeekLog);
});
ninty.addEventListener("click", () => {
    console.log('nintiethPart event invoked')
    let percentSeekLog = controlIdentity + " seeked to 90% of the video";
    socket.emit('nintiethPart', 'nintiethPart', percentSeekLog);
});
pause.addEventListener("click", function () {
    console.log('pause event invoked')
    let pauseLog = controlIdentity + " paused the video";
    socket.emit('pause', 'pause', pauseLog);
});
play.addEventListener("click", function () {
    console.log('play event invoked')
    let playLog = controlIdentity + " played the video";
    socket.emit('play', 'play', playLog);
});
stop.addEventListener("click", function () {
    console.log('stop event invoked')
    let stopLog = controlIdentity + " stopped the video";
    socket.emit('stop', 'stop', stopLog);
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
