<?php 

$db = new mysqli("localhost", "root", "", "esame", 3306);
if($db->connect_error) {
    die("Error: ". $db->connect_error);
}

if (isset($_POST["soglia"]) && $_POST["soglia"] > 0) {
    $stmt = $db->prepare("SELECT numero FROM numeri WHERE numero > ?");
    $stmt->bind_param("i", $_POST["soglia"]);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $array = array();
    foreach($result as $el) {
        array_push($array, $el["numero"]);
    }

    echo implode(",", insertionSort($array));

}

if (isset($_GET["soglia"]) && $_GET["soglia"] > 0) {
    $stmt = $db->prepare("SELECT numero FROM numeri WHERE numero > ?");
    $stmt->bind_param("i", $_GET["soglia"]);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $array = array();
    foreach($result as $el) {
        array_push($array, $el["numero"]);
    }

    echo implode(",", insertionSort($array));

}

function insertionSort($array) {
    for($i = 0; $i < count($array); $i++) {
        
        for($j = 0; $j < $i; $j++) {
            if($array[$i] > $array[$j]) {
                $swap = $array[$i];
                $array[$i] = $array[$j];
                $array[$j] = $swap;
            }
        }
    }

    return $array;
}

?>