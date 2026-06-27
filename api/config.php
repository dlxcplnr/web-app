<?php

$host = 'localhost';
$dbname = 'coffee_mood';
$username = 'root';
$password = 'root';

$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";

try {
$pdo = new PDO($dsn, $username, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE,
PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
die('Помилка підключення до БД: ' . $e->getMessage());
}