<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\PublicModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Model;
use Crypt;

class AdminController extends Controller
{

    private $prefix = "Admin.admin-";
    private $public;

    public function __construct()
    {
        $this->public = new Model\PublicModel();
    }

    public function login()
    {
        return view($this->prefix . "index");
    }

    public function lists()
    {

        return view($this->prefix . "list");
    }

    public function add()
    {
        return view($this->prefix . "add");
    }

    public function permission()
    {

        return view($this->prefix . "permission");
    }

    public function role()
    {
        return view($this->prefix . "role");
    }

    public function roleAdd()
    {
        return view($this->prefix . "role_add");
    }


    /**
     * 管理员登录
     * @param Request $request
     */
    public function loginAdmin(Request $request)
    {
        $admin = $this->public->selectAdminFirst(array('admin_name' => $request->input('admin')));
        if (!is_null($admin)) {
            if (Crypt::decrypt($admin->admin_password) == $request->input('password')) {
                $request->session()->put('admin_id', $admin->admin_id);
                echo collect(['info' => 0, 'message' => 'success']);
            } else {
                echo collect(['info' => 1, 'message' => '密码不匹配']);
            }
        } else {
            echo collect(['info' => 1, 'message' => '账号不存在']);
        }
    }

    /**
     *更新管理员
     * @param Request $request
     */
    public function alterAdmin(Request $request)
    {
        $pass = Crypt::encrypt($request->input('pass'));
        $whether = $this->public->updateAdmin($request->input('admin'), $pass);
        if ($whether) {
            echo collect(array('info' => 0, 'message' => 'success'));
        } else {
            echo collect(array('info' => 1, 'message' => 'error'));
        }
    }


}
