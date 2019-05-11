<?php
// session
// session_start();
// database
require_once('dbconnect.php');

mysqli_select_db($db_database, $db_koneksi);
// $username = $_GET['username'];
// $password = $_GET['password'];

// echo $username.$password;

if(isset($_GET['signin'])) {
	if(empty($_GET['username']) OR empty($_GET['password'])) {
		// $_SESSION['status']='tidaklengkap';
		// header("location:login.html");
		// echo 'irfan afif ';
	
	} else {
		
		$username = mysqli_escape_string($db_koneksi, $_GET['username']);
		$password = mysqli_escape_string($db_koneksi, $_GET['password']);
 
		$query = mysqli_query($db_koneksi, "SELECT * FROM user
					   WHERE name = '" . $username . "' 
					   AND pass = '" . $password . "'
					  ") or die(mysqli_error());
 
		$result = mysqli_fetch_assoc($query);
		
		// echo 'irfan afif '.$result['name'];;
 
		if(empty($result)) {
			// header("location:login.html");
			 echo '0';
		} else {
			// $_SESSION['result'] = $result;
			// header("location:main.html");
			echo $result['id'];
		}
	} 
}

?>