<?php

if (!isset($db)) {
    $db = new mysqli("localhost", "root", "", "esame", 3306);
    if ($db->connect_error) {
        die("Errore: ". $db->connect_error);
    }
}

function is_valid_date($date) {
    $date = strtotime($date);
    list($year, $month, $day) = explode("-", $date);
    return checkdate($day, $month, $year);
}

// if (isset($_POST)) {
//     if (isset($_POST["nome"]) && isset($_POST["cognome"]) && isset($_POST["codiceFiscale"]) &&
//         isset($_POST["dataNascita"]) && isset($_POST["sesso"]) && is_string($_POST["nome"]) &&
//         is_string($_POST["cognome"]) && is_string($_POST["codiceFiscale"]) && count($_POST["codiceFiscale"]) == 16 &&
//         is_valid_date($_POST["dataNascita"]) && array_search($_POST["sesso"], array('M', 'F', 'A'))) {

//         $stmt = $db->prepare("INSERT INTO cittadino VALUES (?, ?, ?, ?, ?)");
//         $stmt->bind_param("sssss", $_POST["nome"], $_POST["cognome"], $_POST["codiceFiscale"], $_POST["dataNascita"], $_POST["sesso"]);
//         $stmt->execute();
//         $result = $stmt->get_result();

//         if ($result->num_rows > 0) {
//             echo "inserimento avvenuto";
//         }

//     } else {
//         echo "error";
//     }

//     exit();
// }

if (isset($_GET)) {
    $stmt = $db->prepare("SELECT * FROM cittadino WHERE idcittadino = ?");
    $stmt->bind_param("s", $_GET["id"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $values[] = $result->fetch_assoc();
} else {
    $stmt = $db->prepare("SELECT * FROM cittadino");
    $stmt->execute();
    $result = $stmt->get_result();
    $values = $result->fetch_all(MYSQLI_ASSOC);
}

?>


<!DOCTYPE html>
<html lang="it">
    <head>
        <title>Cittadini</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <table>
            <thead>
                <tr>
                    <!-- <th id="id">ID</th> -->
                    <th id="nome">Nome</th>
                    <th id="cognome">Cognome</th>
                    <th id="data">Data Nascita</th>
                    <th id="codice">Codice Fiscale</th>
                    <th id="sesso">Sesso</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($values as $cittadino): ?>
                    <tr>
                        <!-- <td headers="id"><?php echo $cittadino["idcittadino"]; ?></td> -->
                        <td headers="nome"><?php echo $cittadino["nome"]; ?></td>
                        <td headers="cognome"><?php echo $cittadino["cognome"]; ?></td>
                        <td headers="data"><?php echo $cittadino["datanascita"]; ?></td>
                        <td headers="codice"><?php echo $cittadino["codicefiscale"]; ?></td>
                        <td headers="sesso"><?php echo $cittadino["sesso"]; ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </body>
</html>