<?php 

$db = new mysqli("localhost", "root", "", "esame", 3306);
if ($db->connect_error) {
    echo "error from connecting to db";
    exit();
}


if (isset($_GET)) {
    $regista = isset($_GET["regista"]) && $_GET["regista"] > 0 ? $_GET["regista"] : null;
    $genere = isset($_GET["genere"]) && is_numeric($_GET["genere"]) && $_GET["genere"] > 0 ? $_GET["genere"] : null;
    $anno = isset($_GET["anno"]) && is_numeric($_GET["anno"]) && $_GET["anno"] >= 1900 && $_GET["anno"] <= 2017  ? $_GET["anno"] : null;
    $top = isset($_GET["top"]) && is_numeric($_GET["top"]) && $_GET["top"] > 0 ? $_GET["top"] : null;
    $voti = isset($_GET["voti"]) && is_numeric($_GET["voti"]) && $_GET["voti"] > 0 ? $_GET["voti"] : 100;
    
    $clauses = array();
    $params = array();
    $paramString = "";
    if (isset($regista)) {
        $clauses[] = "regista = ?";
        $params[] = (int) $regista;
        $paramString .= "i";
    }
    if (isset($genere)) {
        $clauses[] = "genere = ?";
        $params[] = (int) $genere;
        $paramString .= "i";
    }
    if (isset($anno)) {
        $clauses[] = "anno = ?";
        $params[] = (int) $anno;
        $paramString .= "i";
    }
    if (isset($top)) {
        $limit = "LIMIT ".$top;
    }

    $query = "SELECT *, (numerorecensioni / (numerorecensioni + 100)) * mediarecensioni + (100 / (numerorecensioni + 100)) * (SELECT AVG(mediarecensioni) FROM film) AS rating FROM film";
    if (count($clauses) > 0) {
        $query .= " WHERE ". implode(" AND ", $clauses);
    }

    $query .= " ORDER BY rating DESC";

    $query .= isset($limit) ? " ".$limit : "";

    $stmt = $db->prepare($query);
    if (count($params) > 0) $stmt->bind_param($paramString, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    $result = $result->fetch_all(MYSQLI_ASSOC);

    $print = "";
    $i = 1;
    foreach ($result as $element) {
        $print .= $i." ".$element["titolo"]."<br/>";
        $i += 1;
    }

    echo $print;
}

?>
