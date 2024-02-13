<?php

$db = new mysqli("localhost", "root", "", "esame", 3306);
if ($db->connect_error) {
	die("Error: ". $db->connect_error);
}

$stmt = $db->prepare("SELECT numeri FROM riga");
$stmt->execute();
$result = $stmt->get_result();
$result = $result->fetch_all(MYSQLI_ASSOC);

$square = array();

foreach ($result as $row) { 
	$square[] = explode(",", $row["numeri"]);
}

if(isset($_GET)) {
	if (isset($_GET["cella"])) {
		list($colonna, $riga) = explode("/", $_GET["cella"]);
		if ($square[$riga][$colonna] == 0) {
			die("La cella non è vuota");
		}
	}

	if(isset($_GET["radioButton"]) && $_GET["radioButton"] == "inserisci") {
		$square[$riga][$colonna] = $_GET["numero"];
		$numeri = implode(",", $square[$riga]);
		$stmt = $db->prepare("UPDATE riga SET numeri = ? WHERE id = ?");
		$stmt->bind_param("si", $numeri, $riga);
		$stmt->execute();

	} else if(isset($_GET["radioButton"]) && $_GET["radioButton"] == "controlla") {
		$numbers = array(1, 2, 3, 4, 5, 6, 7, 8, 9);
		$mosse = array();

		foreach($numbers as $number) {
			
		}
	}
}

function inserisciCella(){

}

function controllaCella(){
}

?>


<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Esercizio PHP</title>
</head>
<body>
	<header>
		<h1>Esercizio PHP</h1>
	</header>

  <form action="index.php" method="get">
  <div>
    <div>
      <input type="radio" id="inserisci"
       name="radioButton" value="inserisci">
      <label for="insesci">inserisci</label>

      <input type="radio" id="controlla"
       name="radioButton" value="controlla">
      <label for="controlla">controlla cella</label>
    </div>

  <label for="numero">Numero</label>
  <input type="text" name="numero" value="numero">
  <br>
  <label for="cella">Cella (colonna/riga):</label>
  <input type="text" name="cella" value="cella">
  <br>
  <input type="submit" value="Submit">
</div>
</form>
</body>
</html>
