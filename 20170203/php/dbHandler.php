<?php 

class DBHandler {

    private $db;

    public function __construct($servername, $username, $password, $dbname, $port) {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: ".$this->db->connect_error);
        }
    }

    public function isSequence($sequence) {
        $stmt = $this->db->prepare("SELECT * FROM numeri WHERE sequenza = ?");
        $stmt->bind_param("i", $sequence);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->num_rows > 0;
    }

    public function getNumbers($sequence) {
        $stmt = $this->db->prepare("SELECT numero, ordine FROM numeri WHERE sequenza = ?");
        $stmt->bind_param("i", $sequence);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>