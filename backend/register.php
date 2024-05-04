<?php
$email = $_REQUEST["email"];
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

// Create connection
$conn = new mysqli("localhost", "root", "", "cryptracer");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
$sql = "insert into user (Email, Name, Password) VALUES ('$email', '$username', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  
  $conn->close();
// echo $_REQUEST["username"];
?>