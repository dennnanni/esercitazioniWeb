<?php 

function pos_all($parola, $lettera) {
    $occorrenze = array();
    for ($i = 0; $i < strlen($parola); $i++) {
        if ($parola[$i] == $lettera) {
            $occorrenze[$lettera][] = $i;
        }
    }

    return $occorrenze;
}

session_start();


if (!isset($_SESSION["parola"])){
    $_SESSION["parola"] = rand() % 5 + 1;
}


$db = new mysqli("localhost", "root", "", "esame", 3306);
if ($db->connect_error) {
    die("". $db->connect_error);
}

$stmt = $db->prepare("SELECT parola FROM parola WHERE parola_id = ?");
$stmt->bind_param("i", $_SESSION["parola"]);
$stmt->execute();
$result = $stmt->get_result();
$result = $result->fetch_assoc();


if (isset($_POST) && isset($_POST["lettera"])) {
    $occorrenze = pos_all($result["parola"], $_POST["lettera"]);
}

echo $result["parola"];

?>


<!DOCTYPE html>
<html>
  <head>
    <title>Impiccato</title>
  </head>
  <body>
    <form action="index.php" method="post">
		<label>Lettera</label>
		<input type="text" name="lettera" id="lettera">
		<br>
		<input type="submit" value="submit">
    </form>
    <div>
    	<?php if (isset($occorrenze)): ?>
			<span>
				<?php foreach(str_split($result["parola"]) as $occorrenza) {
					echo $occorrenza == $_POST["lettera"] ? $_POST["lettera"] : " _ ";
				}
				?>
			</span>
		<?php endif; ?>
    </div>
  </body>
</html>
