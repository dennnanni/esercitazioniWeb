<?php 

$db = new mysqli("localhost", "root", "", "esame", 3306);

if($_SERVER["REQUEST_METHOD"] == "GET") {
    if(isset($_GET["A"]) && $_GET["A"] > 0 && isset($_GET["B"]) && $_GET["B"] > 0) {
        $query = $db->prepare("SELECT * FROM insiemi WHERE insieme = ?");
        $query->bind_param("i", $_GET["A"]);
        $query->execute();
        $resultA = $query->get_result()->fetch_all(MYSQLI_ASSOC);

        if(count($resultA) == 0) {
            die("Error: non ci sono numeri presenti per gli insiemi specificati");
        }
        
        $query = $db->prepare("SELECT * FROM insiemi WHERE insieme = ?");
        $query->bind_param("i", $_GET["B"]);
        $query->execute();
        $resultB = $query->get_result()->fetch_all(MYSQLI_ASSOC);
       
        if(count($resultB) == 0) {
            die("Error: non ci sono numeri presenti per gli insiemi specificati");
        }

        $vettoreA = array();
        foreach($resultA as $value) {
            array_push($vettoreA, $value["valore"]);
        }

        $vettoreB = array();
        foreach($resultB as $value) {
            array_push($vettoreB, $value["valore"]);
        }

        $nuovoInsieme = differenza($vettoreA, $vettoreB);

        $query = $db->prepare("SELECT MAX(id) AS id, MAX(insieme) AS insieme FROM insiemi");
        $query->execute();
        $maxIds = $query->get_result()->fetch_assoc();

        $maxInsieme = $maxIds["insieme"] + 1;
        $maxId = $maxIds["id"] + 1;

        foreach($nuovoInsieme as $val) {
            $query = $db->prepare("INSERT INTO insiemi(id, valore, insieme) VALUES(?, ?, ?)");
            $query->bind_param("iii", $maxId, $val, $maxInsieme);
            $query->execute();
            $maxId++;
        }

        echo implode(" - ", $nuovoInsieme); 
    }
}


function differenza($a, $b) {
    $union = array();

    foreach($a as $val) {
        $searchResult = array_search($val, $a);
        if(is_bool($searchResult) && is_bool(array_search($val, $union))) {
            array_push($union, $val);
        }
    }

    foreach($b as $val) {
        $searchResult = array_search($val, $a);
        if(is_bool($searchResult) && is_bool(array_search($val, $union))) {
            array_push($union, $val);
        }
    }

    return $union;
}

?>
