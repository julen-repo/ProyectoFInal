<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once('database.php');

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$category_id = $data['category_id'] ?? '';
$quantity = $data['quantity'] ?? '';
$price = $data['price'] ?? '';

if (!$name || !$category_id || !$quantity || !$price) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO products (name, category_id, quantity, price) VALUES (:name, :category_id, :quantity, :price)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':category_id', $category_id);
    $stmt->bindParam(':quantity', $quantity);
    $stmt->bindParam(':price', $price);
    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'Producto creado']);
} catch (PDOException $e) {
    error_log("Error al crear producto: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error al crear producto']);
}
