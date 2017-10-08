<?php

namespace App\Http\Controllers\Api;

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
    public function __construct()
    {
        $this->banModel = new Model\BananaModel();
        $this->enrolModel = new Model\EnrolModel();
        $this->publcModel = new Model\PublicModel();
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
        $userInfo = $this->enrolModel->getTravelUser($request->input('id', 2));
        $return['user_info'] = $userInfo; // 详情
        $return['pay_user'] = 0;  // 支付人数
        $return['all_user'] = 0;  // 用户
        if (!empty($userInfo)) {
            foreach ($userInfo as $value) {
                $return['all_user']++;
                if ($value->enrol_tag >= 10) {
                    $return['pay_user']++;
                }
            }
        }
        echo collect($return)->toJson();
    }

    /**
     * 获取旅游项目的时间
     * @param Request $request
     */
    public function getTravelTime(Request $request)
    {
        $time = $this->banModel->selectTravelTime(array(
            'info_travel_id' => $request->input('id', 1),
        ));
        // dump($time);
        echo collect($time)->toJson();
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
