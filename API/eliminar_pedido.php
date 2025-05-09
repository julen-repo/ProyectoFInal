<?php
// Configuración de cabeceras CORS y tipo de respuesta
header("Access-Control-Allow-Origin: http://192.168.1.34:4200");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['numero_pedido'])) {
    $numeroPedido = $_GET['numero_pedido'];

    $stmt = $conn->prepare("DELETE FROM pedidos WHERE numero_pedido = ?");
    $stmt->bind_param("s", $numeroPedido);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['mensaje' => 'Pedido eliminado']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al eliminar el pedido']);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Número de pedido no proporcionado o método incorrecto']);
}
