/*
// Initialize Firebase (ADD YOUR OWN DATA)
const config = {
    apiKey: "AIzaSyD55zBmfpkWqt1uRVw2Ddlcqa4e48FMq0E",
    authDomain: "lisa-ca5ed.firebaseapp.com",
    databaseURL: "https://lisa-ca5ed.firebaseio.com",
    projectId: "lisa-ca5ed",
    storageBucket: "lisa-ca5ed.appspot.com",
    messagingSenderId: "655251167519",
    appId: "1:655251167519:web:45c4f3f11ccda1fc44f82a",
    measurementId: "G-C51PPVMKCV"
};
firebase.initializeApp(config);

// Reference messages collection
var meetingsRef = firebase.database().ref('meetings');
*/
var interval = 0;
var sessionLength;
var breakLength;
var seconds;
var isTimerRunning;
var isReset;
var startButtonObj;

window.onload = () => {
    isReset = true;
};

/*Start Timer*/
function startTimer(time) {
    clearInterval(interval);
    seconds = time * 60 - 1;
    interval = setInterval(changeTimeLabel, 1000);
    isTimerRunning = true;
}

function startButtonListener(button) {
    startButtonObj = button;
    //Starts the timer for the first time or after the user press STOP button
    if (isReset == true) {
        sessionLength = document.getElementById("session-length").value;
        breakLength = document.getElementById("break-length").value;
        startTimer(sessionLength);
        isReset = false;
        startButtonObj.value = "Pause";
    }
    //Pause the timer
    else if (isTimerRunning == true) {
        clearInterval(interval);
        isTimerRunning = false;
        startButtonObj.value = "Play";
    }
    //Resume the timer
    else {
        interval = setInterval(changeTimeLabel, 1000);
        isTimerRunning = true;
        startButtonObj.value = "Pause";
    }
}

//Reset the timer
function stopButtonListeners() {
    clearInterval(interval);
    seconds = sessionLength * 60;
    changeTimeLabel();
    isReset = true;
    startButtonObj.value = "Start";
}

/*Change time label*/
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
    else
        timeLabel.style.color = "black";
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


/*document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    var meetingName = document.getElementById("name").value;
    var meetingID = document.getElementById("meetingID").value;
    saveMessage(meetingName, meetingID);
    document.querySelector('.alert').style.display = 'block';
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);
}*/
/*
/!*FIREBASE*!/
function saveMessage(meetingName, meetingID) {
    var newMeetingRef = meetingsRef.push();
    newMeetingRef.set({
        name: meetingName,
        meetingID: meetingID
    });
}*/

