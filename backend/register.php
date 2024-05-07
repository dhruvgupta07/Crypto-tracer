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

$sql = "INSERT INTO user (Email, Name, Password) VALUES ('$email', '$username', '$password')";

if ($conn->query($sql) === TRUE) {
    // Close the PHP tag and use JavaScript for displaying alert
    $conn->close();
?>
    <!-- JavaScript for alert -->
    <script type="text/javascript">
        alert("Registered successfully!");
        // Redirect the user to another page if needed
        window.location.href = '../html/index.html'; // Change to the desired page
    </script>
<?php
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
    $conn->close();
}
?>
 