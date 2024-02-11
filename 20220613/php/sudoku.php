<?php

$dbh = new mysqli("localhost", "root", "", "esame", 3306);


function testUnique($array, $element) {
    $result = array();

    foreach ($array as $key => $value) {
        if ($value == $element) {
            $result[] = $element;
        }
    }

    return $result;
}

function testUniqueRegion($array, $iStart, $jStart) {
    $result = array();

    for ($i = $iStart - 1; $i <= $iStart + 1; $i++) {
        for ( $j = 0; $j <= $jStart + 1; $j++ ) {

        }
    }
}

function validateConfiguration($config) {
    $config = str_split($config);
    $config = array_chunk($config, 9);
    for ($i = 0; $i < count($config); $i++) {
        for ($j = 0; $j < count($config[$i]); $j++) {
            if ($config[$i][$j] == 0) {
                continue;
            }

            $value = $config[$i][$j];

            $column = array_column($config, $j);
            if (count(testUnique($column, $value)) > 1) {
                return false;
            }
            
            $row = $config[$i];
            if (count(testUnique($row, $value)) > 1) {
                return false;
            }


            
        }
    }
}

if(isset($_GET)) {
}

?>