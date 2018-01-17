<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Reply extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range(0, 3) as $value) {
            DB::table('post_reply')->insert([
                'reply_user_id' => 2,
                'reply_friend_id' => 1,
                'reply_text' => str_random(30),
                'reply_time' => $_SERVER['REQUEST_TIME'],
                'reply_post_id' => 1,
            ]);
        }
    }
}
