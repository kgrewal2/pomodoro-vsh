function newElement() {
    /*List Item*/
    var listItem = document.createElement("li");
    var taskTitle = document.getElementById("taskTitle");
    var textNode = document.createTextNode(taskTitle.value);
    listItem.appendChild(textNode);

    /*Adding checked listener*/
    listItem.addEventListener('click', function (ev) {
        ev.target.classList.toggle('checked');
    })

    /*Close Button*/
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    listItem.appendChild(span);
    span.onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }

    /*Adding List Item*/
    if (taskTitle.value === '') {

    } else {
        document.getElementById("taskList").appendChild(listItem);
    }
    document.getElementById("taskTitle").value = "";
}

