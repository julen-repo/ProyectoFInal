<?php
// Configuración de cabeceras CORS y tipo de respuesta
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include_once('database.php');

$input = json_decode(file_get_contents("php://input"), true);

$producto_id = $input['producto_id'];
$nuevo_stock = $input['nuevo_stock'];

// Actualizar el stock del producto en la base de datos
$stmt = $conexion->prepare("UPDATE products SET quantity = ? WHERE id = ?");
$stmt->bind_param("ii", $nuevo_stock, $producto_id);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Error al actualizar el stock"]);
    exit;
}

echo json_encode(["mensaje" => "Stock actualizado correctamente"]);
