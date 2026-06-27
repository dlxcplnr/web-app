<?php
require_once 'config.php';

function getProducts() {
    global $pdo;

    $sql = "SELECT id, title, description, price FROM products";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}