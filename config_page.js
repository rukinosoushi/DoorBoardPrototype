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

	//cant find current user's data, read from files instead and load it into local storage
	if (localStorage.getItem(localStorage.getItem("currentUser")) === null){
		document.getElementById("pName").value = data.name;
		document.getElementById("pMail").value = data.email;
		document.getElementById("pPhone").value = data.phone;
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + data.photo + ")";
		document.getElementById("roomNum").innerHTML = "Room "+ data.office;
		var userData = {pName: data.name, pMail: data.email, pPhone: data.phone, pPhoto: data.photo, office: data.office};
		localStorage.setItem(localStorage.getItem("currentUser"), JSON.stringify(userData));
	} else {
		var userData = JSON.parse(localStorage.getItem(localStorage.getItem("currentUser")));
		console.log(userData);
		document.getElementById("pName").value = userData.pName;
		document.getElementById("pMail").value = userData.pMail;
		document.getElementById("pPhone").value = userData.pPhone;
		document.getElementById("profilePhoto").style.backgroundImage = "url(" + userData.pPhoto + ")";
		document.getElementById("roomNum").innerHTML = "Room "+ userData.office;
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
			var userData = JSON.parse(localStorage.getItem(localStorage.getItem("currentUser")));
			userData.pName = document.getElementById("pName").value;
			userData.pPhone = document.getElementById("pPhone").value;
			userData.pMail = document.getElementById("pMail").value;
			if (document.getElementById("pPhoto").value) {
				userData.pPhoto = document.getElementById("pPhoto").value.replace("C:\\fakepath\\", "");
			}
			localStorage.setItem(localStorage.getItem("currentUser"), JSON.stringify(userData));
			alert("Changes are saved and updated to your message board!");
		}
	}
}
function restoreData(){
	loadJson(localStorage.getItem("currentUser") + ".json", function(response){
		var json = JSON.parse(response);
	init(json);
	})
}
function resetSetting(){
	if (confirm("Are you sure to reset all fields to their intial value?")){
		localStorage.removeItem(localStorage.getItem("currentUser"));
		restoreData();
	}
}
function logout(){
	if (confirm("Are you sure to log out and go back to login page? All unsaved changes will be lost.")){
		localStorage.removeItem("currentUser");
		window.location.replace("login.html");
	}
}


document.addEventListener("DOMContentLoaded", restoreData);
document.getElementById("pPhoto").onchange = function(){changePhoto()};
document.getElementById("save").onclick = function(){saveChanges()};
document.getElementById("reset").onclick = function(){resetSetting()};
document.getElementById("logout").onclick = function(){logout()};