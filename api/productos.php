<?php

require_once "conexion.php";

$categoria = isset($_GET['categoria']) ? trim($_GET['categoria']) : '';

if ($categoria !== '') {

    $sql = "SELECT 
                id, 
                nombre, 
                categoria, 
                marca, 
                descripcion, 
                precio, 
                stock, 
                imagen 
            FROM productos
            WHERE LOWER(TRIM(categoria)) = LOWER(TRIM(?))";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $categoria);
    $stmt->execute();

    $resultado = $stmt->get_result();

} else {

    $sql = "SELECT 
                id, 
                nombre, 
                categoria, 
                marca, 
                descripcion, 
                precio, 
                stock, 
                imagen 
            FROM productos";

    $resultado = $conn->query($sql);
}

$productos = [];

if ($resultado) {

    while ($fila = $resultado->fetch_assoc()) {
        $productos[] = $fila;
    }

}

header("Content-Type: application/json; charset=UTF-8");

echo json_encode($productos, JSON_UNESCAPED_UNICODE);

$conn->close();

?>