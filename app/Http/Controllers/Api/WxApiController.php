<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Model;
use App\Http\Requests;
use App\Http\Wechate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class WxApiController extends Controller
{
    protected $goodModel;
    protected $travelModel;
    protected $hotelModel;
    protected $publicModel;

    public function __construct()
    {
        $this->goodModel = new Model\GoodModel();
        $this->travelModel = new Model\BananaModel();
        $this->hotelModel = new Model\HotelModel();
        $this->publicModel = new Model\PublicModel();
    }

    /**
     * 微信订单
     * @param $array
     * @return $this
     */
    public function index(Request $request)
    {
//        if ($request->session()->has('goodOrder')) {                             // 商品订单
//            $good = $request->session()->pull('goodOrder');
//            $pay['total_fee'] = $good['order_pay_money'] * 100;                  // 实际支付金额
//            $pay['trade_no'] = $good['order_num'];                               // 商户订单号
//            $info = $this->goodModel->getGoodInfoFirst($good['order_good_id']);  // 获取一条商品信息
//            if (!is_null($info)) {
//                $pay['body'] = $info->good_name;  // 商品名称
//            }
//            $pay['attach'] = 'good_order';
//        } elseif ($request->session()->has('TravelOrder')) {          // 旅游订单
//            $travel = $request->session()->pull('TravelOrder');
//            $info = $this->travelModel->getInfoFirst($travel['order_travel_id']);
//            $pay['body'] = $info->travel_name;
//            $pay['attach'] = 'travel_order';
//            $pay['trade_no'] = $travel['order_num'];
//            $pay['total_fee'] = $travel['order_price'] * 100;
//        } elseif ($request->session()->has('HotelOrder')) {           // 酒店订单
//            $hotel = $request->session()->pull('HotelOrder');
//            $info = $this->hotelModel->selectFirstHotel($hotel['order_hotel_id']);
//            $pay['body'] = $info->hotel_name;
//            $pay['attach'] = 'hotel_order';
//            $pay['trade_no'] = $hotel['order_num'];
//            $pay['total_fee'] = $hotel['order_pay'] * 100;
//        } else {
//            // return back();  // 返回上一界面
//        }

//        if ($request->session()->has('goodOrder')) {                             // 商品订单
//            $good = $request->session()->pull('goodOrder');
//            $info = $this->goodModel->getGoodInfoFirst($good['order_good_id']);  // 获取一条商品信息
//            $pay['total_fee'] = $good['order_pay_money'] * 100;                  // 实际支付金额
//            $pay['trade_no'] = $good['order_num'];                               // 商户订单号
//            if (!is_null($info)) {
//                $pay['body'] = $info->good_name;  // 商品名称
//            }
//            $pay['attach'] = 'good_order';
//        } elseif ($request->session()->has('TravelOrder')) {          // 旅游订单
//            $travel = $request->session()->pull('TravelOrder');
//            $info = $this->travelModel->getInfoFirst($travel['order_travel_id']);
//            $pay['body'] = $info->travel_name;
//            $pay['attach'] = 'travel_order';
//            $pay['trade_no'] = $travel['order_num'];
//            $pay['total_fee'] = $travel['order_price'] * 100;
//        } elseif ($request->session()->has('HotelOrder')) {           // 酒店订单
//            $hotel = $request->session()->pull('HotelOrder');
//            $info = $this->hotelModel->selectFirstHotel($hotel['order_hotel_id']);
//            $pay['body'] = $info->hotel_name;
//            $pay['attach'] = 'hotel_order';
//            $pay['trade_no'] = $hotel['order_num'];
//            $pay['total_fee'] = $hotel['order_pay'] * 100;
//        } else {
//            // return back();  // 返回上一界面
//        }
        $table = $request->input('table'); // 表名
        $order = $request->input('order'); // 订单号
        // 获取订单详细内容
        $order_info = $this->publicModel->selectFirst($table, array('order_num' => $order));
        // 获取商品信息
        switch ($table) {
            case  'good_order':
                $info = $this->publicModel->selectFirst('good', array('good_id' => $order_info->order_good_id));
                $pay['body'] = $info->good_name;                              // 名称
                $pay['attach'] = 'good_order';                                // 表名
                $pay['trade_no'] = $order_info->order_num;                    // 数量
                $pay['total_fee'] = $order_info->order_pay_money * 100;       // 价格
                break;
            case  'travel_order':
                $info = $this->travelModel->getInfoFirst($order_info->order_travel_id);
                $pay['body'] = $info->travel_name;
                $pay['attach'] = 'travel_order';
                $pay['trade_no'] = $order_info->order_num;
                $pay['total_fee'] = $order_info->order_price * 100;
                break;
            case  'hotel_order':
                $info = $this->hotelModel->selectFirstHotel($order_info->order_hotel_id);
                $pay['body'] = $info->hotel_name;
                $pay['attach'] = 'hotel_order';
                $pay['trade_no'] = $order_info->order_num;
                $pay['total_fee'] = $order_info->order_pay * 100;
                break;
            case  'balance_order':
                //$info = $this->publicModel->selectFirst('user', array('user_id' => $order_info['user_id']));
                $pay['body'] = '余额充值';
                $pay['attach'] = 'balance_order';
                $pay['trade_no'] = $order_info->order_num;
                $pay['total_fee'] = $order_info->order_money * 100; // 充值金额
                break;
        }
//        if (!isset($pay)) {
//            return back();
//        }
        // ①、获取用户openid
        $tools = new Wechate\JsApiPay();
        $openId = $tools->GetOpenid();
        // ②、统一下单
        $input = new Wechate\WxPayUnifiedOrder();
        $input->SetBody($pay['body']);                           // 设置商品或支付单简要描述
        $input->SetAttach($pay['attach']);                       // 附加信息
        $input->SetOut_trade_no($pay['trade_no']);               // 商户订单号
        $input->SetTotal_fee($pay['total_fee']);                                 // 订单总金额，只能为整数，详见支付金额
        $input->SetTime_start(date("YmdHis"));                   // 交易起始时间
        $input->SetTime_expire(date("YmdHis", time() + 36000));  // 交易结束时间
        //$input->SetGoods_tag("test");
        $input->SetNotify_url(Wechate\WxPayConfig::NOTIFY_URL);  // 回调地址
        $input->SetTrade_type("JSAPI");                          // 交易类型
        $input->SetOpenid($openId);
        $WxPayApi = new Wechate\WxPayApi();
        $order = $WxPayApi->unifiedOrder($input);
        echo '<meta charset="utf-8" />';
        // $order = Wechate\WxPayApi::unifiedOrder($input);
        // echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
        //$jsApiParameters = $tools->GetJsApiParameters($order);
        $jsApiParameters = $tools->GetJsApiParameters($order);
        // 获取共享收货地址js函数参数
        $editAddress = $tools->GetEditAddressParameters();
        return view('WechatePay')->with([
            'pay' => $pay['total_fee']/100,
            'jsApiParameters' => $jsApiParameters,
            'editAddress' => $editAddress
        ]);
    }


    /**
     * 微信回调地址
     * @param Request $request
     */
    public function NotifyUrl(Request $request)
    {
        header("Content-type:text/xml;charset=utf-8");
        $xmkOK = "<?xml version='1.0' encoding='utf-8'?><xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";  // 成功
        $xmkNO = "<?xml version='1.0' encoding='utf-8'?><xml><return_code><![CDATA[ERROR]]></return_code><return_msg><![CDATA[NO]]></return_msg></xml>";    // 失败
        $xml = file_get_contents('php://input', 'r');   // 获取xml数
        $base = new Wechate\WxPayResults();
        $data = $base->FromXml($xml);
        switch ($data['return_code']) {
            case  'FAIL';
                echo $xmkNO;
                break;
            case 'SUCCESS';
                if ($data['result_code'] == "SUCCESS") {
                    $whether = DB::table($data['attach'])->where('order_num', '=', $data['out_trade_no'])->first();
                    if (!is_null($whether)) {
                        if ($whether->order_pay_time == 0) {
                            $row = DB::table($data['attach'])
                                ->where('order_num', '=', $data['out_trade_no'])
                                ->update(array(
                                    'order_pay_time' => $_SERVER['REQUEST_TIME'],
                                    'order_tag' => 10, // 支付完成
                                ))
                                ->get();
                            // 更新金钱
                            if ($data['attach'] == 'balance_order') {
                                DB::table($data['attach'])->increment('user_money', $whether->order_money);
                            }
                            if ($row) {
                                echo $xmkOK;
                            } else {
                                echo $xmkNO;
                            }
                        } else {
                            echo $xmkOK;
                        }
                    } else {
                        echo $xmkNO;
                    }
                } else {
                    echo $xmkNO;
                }
                break;
        }
        //   if ($base->CheckSign() == 'true') {
//        if ($data["return_code"] == "FAIL") {
//
//        } elseif ($data["result_code"] == "SUCCESS") {
//
//            if ($data['result_code'] == 'SUCCESS') {
//                $whether = DB::table($data['attach'])->where('order_num', '=', $data['out_trade_no'])->first();
//                if (!is_null($whether)) {
//                    if ($whether->order_pay_time == 0) {
//                        $row = DB::table($data['attach'])
//                            ->where('order_num', '=', $data['out_trade_no'])
//                            ->update(array(
//                                'order_pay_time' => time(),
//                                'order_tag' => 10, // 支付完成
//                            ))
//                            ->get();
//                    }
//                } else {
//                }
//            }
//        }
//
    }

    /**
     *
     * 获取用户信息
     */
    public function getUserInfo(Request $request)
    {
        if (isset($_GET['code'])) {
            $getAccessToken = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx53bb0f13b94ab34d&secret=f3b35ead3c880e9712c4d38efbb6eb89&code=' . $_GET['code'] . '&grant_type=authorization_code';
            $up = json_decode(file_get_contents($getAccessToken)); // 获取用户信息
            $getInfo = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $up["access_token"] . '&openid=' . $up["openid"];
            $info = json_decode(file_get_contents($getInfo));
            // 查询数据库
            $user = $this->publicModel->selectFirst('user', array('user_openid' => $info['openid']));
            if (is_null($user)) {
                $id = $this->publicModel->up('user', array(
                    'user_openid' => $info['openid'],
                    'user_images' => $info['headimgurl'],
                    'user_name' => $info['nickname']
                ));
                if (is_numeric($id) && $id > 0) {
                    $request->session()->put('user_id', $id);
                }
            } else {
                $request->session()->put('user_id', $user->id);
            };
            header("Location: http://www.bananatrip.cn/templates/start.html");
        }

    }

}
