<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Model;
use Illuminate\Support\Facades\DB;

class HotelController extends Controller
{

    protected $hotelModel;
    protected $publicModel;

    public function __construct()
    {
        $this->hotelModel = new Model\HotelModel();
        $this->publicModel = new Model\PublicModel();
    }

    /**
     * 获取酒店列表
     * @param Request $request
     */
    public function getHotelList(Request $request)
    {
        $room = $this->hotelModel->selectHotelList($request->input("skip", 0));
        echo collect($room)->toJson();
    }

    /**
     * 获取相似名字的酒店
     * @param Request $request
     */
    public function getLikeHotelName(Request $request)
    {
        $hotel = $this->hotelModel->likeHotelNameList(
            $request->input('name', "测试"), $request->input('skip', 0)
        );

        echo collect($hotel)->toJson();
    }

    /**
     * 获取酒店详细信息
     * @param Request $request
     */
    public function getHotelContent(Request $request)
    {
        $hotel = $this->hotelModel->selectFirstHotel($request->input("id", 1));
        $hotel->hotel_images = unserialize($hotel->hotel_images);
        $room = $this->hotelModel->selectRoomList($request->input('id', 1));
        echo collect(array('hotel' => $hotel, 'room' => $room))->toJson();
    }


    /**
     * 获取出发第详细地址
     * @param Request $request
     */
    public function getHotelAddress(Request $request)
    {
        echo "待完善";
    }

    /**
     * 获取酒店订单
     * @param Request $request
     */
    public function getHotelOrder(Request $request)
    {
        $hotel = DB::table('hotel_order')
            ->where(array('order_user_id' => session('user_id', 1)))
            ->leftJoin('hotel', 'hotel.hotel_id', '=', 'hotel_order.order_hotel_id')
            ->get();
        echo collect($hotel)->toJson();
    }


}
