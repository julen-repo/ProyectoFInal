<?php
include 'database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$sql = "SELECT DISTINCT numero_pedido FROM pedidos ORDER BY numero_pedido ASC";
$stmt = $pdo->query($sql);
$pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($pedidos);
