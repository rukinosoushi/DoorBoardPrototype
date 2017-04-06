// EventList Class
var incrementer = "";
var EventList = function (selectorID) {
    return {
        eventArray: [],
        listEl: document.getElementById(selectorID),
        idCnt: 0,
        add: function (newEvent) {
            var id = 'myEvent-' + this.idCnt;
            this.eventArray.push({
                id: id,
                event: newEvent
            });
            var eventDom = document.createElement('div'),
                eventText = document.createTextNode(newEvent);
            eventDom.setAttribute('id', id);
            eventDom.setAttribute('class', 'aEvent');
            eventDom.appendChild(eventText);
            this.listEl.appendChild(eventDom);
            ++this.idCnt;
        },
        remove: function (eventID) {
            for (var f in this.eventArray) {
                if (this.eventArray[f].id === eventID) {
                    delete this.eventArray[f];
                    var delEvent= document.getElementById(eventID);
                    this.listEl.removeChild(delEvent);
                }
            }
        }
    };
};

//Actual app

var myEventList = new EventList('events');

document.getElementById('eventBinder').addEventListener('click', function (e) {
    console.log("EVENT DETECTED!!!!");
        //var event = document.getElementById('addEvent').value;
       // myEventList.add(event);
        incrementer += "cs students want to meet on " + logStart +" to "+ logEnd+"\<br\>";
        localStorage.setItem("lastname", incrementer);
        console.log(localStorage.getItem("lastname"));
        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
        //incrementer += 1;

    /*previous way had a way to remove?
    if (e.target.id === 'addEventBtn') {
        var event = document.getElementById('addEvent').value;
        myEventList.add(event);
        localStorage.setItem("lastname", "Smith"+incrementer);
        console.log(localStorage.getItem("lastname"));
        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
        incrementer += 1;
    } else if (e.target.className === 'aEvent') {
        myEventList.remove(e.target.id);
    }
    */
}, false);
