<?php
require_once 'config.php';

function createOrder($name, $phone, $code_bought, $email) {
    global $pdo;

    $sql = "INSERT INTO requests (name, phone, code_bought, email, created_at)
            VALUES (?, ?, ?, ?, NOW())";

    $stmt = $pdo->prepare($sql);

    return $stmt->execute([
        $name,
        $phone,
        $code_bought,
        $email
    ]);
}
