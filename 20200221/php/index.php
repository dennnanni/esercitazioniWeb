
<?php 

$db = new mysqli("localhost", "root", "", "esame", 3306);
if($db->connect_error) {
	die("Errore: ".$db->connect_error);
}

$query = "SELECT * FROM articoli";
if(isset($_COOKIE["categoria"])) {
	$query .= " WHERE categoria = ?";
	$param = "s";
}

$stmt = $db->prepare($query);

if(isset($param)) {
	$stmt->bind_param($param, $_COOKIE["categoria"]);
}

$stmt->execute();
$result = $stmt->get_result();
$result = $result->fetch_all(MYSQLI_ASSOC);



?>

<html lang="it">

<head>
	<title>Esercizio PHP</title>
</head>

<body>
	<div class="header">
		<a class="home">Esercizio PHP</a>
		<div class="products">
			<a href="index.php">Homepage</a>
			<a href="settings.php">Settings</a>
		</div>
	</div>
	<article>
		<?php foreach($result as $article): ?>
			<div>
				<h1><?php echo $article["titolo"]; ?></h1>
				<p><?php echo $article["descrizione"]; ?></p>
			</div>
		<?php endforeach; ?>
	</article>
</body>

</html>