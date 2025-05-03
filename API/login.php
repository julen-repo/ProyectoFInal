<?php
// Configuración de errores para desarrollo
ini_set('display_errors', 0); // No mostrar errores al cliente
ini_set('log_errors', 1);     // Loguear errores
ini_set('error_log', __DIR__ . '/php-error.log'); // Ruta del log

// Configuración de cabeceras CORS y tipo de respuesta
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json"); // Importante para que Angular entienda la respuesta

// Responder a solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Incluir la conexión a la base de datos
include_once('database.php');

// Leer el JSON enviado desde Angular
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que se recibieron 'user' y 'pass'
$user = $data['user'] ?? '';
$pass = $data['pass'] ?? '';

if (empty($user) || empty($pass)) {
    echo json_encode(['success' => false, 'message' => 'Usuario y contraseña son requeridos.']);
    exit;
}

try {
    // Buscar al usuario
    $stmt = $pdo->prepare('SELECT id, username, role , password FROM users WHERE username = :user');
    $stmt->bindParam(':user', $user);
    $stmt->execute();
    $result = $stmt->fetch();

    // Validar contraseña
    if ($result && password_verify($pass, $result['password'])) {
        echo json_encode([
            'success' => true,
            'message' => 'Login exitoso',
            'user' => [
                'id' => $result['id'],
                'username' => $result['username'],
                'role' => $result['role'],
                'password' => $result['password'],
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos.']);
    error_log("Login error: " . $e->getMessage());
}
?>
