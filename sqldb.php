<?php
class DbConn{
    function __construct() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "test";
    
        // Create connection
        // $this->conn = new mysqli($servername, $username, $password, $dbname);
        $this->conn = new PDO('mysql:dbname=test;host=localhost', 'root', '');
        // Check connection
        // if ($this->conn->connect_error) {
        //     die("Connection failed: " . $this->conn->connect_error);
        // }
    }
}
?> 