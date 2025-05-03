<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'database.php'; // Asegúrate de que la ruta sea correcta

try {
    $stmt = $pdo->prepare("SELECT id, name FROM categories");
    $stmt->execute();
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($categorias);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
