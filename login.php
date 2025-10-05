<?php

$con = mysqli_connect("localhost", "root", "", "anime_world");

$email = $_POST['email'];
$password = $_POST['password'];

$req = "SELECT * FROM users WHERE email='$email'";
$res = mysqli_query($con, $req);

if (mysqli_num_rows($res) == 1) {
    $row = mysqli_fetch_assoc($res);
    if ($row['password'] == $password) {
        echo "Login successful";
    } else {
        echo "Incorrect password";
    }
} else {
    echo "Account not found. Please create an account.";
}

mysqli_close($con);
?>
