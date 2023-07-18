
<?php

$output = json_decode(file_get_contents('php://input'), true);

$data_array = $output['data'];
$data_dir = $output['data_dir'];
$file_name = $output['file_name'];
$path = $data_dir.$file.".csv";

file_put_contents($path, $data_array);

?>