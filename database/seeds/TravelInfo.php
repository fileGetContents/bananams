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
        foreach (range(4, 10) as $value) {
            DB::table('travel_info')->insert([
                'info_time' => $_SERVER['REQUEST_TIME'] + 60 * 60 * 24 * $value,
                'info_month' => date('Y-m', $_SERVER['REQUEST_TIME'] + 60 * 60 * 24 * $value),
                'info_text' => '放心大胆的选',
                'info_travel_id' => 3
            ]);
        }

    }
}
