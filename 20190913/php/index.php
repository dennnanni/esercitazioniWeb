<?php 

$db = new mysqli("localhost", "root", "", "esame", 3306);
if ($db->connect_error) {
    die("Error". $db->connect_error);
}

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo var_dump($_POST["name"]);
    if(isset($_POST["name"]) && isset($_POST["mass"]) && isset($_POST["height"])) {
        $stmt = $db->prepare("INSERT INTO starwars(name, height, mass) VALUES (?, ?, ?)");
        $stmt->bind_param("sii", $_POST["name"], $_POST["height"], $_POST["mass"]);
        $stmt->execute();
        header("Location: ../html/index.html");
    }
} else if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $db->prepare("SELECT * FROM starwars");
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0) { 
        $result = $result->fetch_all(MYSQLI_ASSOC);

        foreach($result as $value) {
            $json[] = array(
                "name" => $value["name"],
                "height" => $value["height"],
                "mass" => $value["mass"]
            );
        }

        echo json_encode($json);
    } else {
        echo "errore";
    }
}

?>