<?php
	// get
	$user_id = $_GET['user_id'];

	// database
	require_once('dbconnect.php');

	mysql_select_db($db_database, $db_koneksi);
	
	$result = mysql_query("SELECT * FROM document WHERE id=".$user_id." ORDER BY 'create_date' DESC LIMIT 20");
	
	echo "<LIST>";
	while($row = mysql_fetch_array($result))
	{
		echo "<DATA>";
		echo "<ID>". $row['id'] ."</ID>";
		echo "<TITLE>". $row['title'] ."</TITLE>";
		echo "<CONTENT>". $row['content'] ."</CONTENT>";
		echo "<CREATE>". $row['create_date'] ."</CREATE>";
		echo "<EDIT>". $row['last_edit_date'] ."</EDIT>";
		echo "</DATA>";
	}
	echo "</LIST>";

	mysql_close($db_koneksi);
?>