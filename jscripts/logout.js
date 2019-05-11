function logout()
{
	clearAllData();
	localStorage.setItem("database",encodeURIComponent(encodeURIComponent("<LIST></LIST>")));
	window.location = "login.html";
}