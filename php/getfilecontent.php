<?php
	// session
	// session_start();
	// if(empty($_SESSION["user_id"])){header("Location: login.php");}
	// $user_id = $_SESSION['user_id'];

	// database
	require_once('dbconnect.php');
	
	// fundamental
	$user_id = $_GET['user_id'];
	$file = $_GET['file'];

	mysqli_select_db($db_koneksi, $db_database);

	$query = mysqli_query($db_koneksi, "SELECT * FROM document
				   WHERE id = '" . $user_id . "' 
				   AND title = '" . $file . "'
				  ") or die(mysqli_error());

	$row = mysqli_fetch_array($query);
	$content = $row['content'];
	
	echo $content;

	// mysqli_select_db($db_database, $db_koneksi);
	// $result = mysqli_query("SELECT * FROM document WHERE id=".$user_id);

	// echo "<table class='table'>
	// <tr>
	// <th>Title</th>
	// <th>Last Edited</th>
	// <th>Delete</th>
	// </tr>";

	// while($row = mysqli_fetch_array($result))
	// {
		// echo "<tr>";
		// echo "<td><a href='javascript:test1(\"".$row['title']."\")'>". $row['title'] ."</a></td>";
		// echo "<td>" . $row['last_edit_date'] . "</td>";
		// echo "<td><a href='save.php?delete&file_name=" . $row['title'] . "'>Delete</a></td>";
		// echo "</tr>";
	// }
	// echo "</table>";	

	mysqli_close($db_koneksi);
	
	// if(isset($_GET['file'])) {
		// echo "there is ".$_GET['file'];
	// }
	// else {
		// echo "there isn't";
	// }
?>