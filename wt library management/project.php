<?php
$conn = new mysqli("localhost", "root", "", "libbook_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = $_GET['action'] ?? '';

// ADD BOOK
if ($action == 'add') {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("INSERT INTO books (title, author) VALUES (?, ?)");
    $stmt->bind_param("ss", $data['title'], $data['author']);
    $stmt->execute();

    echo json_encode(["success" => true]);
}

// LIST BOOKS
if ($action == 'list') {
    $result = $conn->query("SELECT * FROM books");

    $books = [];
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }

    echo json_encode($books);
}

// TOGGLE STATUS
if ($action == 'toggle') {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("UPDATE books 
        SET status = IF(status='Available','Borrowed','Available') 
        WHERE id = ?");
        
    $stmt->bind_param("i", $data['id']);
    $stmt->execute();

    echo json_encode(["success" => true]);
}
?>