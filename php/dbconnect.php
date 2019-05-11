<?php
	# FileName="Connection_php_mysql.htm"
	# Type="MYSQL"
	# HTTP="true"
	$db_hostname = "localhost";
	$db_database = "db_tugasakhir";
	$db_username = "web-storage-app";
	$db_password = "password";
	$db_koneksi = mysqli_connect($db_hostname, $db_username, $db_password, $db_database) or trigger_error(mysql_error(),E_USER_ERROR);
?>