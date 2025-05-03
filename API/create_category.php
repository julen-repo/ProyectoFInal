<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once('database.php');

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';

if (!$name) {
    echo json_encode(['success' => false, 'message' => 'Nombre requerido']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO categories (name) VALUES (:name)");
    $stmt->bindParam(':name', $name);
    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'Categoría creada']);
} catch (PDOException $e) {
    error_log("Error al crear categoría: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error al crear categoría']);
}
