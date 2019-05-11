function localStorageInit() {
	localStorage.setItem("database",encodeURIComponent(encodeURIComponent("<LIST></LIST>")));
}

function conUpdate() {
	showFile();
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	{
		var xmlhttp_cu=new XMLHttpRequest();
	}
	else // code for IE6, IE5
	{
		var xmlhttp_cu=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_cu.onreadystatechange=function()
	{
		if (xmlhttp_cu.readyState==4 && xmlhttp_cu.status==200)
		{
			if (xmlhttp_cu.responseText=="connected")
			{
				// alert("Connected");
				if(localStorage.getItem('ol_stat')==1)
				{
				}
				else if(localStorage.getItem('ol_stat')==0)
				{
					localStorage.setItem('ol_stat',1);
					// Sync();
					showFile();
					// showFileOffline(1);
				}
				return true;
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
			if(localStorage.getItem('ol_stat')==1)
			{
				localStorage.setItem('ol_stat',0);
				showFile();
				// showFileOffline(0);
			}
			else if(localStorage.getItem('ol_stat')==0)
			{
			}
			return false;
        } 
	}
	xmlhttp_cu.open("GET","php/connectiontest.php",true);
	xmlhttp_cu.send();
	// alert(conStat);
}

function showFile() {
	var online = "<div class='command command_margin_1'>Your Files</div><div class=\"command command_margin_2\">"+'<button id=create_button class=button type=button onclick="window.open(\'edit.html?new,'+localStorage.getItem('user_id')+'\',\'_newtab\');">New Document</button>'+"</div><div class='command command_margin_2'><button class='button' type='button' onclick='javascript:conUpdate();Sync();'>Refresh</button></div><div class='clear'></div>";
				
	var offline = "<div class='command command_margin_1'>You Are Not Connected to the Server</div><div class=\"command command_margin_2\">"+'<button id=create_button class=button type=button onclick="window.open(\'edit.html?new,'+localStorage.getItem('user_id')+'\',\'_newtab\');">New Document</button>'+"</div><div class='command command_margin_2'><button class='button' type='button' onclick='javascript:conUpdate();Sync();'>Refresh</button></div><div class='clear'></div>";
	
	// "<div class='command command_right'><div id='progress_container' class='command_progress'><div id='progress' style=''></div></div></div>";
	
	// <div class='command command_margin_2'><button class='button' type='button' onclick='javascript:conUpdate();Sync();'>Refresh</button></div>
	
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
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			document.getElementById("command-list").innerHTML = online;
			document.getElementById("file-list").innerHTML = xmlhttp.responseText;
		}
		else {
			document.getElementById("command-list").innerHTML = offline;
			document.getElementById("file-list").innerHTML = "";
        } 
	}
	xmlhttp.open("GET","php/getfilelist.php?user_id="+localStorage.getItem('user_id'),true);
	xmlhttp.send();
}

function showFileOffline(var_status) { // Unused - Debug Only
	var header;
	var document_list = "";
	var temp = localStorage.getItem('database');
	temp = decodeURIComponent(temp);
	temp = decodeURIComponent(temp);
	header = "<table class='table'><tr><th>Title</th><th>Last Edited</th><th>Delete</th><th>Copy</th></tr>";
	header_off = "<table class='table'><tr><th>Title</th><th>Last Edited</th><th>Delete</th></tr>";
	
	xmlDoc = StringtoXML(temp);
	x=xmlDoc.getElementsByTagName("DATA");

	for (i=0;i<x.length;i++)
	{
		document_list = document_list+"<tr>"+"<td><a href='javascript:openDocOffline(\""+xmlDoc.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue+"\")'>"+xmlDoc.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue+"</a></td>";
		document_list = document_list+"<td>"+xmlDoc.getElementsByTagName("EDIT")[i].childNodes[0].nodeValue+"</td>";
		document_list = document_list+"<td><a href='javascript:deleteDocOffline(\""+xmlDoc.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue+"\")'>Delete</a></td>";
		if(var_status==1) // IF Online
		{
			document_list = document_list+"<td><a href='javascript:convertFileBack(\""+xmlDoc.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue+"\")'>Copy</a></td></tr>";
		}
	}
	
	if(var_status==1) // IF Online
	{
		document.getElementById("file-list2").innerHTML = header+document_list;
	} else {
		document.getElementById("file-list2").innerHTML = header_off+document_list;
	}
	
	showRemainingLocalStorage();
}

function deleteDoc(var_filename) {
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	{
		var xmlhttp_dd=new XMLHttpRequest();
	}
	else // code for IE6, IE5
	{
		var xmlhttp_dd=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_dd.onreadystatechange=function()
	{
		if (xmlhttp_dd.readyState==4 && xmlhttp_dd.status==200)
		{
			conUpdate();
		}
	}
	xmlhttp_dd.open("GET","php/save.php?delete&user_id="+localStorage.getItem('user_id')+"&file_name="+var_filename,true);
	xmlhttp_dd.send();
	conUpdate();
}

function deleteDocOffline(var_filename) {
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
	// alert("deleted");
	
}

function deleteD(var_filename) {
	deleteDoc(var_filename);
	deleteDocOffline(var_filename);
}

function removeDocStorage() {
	sessionStorage.removeItem('document_opened');
	sessionStorage.removeItem('type');
}

function removeOLStat() {
	localStorage.removeItem('ol_stat');
}

function clearAllData() {
	localStorage.removeItem('database');
	localStorage.removeItem('user_id');
	localStorage.removeItem('ol_stat');
	sessionStorage.removeItem('doc_opened');
	sessionStorage.removeItem('doc_changed');
	sessionStorage.removeItem('doc_saved');
	sessionStorage.removeItem('type');
}

function openDoc(doc_name) {
	// sessionStorage.setItem('type', 'old');
	// convertFile(doc_name);
}

function openDocOffline(x) { // Unused - Debug Only
	window.location = 'edit.html';
	sessionStorage.setItem('document_opened', x);
	sessionStorage.setItem('type', 'offline');
}

function ConvertDB() { // Unused - Debug Only
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	{
		var xmlhttp_cdb=new XMLHttpRequest();
	}
	else // code for IE6, IE5
	{
		var xmlhttp_cdb=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_cdb.onreadystatechange=function()
	{
		if (xmlhttp_cdb.readyState==4 && xmlhttp_cdb.status==200)
		{
			localStorage.setItem('database', encodeURIComponent(encodeURIComponent(xmlhttp_cdb.responseText)));
			// showFileOffline(1);
		}
	}
	xmlhttp_cdb.open("GET","php/databasefetch.php?user_id="+localStorage.getItem('user_id'),true);
	xmlhttp_cdb.send();
}

function convertFile(var_filename) { // from DB to local storage
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
			
			localStorage.setItem('database',XMLdoc);
			
			// showFileOffline(1);
		}
	}
	xmlhttp_cf.open("GET","php/datacopy.php?tolocal=1&user_id="+localStorage.getItem('user_id')+"&file_name="+var_filename,true);
	xmlhttp_cf.send();
}

function convertFileBack(var_filename) { // local storage to DB // Unused - Debug Only
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	{
		var xmlhttp_cfb=new XMLHttpRequest();
	}
	else // code for IE6, IE5
	{
		var xmlhttp_cfb=new ActiveXObject("Microsoft.XMLHTTP");
	}
	// xmlhttp_cfb.onreadystatechange=function()
	// {
		// if (xmlhttp_cfb.readyState==4 && xmlhttp_cfb.status==200)
		// {
			// showFile();
		// }
	// }
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
			for (j=0;j<olala.getElementsByTagName("CONTENT")[i].childNodes.length;j++)
			{
				var file_name = encodeURIComponent(olala.getElementsByTagName("TITLE")[i].childNodes[j].nodeValue);
				var content = encodeURIComponent(olala.getElementsByTagName("CONTENT")[i].childNodes[j].nodeValue);
				var create = (olala.getElementsByTagName("CREATE")[i].childNodes[j].nodeValue);
				var edit = (olala.getElementsByTagName("EDIT")[i].childNodes[j].nodeValue);
			}
		}
	}
	
	var data = "toserver=1&user_id="+localStorage.getItem('user_id')+"&file_name="+file_name+"&content="+content+"&edit="+edit+"&create="+create;

	xmlhttp_cfb.open("POST", "php/datacopy.php", true);
	xmlhttp_cfb.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp_cfb.send(data);
}

function Sync() { // local storage to DB
	// alert("Synchronizing....");
	var isSync = false;
	var temp = "";
	var encoded = "";
	var olala = localStorage.getItem('database');
	olala = decodeURIComponent(olala);
	olala = decodeURIComponent(olala);
	olala = StringtoXML(olala);
	x=olala.getElementsByTagName("DATA");
	// alert(x.length);
	for (var i=0;i<x.length;i++)
	{
		if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
		{
			var xmlhttp_cfb=new XMLHttpRequest();
		}
		else // code for IE6, IE5
		{
			var xmlhttp_cfb=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp_cfb.onreadystatechange=function()
		{
			if (xmlhttp_cfb.readyState==4 && xmlhttp_cfb.status==200)
			{
				// showFile();
				// alert("XHR adalah: "+xmlhttp_cfb.responseText);
				// if(localStorage.getItem('ol_stat')==1) {
					// localStorageInit();
				// }
				// localStorageInit();
		
				// deleteDocOffline(olala.getElementsByTagName("TITLE")[i].childNodes[j].nodeValue);
				
				if(xmlhttp_cfb.responseText!="") {
					// alert("are going to delete "+xmlhttp_cfb.responseText);
					deleteDocOffline(xmlhttp_cfb.responseText);
					removeSynched(xmlhttp_cfb.responseText);
				}
				else {
					// alert("return nothing..");
				}
				 // else if (getSynched(file_name)) {
					// alert("are going to delete " + file_name);
					// deleteDocOffline(decodeURIComponent(file_name));
					// removeSynched(file_name);
				// }
			}
		}
		
		// alert(isSync);
		
		for (var j=0;j<olala.getElementsByTagName("CONTENT")[i].childNodes.length;j++)
		{
			var file_name = encodeURIComponent(olala.getElementsByTagName("TITLE")[i].childNodes[j].nodeValue);
			var content = encodeURIComponent(olala.getElementsByTagName("CONTENT")[i].childNodes[j].nodeValue);
			var create = (olala.getElementsByTagName("CREATE")[i].childNodes[j].nodeValue);
			var edit = (olala.getElementsByTagName("EDIT")[i].childNodes[j].nodeValue);
			var version = (olala.getElementsByTagName("VERSION")[i].childNodes[j].nodeValue);
		
			// deleteDocOffline(olala.getElementsByTagName("TITLE")[i].childNodes[j].nodeValue);
			// alert(file_name);
		
			if(!getSynched(decodeURIComponent(decodeURIComponent(file_name))) && localStorage.getItem('ol_stat')==1) {
			
				var data = "toserver=1&user_id="+localStorage.getItem('user_id')+"&file_name="+file_name+"&content="+content+"&edit="+edit+"&create="+create+"&version="+version;
				
				// alert(data);

				xmlhttp_cfb.open("POST", "php/datacopy.php", true);
				xmlhttp_cfb.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlhttp_cfb.send(data);
				
				file_name = decodeURIComponent(decodeURIComponent(file_name));
				
				// alert(file_name);
				
				addSynched(file_name);
				
				// alert(getSynched(encodeURIComponent(file_name)));
			}
		
			// alert(getSynched(file_name));		
		}
		
		// for (var j=0;j<olala.getElementsByTagName("CONTENT")[i].childNodes.length;j++)
		// {
			// var file_name = encodeURIComponent(olala.getElementsByTagName("TITLE")[i].childNodes[j].nodeValue);
			
			// if(getSynched(filename))
		
			// deleteDocOffline(olala.getElementsByTagName("TITLE")[i].childNodes[j].nodeValue);
		// }
	}
}

function synchedInit() {
	localStorage.setItem("synched",(("<LIST></LIST>")));
}

function addSynched(var_filename) { // insert inputted filename into Synched list
	// if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	// {
		// var xmlhttp_cf = new XMLHttpRequest();
	// }
	// else // code for IE6, IE5
	// {
		// var xmlhttp_cf = new ActiveXObject("Microsoft.XMLHTTP");
	// }
	// xmlhttp_cf.onreadystatechange=function()
	// {
		// if (xmlhttp_cf.readyState==4 && xmlhttp_cf.status==200)
		// {
			var saved = 0;
			var xmlDoc, header;
			var document_list = "";
			
			XMLdoc = localStorage.getItem('synched');
			XMLdoc = StringtoXML(XMLdoc);
			l=XMLdoc.getElementsByTagName("DATA");
			
			// copyDoc = StringtoXML(xmlhttp_cf.responseText);
			
			// ---------------
			
			for (i=0;i<l.length;i++)
			{
				if(XMLdoc.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue == var_filename)
				{
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
				
				newElement1 = XMLdoc.createElement("TITLE");

				x = XMLdoc.getElementsByTagName("DATA")[0];
				x.appendChild(newElement1);
				
				newText1 = XMLdoc.createTextNode(var_filename);
				
				XMLdoc.getElementsByTagName("TITLE")[0].appendChild(newText1);
				
			// ---------------
			}
		
			XMLdoc = XMLToString(XMLdoc);
			// XMLdoc = encodeURIComponent(XMLdoc);
			// XMLdoc = encodeURIComponent(XMLdoc);
			
			localStorage.setItem('synched',XMLdoc);
			
			// alert("added");
			
			// showFileOffline(1);
		// }
	// }
	// xmlhttp_cf.open("GET","php/datacopy.php?tolocal=1&user_id="+localStorage.getItem('user_id')+"&file_name="+var_filename,true);
	// xmlhttp_cf.send();
}

function removeSynched(var_filename) { // remove inputted filename in Synched
	var temp = "";
	var encoded = "";
	var olala = localStorage.getItem('synched');
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
	localStorage.setItem('synched',olala);
	
	// alert("removed");
	
	// showFileOffline(localStorage.getItem('ol_stat'));
}

function getSynched(var_filename) { // return true if filename exist in Synched
	var found = false;
	var olala = localStorage.getItem('synched');
	olala = StringtoXML(olala);
	x=olala.getElementsByTagName("DATA");
	for (i=0;i<x.length;i++)
	{
		if(olala.getElementsByTagName("TITLE")[i].childNodes[0].nodeValue == var_filename)
		{
			// olala.documentElement.removeChild(olala.getElementsByTagName("DATA")[i]);
			found = true;
		}
	}
	// olala = XMLToString(olala);
	// localStorage.setItem('synched',olala);
	
	return found;
	
	// showFileOffline(localStorage.getItem('ol_stat'));
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

function showRemainingLocalStorage() {
	var all = localStorage.getItem('database');
	progress(all.length);	
}
 
function progress(bla) {
	var all_length = 100;
	var storage_size = 2650000;
	
	if(BrowserDetect.browser == "Chrome")	{		
	}
	else if(BrowserDetect.browser == "Safari") {
	}
	else if(BrowserDetect.browser == "Firefox") {
		storage_size = 5250000;
	}
	else if(BrowserDetect.browser == "Opera") {
		storage_size = 5250000; 
	}
	else if(BrowserDetect.browser == "Explorer") {
		storage_size = 8100000 ;
	}

	var bar_length = (bla/storage_size)*all_length;

	var node = document.getElementById('progress');
	var w    = node.style.width.match(/\d+/);

	if (w == all_length) {
		w = 0;
	}

	node.style.width = bar_length + 'px';
}

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
