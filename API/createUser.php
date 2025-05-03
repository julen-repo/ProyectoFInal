<?php
// Configuración de cabeceras CORS y tipo de respuesta
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Incluir la conexión a la base de datos
include_once('database.php');

// Obtener los datos JSON enviados desde Angular
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos estén presentes
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$email = $data['email'] ?? '';
$role = $data['role'] ?? '';

// Validar los datos
if (empty($username) || empty($password) || empty($email) || empty($role)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
    exit;
}

try {
    // Hashear la contraseña
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insertar el usuario en la base de datos
    $stmt = $pdo->prepare("INSERT INTO users (username, password, email, role) VALUES (:username, :password, :email, :role)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':role', $role);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Usuario creado exitosamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al crear el usuario']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
    error_log("Error en la creación del usuario: " . $e->getMessage());
}
?>
