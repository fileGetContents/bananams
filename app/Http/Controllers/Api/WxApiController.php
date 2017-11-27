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
    protected $PurposeModel;

    public function __construct()
    {
        $this->goodModel = new Model\GoodModel();
        $this->travelModel = new Model\BananaModel();
        $this->hotelModel = new Model\HotelModel();
        $this->publicModel = new Model\PublicModel();
        $this->PurposeModel = new Model\PurposeModel();
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
        //$openId = $tools->GetOpenid();
        $use = $this->PurposeModel->selectFirst('user', ['user_id' => 29]);
        $openId = $use->user_openid;
        // ②、统一下单
        $input = new Wechate\WxPayUnifiedOrder();
        $input->SetBody($pay['body']);                           // 设置商品或支付单简要描述
        $input->SetAttach($pay['attach']);                       // 附加信息
        $input->SetOut_trade_no($pay['trade_no']);               // 商户订单号
        $input->SetTotal_fee($pay['total_fee']);                 // 订单总金额，只能为整数，详见支付金额
        $input->SetTime_start(date("YmdHis"));                   // 交易起始时间
        $input->SetTime_expire(date("YmdHis", time() + 36000));  // 交易结束时间
        //$input->SetGoods_tag("test");
        $input->SetNotify_url(Wechate\WxPayConfig::NOTIFY_URL);  // 回调地址
        $input->SetTrade_type("JSAPI");                          // 交易类型
        $input->SetOpenid($openId);
        $WxPayApi = new Wechate\WxPayApi();
        $order = $WxPayApi->unifiedOrder($input);
        // $order = Wechate\WxPayApi::unifiedOrder($input);
        // echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
        //$jsApiParameters = $tools->GetJsApiParameters($order);
        $jsApiParameters = $tools->GetJsApiParameters($order);
        // 获取共享收货地址js函数参数
        $editAddress = $tools->GetEditAddressParameters();
        die;
        return view('WechatePay')->with([
            'pay' => $pay['total_fee'] / 100,
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
    }

    /**
     * 微信登录
     * @param Request $request
     */
    public function userInfo(Request $request)
    {

        $config = new Wechate\WxPayConfig();
        if (isset($_GET['code'])) {
            $accJson = file_get_contents('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $config::APPID . '&secret=' . $config::APPSECRET . '&code=' . $_GET["code"] . '&grant_type=authorization_code ');
            $accArray = json_decode($accJson, true);
            $infoJson = file_get_contents('https://api.weixin.qq.com/sns/userinfo?access_token=' . $accArray["access_token"] . '&openid=' . $accArray['openid'] . '&lang=zh_CN ');
            $infoArray = json_decode($infoJson, true);
            $whether = $this->PurposeModel->selectFirst('user', [
                'user_openid' => $infoArray['openid'],
            ]);
            if (!is_null($whether)) {
                session(["user_id" => $whether->user_id]);
                // 更新头像
                $this->PurposeModel->up('user', ['user_id' => $whether->user_id], ['user_headimgurl' => $infoArray['headimgurl']]);
            } else {
                $id = $this->PurposeModel->insertGetId('user', [
                    'user_name' => $infoArray['nickname'],
                    'user_openid' => $infoArray['openid'],
                    'user_headimgurl' => $infoArray['headimgurl'],
                ]);
                session(['user_id' => $id]);
            }
            echo '<script type="text/javascript">window.location.href="' . $this->getBaseUrl($request->url) . '";</script>';
        } else {
            $baseUrl = urlencode('http://www.bananatrip.cn/wx/login/' . $request->url);
            $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $config::APPID . '&redirect_uri=' . $baseUrl . '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            echo '<script type="text/javascript">window.location.href="' . $url . '";</script>';
        }
    }

    /**
     * @param $last
     * @return string  获取返回地址
     */
    public function getBaseUrl($last)
    {
        switch ($last) {
            case  'sendpost'; // 旅行发帖
                return 'http://www.bananatrip.cn/templates/sendpost.html';
                break;
            case  'post';   // 旅行社区
                return 'http://www.bananatrip.cn/templates/friend.html';
                break;
            case  'order';// 我的订单
                return 'http://www.bananatrip.cn/templates/order.html';
                break;
            default;
                return 'http://www.bananatrip.cn/templates/start.html';
        }


    }


}
