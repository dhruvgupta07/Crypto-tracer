<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get username and password from the form
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];

    // Create connection
    $conn = new mysqli("localhost", "root", "", "cryptracer");

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM user WHERE Name='$username' AND Password='$password'";
    $result = $conn->query($sql);

    echo "asdfghjklqwertyuiopzxcvbnm,";

    if ($result->num_rows == 1) {
        // Set session variables
        $_SESSION["loggedin"] = true;
        $_SESSION["username"] = $username;
        // Redirect user to dashboard.html
        // $conn->close();
       ?>
        <script type="text/javascript">
        alert("Login successfully!");
        // Redirect the user to another page if needed
        window.location.href = '../html/dashboard.html'; // Change to the desired page
        </script>
       <?php
       echo "asdfghjklqwertyuiopzxcvbnm,";
        
    } else {
        echo "<script>alert('Invalid username or password!'); window.location.href = '../html/login.html';</script>";
    }

    $conn->close();
}
?>
