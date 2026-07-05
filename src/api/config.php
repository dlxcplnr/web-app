<?php
$host = 'db';          # <-- We address the base container by its name with 'docker-compose'
$dbname = 'coffee_mood';
$username = 'root';
$password = 'super_secret_password_123'; # <-- the password that is in MYSQL_ROOT_PASSWORD!

# Port 3306 is optional, PDO will take it by default
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8"; 

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Помилка підключення до БД: ' . $e->getMessage());
}