<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use  App\Http\Requests;
use  App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class MapController extends Controller
{


    /**
     * 获取身份
     */
    public function getProvince()
    {
        $province = DB::table('province')->get();
        echo collect($province)->toJson();
    }

    /**
     * 获取城市
     * @param Request $request
     */
    public function getCity(Request $request)
    {
        $city = DB::table('city')->where('ProvinceID', '=', $request->input('id', 1))->get();
        echo collect($city)->toJson();
    }

    /**
     * 获取地区
     * @param Request $request
     */
    public function getDistrict(Request $request)
    {
        $district = DB::table('district')->where('CityID', '=', $request->input('id', 1))->get();
        echo collect($district)->toJson();
    }

}
