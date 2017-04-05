function loadJson(file, callback){
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', file, true);
	xobj.onreadystatechange = function(){
		if (xobj.readyState == 4 && xobj.status == "200"){
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

function init(data){
	//cant find current user's data, read from files instead and load it into local storage
	if (localStorage.getItem(localStorage.getItem("currentBoard")) === null){
		document.getElementById("pName").innerHTML = data.name;
		document.getElementById("pMail").innerHTML = data.email;
		document.getElementById("pPhone").innerHTML = data.phone;
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + data.photo + ")";
		document.getElementById("roomNum").innerHTML = "Room "+ data.office;
	} else {
		var userData = JSON.parse(localStorage.getItem(localStorage.getItem("currentBoard")));
		console.log(userData);
		document.getElementById("pName").innerHTML = userData.pName;
		document.getElementById("pMail").innerHTML = userData.pMail;
		document.getElementById("pPhone").innerHTML = userData.pPhone;
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + userData.pPhoto + ")";
		document.getElementById("roomNum").innerHTML = "Room "+ userData.office;
	}
}


function restoreData(){
	loadJson(localStorage.getItem("currentBoard") + ".json", function(response){
		var json = JSON.parse(response);
	init(json);
	})
}

function backBoard(){
	localStorage.removeItem("currentBoard");
	window.location.replace("board.html");
}

document.getElementById("backBoard").onclick = function(){backBoard()};
document.addEventListener("DOMContentLoaded", restoreData());