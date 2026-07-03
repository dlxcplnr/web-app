<?php
$host = 'db';          # <-- Звертаємося до контейнера бази за його ім'ям з docker-compose
$dbname = 'coffee_mood';
$username = 'root';
$password = 'super_secret_password_123'; # <-- Вкажи той пароль, що в MYSQL_ROOT_PASSWORD!

# Порт 3306 вказувати необов'язково, PDO візьме його за замовчуванням
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8"; 

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Помилка підключення до БД: ' . $e->getMessage());
}