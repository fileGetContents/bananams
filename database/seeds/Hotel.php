<?php

use Illuminate\Database\Seeder;

class Hotel extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range(1, 20) as $value) {
            DB::table('hotel')->insert([
                'hotel_name' => '测试' . str_random(),
                'hotel_image' => 'http://www.bananatrip.com/testImage/hotel.png',
                'hotel_images' => serialize(['http://www.bananatrip.com/testImage/hotel.png', 'http://www.bananatrip.com/testImage/hotel.png', 'http://www.bananatrip.com/testImage/hotel.png']),
                'hotel_address' => '酒店地址' . str_random(),
                'hotel_time' => $_SERVER['REQUEST_TIME'],
                'hotel_order' => rand(20, 10),
                'hotel_price' => rand(200, 500),
                'hotel_info' => str_random(1000)
            ]);
        }
    }
}
