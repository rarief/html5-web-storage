function login()
{
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
				localStorage.setItem('user_id', response);
				window.location = "main.html";
			}
		}
		else if (xmlhttp_login.readyState==0)
		{
			document.getElementById('login_response').style.display = "block";
			document.getElementById('login_response').className = 'login_response2';
			document.getElementById('login_response').innerHTML = 'Unconnected';
		}
		else if (xmlhttp_login.readyState==1)
		{
			document.getElementById('login_response').style.display = "block";
			document.getElementById('login_response').className = 'login_response2';
			document.getElementById('login_response').innerHTML = 'Opening..';
		}
		else if (xmlhttp_login.readyState==2)
		{
			document.getElementById('login_response').style.display = "block";
			document.getElementById('login_response').className = 'login_response2';
			document.getElementById('login_response').innerHTML = 'Sent..';
		}
		else if (xmlhttp_login.readyState==3)
		{
			document.getElementById('login_response').style.display = "block";
			document.getElementById('login_response').className = 'login_response2';
			document.getElementById('login_response').innerHTML = 'Received..';
		}
	}
	var username = encodeURI(document.getElementById('username_login').value);
	var password = encodeURI(document.getElementById('password_login').value);
	
	xmlhttp_login.open("GET","php/validator.php?signin=true&username="+username+"&password="+password,true);
	xmlhttp_login.send();
}