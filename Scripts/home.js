var interval;
var seconds = 0;


function startTimer(time) {
    clearInterval(interval);
    seconds = time * 60 - 1;
    interval = setInterval(changeTimeLabel, 1000);
}

function changeTimeLabel() {
    let timeLabel = document.getElementById("time-label");

    let min = ("0" + Math.floor(seconds / 60)).slice(-2);
    let sec = ("0" + seconds % 60).slice(-2);
    seconds--;
    timeLabel.innerHTML = min + ":" + sec;
    if (seconds === -1)
        clearInterval(interval);
    if (seconds < 10)
        timeLabel.style.color = "red";
}
