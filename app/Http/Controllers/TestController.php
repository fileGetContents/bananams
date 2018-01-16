<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Crypt;
use Storage;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        echo strtotime('2018-1-16');
        //dump($request->all());
        //dump(Crypt::encrypt("admin"));
        //dump(Crypt::decrypt('eyJpdiI6ImFSXC8yVU9OUU80OHBDRHB2SW5VbWFBPT0iLCJ2YWx1ZSI6InhnWm1vcldCVU9aQjRYOEs1VW5OYmc9PSIsIm1hYyI6IjZjNTBhZjAzOTM2OGZmZTgyODNlYTNjNTYwMzk1Mjk4Mjg0ZWZlNDJkZjY2ZDQxN2QyNTk0NjQ1ZDBhMDFiMzAifQ=='));
        //echo strlen("201708221650204357696519");
        //$nameFile ="image/" .date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
        //$storage = Storage::put(
        //$nameFile,
        //file_get_contents($request->file('file')->getRealPath())
        //);
        //$request->session()->put('nameFile', $nameFile);
        //echo collect(array('nameFile' => $nameFile))->toJson();
    }

    /**
     * 获取图片
     */
    public function getImageFile()
    {
        echo collect(array('name' => session('nameFile', 111)));
    }

    /**
     * 通用下载文件
     */
    public function downloadFile(Request $request)
    {
        if (getimagesize($_GET['file'])) {
            $type = getimagesize($_GET['file']);
            $filename = $_GET['file'];     //指定文件名
            header('Content-Type:' . $type['mime']);   //指定下载文件类型
            header("Content-Disposition:attachment;filename={$filename}");   //指定下载文件的描述
            header('Content-Length:' . filesize($filename));  //指定下载文件的大小
            readfile($filename);    //将文件内容读取出来并直接输出，以便下载
        } else {
            $file = $_GET['file'];
            header("Content-type: application/octet-stream");
            header('Content-Disposition: attachment; filename="' . basename($file) . '"');
            header("Content-Length: " . filesize($file));
        }
    }

    public function login(Request $request)
    {
//        if (isset($_GET['code'])) {
//            $getAccessToken = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx53bb0f13b94ab34d&secret=f3b35ead3c880e9712c4d38efbb6eb89&code=' . $_GET['code'] . '&grant_type=authorization_code';
//            $up = json_decode(file_get_contents($getAccessToken)); // 获取用户信息
//            $getInfo = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $up["access_token"] . '&openid=' . $up["openid"];
//            $info = json_decode(file_get_contents($getInfo));
//            // 查询数据库
//            $user = $this->publicModel->selectFirst('user', array('user_openid' => $info['openid']));
//            if (is_null($user)) {
//                $id = $this->publicModel->up('user', array(
//                    'user_openid' => $info['openid'],
//                    'user_images' => $info['headimgurl'],
//                    'user_name' => $info['nickname']
//                ));
//                if (is_numeric($id) && $id > 0) {
//                    $request->session()->put('user_id', $id);
//                }
//            } else {
//                $request->session()->put('user_id', $user->id);
//            };
//            header("Location: http://www.bananatrip.cn/templates/start.html");
//        } else {
//            echo '<script type="text/javascript">window.location.href="http://www.bananatrip.cn/index.html"</script>';
//        }
    }

}
