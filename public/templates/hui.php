<?php
header("Content-type:text/html;charset=utf-8");
$a = array(
"adultprice"=>"0",
"batch"=>17,
"bid"=>55186,
"childprice"=>"-1",
"diff"=>'',
"limit_max"=>0,
"people_count"=>0,
"price_label"=>"0",
"price_status"=>1,
"starttime"=>1510588800,
"status"=>1,
"status_label"=>"可报名 大胆报名",
"val"=>"2017-11-14",
);


$b = array(
"adultprice"=>"0",
"batch"=>18,
"bid"=>55187,
"childprice"=>"-1",
"diff"=>'',
"limit_max"=>0,
"people_count"=>0,
"price_label"=>"0",
"price_status"=>1,
"starttime"=>1511193600,
"status"=>1,
"status_label"=>"可报名 大胆报名",
"val"=>"2017-11-21",
);


$msg=array($a,$b);

$status =array("data"=>$msg,"status"=>1);

$jsonmsg=json_encode($status);
 echo $jsonmsg;
?>






