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
	document.getElementById("pPhoto").value = null;
	if (localStorage.getItem("pName") === null){
		document.getElementById("pName").value = data.name;
	} else {
		document.getElementById("pName").value = localStorage.getItem("pName");
	}
	if (localStorage.getItem("pMail") === null){
		document.getElementById("pMail").value = data.email;
	} else {
		document.getElementById("pMail").value = localStorage.getItem("pMail");
	}
	if (localStorage.getItem("pPhone") === null){
		document.getElementById("pPhone").value = data.phone;
	} else {
		document.getElementById("pPhone").value = localStorage.getItem("pPhone");
	}

	if (localStorage.getItem("pPhoto") === null){
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + data.photo + ")";
	} else {
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + localStorage.getItem("pPhoto") + ")";
	}
}
function changePhoto(){
	if (document.getElementById("pPhoto").value !== null){
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + document.getElementById("pPhoto").value.replace("C:\\fakepath\\", "") + ")";
	}
}
function saveChanges(){
	if (confirm("Are you sure to save any changes you made on this page and update them to your message board?")){
		if (document.getElementById("pName").value == "") {
			alert("Invalid name!");
		} else if (document.getElementById("pPhone").value == ""){
			alert("Invalid phone number!");
		} else if (document.getElementById("pMail").value == ""){
			alert("Invalid E-mail address!");
		} else {
			localStorage.setItem("pPhoto", document.getElementById("pPhoto").value.replace("C:\\fakepath\\", ""));
			localStorage.setItem("pName", document.getElementById("pName").value);
			localStorage.setItem("pPhone", document.getElementById("pPhone").value);
			localStorage.setItem("pMail", document.getElementById("pMail").value);
			alert("Changes are saved and updated to your message board!");
		}
	}
}
function restoreData(){
	loadJson("1115.json", function(response){
		var json = JSON.parse(response);
	init(json);
	})
}
function resetSetting(){
	if (confirm("Are you sure to reset all fields to their intial value?")){
		localStorage.removeItem("pName");
		localStorage.removeItem("pPhoto");
		localStorage.removeItem("pPhone");
		localStorage.removeItem("pMail");
		restoreData();
	}
}

document.addEventListener("DOMContentLoaded", restoreData);
document.getElementById("pPhoto").onchange = function(){changePhoto()};
document.getElementById("save").onclick = function(){saveChanges()};
document.getElementById("reset").onclick = function(){resetSetting()};