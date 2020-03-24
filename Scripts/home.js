let timer_on = 0;
let timerSwitch = false;var interval;
var seconds = 0;
//These times are the Study/Break times "built in"
var twentyFive = 25;//25 min
var fifTeen =  15;//15 min
var ten =  10;//10 min
var five=  5;//5 min
var three =  3;//3 min
let times = [twentyFive, fifTeen, ten, five, three];
let session = [1, 2, 3, 4, 5, 6, 7, 8];

/*Start Timer*/
function startTimer(time) {
    clearInterval(interval);
    seconds = time * 60;
    console.log("In startTimer(time): " + time);
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
    //let timeLabel = document.getElementById("time-label");
    //var selectedSession = 4;
    let hrLabel = document.getElementById("count3");
    let minLabel = document.getElementById("count4");
    let secLabel = document.getElementById("count5");

    let min = ("0" + Math.floor(seconds / 60)).slice(-2);
    let sec = ("0" + seconds % 60).slice(-2);
    let hr = min * 60;
    seconds--;
    //timeLabel.innerHTML = hr + ":" + min + ":" + sec;
    hrLabel.innerHTML = hr;
    minLabel.innerHTML = min;
    secLabel.innerHTML = sec;

    if (seconds === -1){
        clearInterval(interval);
        tickingStop();
    }
    if (seconds < 10){
        //timeLabel.style.color = "red";
        hrLabel.style.color = "red";
        minLabel.style.color = "red";
        secLabel.style.color = "red";
        tickingPlay();
    }
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

/*Check that a time is selected for each elem, Study length, break/study times.*/
function checkInput(){
    var std = document.getElementById("study").innerHTML;
    var brk = document.getElementById("break").innerHTML;
    console.log("CHECKING std: " + std.value + " brk: " + brk);
    if(std.includes("STUDY") && brk.includes("BREAK")){
        alert("Please choose a study time and a break time before starting the timer. Thanks! :)");
    }else if(std.includes("STUDY") || brk.includes("BREAK")){
        alert("Please choose a study time AND a break time before starting the timer. Thanks! :)");
    }else{
        /*get the times from the dropdowns and pass that to startTime()*/
        var stdMin = 0;
        var brkMin = 0;
        var std = document.getElementById("study").childNodes;
        var brk = document.getElementById("break").childNodes;
        var label = document.getElementById("time-label");
        var timer = document.getElementById("timer").childNodes;
        console.log("1 IN CHECK INPUT(): " + timer_on);

        if(timer_on === 0){
            //turn timer on
            timer_on = 1;
            console.log("2 timer_on: " + timer_on);
            //These would be defualt times of 25 stdy and 5 brk
            /*Getting the values from the drop down.*/
            for(i = 0; i < std.length; i++){
                if(!(std[i].selected)){
                    //console.log("NOT SELECTED"), do nothing
                }else{
                    stdMin = std[i].value;//the study length chosen
                    console.log("4 study SELECTED: " + stdMin);
                    for(j = 0; j < brk.length; j++){
                        if(!(brk[j].selected)){
                            //console.log("NOT SELECTED"), do nothing
                        }else{
                            brkMin = brk[j].value;
                            console.log("5 break SELECTED: " + brkMin);
                        }
                    }
                }
            }

            console.log("6 INNER TEXT: " + timer[1].innerText + " " + timer[5].innerText + " " + timer[9].innerText);

            /*Checking timer*/
            if(timer[1].innerText === '00' && timer[5].innerText === '00' && timer[9].innerText === '00'){
                console.log("WE'VE NOW STARTED: " + stdMin + " " + brkMin);
                console.log("TIMER_ON: " + timer_on);
                startTimer(stdMin);
            }else if(seconds <= -1){
                timer_on = 0;
                startTimer(brkMin);
            }
        }else {
            getSwitch();
            /*
            //turn timer off
            timer_on = 0;
            console.log("2 timer_on: " + timer_on);
            /*Getting the values from the drop down.
            for(i = 0; i < std.length; i++){
                if(!(std[i].selected)){
                    //console.log("NOT SELECTED"), do nothing
                }else{
                    stdMin = std[i].value;//the study length chosen
                    console.log("4 study SELECTED: " + stdMin);
                    for(j = 0; j < brk.length; j++){
                        if(!(brk[j].selected)){
                                //console.log("NOT SELECTED"), do nothing
                        }else{
                                brkMin = brk[j].value;
                                console.log("5 break SELECTED: " + brkMin);
                        }
                    }
                }
            }
             /*Checking timer
             if(timer[0].innerText === '00' && timer[5].innerText === '00' && timer[9].innerText === '00'){
                console.log("WE'VE NOW STARTED: " + stdMin + " " + brkMin);
                console.log("TIMER_ON: " + timer_on);
                startTimer(brkMin);
            }else if(seconds <= -1){
                startTimer(stdMin);
            }*/
        }
    }
}

/** Fill the study time drop down. */
function getStudy(){
    var option = "";

    //This is the DOM manipulation
    var dropDown = document.getElementById("study");
    for (i = 0; i < times.length-2; i++) {
         option += "<option id=\"time" + i + "\" value=\"" + times[i] + "\" onclick=\'pomodoro()\'>" + times[i] + "</option>";
     }
     dropDown.innerHTML = option;
     var timer = document.getElementById("study").innerHTML.valueOf(option);
     console.log("In getStudy: " + timer);
}

/** Fill the break time drop down. */
function getBreak(){
    var option = "";

    //This is the DOM manipulation
    var dropDown = document.getElementById("break");
    for (i = 3; i < times.length; i++) {
        option += "<option id=\"time" + i + "\" value=\"" + times[i] + "\" onclick=\'pomodoro()\'>" + times[i] + "</option>";
    }
    dropDown.innerHTML = option;

    var timer = document.getElementById("break").innerHTML.valueOf(option);
    console.log("In getBreak: " + timer);
}

/** Fill the session drop down. */
function getSession(){
    var option = "";

    //This is the DOM manipulation
    var dropDown = document.getElementById("session");
    for (i = 0; i < session.length; i++) {
            option += "<option id=\"time" + i + "\" value=\"" + session[i] + "\" onclick=\'pomodoro()\'>" + session[i] + "</option>";
    }
    dropDown.innerHTML = option;

    //get the pomodoro counting in seconds
    var timer = document.getElementById("break").innerHTML.valueOf(option);
    console.log("In getSession: " + timer);
}

function getSwitch() {
    console.log("SWITCH: " + timer_on + " " + timerSwitch);
    var std = document.getElementById("study").childNodes;
    var brk = document.getElementById("break").childNodes;
    var opt = document.getElementsByTagName("option");
    var stdMin = 0;
    var brkMin = 0;
    if(timerSwitch === false){
         console.log("selected length: " + std.length);
         for(i = 0; i < std.length; i++){
              if(!(std[i].selected)){
                   console.log("NOT SELECTED")
              }else{
                   stdMin = std[i].value;
                   console.log("study SELECTED: " + stdMin);
                   for(j = 0; j < brk.length; j++){
                        brkMin = brk[j].value;
                        console.log("break SELECTED: " + brkMin);
                   }
              }
         }
         console.log("stdMin: " + stdMin + " brkMin: " + brkMin);
         timerSwitch = true;
         //pomodoro(brkMin, stdMin);
    }else {
        // document.body.style.background("lightgrey");
         getStart();
    }
}
