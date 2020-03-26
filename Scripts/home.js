let timer_on = 0;
let timerSwitch = false;
var interval;
var seconds = 0;

/*These are used for the stop, break, pause buttons.*/
var sessionLength;
var breakLength;
var seconds;
var isTimerRunning;
var isReset;
var startButtonObj;

//These times are the Study/Break times "built in"
var twentyFive = 25;//25 min
var fifTeen =  15;//15 min
var ten =  10;//10 min
var five=  5;//5 min
var three =  3;//3 min
let times = [twentyFive, fifTeen, ten, five, three];
let session = [1, 2, 3, 4, 5, 6, 7, 8];

window.onload= () => {
    isReset = true;
}

/*Start Timer*/
function startTimer(time) {
    clearInterval(interval);
    seconds = time * 60;
    console.log("In startTimer(time): " + time);
    interval = setInterval(changeTimeLabel, 1000);
    isTimerRunning = true;
}

/*Resume Timer*/
function resumeTimer(min, sec){
    clearInterval(interval);
    seconds =  min + (min * 60) + sec;
    interval = setInterval(changeTimeLabel, 1000);
    isTimerRunning = true;
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
    let hrLabel = document.getElementById("count3");
    let minLabel = document.getElementById("count4");
    let secLabel = document.getElementById("count5");

    console.log("In changeTimeLabel: " + secLabel.innerText);

    let min = ("0" + Math.floor(seconds / 60)).slice(-2);
    let sec = ("0" + seconds % 60).slice(-2);
    let hr = 60 * 60;
    seconds--;
    //timeLabel.innerHTML = hr + ":" + min + ":" + sec;
    hrLabel.innerHTML = (hr * 4)/3600;
    minLabel.innerHTML = min;
    secLabel.innerHTML = sec;

    if (seconds === -1){
        clearInterval(interval);
        hrLabel.style.color = "black";
        minLabel.style.color = "black";
        secLabel.style.color = "black";
        tickingStop();
        getSwitch();
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
    var sess = document.getElementById("session").innerHTML;
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
            }else if(timer[1].innerText != '00' && timer[5].innerText != '00' && timer[9].innerText != '00'){
                /*TODO 3/24/2020: implement stop/reset here*/
                startTimer(timer[5].innerText + timer[9].innerText);
               //startButtonListener(this);
            }else if(seconds <= -1){
                timer_on = 0;
                isReset = false;
                startTimer(brkMin);
            }
        }else if(timer_on === 1){
            /*Resuming the timer*/
            console.log("Session: " + timer[1].innerText + " Mins: " + timer[5].innerText + " Secs: " + timer[9].innerText);
            //startTimer(timer[5].innerText);
            resumeTimer(timer[5].innerHTML, timer[9].innerHTML);
        }else if(isReset == true){
            sessionLength = document.getElementById("session").value;
            isReset = false;         
        }else{
            getSwitch();
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
    var timer = document.getElementById("session").innerHTML.valueOf(option);
    console.log("In getSession: " + timer);
    return timer;
}

function getSwitch() {
    console.log("SWITCH: " + timer_on + " " + timerSwitch);
    var std = document.getElementById("study").childNodes;
    var brk = document.getElementById("break").childNodes;
    var opt = document.getElementsByTagName("option");
    var stdMin = 0;
    var brkMin = 0;
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

    if(timerSwitch === false){
         console.log("selected length: " + std.length);
         timerSwitch = true;
         startTimer(brkMin);
    }else {
        // document.body.style.background("lightgrey");
         timerSwitch = false;
         startTimer(stdMin);
    }
}


function startButtonListener(button) {
    startButtonObj = button;
    console.log("This is the passed button: " + startButtonObj);
    //Starts the timer for the first time or after the user press STOP button
    if (isReset == true) {
        sessionLength = document.getElementById("session").value;
        breakLength = document.getElementById("break").value;
        startTimer(sessionLength);
        isReset = false;
    }
    //Pause the timer
    else if (isTimerRunning == true) {
        getPause();
    }
    //Resume the timer
    else {
        console.log("You clicked RESUME fromt startButtonListener()")
        getResume();
    }
}

//Reset the timer
function stopButtonListeners() {
    clearInterval(interval);
    seconds = sessionLength * 60;
    isReset = true;
    isTimerRunning = false;
}

//Pause the timer
function getPause(){
    clearInterval(interval);
    isTimerRunning = false;
}

//Resume the timer
function getResume() {
    console.log("You clicked RESUME " + interval);
    checkInput();
    isTimerRunning = true;   
}

function getReset() {
    console.log("You clicked RESET");
}