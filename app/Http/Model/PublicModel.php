<?php

namespace App\Http\Model;

use  Illuminate\Database\Eloquent\Model;
use  Illuminate\Support\Facades\DB;
use  Crypt;

class PublicModel extends Model
{


    public function hasOrder()
    {

    }

    /**
     * 更新密码
     * @param $admin string 账号
     * @param $pass string 密码
     * @return mixed
     */
    public function updateAdmin($admin, $pass)
    {
        return DB::table('admin')
            ->where('admin_id', '=', 1)
            ->update(array('admin_name' => $admin, 'admin_password' => $pass));
    }


    /**
     * 查询管理员
     * @param $array
     * @return mixed
     */
    public function selectAdminFirst($array)
    {
        return DB::table('admin')->where($array)->first();
    }


    /**
     * 查询全部的数据
     * @param $table string
     * @param $where array
     * @return mixed
     */
    public function selectAll($table, $where)
    {
        return DB::table($table)->where($where)->get();
    }


    /**
     * 通用查询
     *
     * @param $table string
     * @param $where array
     * @return mixed
     */
    public function selectFirst($table, $where)
    {
        return DB::table($table)->where($where)->first();
    }


    /**
     * 通用添加
     *
     * @param $table
     * @param $insert
     */
    public function up($table, $insert)
    {
        return DB::table($table)->insertGetId($insert);
    }


    /**
     * 发表显示
     * @param int $unixEndTime
     * @return int
     */
    public static function getPublished($unixEndTime = 0)
    {
        $time = time() - $unixEndTime;
        if ($time > 86400 * 29) {
            $moth = (int)($time / (86400 * 29));
            return $moth . '月前';
        }
        if ($time >= 86400) { // 如果大于1天
            $days = (int)($time / 86400);
            return $days . '天前';
        }
        if ($time >= 3600) { // 如果大于1小时
            $xiaoshi = (int)($time / 3600);
            return $xiaoshi . '小时前';
        }
        $fen = (int)($time / 60); // 剩下的毫秒数都算作分
        return $fen . '分钟前';
    }


}
