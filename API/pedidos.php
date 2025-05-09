<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Responder a las solicitudes OPTIONS (que es la pre-solicitud CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");
include 'database.php'; // Incluye la conexión a la base de datos

// Obtener los datos del pedido desde el cuerpo de la solicitud
$input = json_decode(file_get_contents("php://input"), true);

// Verificar si los datos necesarios están presentes
if (!isset($input['producto_id'], $input['cantidad'], $input['numero_pedido'], $input['usuario'])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos necesarios para el pedido"]);
    exit;
}

$producto_id = $input['producto_id'];
$cantidad = $input['cantidad'];
$numero_pedido = $input['numero_pedido'];
$usuario = $input['usuario'];

// Verificar si el producto existe y obtener su cantidad disponible
try {
    $stmt = $pdo->prepare("SELECT quantity FROM products WHERE id = :producto_id");
    $stmt->bindParam(':producto_id', $producto_id, PDO::PARAM_INT);
    $stmt->execute();
    $producto = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$producto) {
        http_response_code(404);
        echo json_encode(["error" => "Producto no encontrado"]);
        exit;
    }

    // Verificar si hay suficiente stock
    if ($producto['quantity'] < $cantidad || $cantidad <= 0) {
        http_response_code(400);
        echo json_encode(["error" => "Stock insuficiente"]);
        exit;
    }

    // Insertar el pedido
    $stmt = $pdo->prepare("INSERT INTO pedidos (producto_id, cantidad, numero_pedido, usuario) VALUES (:producto_id, :cantidad, :numero_pedido, :usuario)");
    $stmt->bindParam(':producto_id', $producto_id, PDO::PARAM_INT);
    $stmt->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
    $stmt->bindParam(':numero_pedido', $numero_pedido, PDO::PARAM_STR);
    $stmt->bindParam(':usuario', $usuario, PDO::PARAM_STR);

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(["error" => "Error al crear el pedido"]);
        exit;
    }

    // Descontar la cantidad del stock
    $nuevo_stock = $producto['quantity'] - $cantidad;
    $stmt = $pdo->prepare("UPDATE products SET quantity = :nuevo_stock WHERE id = :producto_id");
    $stmt->bindParam(':nuevo_stock', $nuevo_stock, PDO::PARAM_INT);
    $stmt->bindParam(':producto_id', $producto_id, PDO::PARAM_INT);
    $stmt->execute();

    // Enviar respuesta de éxito
    echo json_encode(["mensaje" => "Pedido creado y stock actualizado"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión con la base de datos: " . $e->getMessage()]);
}
