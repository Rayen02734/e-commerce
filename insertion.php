<?php

$con = mysqli_connect("localhost", "root", "", "anime_world");

$first = $_POST["fname"];
$last = $_POST["lname"];
$email = $_POST["email"];
$pass = $_POST["password"];
$time = date("Y-m-d H:i:s"); 

$req1 = "SELECT * FROM users WHERE email='$email'";
$res1 = mysqli_query($con, $req1);

if (mysqli_num_rows($res1) == 1) {
    echo "Account already exists";
} 

else {
    $req2 = "INSERT INTO users (id, firstname, lastname, email, password, time) 
             VALUES ('', '$first', '$last', '$email', '$pass', '$time')";
    $res2 = mysqli_query($con, $req2);

    if ($res2) {
        echo "Insertion successful";
    } else {
        echo "Insertion failed: " . mysqli_error($con);
    }
}


mysqli_close($con);
?>

