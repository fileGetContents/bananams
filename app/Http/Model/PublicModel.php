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





}
