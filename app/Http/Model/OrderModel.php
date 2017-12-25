<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class OrderModel extends Model
{
    protected $hidden = [
        'user_pass', 'user_openid'
    ];


    /**
     * 获取购买用户列表
     *
     * @param $id
     * @return mixed
     */
    public function getTravelOrderUserById($id)
    {
        return DB::table('travel_order')
            ->leftJoin('user', 'travel_order.order_user_id', '=', 'user.user_id')
            ->where(['order_travel_id' => $id])
            ->get();
    }

}
