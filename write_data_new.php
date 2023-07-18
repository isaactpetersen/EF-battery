
<?php

// Fetching the data and putting it in "output"
$query_string = file_get_contents('php://input');
$output = array();
parse_str($query_string, $output);

// Saving the different data elements in different variables
$data_array = json_decode($output['data'], true);
$data_dir = $output['data_dir'];
$file_name = $output['file_name'];

// Showing them in the console
echo var_dump($data_array);
echo var_dump($data_dir);
echo var_dump($file_name);

try {
  // Making the results folder if it doesn't exist
  if (false == is_dir($data_dir)) {
    mkdir($data_dir);
  }

//Save the original query_string just in case
$fid1 = fopen($data_dir."/".$file_name.".txt", 'a');
fwrite($fid1, $query_string."\r\n");
fclose($fid1);

//Save the csv files
$col_names = array_keys($data_array[0]);

$fid1 = fopen($data_dir."/".$file_name.".csv", 'a');
//save column names
for($j = 0; $j < count($col_names); $j++){
$col_name = $col_names[$j];
fwrite($fid1, $col_name.",");
}
fwrite($fid1, "\r\n");

for($i=0; $i < count($data_array); $i++){
 for($j = 0; $j < count($col_names); $j++){
   $col_name = $col_names[$j];
   if(!isset($data_array[$i][$col_name])){
     fwrite($fid1, ",");
   } else {
     fwrite($fid1, $data_array[$i][$col_name]." ,");
 }
 }
 fwrite($fid1, "\r\n");
}
fclose($fid1);

echo '{"success": true}';
} catch(Exception $e) {
echo $e->getMessage() . "<br/>";
while($e = $e->getPrevious()) {
   echo 'Previous exception: '.$e->getMessage() . "<br/>";
}
}
$conn = null;
?>