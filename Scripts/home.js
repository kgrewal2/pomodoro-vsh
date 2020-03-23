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
function playsound(snd){
    this.sound = document.createElement("audio");
    this.sound.src = snd;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
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
    if (seconds < 10)
        timeLabel.style.color = "red";
        /*Start flashing and make noise here @ ~ 10 seconds left.*/
        //tickingSoundMP3.play();
        //tickingSoundWAV.play();
        playsound(tickingSoundMP3);
        playsound(tickingSoundWAV);
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