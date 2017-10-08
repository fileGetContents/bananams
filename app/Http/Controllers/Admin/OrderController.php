<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    protected $file = "Admin.order-";

    /**
     * 商品订单管理
     * @return $this
     */
    public function good()
    {
        $good = DB::table('good_order')
            ->leftJoin('user', 'user.user_id', '=', 'good_order.order_user_id')
            ->leftJoin('good', 'good.good_id', '=', 'good_order.order_good_id')
            ->paginate(10);
        return view($this->file . 'good')->with([
            'good' => $good
        ]);
    }


    /**
     *旅游订单管理
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function travel()
    {
        $travel = DB::table('travel_order')
            ->leftJoin('travel_info', 'travel_order.order_info_id', '=', 'travel_info.info_id')
            ->paginate(10);
        return view($this->file . 'travel')->with([
            'travel' => $travel
        ]);
    }


    /**
     * 旅游订单
     * @return $this
     */
    public function hotel()
    {
        $hotel = DB::table('hotel_order')
            ->leftJoin('hotel', 'hotel.hotel_id', '=', 'hotel_order.order_hotel_id')
            ->leftJoin('hotel_room', 'hotel_room.room_id', '=', 'hotel_order.order_room_id')
            ->paginate(10);
        return view($this->file . 'hotel')->with([
            'hotel' => $hotel
        ]);
    }


}
