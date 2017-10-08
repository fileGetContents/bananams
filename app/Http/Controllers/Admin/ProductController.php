<?php

namespace App\Http\Controllers\Admin;

use App\Http\Model\GoodModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Model;
use Illuminate\Support\Facades\DB;
use Storage;

class ProductController extends Controller
{
    //
    private $file = "Admin.product-";
    private $goodModel;
    private $bananModel;
    private $hotelModel;

    public function __construct()
    {
        $this->goodModel = new Model\GoodModel();
        $this->bananModel = new Model\BananaModel();
        $this->hotelModel = new Model\HotelModel();
    }

    public function add()
    {
        return view($this->file . "add");
    }

    /**
     * 旅游管理
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function brand()
    {
        $travel = DB::table('travel')->orderBy('travel_id','desc')->paginate(10);
        return view($this->file . "brand")->with([
            'travel' => $travel
        ]);
    }

    /**
     * 添加旅游项目
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function brandAdd(Request $request)
    {
        if ($request->isMethod('post')) {
            $fileName = date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
            $storage = Storage::put(
                $fileName,
                file_get_contents($request->file('file2')->getRealPath())
            );
            // 添加旅游信息
            $id = $this->bananModel->insertTravel(array(
                'travel_name' => $request->input('travel_name'),
                'travel_venue' => $request->input('travel_venue'),
                'travel_notice' => $request->input('travel_notice'),
                'travel_voyage' => $request->input('travel_voyage'),
                'travel_bourn' => $request->input('travel_bourn'),
                'travel_expense' => $request->input('travel_expense'),
                'travel_time' => $_SERVER['REQUEST_TIME'],
                'travel_host_image' => 'images/' . $fileName,
                'travel_images' => serialize($request->input('image')),
                'travel_sort' => $_SERVER['REQUEST_TIME'], // 排序
                'travel_province' => $request->input('pro'),
                'travel_city' => $request->input('city'),
                //'travel_distrist' => $request->input('dis'),
                'travel_recommend' => $request->input('travel_recommend'),
                'travel_classify' => $request->input('travel_classify'),
            ));
            // 添加旅游其他信息
            if (is_numeric($id)) {
                foreach ($request->input('start') as $key => $value) {
                    $this->bananModel->insertTravelInfo(array(
                        'info_start' => strtotime($value),
                        'info_over' => strtotime($request->input('over')[$key]),
                        'info_week' => $request->input('week')[$key],
                        'info_travel_id' => $id,
                        'info_expense' => $request->input('info_num')[$key], // 剩余数量

                    ));
                }
                echo '<script type="text/javascript">alert("添加成功")</script>';
            } else {
                echo '<script type="text/javascript">alert("添加失败")</script>';
            }
        }
        return view($this->file . "brand_add");
    }


    /**
     * 房间酒店管理
     * @return $this
     */
    public function cateGory()
    {
        $room = DB::table('hotel_room')->leftJoin('hotel', 'hotel.hotel_id', '=', 'hotel_room.room_hotel_id')->paginate(10);
        return view($this->file . "category")->with([
            'room' => $room
        ]);
    }

    /**
     * 添加房间
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function cateGoryAdd(Request $request)
    {
        if ($request->isMethod("post") == 'post') {
            $fileName = date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
            Storage::put(
                $fileName,
                file_get_contents($request->file('file2')->getRealPath())
            );
            $id = $this->hotelModel->insertRoom(array(
                'room_hotel_id' => $request->input('hotel_id'),
                'room_name' => $request->input('room_name'),
                'room_info' => $request->input('good_details'),
                'room_price' => $request->input('room_price'),
                'room_num' => $request->input('room_num'),
                'room_time' => $_SERVER['REQUEST_TIME'],
                'room_image' => "images/" . $fileName,
            ));
            if (is_numeric($id)) {
                echo '<script type="text/javascript">alert("添加成功")</script>';
            } else {
                echo '<script type="text/javascript">alert("添加失败")</script>';
            }
        }
        $hotel = $this->hotelModel->selectHotel();
        return view($this->file . "category-add")->with([
            'hotel' => $hotel
        ]);
    }

    /**
     * 商品管理
     * @param Request $request
     * @return $this
     */
    public function lists(Request $request)
    {
        $good = DB::table('good')->orderBy('good_id', 'desc')->paginate(10);
        return view($this->file . "list")->with([
            'good' => $good
        ]);
    }

    /**
     * 添加商品接口
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     *
     */
    public function addGood(Request $request)
    {
        $fileName = date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
        Storage::put(
            $fileName,
            file_get_contents($request->file('file2')->getRealPath())
        );
        $row = $this->goodModel->insertGood(array(
            'good_name' => $request->input('good_name'),
            'good_freight' => $request->input('good_freight'),
            'good_amount' => $request->input('good_amount'),
            'good_details' => $request->input('good_details'),
            'good_recommend' => time(), // 排名
            'good_time' => time(),  // 添加时间
            'good_image' => "images/" . $fileName, // 上传图片路径
            'good_images' => serialize($request->input('image')),
        ));
        if ($row) {
            echo '<script type="text/javascript">alert("添加成功")</script>';
            // return back();
        } else {
            echo '<script type="text/javascript">alert("添加失败")</script>';
            //  return back();
        }
    }

    /**
     * 酒店房间列表
     */
    public function roomList()
    {
        $room = DB::table('hotel_room')->leftJoin('hotel', 'hotel.hotel_id', '=', 'hotel_room.room_hotel_id')->paginate(15);
        return view($this->file . 'room')->with([
            'room' => $room
        ]);
    }

    /**
     * 添加房间
     * @param Request $request
     * @return $this
     */
    public function addRoom(Request $request)
    {
        $hotel = $this->hotelModel->selectHotel();
        if ($request->isMethod('post')) {
            // 上传图片
            $fileName = date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
            Storage::put(
                $fileName,
                file_get_contents($request->file('file2')->getRealPath())
            );
            $id = $this->hotelModel->insertRoom(array(
                'room_name' => $request->input('room_name', '111111111111111'),
                'room_price' => $request->input('room_price', '111111'),
                'room_num' => $request->input('room_num', 11111),
                'room_image' => "images/" . $fileName,
                'room_info' => $request->input('room_info', '111111'),
                'room_order' => $_SERVER['REQUEST_TIME'], // 默认排序
                'room_time' => $_SERVER['REQUEST_TIME'],  // 添加时间
            ));
            if (is_numeric($id)) {
                echo '<script type="text/javascript"> alert("添加成功") </script>';
            } else {
                echo '<script type="text/javascript"> alert("添加失败") </script>';
            }
        }
        return view($this->file . 'room_add')->with([
            'hotel' => $hotel
        ]);
    }


    /**
     *  酒店列表
     */
    public function hotelList()
    {
        $hotel = DB::table('hotel')->paginate(10);
        return view($this->file . 'hotel')->with([
            'hotel' => $hotel
        ]);
    }

    /**
     *  添加酒店
     */
    public function hotelAdd(Request $request)
    {
        if ($request->isMethod('post')) {
            // 上传图片
            $fileName = date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
            Storage::put(
                $fileName,
                file_get_contents($request->file('file2')->getRealPath())
            );
            $insert = $request->all();
            $insert['hotel_image'] = asset($fileName); // 图片路径
        }

        return view($this->file . 'hotel-add');
    }

}
