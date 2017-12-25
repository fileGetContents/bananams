<?php
//header('Content-type:text/html;charset=utf-8');
$a = array(
    'adultprice' => '0',
    'batch' => rand(10, 20),
    'bid' => 55186,
    'childprice' => '-1',
    'diff' => '',
    'limit_max' => 0,
    'people_count' => 0,
    'price_label' => '0',
    'price_status' => 1,
    'starttime' => $_SERVER['REQUEST_TIME'],
    'status' => 1,
    'status_label' => '可报名 大胆报名4',
    'val' => '2017-12-14',
);

$b = array(
    'adultprice' => '0',
    'batch' => rand(20, 30),
    'bid' => 55187,
    'childprice' => '-1',
    'diff' => '',
    'limit_max' => 0,
    'people_count' => 0,
    'price_label' => '0',
    'price_status' => 1,
    'starttime' => $_SERVER['REQUEST_TIME'],
    'status' => 1,
    'status_label' => '可报名 大胆报名2',
    'val' => '2017-12-21',
);

$c = array(
    'adultprice' => '0',
    'batch' => rand(30, 40),
    'bid' => 55188,
    'childprice' => '-1',
    'diff' => '',
    'limit_max' => 0,
    'people_count' => 0,
    'price_label' => '0',
    'price_status' => 1,
    'starttime' => $_SERVER['REQUEST_TIME'],
    'status' => 1,
    'status_label' => '可报名 大胆报名6',
    'val' => '2017-12-23',
);
$msg = array($a, $b, $c);
$status = array('data' => $msg, 'status' => 1);
$jsonmsg = json_encode($status);
echo $jsonmsg;







