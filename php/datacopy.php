<?php
require_once("dbconnect.php");
mysqli_select_db($db_koneksi, $db_database);
//--------------------------------------------------- Transfer from DB to Local Storage
if(isset($_GET['tolocal'])) {
	// get
	$user_id = $_GET['user_id'];
	$file_name = $_GET['file_name'];
	
	$result = mysqli_query($db_koneksi, "SELECT * FROM document WHERE id=".$user_id." AND title='".$file_name."'");
	
	// echo $user_id;
	// echo $file_name;
	
	while($row = mysqli_fetch_array($result))
	{
		echo "<DATA>";
		echo "<ID>". $row['id'] ."</ID>";
		echo "<TITLE>". $row['title'] ."</TITLE>";
		echo "<CONTENT>". $row['content'] ."</CONTENT>";
		echo "<CREATE>". $row['create_date'] ."</CREATE>";
		echo "<EDIT>". $row['last_edit_date'] ."</EDIT>";
		echo "<VERSION>". $row['version'] ."</VERSION>";
		echo "</DATA>";
	}

	mysqli_close($db_koneksi);
}
//--------------------------------------------------- Transfer back from local storage to DB
if(isset($_POST['toserver'])) {
	// echo "red";
	
	$user_id = $_POST['user_id'];
	$content = $_POST['content'];
	$content = str_replace("'", "''", $content);
	$file_name = $_POST['file_name'];
	$create = $_POST['create'];
	$edit = $_POST['edit'];
	$version = $_POST['version'];
	$date = date("y/m/d : H:i:s", time());
	
	// echo $_POST['file_name']."\n";
	// echo $_POST['content']."\n";
	// echo $_POST['create']."\n";
	// echo $_POST['edit']."\n";
	// echo $_POST['version']."\n";

	$query = mysqli_query($db_koneksi, "SELECT * FROM document
				   WHERE id = '" . $user_id . "' 
				   AND title = '" . $file_name . "'
				  ") or die(mysqli_error());
				  
	$result = mysqli_query($db_koneksi, "SELECT * FROM document
				   WHERE id = '" . $user_id . "' 
				   AND title = '" . $file_name . "'
				  ") or die(mysqli_error());

	list($doc_exist) = mysqli_fetch_row($query);

	// echo $query."\n";
	if(empty($doc_exist)) { // New Document
		$query =
		"INSERT INTO document (id,title,content,create_date,last_edit_date,version)
		VALUES ('".$user_id."','".$file_name."','".$content."','".$create."','".$edit."','".$version."')";
		echo $file_name;
		
	// Old Document
	
	} else {
		//	version check
		while($row = mysqli_fetch_array($result)) {
			
			if($version == $row['version']) { // version match
				$version++;
				$query = "UPDATE `document`
				SET `title` = '".$file_name."', `content` = '".$content."', `last_edit_date` = '".$edit."', `version` = '".$version."'
				WHERE `id` = '".$user_id."' AND `title` = '".$file_name."'";
				echo $file_name;
				
			} else { // version don't match
				for ($i = 1; $i <= 999; $i++) {
					$query = mysqli_query($db_koneksi, "SELECT * FROM document
					   WHERE id = '" . $user_id . "' 
					   AND title = '" . $file_name . " (".$i.")'
					  ") or die(mysqli_error());
					list($doc_exist) = mysqli_fetch_row($query);
					if(empty($doc_exist)) {
						 break;
					}
				}
				// $query = "UPDATE `document`
				// SET `title` = '".$file_name." (".$i.")', `content` = '".$content."', `last_edit_date` = '".$edit."', `version` = '".$version."'
				// WHERE `id` = '".$user_id."' AND `title` = '".$file_name."'";
				
				$query =
				"INSERT INTO document (id,title,content,create_date,last_edit_date,version)
				VALUES ('".$user_id."','".$file_name." (".$i.")','".$content."','".$create."','".$edit."','1')";
				echo $file_name;
			}
		}
	}
	// echo $query;

	if(!mysqli_query($db_koneksi, $query,$db_koneksi)){
		die('Error: ' . mysqli_error());
	}
	
	mysqli_close($db_koneksi);
}
?>