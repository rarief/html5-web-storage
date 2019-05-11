function showContent() { // Unused - Debug Only
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	{
		xmlhttp=new XMLHttpRequest();
	}
	else // code for IE6, IE5
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var olala = xmlhttp.responseText;
			var encoded = olala;
			olala = decodeURIComponent(encoded);
			document.getElementById("content_text_area").value = olala;
		}
	}
	xmlhttp.open("GET","php/getfilecontent.php?file="+sessionStorage.getItem('document_opened')+"&user_id="+localStorage.getItem('user_id'),true);
	xmlhttp.send();
}

function showContentOffline() {
	var temp = "";
	var encoded = "";
	var olala = sessionStorage.getItem('database');
	olala = decodeURIComponent(olala);
	olala = decodeURIComponent(olala);
	olala = StringtoXML(olala);
	x=olala.getElementsByTagName("DATA");
	for (i=0;i<x.length;i++)
	{
		if(olala.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue == sessionStorage.getItem('document_opened'))
		{
			for (j=0;j<olala.getElementsByTagName("CONTENT")[i].childNodes.length;j++)
			{
				temp = temp+olala.getElementsByTagName("CONTENT")[i].childNodes[j].nodeValue;
			}
			temp = decodeURIComponent(temp);
		}
	}
	document.getElementById("content_text_area").value = temp;
}

function showFilename() {
	document.getElementById("file_name").value = sessionStorage.getItem('document_opened');
}

function save() {
	if(sessionStorage.getItem('type')=="old") {
		// alert("old");
		if(localStorage.getItem('ol_stat')==1) {
			// alert("olstat 1");
			// saveDocOffline();
			saveDoc();
		} else {
			// alert("olstat 0");
			saveDocOffline();
		}
		sessionStorage.setItem('doc_changed', 0)
		sessionStorage.setItem('doc_saved', 1)
		alert("File Saved");
	} else if (sessionStorage.getItem('type')=="new") {
		// alert("new");
		if(localStorage.getItem('user_id')!=null) {
			// alert("logged in");
			// alert("olstat="+localStorage.getItem('ol_stat'));
			if(localStorage.getItem('ol_stat')==1) {
				// alert("olstat 1");
				// saveDocOffline();
				saveDoc();
			} else {
				// alert("olstat 0");
				saveDocOffline();
			}
			sessionStorage.setItem('document_opened',document.getElementById('file_name').value);
			
			sessionStorage.setItem('doc_changed', 0)
			sessionStorage.setItem('doc_saved', 1)
			alert("File Saved");
		}
		if(localStorage.getItem('user_id')==null) {
			// alert("haven't login");
			document.getElementById("login-container-edit").style.display = "block";
		}
	}
}

function saveDoc() {
	if(document.getElementById('file_name').value==""){return;};
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	{
		var xmlhttp=new XMLHttpRequest();
	}
	else // code for IE6, IE5
	{
		var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			// alert(xmlhttp.responseText);
			// alert("File Saved");
		}
	}
	var file_name = encodeURIComponent(document.getElementById('file_name').value);
	var content = encodeURIComponent(document.getElementById('content_text_area').value);
	content = encodeURIComponent(content);
	
	var data = "user_id="+localStorage.getItem('user_id')+"&file_name="+file_name+"&content="+content;

	xmlhttp.open("POST", "php/save.php?save", true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(data);
}

function saveDocOffline() {
	if(document.getElementById('file_name').value==""){return;};
	var saved = 0;
	var temp = "";
	var encoded = "";
	var XMLdoc = localStorage.getItem('database');
	XMLdoc = decodeURIComponent(XMLdoc);
	XMLdoc = decodeURIComponent(XMLdoc);
	XMLdoc = StringtoXML(XMLdoc);
	x=XMLdoc.getElementsByTagName("DATA");
	for (i=0;i<x.length;i++)
	{
		if(XMLdoc.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue == document.getElementById('file_name').value)
		{
			temp = encodeURIComponent(document.getElementById("content_text_area").value);
			XMLdoc.getElementsByTagName("CONTENT")[i].childNodes[0].nodeValue = temp;
			saved = 1;
		}
	}
	if(saved == 0)
	{
		var file_name = document.getElementById('file_name').value;
		var content = encodeURIComponent(document.getElementById('content_text_area').value);
		var user_id = localStorage.getItem('user_id');
		if(sessionStorage.getItem('version')!="") {
			var version = sessionStorage.getItem('version');
		} else {
			var version = "1";
		}
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();
		
		// alert(content);
		
		if (day < 10) 
		 day = '0' + day;

		if (month < 10) 
		 month = '0' + month;
		 
		if (hours < 10) 
		 hours = '0' + hours;

		if (minutes < 10) 
		 minutes = '0' + minutes;

		if (seconds < 10) 
		 seconds = '0' + seconds;
		
		newDoc = XMLdoc.createElement("DATA");
		y = XMLdoc.getElementsByTagName("DATA")[0];

		x = XMLdoc.documentElement;
		
		x.insertBefore(newDoc,y);
		
		newElement1 = XMLdoc.createElement("ID");
		newElement2 = XMLdoc.createElement("TITLE");
		newElement3 = XMLdoc.createElement("CONTENT");
		newElement4 = XMLdoc.createElement("CREATE");
		newElement5 = XMLdoc.createElement("EDIT");
		newElement6 = XMLdoc.createElement("VERSION");

		x = XMLdoc.getElementsByTagName("DATA")[0];
		x.appendChild(newElement1);
		x.appendChild(newElement2);
		x.appendChild(newElement3);
		x.appendChild(newElement4);
		x.appendChild(newElement5);
		x.appendChild(newElement6);
		
		newText1 = XMLdoc.createTextNode(user_id);
		newText2 = XMLdoc.createTextNode(""+file_name);
		newText3 = XMLdoc.createTextNode(""+content);
		newText4 = XMLdoc.createTextNode(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
		newText5 = XMLdoc.createTextNode(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
		newText6 = XMLdoc.createTextNode(""+version);
		
		XMLdoc.getElementsByTagName("ID")[0].appendChild(newText1);
		XMLdoc.getElementsByTagName("TITLE")[0].appendChild(newText2);
		XMLdoc.getElementsByTagName("CONTENT")[0].appendChild(newText3);
		XMLdoc.getElementsByTagName("CREATE")[0].appendChild(newText4);
		XMLdoc.getElementsByTagName("EDIT")[0].appendChild(newText5);
		XMLdoc.getElementsByTagName("VERSION")[0].appendChild(newText6);
	}
		
	XMLdoc = XMLToString(XMLdoc);
	XMLdoc = encodeURIComponent(XMLdoc);
	XMLdoc = encodeURIComponent(XMLdoc);
	
	sessionStorage.setItem('database',XMLdoc);
	localStorage.setItem('database',XMLdoc);
	
	// alert("File Saved");
	
	// --------------

}

function StringtoXML(text) {
	if (window.ActiveXObject){
	  var doc=new ActiveXObject('Microsoft.XMLDOM');
	  doc.async='false';
	  doc.loadXML(text);
	} else {
	  var parser=new DOMParser();
	  var doc=parser.parseFromString(text,'text/xml');
	}
	return doc;
}

function XMLToString(oXML) {
	if (window.ActiveXObject) {
		return oXML.xml;
	} else {
		return (new XMLSerializer()).serializeToString(oXML);
	}
}

function deleteDocOffline(var_filename) { // Unused - Debug Only
	var temp = "";
	var encoded = "";
	var olala = localStorage.getItem('database');
	olala = decodeURIComponent(olala);
	olala = decodeURIComponent(olala);
	olala = StringtoXML(olala);
	x=olala.getElementsByTagName("DATA");
	for (i=0;i<x.length;i++)
	{
		if(olala.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue == var_filename)
		{
			olala.documentElement.removeChild(olala.getElementsByTagName("DATA")[i]);
		}
	}
	olala = XMLToString(olala);
	olala = encodeURIComponent(olala);
	olala = encodeURIComponent(olala);
	localStorage.setItem('database',olala);
	
	// showFileOffline(localStorage.getItem('ol_stat'));
}

function edit_login() {
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp_login=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp_login=new ActiveXObject("Microsoft.XMLHTTP");
	}
	  
	xmlhttp_login.onreadystatechange=function()
	{
		if (xmlhttp_login.readyState==4 && xmlhttp_login.status==200)
		{
			var response = xmlhttp_login.responseText;
			// document.getElementById('login_response').innerHTML = 'Welcome'+xmlhttp_login.responseText;
			if(response == 0){
			// if login fails
				document.getElementById('login_response').innerHTML = 'Login failed! Verify user and password.';
				document.getElementById('login_response').className = 'login_response_2';
				document.getElementById('login_response').style.display = "block";
				
			// else if login is ok show a message: "Welcome + the user name".
			} else {
				document.getElementById('login_response').innerHTML = 'Welcome.';
				document.getElementById('login_response').className = 'login_response';
				document.getElementById('login_response').style.display = "block";
				document.getElementById("login-container-edit").style.display = "none";
				localStorage.setItem('ol_stat', 1);
				localStorage.setItem('user_id', response);
				save();
				// window.location = "main.html";
			}
		}
		else if (xmlhttp_login.readyState==0)
		{
			document.getElementById('login_response').style.display = "block";
			document.getElementById('login_response').className = 'login_response_3';
			document.getElementById('login_response').innerHTML = 'Your are not connected to the Internet, please try again when you are connected';
		}
		else if (xmlhttp_login.readyState==1)
		{
			document.getElementById('login_response').style.display = "block";
			document.getElementById('login_response').className = 'login_response_3';
			document.getElementById('login_response').innerHTML = 'Trying to reach the server..';
		}
		else if (xmlhttp_login.readyState==2)
		{
			document.getElementById('login_response').style.display = "block";
			document.getElementById('login_response').className = 'login_response_3';
			document.getElementById('login_response').innerHTML = 'Trying to reach the server...';
		}
		else if (xmlhttp_login.readyState==3)
		{
			document.getElementById('login_response').style.display = "block";
			document.getElementById('login_response').className = 'login_response_3';
			document.getElementById('login_response').innerHTML = 'Trying to reach the server....';
		}
	}
	var username = encodeURI(document.getElementById('username_login').value);
	var password = encodeURI(document.getElementById('password_login').value);
	
	xmlhttp_login.open("GET","php/validator.php?signin=true&username="+username+"&password="+password,true);
	xmlhttp_login.send();
}

function convertFileTemp(var_filename) { // from DB to local storage
	// alert(localStorage.getItem('user_id'));
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	{
		var xmlhttp_cf=new XMLHttpRequest();
	}
	else // code for IE6, IE5
	{
		var xmlhttp_cf=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_cf.onreadystatechange=function()
	{
		if (xmlhttp_cf.readyState==4 && xmlhttp_cf.status==200)
		{
			var saved = 0;
			var xmlDoc, header;
			var document_list = "";
			
			XMLdoc = localStorage.getItem('database');
			XMLdoc = decodeURIComponent(XMLdoc);
			XMLdoc = decodeURIComponent(XMLdoc);
			XMLdoc = StringtoXML(XMLdoc);
			l=XMLdoc.getElementsByTagName("DATA");
			
			// alert(xmlhttp_cf.responseText);
			copyDoc = StringtoXML(xmlhttp_cf.responseText);
			
			// ---------------
			
			for (i=0;i<l.length;i++)
			{
				if(XMLdoc.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue == copyDoc.getElementsByTagName("TITLE")[0].childNodes[0].nodeValue)
				{
					// temp = encodeURIComponent(document.getElementById("content_text_area").value);
					// XMLdoc.getElementsByTagName("CONTENT")[i].childNodes[0].nodeValue = temp;
					XMLdoc.getElementsByTagName("CONTENT")[i].childNodes[0].nodeValue = copyDoc.getElementsByTagName("CONTENT")[0].childNodes[0].nodeValue;;
					XMLdoc.getElementsByTagName("CREATE")[i].childNodes[0].nodeValue = copyDoc.getElementsByTagName("CREATE")[0].childNodes[0].nodeValue;
					XMLdoc.getElementsByTagName("EDIT")[i].childNodes[0].nodeValue = copyDoc.getElementsByTagName("EDIT")[0].childNodes[0].nodeValue;
					XMLdoc.getElementsByTagName("VERSION")[i].childNodes[0].nodeValue = copyDoc.getElementsByTagName("VERSION")[0].childNodes[0].nodeValue;
					saved = 1;
				}
			}
			if(saved == 0)
			{
			// ---------------
				
				newDoc = XMLdoc.createElement("DATA");
				y = XMLdoc.getElementsByTagName("DATA")[0];

				x = XMLdoc.documentElement;
				
				x.insertBefore(newDoc,y);
				
				newElement1 = XMLdoc.createElement("ID");
				newElement2 = XMLdoc.createElement("TITLE");
				newElement3 = XMLdoc.createElement("CONTENT");
				newElement4 = XMLdoc.createElement("CREATE");
				newElement5 = XMLdoc.createElement("EDIT");
				newElement6 = XMLdoc.createElement("VERSION");

				x = XMLdoc.getElementsByTagName("DATA")[0];
				x.appendChild(newElement1);
				x.appendChild(newElement2);
				x.appendChild(newElement3);
				x.appendChild(newElement4);
				x.appendChild(newElement5);
				x.appendChild(newElement6);
				
				newText1 = XMLdoc.createTextNode(copyDoc.getElementsByTagName("ID")[0].childNodes[0].nodeValue);
				newText2 = XMLdoc.createTextNode(copyDoc.getElementsByTagName("TITLE")[0].childNodes[0].nodeValue);
				newText3 = XMLdoc.createTextNode(copyDoc.getElementsByTagName("CONTENT")[0].childNodes[0].nodeValue);
				newText4 = XMLdoc.createTextNode(copyDoc.getElementsByTagName("CREATE")[0].childNodes[0].nodeValue);
				newText5 = XMLdoc.createTextNode(copyDoc.getElementsByTagName("EDIT")[0].childNodes[0].nodeValue);
				newText6 = XMLdoc.createTextNode(copyDoc.getElementsByTagName("VERSION")[0].childNodes[0].nodeValue);
				
				XMLdoc.getElementsByTagName("ID")[0].appendChild(newText1);
				XMLdoc.getElementsByTagName("TITLE")[0].appendChild(newText2);
				XMLdoc.getElementsByTagName("CONTENT")[0].appendChild(newText3);
				XMLdoc.getElementsByTagName("CREATE")[0].appendChild(newText4);
				XMLdoc.getElementsByTagName("EDIT")[0].appendChild(newText5);
				XMLdoc.getElementsByTagName("VERSION")[0].appendChild(newText6);
				
			// ---------------
			}
		
			XMLdoc = XMLToString(XMLdoc);
			XMLdoc = encodeURIComponent(XMLdoc);
			XMLdoc = encodeURIComponent(XMLdoc);
			
			sessionStorage.setItem('database',XMLdoc);
			
			// showFileOffline(1);
			showContentOffline();
		}
	}
	xmlhttp_cf.open("GET","php/datacopy.php?tolocal=1&user_id="+sessionStorage.getItem('user_id')+"&file_name="+var_filename,true);
	// alert("php/datacopy.php?tolocal=1&user_id="+localStorage.getItem('user_id')+"&file_name="+var_filename);	
	xmlhttp_cf.send();
}

function docChange() {
	sessionStorage.setItem('doc_changed', 1);
}

function cleanLocal() {
	if(localStorage.getItem('user_id')!=null) {
		if(localStorage.getItem('ol_stat')==0) {
			if(sessionStorage.getItem('doc_saved')==0) {
				deleteDocOffline(sessionStorage.getItem('document_opened'));
			}
		} else {
			deleteDocOffline(sessionStorage.getItem('document_opened'));
		}
	}
}

function confirmExit() {
	if(sessionStorage.getItem('doc_changed')==1){
		return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
	}
}
	
function updateHeader() {			
	var online = "<div class='command command_margin_1'>Your Central Saving</div><div class='command command_margin_2'><button class='button' type='button' onclick='javascript:conUpdate();'>Refresh</button></div><div class='clear'></div>";
	var unlogged = "<div class='header-title'>Main</div><div class='header-menu' style='width:150px;'><a onclick='window.close();' href='login.html'>Close Document<a></div><div class='header-menu' style='float:right'></div>";
	var logged = "<div class='header-title'>Main</div><div class='header-menu' style='width:150px;'><a onclick='window.close();' href='main.html'>Close Document<a></div>";
	
	if(localStorage.getItem('user_id')==null) {
		document.getElementById("edit-header").innerHTML = unlogged;
	} else {
		document.getElementById("edit-header").innerHTML = logged;
	}
}

function conCheck() {
	// showFile();
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	{
		xmlhttp_cu=new XMLHttpRequest();
	}
	else // code for IE6, IE5
	{
		xmlhttp_cu=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_cu.onreadystatechange=function()
	{
		if (xmlhttp_cu.readyState==4 && xmlhttp_cu.status==200)
		{
			if (xmlhttp_cu.responseText=="connected")
			{
				localStorage.setItem('ol_stat',1);
				// return true;
			}
		}
		else if (xmlhttp_cu.readyState==0)
		{
			// alert("Not Initialized");
		}
		else if (xmlhttp_cu.readyState==1)
		{
			// alert("Open");
		}
		else if (xmlhttp_cu.readyState==2)
		{
			// alert("Sent");
		}
		else if (xmlhttp_cu.readyState==3)
		{
			// alert("Received");
		}
		else
		{
			// alert("Disconnected");
			localStorage.setItem('ol_stat',0);
			// return false;
        } 
	}
	xmlhttp_cu.open("GET","php/connectiontest.php",true);
	xmlhttp_cu.send();
	// alert(conStat);
}

function validateFormOnSubmit(theForm) {
var reason = "";

  reason += validateFilename(theForm.file_name);
      
  if (reason != "") {
    alert("Some fields need correction:\n" + reason);
    return false;
  }

  return true;
}

function validateFilename(fld) {
	var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    var error = "";
 
    if (fld.value == "") {
        fld.style.background = 'Yellow'; 
        error = "You didn't enter a filename.\n";
	} else {
		// error = "papapa";
			// error = ""+fld.value.length;
		for (var i = 0; i < fld.value.length; i++) {
			// error = ""+fld.length;
			if (iChars.indexOf(fld.value.charAt(i)) != -1) {
				error = "Your filename has special characters. \nThese are not allowed.\n Please remove them and try again.\n";
				fld.style.background = 'Yellow';
				return error;
			}
		}
	}
	return error;
}