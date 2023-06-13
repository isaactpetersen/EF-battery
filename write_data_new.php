
<?php

// this path should point to your configuration file.
include('database_config.php');

$query_string = file_get_contents('php://input');
$output = array();
parse_str($query_string, $output);


$data_array = json_decode($output['data'], true);
//echo var_dump($data_array);
$table = $output['table'];
$expName = $output['expname'];
$subjId = $output['subjid'];

try {

$dirName = "../../OnlineData/".$expName;
if (false == is_dir($dirName)) {
 mkdir($dirName);
}

$fileName = $subjId."_".$table;

//save the original query_string just in case
$fid1 = fopen($dirName."/".$fileName.".txt", 'a');
fwrite($fid1, $query_string."\r\n");
fclose($fid1);

$col_names = array_keys($data_array[0]);
//echo $col_names[0].$col_names[1];

$fid1 = fopen($dirName."/".$fileName.".csv", 'a');
//save column names
for($j = 0; $j < count($col_names); $j++){
$colname = $col_names[$j];
fwrite($fid1, $colname.",");
}
fwrite($fid1, "\r\n");

for($i=0; $i < count($data_array); $i++){
 for($j = 0; $j < count($col_names); $j++){
   $colname = $col_names[$j];
   if(!isset($data_array[$i][$colname])){
     fwrite($fid1, ",");
   } else {
     fwrite($fid1, $data_array[$i][$colname]." ,");
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
