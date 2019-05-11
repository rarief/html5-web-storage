function validateFormOnSubmit(theForm) {
var reason = "";

  reason += validateUsername(theForm.username);
  reason += validatePassword(theForm.password);
  reason += validateRePassword(theForm.password,theForm.password2);
      
  if (reason != "") {
    alert("Some fields need correction:\n" + reason);
    return false;
  }
  return true;
}

function validateUsername(fld) {
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores
 
    if (fld.value == "") {
        fld.style.background = 'Yellow'; 
        error = "You didn't enter a username.\n";
    } else if ((fld.value.length < 5) || (fld.value.length > 50)) {
        fld.style.background = 'Yellow'; 
        error = "The username is the wrong length.\n";
    } else if (illegalChars.test(fld.value)) {
        fld.style.background = 'Yellow'; 
        error = "The username contains illegal characters.\n";
    } else {
        fld.style.background = 'White';
    } 
    return error;
}

function validatePassword(fld) {
    var error = "";
    var illegalChars = /[\W_]/; // allow only letters and numbers 
 
    if (fld.value == "") {
        fld.style.background = 'Yellow';
        error = "You didn't enter a password.\n";
    } else if ((fld.value.length < 5) || (fld.value.length > 50)) {
        error = "The password is the wrong length. \n";
        fld.style.background = 'Yellow';
    } else if (illegalChars.test(fld.value)) {
        error = "The password contains illegal characters.\n";
        fld.style.background = 'Yellow';
    } else if (!((fld.value.search(/(a-z)+/)) && (fld.value.search(/(0-9)+/)))) {
        error = "The password must contain at least one numeral.\n";
        fld.style.background = 'Yellow';
    } else {
        fld.style.background = 'White';
    }
   return error;
}

function validateRePassword(fld,fld2) {
    var error = "";
    if (fld.value != fld2.value) {
		error = "You did not enter the same new password twice. Please re-enter your password.\n";
        fld.style.background = 'Yellow';
		fld2.style.background = 'Yellow';
    }
   return error;
}

function signup()
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp_sign=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp_sign=new ActiveXObject("Microsoft.XMLHTTP");
	}
	  
	xmlhttp_sign.onreadystatechange=function()
	{
		if (xmlhttp_sign.readyState==4 && xmlhttp_sign.status==200)
		{
			var response = xmlhttp_sign.responseText;
			// alert("response"+response);
			// document.getElementById('login_response').innerHTML = 'Welcome'+xmlhttp_sign.responseText;
			if(response == "1"){
			// if login fails
				// document.getElementById('login_response').innerHTML = 'Login failed! Verify user and password.';
				// document.getElementById('login_response').className = 'login_response_2';
				// document.getElementById('login_response').style.display = "block";
				// alert("gagal");
				
			// else if login is ok show a message: "Welcome + the user name".
			} else {
				document.getElementById('login_response').innerHTML = 'Pendaftaran berhasil! Tunggu sebentar, anda akan segera ditujukan ke halaman utama.';
				document.getElementById('login_response').className = 'login_response';
				document.getElementById('login_response').style.display = "block";
				setInterval ("window.location = 'main.html';", 2000);
				// localStorage.setItem('user_id', response);
				// window.location = "main.html";
				// alert("berhasil");
			}
		}
		else if (xmlhttp_sign.readyState==0)
		{
			// document.getElementById('login_response').style.display = "block";
			// document.getElementById('login_response').className = 'login_response2';
			// document.getElementById('login_response').innerHTML = 'Unconnected';
		}
		else if (xmlhttp_sign.readyState==1)
		{
			// document.getElementById('login_response').style.display = "block";
			// document.getElementById('login_response').className = 'login_response2';
			// document.getElementById('login_response').innerHTML = 'Opening..';
		}
		else if (xmlhttp_sign.readyState==2)
		{
			// document.getElementById('login_response').style.display = "block";
			// document.getElementById('login_response').className = 'login_response2';
			// document.getElementById('login_response').innerHTML = 'Sent..';
		}
		else if (xmlhttp_sign.readyState==3)
		{
			// document.getElementById('login_response').style.display = "block";
			// document.getElementById('login_response').className = 'login_response2';
			// document.getElementById('login_response').innerHTML = 'Received..';
		}
	}
	var username = document.getElementById('username_signup').value;
	var password = document.getElementById('password_signup').value;
	
	var data = "username="+username+"&password="+password;

	xmlhttp_sign.open("POST", "php/signup.php", true);
	xmlhttp_sign.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp_sign.send(data);
	
	// xmlhttp_sign.open("GET","php/signup.php",true);
	// xmlhttp_sign.send();
}