<?php
require_once 'config.php';

function createMessage($name, $email, $message) {
    global $pdo;

    $sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    return $stmt->execute([$name, $email, $message]);
}