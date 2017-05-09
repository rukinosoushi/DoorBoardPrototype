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
	document.getElementById("currentNote").innerHTML = data.notice;

	if (localStorage.getItem(localStorage.getItem("currentBoard")) === null){
		document.getElementById("pName").innerHTML = data.name;
		document.getElementById("pMail").innerHTML = data.email;
		document.getElementById("pPhone").innerHTML = data.phone;
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + data.photo + ")";
		document.getElementById("roomNum").innerHTML = "Room "+ data.office;
		if (localStorage.getItem("currentBoard") == "egolub"){
			document.getElementById("otherP").innerHTML = "Michael Hicks";
		} else if (localStorage.getItem("currentBoard") == "mhicks"){
			document.getElementById("otherP").innerHTML = "Evan Golub";
		}else{
			document.getElementById("switchPage").style.display = "none";
		}

	} else {
		var userData = JSON.parse(localStorage.getItem(localStorage.getItem("currentBoard")));
		console.log(userData);
		document.getElementById("pName").innerHTML = userData.pName;
		document.getElementById("pMail").innerHTML = userData.pMail;
		document.getElementById("pPhone").innerHTML = userData.pPhone;
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + userData.pPhoto + ")";
		document.getElementById("roomNum").innerHTML = "Room "+ userData.office;

		if (localStorage.getItem("currentBoard") == "egolub"){
			document.getElementById("otherP").innerHTML = JSON.parse(localStorage.getItem("mhicks")).pName;
		} else if (localStorage.getItem("currentBoard") == "mhicks"){
			document.getElementById("otherP").innerHTML = JSON.parse(localStorage.getItem("egolub")).pName;
		}else{
			document.getElementById("switchPage").style.display = "none";
		}
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

function switchPage(){
	if (localStorage.getItem("currentBoard") == "egolub") localStorage.setItem("currentBoard", "mhicks");
	else if (localStorage.getItem("currentBoard") == "mhicks") localStorage.setItem("currentBoard", "egolub");
	restoreData();
}
document.getElementById("backBoard").onclick = function(){backBoard()};
document.addEventListener("DOMContentLoaded", restoreData());
document.getElementById("switchPage").onclick = function(){switchPage()}