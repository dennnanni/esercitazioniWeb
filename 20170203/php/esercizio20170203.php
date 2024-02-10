<?php 

require("dbHandler.php");

$dbh = new DBHandler("localhost", "root", "", "matematica", 3306);

if(isset($_GET)) {
    if (isset($_GET["sequenza"]) && $dbh->isSequence($_GET["sequenza"])) {
        $numbers = $dbh->getNumbers($_GET["sequenza"]);
        $mapped = array();
        foreach($numbers as $number) {
            $mapped[$number["ordine"]] = $number["numero"];
        }

        ksort($mapped);

        if ($mapped[1] != 1) {
            echo json_encode(array("fibonacci" => 0, "array" => $mapped));
            exit();
        }
        $expected = 1;
        $previous = 1;

        foreach(array_slice($mapped, 1) as $number) {
            if ($expected == $number) {
                $next = $expected + $previous;
                $previous = $expected;
                $expected = $next;
            } else {
                echo json_encode(array("fibonacci" => 0, "array" => $mapped));
                exit();
            }
        }

        echo json_encode(array("fibonacci" => 1, "array" => $mapped));

    }
}


?>