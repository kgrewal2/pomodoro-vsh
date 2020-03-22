var interval;
var seconds = 0;


function startTimer() {
    clearInterval(interval);
    seconds = 15;
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

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}


var close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}


var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);


function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("taskTitle").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (!(inputValue !== '')) {
        document.getElementById("tasksList").appendChild(li);
    }
    document.getElementById("taskTitle").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
