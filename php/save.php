<?php
// session
// session_start();
// if(empty($_SESSION["user_id"])){header("Location: login.php");}
$user_id = $_POST['user_id'];
require_once("dbconnect.php");
mysql_select_db($db_database, $db_koneksi);
//--------------------------------------------------- Save a File
if(isset($_GET['save'])) {
	
	// $content = $_POST['content'];
	$content = $_POST['content'];
	$content = str_replace("'", "''", $content);
	$file_name = $_POST['file_name'];
	// $file_name = $_POST['file_name'];
	$date = date("y/m/d : H:i:s", time());
	
	// echo $_POST['content'];
	
	// echo "Saving: \n";

	$query = mysql_query("SELECT * FROM document
				   WHERE id = '" . $user_id . "' 
				   AND title = '" . $file_name . "'
				  ") or die(mysql_error());

	list($doc_exist) = mysql_fetch_row($query);

	if(empty($doc_exist)) {
		$query =
		"INSERT INTO document (id,title,content,create_date,last_edit_date)
		VALUES ('".$user_id."','".$file_name."','".$content."','".$date."','".$date."')";
	// echo $query;
	} else {
		$query = "UPDATE `document`
		SET `title` = '".$file_name."', `content` = '".$content."', `last_edit_date` = '".$date."'
		WHERE `id` = '".$user_id."' AND `title` = '".$file_name."'";
		// echo $query."<br>";
		// $query =
		// "INSERT INTO document (id,title,content,create_date,last_edit_date)
		// VALUES ('".$user_id."','".$file_name."','".$content."','".$date."','".$date."')";
	// echo $query;
	}
	
	// echo $query;

	if(!mysql_query($query,$db_koneksi)){
		die('Error: ' . mysql_error());
	}
	
	mysql_close($db_koneksi);
	// header("Location:main.php");
}
//--------------------------------------------------- Delete a File
if(isset($_GET['delete'])) {
	
	$file_name = $_GET['file_name'];
	$user_id = $_GET['user_id'];
	// $date = date("y/m/d : H:i:s", time());

	// $query = mysql_query("SELECT * FROM document
				   // WHERE id = '" . $user_id . "' 
				   // AND title = '" . $file_name . "'
				  // ") or die(mysql_error());

	// list($doc_exist) = mysql_fetch_row($query);

	// if(empty($doc_exist)) {
		// $query =
		// "INSERT INTO document (id,title,content,create_date,last_edit_date)
		// VALUES ('".$user_id."','".$file_name."','".$content."','".$date."','".$date."')";
	// } else {
		// $query = "UPDATE `document`
		// SET `title` = '".$file_name."', `content` = '".$content."', `last_edit_date` = '".$date."'
		// WHERE `id` = '".$user_id."' AND `title` = '".$file_name."'";
	// }
	
	$query =
	"DELETE FROM document
	WHERE `id` = '".$user_id."' AND `title` = '".$file_name."'";

	if(!mysql_query($query,$db_koneksi)){
		die('Error: ' . mysql_error());
	}
	
	echo "";
	
	mysql_close($db_koneksi);
	// header("Location:main.php");
}
?>