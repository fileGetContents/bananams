<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HotelRoom extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range(1, 20) as $value) {
            DB::table('hotel_room')->insert([
                'room_hotel_id' => rand(4, 22),
                'room_name' => str_random(),
                'room_info' => str_random(),
                'room_image' => 'http://www.bananatrip.com/testImage/room.png',
                'room_price' => rand(100, 300),
                'room_time' => $_SERVER['REQUEST_TIME'],
                'room_num' => rand(0, 300),
                'room_order' => rand(30, 100)
            ]);
        }
    }
}
