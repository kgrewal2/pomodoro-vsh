var interval;
var seconds = 0;
let tickingSoundMP3 = new sound("./pomodoro-vsh/resources/Ticking_Clock-KevanGC-1934595011.mp3");
let tickingSoundWAV = new sound("./pomodoro-vsh/resources/Ticking_Clock-KevanGC-1934595011.wav");

/*Start Timer*/
function startTimer(time) {
    clearInterval(interval);
    seconds = 15;//time * 60;
    interval = setInterval(changeTimeLabel, 1000);
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

/*Change time label*/
function changeTimeLabel() {
    let timeLabel = document.getElementById("time-label");
    var selectedSession = 4;

    let min = ("0" + Math.floor(seconds / 60)).slice(-2);
    let sec = ("0" + seconds % 60).slice(-2);
    let hr = (min * 60)/selectedSession;
    seconds--;
    timeLabel.innerHTML = hr + ":" + min + ":" + sec;
    if (seconds === -1)
        clearInterval(interval);
        tickingStop();
    if (seconds < 10)
        timeLabel.style.color = "red";
        tickingPlay();
}


/*Add new task to the list*/
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("taskTitle").value;
    var t = document.createTextNode(inputValue);
    li.addEventListener("click", toggleTaskStatus);
    li.appendChild(t);
    if (inputValue === '') {
        /*do nothing*/
    } else {
        document.getElementById("tasksList").appendChild(li);
    }

    //Adding close (right side of task)
    document.getElementById("taskTitle").value = "";
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    var close = document.getElementsByClassName("close");
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

/*Toggle task status as checked*/
function toggleTaskStatus(e) {
    var target = e.target;
    target.classList.toggle("checked");
}