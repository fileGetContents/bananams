<?php

namespace App\Http\Controllers\Api;

use App\OrderModel;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Model;
use Illuminate\Support\Facades\DB;


class BananController extends Controller
{
    private $banModel;
    private $enrolModel;
    private $publcModel;
    private $orderModel;

    public function __construct()
    {
        $this->banModel = new Model\BananaModel();
        $this->enrolModel = new Model\EnrolModel();
        $this->publcModel = new Model\PublicModel();
        $this->orderModel = new Model\OrderModel();
    }

    /**
     * 首页旅展示
     */
    public function start()
    {
        $arr["small"] = $this->banModel->getIndexRecommend(10);
        $arr["weekend"] = $this->banModel->getIndexRecommend(20);
        $arr["sift"] = $this->banModel->getIndexRecommend(30);
        echo collect($arr)->toJson();
    }

    /**
     *  like  名字   start  初始位置0
     * 获取名字相似位置
     * @param Request $request
     */
    public function getLikeName(Request $request)
    {
        $return = $this->banModel->getLikeAddress(
            $request->input('like', ''),
            $request->input('skip'),
            $request->input('pace', ''),
            $request->input('classify', 10)
        );
        echo collect($return)->toJson();
    }

    // 获取出发
    public function getTravelAddress(Request $request)
    {


    }

    // 获取某个旅行信息
    public function getTravelInfo(Request $request)
    {
        $return = $this->banModel->getInfoFirst($request->input('id', 11));
        $return->travel_images = unserialize($return->travel_images);
        echo collect($return)->toJson();
    }

    // 获取单个旅游的用户信息
    public function getTravelUserEnrol(Request $request)
    {
        $userInfo = $this->orderModel->getTravelOrderUserById($request->input('id', 3));
        $return['user_info'] = $userInfo; // 详情
        $return['pay_user'] = 0;  // 支付人数
        $return['all_user'] = 0;  // 用户
        foreach ($userInfo as $value) {
            if ($value->order_tag == 10) {
                $return['pay_user']++;
            }
            $return['all_user']++;
        }
        echo collect($return)->toJson();
    }

    /**
     * 获取旅游项目的时间
     * @param Request $request
     */
    public function getTravelTime(Request $request)
    {
        $travel = $this->banModel->selectTravelTimeInfo($request->input('id', 3));
        if (empty($travel)) {
            return collect(['data' => [], 'status' => 0]);
        } else {
            $status['status'] = 1;
            $msg = [];
            foreach ($travel as $key => $value) {
                $msg[] = array(
                    'adultprice' => '0',
                    'batch' => rand(10, 20),
                    'bid' => $value->info_time,
                    'childprice' => '-1',
                    'diff' => '',
                    'limit_max' => 0,
                    'people_count' => 0,
                    'price_label' => '0',
                    'price_status' => 1,
                    'starttime' => $value->info_time,
                    'status' => 1,
                    'status_label' => $value->info_text,
                    'val' => date('Y-m-d', $value->info_time),
                );
            }
            $status['data'] = $msg;
            return collect($status)->toJson();
        }
    }

    /**
     * @param Request $request
     * @return string
     */
    public function getTravelMonth(Request $request)
    {
        $month = $this->banModel->getDistinctMonth($request->input('id', 3));
        return collect($month)->toJson();
    }


    /**
     * 获取参加旅游的用户
     * @param Request $request
     */
    public function getUserAll(Request $request)
    {
        $user = DB::table('travel_order')
            ->leftJoin('user', 'user.user_id', '=', 'travel_order.order_travel_id')
            ->where(array('order_travel_id' => $request->input('id', 3)))
            ->get();
        echo collect($user)->toJson();
    }

}
