var interval;
var seconds = 0;


function startPomodoro() {
    seconds = 25*60-1;
    interval = setInterval(changeTimeLabel, 1000);
}

function changeTimeLabel() {
    let timeLabel = document.getElementById("time-label");
    let min = Math.floor(seconds/60);
    let sec = ("0"+seconds%60).slice(-2);
        seconds--;
        if (!seconds) {
            clearInterval(interval);
            timeLabel.innerHTML = "Done"
        }
        if(seconds<10){
            timeLabel.style.color = "red";
            timeLabel.innerHTML = seconds;}
        else{
            timeLabel.innerHTML = min+":"+sec;
        }
}
