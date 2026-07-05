<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once 'select_posts.php';

$error = "";

// --- performing ---
if ($error === "") {

    $products = getProducts();

    if ($products) {
        echo json_encode([
            "status" => "success",
            "data" => $products
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Дані не знайдені"
        ]);
    }

} else {
    echo json_encode([
        "status" => "error",
        "message" => $error
    ]);
}
