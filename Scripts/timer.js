var timeLeft;
const timerStates = {
    STOPPED: 'stopped',
    PLAYING: 'playing',
    PAUSED: 'paused'
};
const labelStates = {
    ENABLED: "enabled",
    DISABLED: "disabled"
};
let timerState = timerStates.STOPPED;
let timerLabel;
let interval;
let sessionTimeLeft, breakTimeLeft;
let startButton;

function startButtonListener(button) {
    timerLabel = document.getElementById("timerLabel");
    clearInterval(interval);
    if (timerState === timerStates.STOPPED) {
        startButton = button;
        timeLeft = document.getElementById("totalHours").value * 3600 +
            document.getElementById("totalMinutes").value * 60;
        startButton.innerText = "Pause";
        timerState = timerStates.PLAYING;
        timerLabel.className = labelStates.ENABLED;
        interval = setInterval(updateTimeLabel, 1000);
    } else if (timerState === timerStates.PLAYING) {
        startButton.innerText = "Resume";
        timerState = timerStates.PAUSED;
        clearInterval(interval);
        timerLabel.className = labelStates.DISABLED;
    } else if (timerState == timerStates.PAUSED) {
        startButton.innerText = "Pause";
        timerState = timerStates.PLAYING;
        interval = setInterval(updateTimeLabel, 1000);
        timerLabel.className = labelStates.ENABLED;
    }
}

function startBreak() {
    breakTimeLeft--;
    player.playVideo();
    if (breakTimeLeft == 0) {
        player.stopVideo();
        sessionTimeLeft = sessionLength;

    }
}

function updateTimeLabel() {
    timeLeft--;
    sessionTimeLeft--;
    let hours = Math.floor(timeLeft / 3600);
    hours = String("0" + hours).slice(-2);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    minutes = String("0" + minutes).slice(-2);
    let seconds = Math.floor(timeLeft % 60);
    seconds = String("0" + seconds).slice(-2);
    timerLabel.innerHTML = hours + ":" + minutes + ":" + seconds;
    if (sessionTimeLeft == 0) {
        startBreak();
    }
}


