<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Travel extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range(0, 20) as $value) {
            DB::table('travel')->insert([
                'travel_name' => '测试' . str_random(),
                'travel_host_image' => 'http://www.bananatrip.com/testImage/test.png',
                'travel_images' => serialize(['http://www.bananatrip.com/testImage/test.png', 'http://www.bananatrip.com/testImage/test.png', 'http://www.bananatrip.com/testImage/test.png']),
                'travel_venue' => '集合地点' . str_random(),
                'travel_notice' => '须知' . str_random(),
                'travel_voyage' => '航程' . str_random(),
                'travel_expense' => 10,
                'travel_bourn' => '目的地' . str_random(),
                'travel_time' => $_SERVER['REQUEST_TIME'],
                'travel_tag' => 20,
                'travel_recommend' => [0, 10, 20, 30][array_rand([0, 10, 20, 30])],
                'travel_sort' => $value,
                'travel_classify' => array_rand([10, 20, 30]),
                'travel_province' => 1,
                'travel_city' => 1,
                'travel_district' => 1,
                'travel_expense2' => '详细界面费用' . str_random(),
                'travel_activity' => '活动说明' . str_random(),
            ]);
        }
    }
}
