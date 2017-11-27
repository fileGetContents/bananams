<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Storage;

class ProductController extends Controller
{
    //
    private $file = "Admin.product-";
    private $goodModel;
    private $bananModel;
    private $hotelModel;
    private $db;

    public function __construct()
    {
        $this->goodModel = new Model\GoodModel();
        $this->bananModel = new Model\BananaModel();
        $this->hotelModel = new Model\HotelModel();
        $this->db = new Model\SQLModel();
    }

    public function add(Request $request)
    {
        $good = null;
        if (is_numeric($request->id)) {
            $good = $this->db->selectFirst('good', ['good_id' => $request->id]);
            $url = URL('add/good/' . $request->id);
        } else {
            $url = URL('add/good');
        }
        return view($this->file . "add")->with([
            'good' => $good,
            'url' => $url
        ]);
    }

    /**
     * 旅游管理
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function brand()
    {
        $travel = DB::table('travel')->orderBy('travel_id', 'desc')->paginate(10);
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

            if ($_FILES['file2']['error'] == 0) {
                $fileName = date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
                $storage = Storage::put(
                    $fileName,
                    file_get_contents($request->file('file2')->getRealPath())
                );
            }
            // 详细信息
            $insert = array(
                'travel_name' => $request->input('travel_name'),
                'travel_venue' => $request->input('travel_venue'),
                'travel_notice' => $request->input('travel_notice'),
                'travel_voyage' => $request->input('travel_voyage'),
                'travel_bourn' => $request->input('travel_bourn'),
                'travel_expense' => $request->input('travel_expense'),
                'travel_time' => $_SERVER['REQUEST_TIME'],

                'travel_sort' => $_SERVER['REQUEST_TIME'], // 排序
                'travel_province' => $request->input('pro'),
                'travel_city' => $request->input('city'),
                //'travel_distrist' => $request->input('dis'),
                'travel_recommend' => $request->input('travel_recommend'),
                'travel_classify' => $request->input('travel_classify'),
            );
            if (isset($fileName)) {
                $insert['travel_host_image'] = asset('images/' . $fileName);
            }

            if ($request->input('image', -1) != -1) {
                $insert['travel_images'] = serialize($request->input('image'));
            }

            // 添加旅游信息
            if (is_numeric($request->id)) {
                $whether = $this->db->upInfo('travel', ['travel_id' => $request->id], array_filter($insert));
                if ($whether) {
                    $id = 100;
                } else {
                    $id = 0;
                }
            } else {
                $id = $this->bananModel->insertTravel($insert);
            }

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
                };
                echo '<script type="text/javascript">alert("添加成功")</script>';
            } else {

                echo '<script type="text/javascript">alert("添加失败")</script>';
            }
        }

        // 是否是修改
        $travel = null;
        if (is_numeric($request->id)) {
            $id = $request->id;
            $travel = $this->db->selectFirst('travel', ['travel_id' => $request->id]);
            $url = URL('add/brand/' . $id);
        } else {
            $id = null;
            $url = URL('add/brand');
        }
        return view($this->file . "brand_add")->with([
            'id' => $id,
            'url' => $url,
            'travel' => $travel // 旅行信息
        ]);

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
     *
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
        $insert = array(
            'good_name' => $request->input('good_name'),
            'good_freight' => $request->input('good_freight'),
            'good_amount' => $request->input('good_amount'),
            'good_details' => $request->input('good_details'),
            'good_recommend' => time(), // 排名
            'good_time' => time(),  // 添加时间
            //  'good_images' => serialize($request->input('image')),
        );
        // 验证上传图片
        if ($_FILES['file2']['error'] == 0) {
            $fileName = date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
            Storage::put(
                $fileName,
                file_get_contents($request->file('file2')->getRealPath())
            );
            $insert['good_image'] = asset("images/" . $fileName); // 上传图片路径
        }

        // 修改多张图片
        if (isset($_POST['image'])) {
            $insert['good_images'] = serialize($request->input('image'));
        }
        // 添加或者修改
        if (is_numeric($request->id)) {
            $row = $this->db->upInfo('good', ['good_id' => $request->id], array_filter($insert));
        } else {
            $row = $this->goodModel->insertGood(array_filter($insert));
        }

        if ($row) {
            echo '<script type="text/javascript">alert("添加成功")</script>';
            return back();
        } else {
            echo '<script type="text/javascript">alert("添加失败")</script>';
            return back();
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
            $insert = array(
                'room_name' => $request->input('room_name'),
                'room_price' => $request->input('room_price'),
                'room_num' => $request->input('room_num'),
                'room_info' => $request->input('room_info'),
                'room_order' => $_SERVER['REQUEST_TIME'],    // 默认排序
                'room_time' => $_SERVER['REQUEST_TIME'],     // 添加时间
                'room_hotel_id' => $request->input('hotel')  // 酒店编号
            );
            if ($_FILES['file2']['error'] == 0) {
                $fileName = date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
                Storage::put(
                    $fileName,
                    file_get_contents($request->file('file2')->getRealPath())
                );
                $insert ['room_image'] = asset("images/" . $fileName);
            }
            if (is_numeric($request->id)) {
                $whether = $this->db->upInfo('hotel_room', ['room_id' => $request->id], array_filter($insert));
                if ($whether) {
                    $id = 100;
                } else {
                    $id = 'test';
                }
            } else {
                $id = $this->hotelModel->insertRoom($insert);
            }

            if (is_numeric($id)) {
                echo '<script type="text/javascript"> alert("添加成功") </script>';
            } else {
                echo '<script type="text/javascript"> alert("添加失败") </script>';
            }
        }
        $info = null;
        if (is_numeric($request->id)) {
            $info = $this->db->selectFirst('hotel_room', ['room_id' => $request->id]);
            $url = URL('add/room/' . $request->id);
        } else {
            $url = URL('add/room');
        }
        return view($this->file . 'room_add')->with([
            'hotel' => $hotel,
            'info' => $info,
            'url' => $url
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
            $insert = $request->all();
            $fileName = date('Ymd') . '/' . rand(100000, 99999) . date('YmdHis') . ".png";
            if ($_FILES['file2']['error'] == 0) {
                // 上传图片
                Storage::put(
                    $fileName,
                    file_get_contents($request->file('file2')->getRealPath())
                );
                $insert['file2'] = '';
                $insert['hotel_image'] = asset('images/' . $fileName); // 图片路径
            } else {
                $insert['hotel_image'] = '';
            }

            // 轮播图片
            if (isset($insert['image'])) {
                if (is_array($insert['image'])) {
                    $insert['hotel_images'] = serialize($insert['image']);
                }
                $insert['image'] = '';
            }

            if (is_numeric($request->id)) {
                $whether = $this->db->upInfo('hotel', ['hotel_id' => $request->id], array_filter($insert));
                if ($whether) {
                    echo '<script>alert("更新成功")</script>';
                }
            } else {
                $whether = $this->db->insertBool('hotel', array_filter($insert));
                if ($whether) {
                    echo '<script>alert("添加成功")</script>';
                }
            }
        }

        $hotel = null;
        if (is_numeric($request->id)) {
            $hotel = $this->db->selectFirst('hotel', ['hotel_id' => $request->id]);
            $url = URL('add/hotel/' . $request->id);
        } else {
            $url = URL('add/hotel');
        }

        return view($this->file . 'hotel-add')->with([
            'url' => $url,
            'hotel' => $hotel
        ]);

    }

}
