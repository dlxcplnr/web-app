<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once 'create_message_new.php';

// Сбор данных
$name  = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$msg   = trim($_POST['message'] ?? '');

$error = "";

// Валидация
if (strlen($name) <= 2) { $error .= " Ім'я коротке."; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $error .= " Email невірний."; }
if (strlen($msg) <= 10) { $error .= " Повідомлення коротке."; }

// Если ошибок нет — вызываем "функцию"
if ($error == "") {

    if (createMessage($name, $email, $msg)) {
        echo json_encode(["status" => "success", "message" => "Дані збережено в БД!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Помилка запису в БД"]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "Помилки:" . $error]);
}