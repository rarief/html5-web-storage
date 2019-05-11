<?php
	// get
	$user_id = $_GET['user_id'];

	// database
	require_once('dbconnect.php');

	mysqli_select_db($db_koneksi, $db_database);
	
	$result = mysqli_query($db_koneksi, "SELECT * FROM document WHERE id=".$user_id);
	
	echo "<table class='table'>
	<tr>
	<th>Title</th>
	<th>Last Edited</th>
	<th>Delete</th>
	</tr>";

	while($row = mysqli_fetch_array($result))
	{
		echo "<tr>";
		echo "<td><a onclick='javascript:openDoc(\"".$row['title']."\")' href='edit.html?old,".$user_id.",".rawurlencode($row['title']).",".$row['version']."' target='_blank'>". $row['title'] ."</a></td>";
		echo "<td>" . $row['last_edit_date'] . "</td>";
		echo "<td><a href='javascript:deleteD(\"".$row['title']."\")'>Delete</a></td>";
		echo "</tr>";
	}
	echo "</table>";

	mysqli_close($db_koneksi);
?>