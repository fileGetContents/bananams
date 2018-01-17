<?php

namespace App\Http\Controllers\Api;

use App\Http\Wechate\WxPayApi;
use App\JisuapiModel;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Http\Model;
use Crypt;
use Storage;

class ApiController extends Controller
{

    protected $userModel;
    protected $communityModel;
    protected $goodModel;
    protected $HotelModel;
    protected $bananModel;
    protected $wxPay;
    protected $publicModel;
    protected $JisuapiModel;


    public function __construct()
    {
        $this->userModel = new Model\UserModel();
        $this->communityModel = new Model\CommunityModel();
        $this->goodModel = new Model\GoodModel();
        $this->HotelModel = new Model\HotelModel();
        $this->bananModel = new Model\BananaModel();
        $this->wxPay = new WxApiController();
        $this->publicModel = new Model\PublicModel();
        $this->JisuapiModel = new Model\JisuapiModel();
    }

    // 发送短信验证码
    public function sendSMSCode(Request $request)
    {
        $this->validate($request, [
            'telephone' => ['required', 'regex:/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/']
        ]);
        $telephone = $request->input('telephone');
        $whether = $this->userModel->Login($telephone);
        if (is_null($whether)) {
            $sms = rand(10000, 99999);
            $appkey = '2e28ec2b24ca9ed2';//你的appkey
            $mobile = $telephone;//手机号 超过1024请用POST
            $content = '短信验证码' . $sms . '【香蕉旅行网】	';//utf8
            $url = "http://api.jisuapi.com/sms/send?appkey=$appkey&mobile=$mobile&content=$content";
            $result = $this->JisuapiModel->curlOpen($url);
            $jsonarr = json_decode($result, true);
            if ($jsonarr['status'] == 0) {
                //$request->session()->put('sms', $sms);
                echo collect(array('info' => 0, 'code' => $sms));
            } else {
                echo collect(array('info' => 1, 'code' => '发送失败'));
            }
        } else {
            echo collect(array('info' => 1, 'code' => '已经注册过了'));
        }

    }

    /**
     * 更新浏览数量
     */
    public function updateVisit()
    {
        $this->communityModel->updateVisit();
        $visit = $this->communityModel->selVisit();
        echo $visit->banan_visit;
    }

    /**
     * 商品订单生成订单
     * @param Request $request
     */
    public function createGoodOrder(Request $request)
    {
        $this->validate($request, [
            'tag' => "required|numeric|min:0",
            'good_id' => 'required|numeric|min:0',
            'good_money' => 'required',
            'good_num' => 'required|numeric|min:0',
            'pay_money' => 'required',
        ]);
        $order_num = $this->createOrderNum(); // 获取订单号
        // 验证是否存在订单
        $exist = $this->goodModel->existOrderNum($order_num);
        if (empty($exist)) {  // 没有重复订单
            $address = $this->userModel->selectAddressFirst($request->input("address_id", 1));
            $array = array(
                'order_num' => $order_num,
                'order_good_tag' => $request->input("tag", '1'),
                'order_good_id' => $request->input("good_id", '1'),
                'order_good_money' => $request->input("good_money", 10.5),
                'order_good_num' => $request->input("good_num", '1'),
                'order_user_id' => $request->input("user_id", session("user_id", 1)),
                'order_user_address' => $address->address_city,  // 添加地址城市
                'order_address_info' => serialize(array(
                    'tel' => $address->address_contact,     // 联系方式
                    'address' => $address->address_detail,  // 详细地址
                    'name' => $address->address_name,       // 收货门地址
                    'code' => $address->address_code,       // 邮政编码
                )),
                'order_time' => time(),
                'order_tag' => 0,
                'order_pay_money' => $request->input("pay_money", 10),
                'order_pay_logistics' => $request->input('pay_logistics', "哈哈哈哈"),
            );
            if ($this->goodModel->insertGoodOrder($array)) {
                // $this->wxPay->index(array());
                $request->session()->flash('goodOrder', $array);    // 记录session
                echo collect(array('info' => 0, 'message' => $order_num, 'table' => 'good_order'))->toJson();
            } else {
                echo collect(array('info' => 1, 'message' => '订单添加失败'))->toJson();
            };
        } else { // 生成重复订单
            echo collect(array(
                'info' => 1, 'message' => '订单号生成失败'
            ))->toJson();
        }
    }


    /**
     * 生成旅游订单
     * @param Request $request
     */
    public function createTravelOrder(Request $request)
    {
        $this->validate($request, [
            'adult' => 'required|numeric',
            'tel' => ['required', 'regex:/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/'],
            'name' => 'required|min:0',
            'price' => 'required|numeric|min:0'
        ]);
        $order_num = $this->createOrderNum();                                     //  订单号
        $exist = $this->bananModel->existOrder(array('order_num' => $order_num));
        if (empty($exist)) {
            $order = [
                'order_num' => $order_num,
                'order_user_id' => session('user_id', 1),                 // 电话号码
                'order_adult' => $request->input('adult', 5),
                'order_child' => $request->input('child', 5),
                'order_tel' => $request->input('tel', 1828888888),
                'order_name' => $request->input('name', '哈哈哈'),
                'order_remark' => $request->input('remark', '备注'),
                'order_time' => $_SERVER['REQUEST_TIME'],
                'order_out_of_time' => $_SERVER['REQUEST_TIME'] + 36000,    // 过期时间
                'order_price' => $request->input('price', 100),   // 支付金额
                'order_info_id' => $request->input('info_id'),    // 时间区
                'order_travel_id' => $request->input('travel_id') // 旅游id
            ];
            $whether = $this->bananModel->insertTravelOrder($order);
            if ($whether) {
                $request->session()->flash('TravelOrder', $order);   // 记录session
                //     echo '<script type="text/javascript">window.location.href="http://www.bananatrip.cn/index.php/Home/Wxpay"</script>';
                echo collect(array('info' => 0, 'message' => $order_num, 'table' => 'travel_order'))->toJson();
            } else {
                echo collect(array('info' => 1, 'message' => '订单生成失败'))->toJson();
            }
        } else {
            echo collect(array('info' => 1, 'message' => '订单生成失败'))->toJson();
        }
    }

    /**
     * 生成房间订单
     */
    public function createHotelOrder(Request $request)
    {
        $this->validate($request, [
            'time_start' => 'required|date',
            'time_live' => 'required|date',
            'room_num' => 'required|min:1|numeric',
            'name' => 'required|min:0',
            'telephone' => 'required|min:0',
            'hotel_id' => 'required:min:0|numeric',
            'room_id' => 'required:min:0|numeric',
            'pay' => 'required|min:0',
            'price' => 'required|min:0',
        ]);
        $order_num = $this->createOrderNum();                     // 生成订单号随机
        $order = $this->HotelModel->existOrderNum(array('order_num' => $order_num));    // 检查订单号
        if (empty($order)) {
            $hotel = array(
                'order_num' => $order_num,
                'order_time_start' => strtotime($request->input("time_start", "2017/8/21 9:19")),
                'order_time_live' => strtotime($request->input('time_live', "2017/8/29 9:19")),
                'order_room_num' => intval($request->input("room_num", 3)),
                'order_name' => $request->input("name", "啊哈哈哈"),
                'order_telephone' => $request->input("telephone", "18282222222"),
                'order_remark' => $request->input('remark', '备注'),
                'order_hotel_id' => intval($request->input('hotel_id', 1)),
                'order_room_id' => intval($request->input('room_id', 1)),
                'order_pay' => intval($request->input('pay', 100)),
                'order_price' => intval($request->input('price', 100)),
                'order_tag' => 0,
                'order_time' => time(),
                'order_user_id' => intval(session('user_id', 1))
            );
            if ($this->HotelModel->insertOrder($hotel)) {
                //  $request->session()->flash('HotelOrder', $hotel);     // 记录session
                session(['HotelOrder' => $hotel]);
                //   echo '<script type="text/javascript">window.location.href="http://www.bananatrip.cn/index.php/Home/Wxpay"</script>';
                echo collect(array("info" => 0, "message" => $order_num, 'table' => 'hotel_order'))->toJson();
            } else {
                echo collect(array("info" => 1, "message" => "订单添加失败"))->toJson();
            }
        } else {
            echo collect(array('info' => 1, 'message' => '订单生成失败'))->toJson();
        }
    }


    /**
     * 生成余额订单
     * @param Request $request
     */
    public function createBalanceOrder(Request $request)
    {
        $order_num = $this->createOrderNum();
        $order_whether = $this->publicModel->selectFirst('balance_order', array('order_num' => $order_num));
        if (is_null($order_whether)) {
            $insert = array(
                'order_user_id' => session('user_id', 1),
                'order_money' => $request->input('money', 100),
                'order_tag' => 0,
                'order_time' => $_SERVER['REQUEST_TIME'],
                'order_num' => $order_num,
            );
            $id = $this->publicModel->up('balance_order', $insert);
            if (is_numeric($id) && $id > 0) {
                // 获取订单号
                echo collect(array('info' => 0, 'message' => $order_num, 'table' => 'balance_order'))->toJson();
                // $request->session()->put('');
            } else {
                echo collect(array('info' => 0, 'message' => '订单生成失败'))->toJson();
            }
        } else {
            echo collect(array('info' => 1, 'message' => '订单生成失败'))->toJson();
        }

    }


    /**
     * 生成订单号
     * @return string
     */
    private function createOrderNum()
    {
        //生成24位唯一订单号码，格式：YYYY-MMDD-HHII-SS-NNNN,NNNN-CC，其中：YYYY=年份，MM=月份，DD=日期，HH=24格式小时，II=分，SS=秒，NNNNNNNN=随机数，CC=检查码
        @date_default_timezone_set("PRC");
        //订购日期
        $order_date = date('Y-m-d');
        //订单号码主体（YYYYMMDDHHIISSNNNNNNNN）
        $order_id_main = date('YmdHis') . rand(10000000, 99999999);
        //订单号码主体长度
        $order_id_len = strlen($order_id_main);
        $order_id_sum = 0;
        for ($i = 0; $i < $order_id_len; $i++) {
            $order_id_sum += (int)(substr($order_id_main, $i, 1));
        }
        //唯一订单号码（YYYYMMDDHHIISSNNNNNNNNCC）
        $order_id = $order_id_main . str_pad((100 - $order_id_sum % 100) % 100, 2, '0', STR_PAD_LEFT);
        return $order_id;
    }


    /**
     * 小店订单
     */
    public function getGoodOrder(Request $request)
    {
        $good = $this->goodModel->selectGoodOrder($request->input('tag', 20), session("user_id", 1));
        echo collect($good)->toJson();
    }

    /**
     *ajax添加图片
     * @param Request $request
     */
    public function ajaxUpdateFileImage(Request $request)
    {
        $nameFile = "image/" . date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
        $storage = Storage::put(
            $nameFile,
            file_get_contents($request->file('file')->getRealPath())
        );
        // 图片上传
        if ($storage) {
            $request->session()->put('nameFile', $nameFile);
            echo collect(array('img' => asset($nameFile)))->toJson();
        } else {
            echo collect(array('nameFile' => 'error'))->toJson();
        }

    }

    /**
     *ajax添加图片
     * @param Request $request
     */
    public function ajaxUpdateFileImage2(Request $request)
    {
        $nameFile = date('Ymd') . '/' . $request->input("name");
        $nameFile2 = $nameFile . '.png';
        $storage = Storage::put(
            $nameFile2,
            file_get_contents($request->file('file')->getRealPath())
        );
        // 图片上传
        if ($storage) {
            //  $request->session()->put('nameFile', $nameFile);
            echo collect(array('nameFile' => asset($nameFile2)))->toJson();
        } else {
            echo collect(array('nameFile' => 'error'))->toJson();
        }
    }


    /**
     * 获取上传图片
     */
    public function getAjaxImageName()
    {
        echo collect(array('name' => session('nameFile', 111)));
    }

}
