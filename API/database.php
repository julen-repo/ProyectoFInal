<?php
$host = 'localhost'; // Cambia esto por tu host
$dbname = 'inventory_management'; // Cambia esto por tu nombre de base de datos
$username = 'root'; // Cambia esto por tu usuario
$password = ''; // Cambia esto por tu contraseña

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    die();
}
?>
