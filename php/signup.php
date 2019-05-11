<?php
// session
// session_start();
// if(empty($_SESSION["user_id"])){header("Location: login.php");}
require_once("dbconnect.php");
// mysqli_select_db($db_database, $db_koneksi);
//--------------------------------------------------- Save a File
	$username = $_POST['username'];
	$password = $_POST['password'];

	$query = mysqli_query($db_koneksi, "SELECT * FROM user
				   WHERE name = '" . $username . "'
				  ") or die(mysqli_error());

	list($doc_exist) = mysqli_fetch_row($query);

	if(empty($doc_exist)) {
		$query =
		"INSERT INTO user (name,pass)
		VALUES ('".$username."','".$password."')";
		
		echo $username.$password;

		if(!mysqli_query($db_koneksi, $query)){
			die('Error: ' . mysqli_error());
		}
	} else {$user_id."','".$file_name."','".$content."','".$date."','".$date."')";
		echo "1";
	}
	
	mysqli_close($db_koneksi);
	// header("Location:main.php");
?>