var timeLeft;
var isTimerRunning = false;
var timerSwitch = false;
var workLength,breakLength;
var hoursLabel,minutesLabel,secondsLabel;
var interval;
var sessionTimeLeft,breakTimeLeft;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var count = 0;

/*YouTube embedded player*/
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

/*Start Timer Control*/
function startTimer() {
    clearInterval(interval);
    let currentSession = document.getElementById("work");
    let nextSession = document.getElementById("break");
    currentSession.style.color = "orange";
    nextSession.style.color = "white";
    //if the timer is not running
    if(isTimerRunning===false){
        timeLeft = document.getElementById("totalHours").value*3600+ document.getElementById("totalMinutes").value*60;
        isTimerRunning=true;

        console.log("StartTimer isTimerRunning = false, timeLeft:  " + timeLeft + " isTimerRunning: " + isTimerRunning);

        workLength = document.getElementById("workLength").value;
        sessionTimeLeft = workLength * 60;
        breakLength = document.getElementById("breakLength").value;
        breakTimeLeft = breakLength * 60;    
        console.log("workLength: " + workLength + "breakLength: " + breakLength + "breakTimeLeft: " + breakTimeLeft);
    }else{
        //if the timer is running, look at time-label for these values        
        timeLeft = document.getElementById("hours").innerHTML*3600 + document.getElementById("minutes").innerHTML*60;
        console.log("HERE IN startTime else, StartTimer timeLeft: " + timeLeft + " isTimerRunning : " + isTimerRunning + " timerSwitch: " + timerSwitch);
        console.log("workLength: " + workLength + "breakLength: " + breakLength + "breakTimeLeft: " + breakTimeLeft);
    }
        
    interval = setInterval(updateTimeLabel,1000);
}

function startBreak(){
    console.log("HERE IN startBreak()");

    let currentSession = document.getElementById("break");
    let nextSession = document.getElementById("work");
    currentSession.style.color = "orange";
    nextSession.style.color = "white";

    workLength = document.getElementById("workLength").value;
    sessionTimeLeft = workLength * 60;
    breakLength = document.getElementById("breakLength").value;
    breakTimeLeft = breakLength * 60; 

    breakTimeLeft--;
    console.log("In Start Break: " + breakTimeLeft);
}

function updateTimeLabel() {
    hoursLabel = document.getElementById("hours");
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    timeLeft--;
    
    if(timerSwitch == false){
        sessionTimeLeft--;
        count++;
        let hours = ("0" + Math.floor(timeLeft / 3600)).slice(-2);
        let minutes = ("0" + Math.floor((timeLeft % 3600) / 60)).slice(-2);
        let seconds = ("0" + Math.floor(timeLeft % 60)).slice(-2);
    
        hoursLabel.innerHTML = hours;
        minutesLabel.innerHTML = minutes;
        secondsLabel.innerHTML = seconds;
        
        //This is pulling the options in seconds form the drop downs.
        console.log("In update TimeLabel, SessionTimeLeft: " + sessionTimeLeft+" breakTimeLeft: "+breakTimeLeft+" timeLeft: " + timeLeft + " count: " + count);
        
        pomodoroAlerts(hours, minutes, seconds, count);
    }else{
        breakTimeLeft--;
        count++;
        let hours = ("0" + Math.floor(timeLeft / 3600)).slice(-2);
        let minutes = ("0" + Math.floor((timeLeft % 3600) / 60)).slice(-2);
        let seconds = ("0" + Math.floor(timeLeft % 60)).slice(-2);

        hoursLabel.innerHTML = hours;
        minutesLabel.innerHTML = minutes;
        secondsLabel.innerHTML = seconds;
        
        //This is pulling the options in seconds form the drop downs.
        console.log("In update TimeLabel, SessionTimeLeft: " + sessionTimeLeft+" breakTimeLeft: "+breakTimeLeft+" timeLeft: " + timeLeft);
        
        pomodoroAlerts(hours, minutes, seconds, count);
    }
}

/*Play ticking sound.*/
function tickingPlay(){
    const tickSound = document.getElementById("ticking");
    tickSound.play();
}

/*Stop ticking sound.*/
function tickingStop(){
    const tickSound = document.getElementById("ticking");
    tickSound.pause();
}

/*Switches between Study and Break timers/alerts*/
function getSwitch(){
    count = 0;
    if(timerSwitch === false){
         startTimer();
    }else {
         startBreak();
    }  
}

/*Executes a series of UI changes based on Pomodoro Technique.*/
function pomodoroAlerts(hours, minutes, seconds, count){
    //Actual hour, minutes, seconds passed here.
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.count = count;
    hoursLabel = document.getElementById("hours");
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");

    workLen = document.getElementById("workLength").value;
    breakLen = document.getElementById("breakLength").value;

    let workActivity = minutesLabel.value + workLen;
    let breakAcivity = minutesLabel.value + breakLen;

    console.log("PomodoroAlerts timerSwitch: " + timerSwitch+ " this.seconds: " + this.seconds + " this.minutes: " + this.minutes + " this.hours: " + this.hours + " breakLen: " + breakLen + " workLen: " + workLen + "\nthis.count: " + this.count + " workActivity: " + workActivity + " breakAcivity: " + breakAcivity);

    if(timerSwitch === false){
        if(sessionTimeLeft < 10){
            hoursLabel.style.color = "red";
            minutesLabel.style.color = "red";
            secondsLabel.style.color = "red";
            tickingPlay();
        }
        if(this.seconds == 0){
            tickingStop();
            hoursLabel.style.color = "white";
            minutesLabel.style.color = "white";
            secondsLabel.style.color = "white";
            timerSwitch = true;
            getSwitch();
        }
    }else if(timerSwitch === true){
        if(breakTimeLeft < 10){
            hoursLabel.style.color = "red";
            minutesLabel.style.color = "red";
            secondsLabel.style.color = "red";
            tickingPlay();
        }
        if(this.seconds == 0){
            tickingStop();
            hoursLabel.style.color = "white";
            minutesLabel.style.color = "white";
            secondsLabel.style.color = "white";
            timerSwitch = false;
            getSwitch();
        }
    }
}