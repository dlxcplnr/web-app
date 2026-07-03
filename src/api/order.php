<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once 'create_order.php';

// Сбор данных (ВАЖНО: имена как в JS)
$name  = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$code  = trim($_POST['code_bought'] ?? '');
$email = trim($_POST['email'] ?? '');

$error = "";

// --- серверная валидация (как в JS) ---
if (strlen($name) < 2) {
    $error .= " Ім'я має містити мінімум 2 символи.";
}

if (!preg_match('/^\+38\d{10}$/', $phone)) {
    $error .= " Телефон має бути у форматі +380XXXXXXXXX.";
}

if (strlen($code) < 3) {
    $error .= " Код рахунку занадто короткий.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $error .= " Вкажіть коректний email.";
}

// --- выполнение ---
if ($error === "") {

    if (createOrder($name, $phone, $code, $email)) {
        echo json_encode([
            "status" => "success",
            "message" => "Замовлення збережено в БД!"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Помилка запису в БД"
        ]);
    }

} else {
    echo json_encode([
        "status" => "error",
        "message" => $error
    ]);
}