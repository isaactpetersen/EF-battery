<?php
// WARNING: the below config can cause a serious security issue.
// Please read https://portswigger.net/web-security/cors/access-control-allow-origin
// Once you are done testing, you should limit the access
//header('Access-Control-Allow-Origin: https://ssd.az1.qualtrics.com');
header('Access-Control-Allow-Origin: *');

// NOTE: the below code expects three fields and will NOT work if any of these is missing.
// - data_dir: specify the server directory to store data
// - file_name: specify the filename of the data being saved, which can include subject id
// - exp_data: contain the full json/csv data to be saved

if (isset($_POST['exp_data']) == false) { 
    echo('Hello'); 
    exit; 
}
$exp_data = $_POST['exp_data'];

/* prevent XSS:  */
$_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

if (isset($_POST['data_dir']) == true)
{
    $data_dir = $_POST['data_dir']; // data directory
} else { exit; }

if (isset($_POST['file_name']) == true)
{
    $file_name = $_POST['file_name']; // mturk_id
} else { exit; }

// write the file to disk
// NOTE: you must make the data directory by all users
// For example, by running `chmod 772` to give a write access to EVERYONE
file_put_contents($data_dir.'/'.$file_name, $exp_data);

exit;
?>