var timeLeft;
var isTimerRunning = false;
var sessionLength,breakLength;
var hoursLabel,minutesLabel,secondsLabel;
var interval;
var sessionTimeLeft,breakTimeLeft;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '400',
        width: '400',
        videoId: 'XULUBg_ZcAU',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

function startTimer() {
    clearInterval(interval);
    if(isTimerRunning===false){
        timeLeft = document.getElementById("totalHours").value*3600+ document.getElementById("totalMinutes").value*60;
        isTimerRunning=true;
    }
    sessionLength = document.getElementById("sessionLength");
    sessionLength = sessionLength.options[sessionLength.selectedIndex].value;
    sessionTimeLeft = sessionLength;
    breakLength = document.getElementById("breakLength");
    breakLength = breakLength.options[breakLength.selectedIndex].value;
    breakTimeLeft = breakLength;
    interval = setInterval(updateTimeLabel,1000);
}

function startBreak(){
    breakTimeLeft--;
    player.playVideo();
    if(breakTimeLeft==0){
        player.stopVideo();
        sessionTimeLeft=sessionLength;
    }
}

function updateTimeLabel() {
    hoursLabel = document.getElementById("hours");
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    timeLeft--;
    sessionTimeLeft--;
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = Math.floor(timeLeft % 60);
    hoursLabel.innerHTML = hours;
    minutesLabel.innerHTML = minutes;
    secondsLabel.innerHTML = seconds;
    console.log(sessionTimeLeft+" "+breakTimeLeft);
    if(sessionTimeLeft==0)
    {
        startBreak();
    }
}


