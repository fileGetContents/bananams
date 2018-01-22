<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TravelInfo extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //  foreach (range(4, 5) as $value) {
        DB::table('travel_info')->insert([
            'info_time' => strtotime('2018-1-20'),
            'info_month' => '2018-1',
            'info_text' => '放心大胆的选',
            'info_travel_id' => 61
        ]);
        //   }
    }
}
