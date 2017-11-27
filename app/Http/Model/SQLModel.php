<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SQLModel extends Model
{

    /**
     * 更新数据
     *
     * @param $table string
     * @param $where array
     * @param $update array
     * @return bool
     */
    public function upInfo($table, $where, $update)
    {
        return DB::table($table)->where($where)->update($update);
    }

    /**
     * 查询一条数据
     *
     * @param $table string
     * @param $where array
     * @return object
     */
    public function selectFirst($table, $where)
    {
        return DB::table($table)->where($where)->first();
    }

    /**
     * 添加
     *
     * @param $table string
     * @param $insert array
     * @return bool
     */
    public function insertBool($table, $insert)
    {
        return DB::table($table)->insert($insert);
    }


}
