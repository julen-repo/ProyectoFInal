<?php
include 'database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$numero_pedido = $_GET['numero_pedido'];

$sql = "SELECT p.id, pr.name as nombre, p.cantidad, pr.price 
        FROM pedidos p 
        JOIN products pr ON p.producto_id = pr.id 
        WHERE p.numero_pedido = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$numero_pedido]);
$detalles = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($detalles);
