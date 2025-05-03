<?php
include_once('database.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$category_id = $_GET['category_id'] ?? '';

if (!$category_id) {
    echo json_encode([]);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM products WHERE category_id = :category_id');
$stmt->bindParam(':category_id', $category_id, PDO::PARAM_INT);
$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($products);
