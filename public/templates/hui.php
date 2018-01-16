<?php
//header('Content-type:text/html;charset=utf-8');
//$a = array(
//    'adultprice' => '100',
//    'batch' => rand(10, 20),
//    'bid' => 55186,
//    'childprice' => '-1',
//    'diff' => '',
//    'limit_max' => 100,
//    'people_count' => 100,
//    'price_label' => '20',
//    'price_status' => 1,
//    'starttime' => $_SERVER['REQUEST_TIME'],
//    'status' => 1,
//    'status_label' => '可报名 大胆报名4',
//    'val' => '2018-2-7',
//);
//
//$b = array(
//    'adultprice' => '100',
//    'batch' => rand(20, 30),
//    'bid' => 55187,
//    'childprice' => '-1',
//    'diff' => '',
//    'limit_max' => 100,
//    'people_count' => 10,
//    'price_label' => '20',
//    'price_status' => 1,
//    'starttime' => $_SERVER['REQUEST_TIME'],
//    'status' => 1,
//    'status_label' => '可报名 大胆报名2',
//    'val' => '2018-2-6',
//);
//
//$c = array(
//    'adultprice' => '100',
//    'batch' => rand(30, 40),
//    'bid' => 55188,
//    'childprice' => '-1',
//    'diff' => '',
//    'limit_max' => 100,
//    'people_count' => 10,
//    'price_label' => '20', // 价格
//    'price_status' => 1,
//    'starttime' => $_SERVER['REQUEST_TIME'],
//    'status' => 1,
//    'status_label' => '可报名 大胆报名6',
//    'val' => '2018-2-9',
//);
//
//$c = array(
//    'adultprice' => '100',
//    'batch' => rand(30, 40),
//    'bid' => 55188,
//    'childprice' => '-1',
//    'diff' => '',
//    'limit_max' => 100,
//    'people_count' => 10,
//    'price_label' => '20', // 价格
//    'price_status' => 1,
//    'starttime' => $_SERVER['REQUEST_TIME'],
//    'status' => 1,
//    'status_label' => '可报名 大胆报名6',
//    'val' => '2018-2-9',
//);

$a = ["adultprice" => "0", "batch" => 14, "bid" => 59, "childprice" => "-1", "diff" => "", "limit_max" => 0, "people_count" => 0, "price_label" => "0", "price_status" => 1, "starttime" => 1515815711, "status" => 1, "status_label" => "放心大胆的选", "val" => "2018-1-10",];

$b = [
    "adultprice" => "0",
    "batch" => 18,
    "bid" => 60,
    "childprice" => "-1",
    "diff" => "",
    "limit_max" => 0,
    "people_count" => 0,
    "price_label" => "0",
    "price_status" => 1,
    "starttime" => 1515902111,
    "status" => 1,
    "status_label" => "放心大胆的选",
    "val" => "2018-1-12",];
$c = [
    "adultprice" => "0",
    "batch" => 16,
    "bid" => 66,
    "childprice" => "-1",
    "diff" => "",
    "limit_max" => 0,
    "people_count" => 0,
    "price_label" => "0",
    "price_status" => 1,
    "starttime" => 1528353216,
    "status" => 1,
    "status_label" => "放心大胆的选",
    "val" => "2018-2-13",
];


$msg = array($a, $b, $c);
$status = array('data' => $msg, 'status' => 1);
//var_dump($status);
echo json_encode($status);
//echo '{"data":[{"adultprice":"0","batch":10,"bid":58,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1515729311,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-01-12 "},{"adultprice":"0","batch":19,"bid":59,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1515815711,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-01-13 "},{"adultprice":"0","batch":17,"bid":60,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1515902111,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-01-14 "},{"adultprice":"0","batch":19,"bid":61,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1515988511,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-01-15 "},{"adultprice":"0","batch":18,"bid":62,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1516074911,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-01-16 "},{"adultprice":"0","batch":11,"bid":63,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1516161311,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-01-17 "},{"adultprice":"0","batch":19,"bid":64,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1516247711,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-01-18 "},{"adultprice":"0","batch":18,"bid":65,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1525761216,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-05-08 "},{"adultprice":"0","batch":16,"bid":66,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1528353216,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-06-07 "},{"adultprice":"0","batch":13,"bid":67,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1530945216,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-07-07 "},{"adultprice":"0","batch":12,"bid":68,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1533537216,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-08-06 "},{"adultprice":"0","batch":17,"bid":69,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1536129216,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-09-05 "},{"adultprice":"0","batch":16,"bid":70,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1538721216,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-10-05 "},{"adultprice":"0","batch":19,"bid":71,"childprice":"-1","diff":"","limit_max":50,"people_count":0,"price_label":"0","price_status":1,"starttime":1541313216,"status":1,"status_label":"\u653e\u5fc3\u5927\u80c6\u7684\u9009","val":"2018-11-04 "}],"status":1}';







