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
	if (localStorage.getItem("pName") === null){
		document.getElementById("pName").innerHTML = data.name;
	} else {
		document.getElementById("pName").innerHTML = localStorage.getItem("pName");
	}
	if (localStorage.getItem("pMail") === null){
		document.getElementById("pMail").innerHTML = data.email;
	} else {
		document.getElementById("pMail").innerHTML = localStorage.getItem("pMail");
	}
	if (localStorage.getItem("pPhone") === null){
		document.getElementById("pPhone").innerHTML = data.phone;
	} else {
		document.getElementById("pPhone").innerHTML = localStorage.getItem("pPhone");
	}

	if (localStorage.getItem("pPhoto") === null){
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + data.photo + ")";
	} else {
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + localStorage.getItem("pPhoto") + ")";
	}
}


function restoreData(){
	loadJson("1115.json", function(response){
		var json = JSON.parse(response);
	init(json);
	})
}


document.addEventListener("DOMContentLoaded", restoreData);