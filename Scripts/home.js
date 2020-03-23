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


/*Start Timer*/
function startTimer(time) {
    clearInterval(interval);
    seconds = time * 60;
    interval = setInterval(changeTimeLabel, 1000);
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


document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    var meetingName = document.getElementById("name").value;
    var meetingID = document.getElementById("meetingID").value;
    saveMessage(meetingName, meetingID);
    document.querySelector('.alert').style.display = 'block';
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);
}

/*FIREBASE*/
function saveMessage(meetingName, meetingID) {
    var newMeetingRef = meetingsRef.push();
    newMeetingRef.set({
        name: meetingName,
        meetingID: meetingID
    });
}

