function createMeeting(){
    meetingName=document.getElementById("meetingName")
    meetingDate=document.getElementById("meetingDate")
    meetingStart=document.getElementById("meetingStart")
    meetingEnd=document.getElementById("meetingEnd")
    meetingID=meetingName.value+">>"+meetingDate.value+meetingStart.value+meetingEnd.value
    console.log(meetingID)
}

function joinMeeting(){
    console.log("Hel")
}
