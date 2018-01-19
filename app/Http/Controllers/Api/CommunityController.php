<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Model;
use Illuminate\Support\Facades\DB;

class CommunityController extends Controller
{

    protected $communityModel;
    protected $likeModel;
    protected $userModel;
    protected $db;

    public function __construct()
    {
        $this->communityModel = new Model\CommunityModel();
        $this->likeModel = new Model\LikeModel();
        $this->userModel = new Model\UserModel();
        $this->db = new Model\SQLModel();
    }

    /**
     * 返回参数
     * @param Request $request
     */
    public function getPostAll()
    {
        $post = $this->communityModel->getPostListAll();
        echo collect($post)->toJson();
    }

    /**
     *
     * @param Request $request
     * @return $this
     */
    public function postAll(Request $request)
    {
        $post = DB::table('post')
            ->orderBy('post_id', 'DESC')
            ->leftJoin('user', 'user.user_id', '=', 'post.post_user_id')
            ->paginate(20);
        // 回帖
        $reply = array();
        // 点赞
        $like = array();
        // 时间
        $time = array();
        $num = array();
        foreach ($post as $key => $value) {
            $reply[$value->post_id] = DB::table('post_reply')
                ->where(['reply_post_id' => $value->post_id])
                ->orderBy('reply_time', 'desc')
                ->get();
            $like[$value->post_id] = DB::table('post_praise')->where(['praise_post_id' => $value->post_id])->groupBy('praise_user_id')->get();
            $time [$value->post_id] = Model\PublicModel::getPublished($value->post_time);
            $num[$value->post_id] = DB::table('post_reply')->where(['reply_post_id' => $value->post_id])->count();
        }
        return view('Api.getPostPage')->with([
            'post' => $post,
            'reply' => $reply,
            'like' => $like,
            'user' => Model\UserModel::getALlToArray(),
            'time' => $time,
            'num' => $num
        ]);
    }

    /**
     *用户
     * @param Request $request
     * @return $this
     */
    public function postAllUser(Request $request)
    {
        $post = DB::table('post')
            ->where(['post_user_id' => $request->input('id')])
            ->orderBy('post_id', 'DESC')
            ->leftJoin('user', 'user.user_id', '=', 'post.post_user_id')
            ->get();
        // 回帖
        $reply = array();
        // 点赞
        $like = array();
        // 时间
        $time = array();
        $num = array();
        foreach ($post as $key => $value) {
            $reply[$value->post_id] = DB::table('post_reply')
                ->where(['reply_post_id' => $value->post_id])
                ->orderBy('reply_time', 'desc')
                ->get();
            $like[$value->post_id] = DB::table('post_praise')->where(['praise_post_id' => $value->post_id])->groupBy('praise_user_id')->get();
            $time [$value->post_id] = Model\PublicModel::getPublished($value->post_time);
            $num[$value->post_id] = DB::table('post_reply')->where(['reply_post_id' => $value->post_id])->count();
        }
        return view('Api.getPostPage')->with([
            'post' => $post,
            'reply' => $reply,
            'like' => $like,
            'user' => Model\UserModel::getALlToArray(),
            'time' => $time,
            'num' => $num
        ]);
    }


    /**
     * 获取帖子详情关系(评论 ,点赞 ,用户的名称和头像)
     * @param Request $request
     */
    public function getPostReview(Request $request)
    {
        $review = $this->communityModel->getPostReview($request->input('id', 1)); // 获取该帖评论
        $return['review'] = array();
        $return['post'] = $review['post'];
        // 查看当前用户是否点赞
        foreach ($review['review'] as $value) {
            $v = $this->likeModel->isReviewLike($value->review_id, session('user_id', 1));
            if (empty($v)) {
                $value->isLike = 0;
            } else {
                $value->isLike = 1;
            }
            $return['review'][] = $value;
        }
        $prise = $this->likeModel->getUserPraise($request->input("id", 1));
        $return['prise'] = $prise;
        echo collect($return);
    }

    /**
     * 为贴子点赞
     * @param Request $request
     */
    public function updatePostPraise(Request $request)
    {
        $post = DB::table("post")->where("post_id", "=", $request->input('id', 1))->first();
        DB::beginTransaction();
        try {
            $sql1 = DB::table('post')
                ->where("post_id", "=", $post->post_id)
                ->increment('post_praise', 1);
            $sql2 = DB::table('post_praise')
                ->insert(array(
                    "praise_user_id" => session('user_id', 1),
                    "praise_post_id" => $post->post_id,
                    "praise_time" => time()
                ));
            if ($sql1 && $sql2) {
                DB::commit();
                echo collect(array("info" => 0, "message" => "点赞成功"));
            }
        } catch (\Exception $e) {
            DB::rollBack();
            echo collect(array("info" => 1, "message" => "点赞失败"));
        }
    }

    /**
     * 为评论点赞
     * @param Request $request
     */
    public function updateLike(Request $request)
    {
        $review = DB::table("post_review")->where("review_id", "=", $request->input('id', 1))->first();
        DB::beginTransaction();
        try {
            $sql1 = DB::table('post_review')
                ->where('review_id', '=', $review->review_id)
                ->update(array('review_user_num' => $review->review_user_num + 1));
            $sql2 = DB::table("review_like")
                ->insert(array(
                    "like_review_id" => $review->review_id,
                    "like_user_id" => session("user_id", 1),
                    'like_time' => time()
                ));
            if ($sql1 && $sql2) {
                DB::commit();
                echo collect(array("info" => 0, "message" => "点赞失败"));
            }
        } catch (\Exception $e) {
            DB::rollBack();
            echo collect(array("info" => 1, "message" => "点赞失败"));
        }
    }

    /**
     * 为贴子添加评论
     * post_id  贴子id
     * message  内容
     * @param Request $request
     */
    public function addReview(Request $request)
    {
        $array = array(
            'reply_post_id' => $request->input('post_id', 1),
            'reply_text' => $request->input('message', "不错呦!"),
            'reply_user_id' => session("user_id", 1),
            'reply_time' => time(),
        );
        if ($request->hasFile('friend_id')) {
            $array['reply_friend_id'] = $request->input('friend_id');
        }
        $id = $this->communityModel->insertReview($array);
        if ($id > 0) {
            $reply = DB::table('post_reply')->where(['reply_id' => $id])->first();
            $user = Model\UserModel::getALlToArray();
            if ($reply->reply_friend_id == 0) {
                $string = '<div><div class="avtkuang"><img class="po-avt data-avt zanavt pinglunavt" src="' . $user[$reply->reply_user_id]['headimgurl'] . '"></div><div class="pingluncontent"><span>' . $user[$reply->reply_user_id]['nick_name'] . '</span><div>' . $reply->reply_text . '</div></div></div>';
            } else {
                $string = '<div><div class="avtkuang"><img class="po-avt data-avt zanavt pinglunavt" src="' . $user[$reply->reply_user_id]['headimgurl'] . '"></div><div class="pingluncontent"><span>' . $user[$reply->reply_user_id]['nick_name'] . '</span>回复 <span>' . $user[$reply->reply_friend_id]['nick_name'] . '</span><div>' . $reply->reply_text . '</div></div></div>';
            }
            return collect(['info' => 0, 'message' => $string]);
        } else {
            return collect(array('info' => 1, 'message' => '添加失败'));
        }
//        if ($insert) {
//            echo collect(array('info' => 0, 'message' => '添加成功'));
//        } else {
//            echo collect(array('info' => 1, 'message' => '添加失败'));
//        }
    }

    /**
     * 添加评论
     * @param Request $request
     */
    public function addPost(Request $request)
    {
        $array = array(
            'post_content' => $request->input("message", '发了一个贴纸'),
            'post_user_id' => session("user_id", 1),
            'post_time' => time(),
            'post_images' => ''
        );
        // 添加图片
        //<a href="../img/thumbnails/tibet-1.jpg"><li><img src="../img/thumbnails/tibet-1.jpg" alt="Cuo Na Lake"></li></a>
//        if (is_array($request->input('updateName'))) {
//            foreach ($request->input('updateName') as $value) {
//                $array['post_images'] = $array['post_images'] . '<a href="http://www.bananatrip.com/images/' . date('Ymd') . '/' . $value . '.png"><li><img src="http://www.bananatrip.cn/images/' . date('Ymd') . '/' . $value . '.png" alt="Cuo Na Lake"></li></a>';
//            }
//        }
        if ($request->input('updateName') != '') {
            $arr = array_filter(explode('&', $request->input('updateName')));
            foreach ($arr as $value) {
                $array['post_images'] = $array['post_images'] . '<a href="http://www.bananatrip.com/images/' . date('Ymd') . '/' . $value . '.png"><li><img src="http://www.bananatrip.com/images/' . date('Ymd') . '/' . $value . '.png" alt="Cuo Na Lake"></li></a>';
            }
        }
        $whether = $this->communityModel->insertPost($array);
        if ($whether) {
            return collect(['info' => '0', 'message' => '发表成功']);
        } else {
            return collect(['info' => '1', 'message' => '发表失败']);
        }
    }

    /**
     * 获取帖子数量
     */
    public function getPostNum()
    {
        echo $this->communityModel->getPostNum();
    }

    /**
     * 获取用户参与的帖子
     */
    public function getUserPostJoin(Request $request)
    {
        $post_id = $this->communityModel->getUserJoinPost($request->input("user_id", 1));
        $postList = array();
        foreach ($post_id as $key => $value) {
            $postList[$key]['info'] = $this->communityModel->getPostReview($value);
            $postList[$key]['praise'] = $this->likeModel->getUserPraise($value);
            $postList[$key]['review_num'] = count($postList[$key]['info']['review']); // 评论长度
            $postList[$key]['praise_num'] = count($postList[$key]['praise']);         // 点赞人数
            foreach ($postList[$key]['info']['review'] as $m => $praise) {
                $like = $this->likeModel->isReviewLike($praise->review_id, session("user_id", 1));
                // 获取用户是否为该评论点赞
                if (empty($like)) {
                    $postList[$key]['info']['review'][$m]->user_like = "false";
                } else {
                    $postList[$key]['info']['review'][$m]->user_like = "true";
                }
                // 获取点赞数目
                $postList[$key]['info']['review'][$m]->like_num = count($like);
            }
        }
        echo json_encode($postList);
        //   echo collect($postList)->toJson();
    }

    /**
     * 获取用户发过的帖子
     */
    public function getUserAllPost(Request $request)
    {
        $post = $this->communityModel->selectUserPost($request->input("user_id", 1));
        $return = array();
        foreach ($post as $value) {
            $review = $this->communityModel->getPostReview($value->post_id);
            $user = $this->likeModel->getUserPraise($value->post_id);
            $value->review = $review['review'];
            $value->user = $user;
            $return[] = $value;
        }
        // dump($return);
        $info_user = $this->userModel->getUserInfoFirst($request->input('id', session('user_id', 1)));
        echo collect(array('return' => $return, 'info_user' => $info_user))->toJson();
        // dump($review);
    }


}
