
<?php

// Ensure error reporting is enabled to catch any potential issues
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Retrieve the JSON data from the JS task
$output = json_decode(file_get_contents('php://input'), true);

// Extract the data array and file details
$data_array = $output['data'];
$data_dir = $output['data_dir'];
$file_name = $output['file_name'];
$extension = $output['extension'];

$actual_name = $file_name;

$i = 1;
while(file_exists($data_dir.$actual_name.$extension))
{           
    $actual_name = $file_name.'_'.(string)$i;
    $i++;
}

// Create the file path
$path = $data_dir.$actual_name.$extension;

// Ensure the directory exists or create it if necessary
//if (!is_dir($data_dir)) {
//    mkdir($data_dir, 0755, true);
//}

// Save the data to the file
file_put_contents($path, $data_array);

?>
