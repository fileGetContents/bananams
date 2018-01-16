<?php

Route::group(['namespace' => 'Api'], function () {
    Route::any('banana/start', 'BananaController@start');                             // 香蕉小发现 周末不浪费
    Route::any('banana/LikeName', 'BananaController@getLikeName');                    // 获取相似位置
    Route::any('banana/TravelInfo', 'BananaController@getTravelInfo');                // 获取某个旅行详情
    Route::any('banana/User/Enrol', 'BananaController@getTravelUserEnrol');           // 获取旅游用户信息
    Route::any('travel/time', 'BananaController@getTravelTime');                      // 获取项目的时间
    Route::any('travel/time/month', 'BananaController@getTravelMonth');               // 获取项目的月份
    Route::any('travel/user/all', 'BananaController@getUserAll');                     // 获取参加用户
    Route::any('getTimePrice', 'BananaController@getTimePrice');                      // 获取特定时间

    Route::any('user/info', 'UserController@getUserInfo');                           // 获取用户信息
    Route::any('user/update/info', 'UserController@updateUserInfo');                 // 更新用戶信息
    Route::any('user/login', 'UserController@userLogin');                            // 用户登录
    Route::any('user/register', 'UserController@userRegister');                      // 用户注册
    Route::any('user/address', 'UserController@addAddress');                         // 添加收获地址
    Route::any('del/address', 'UserController@DelAddress');                          // 删除收获地址
    Route::any('get/address', 'UserController@getAddress');                          // 获取地址
    Route::any('is/login', 'UserController@isLogin');                                // 检查是否登录
    Route::any('exit/login', 'UserController@exitLogin');                            // 退出登录
    Route::any('user/kims', 'UserController@getUserKims');                           // 获取合格代金券
    Route::any('kims/update', 'UserController@updateUserKims');                      // 更新代金券状态
    Route::any('user/money', 'UserController@getUserMoney');                         // 获取用户的金额
    Route::any('create/user/order', 'UserController@createBalanceOrder');            // 生成余额订单

    Route::any('api/send/code', 'ApiController@sendSMSCode');                        // 发送短信验证码
    Route::any('good/order', 'ApiController@createGoodOrder');                       // 创建商品订单
    Route::any('hotel/order', 'ApiController@createHotelOrder');                     // 创建酒店订单
    Route::any('travel/order', 'ApiController@createTravelOrder');                   // 创建旅行订单
    Route::any('create/user/order', 'ApiController@createBalanceOrder');             // 创建用户订单
    Route::any('update/visit', 'ApiController@updateVisit');                         // 更新访问量
    Route::any('user/order', 'ApiController@getGoodOrder');                          // 获取用户的id

    Route::any('api/post/all', 'CommunityController@getPostAll');                     // 获取帖子
    Route::any('api/post/review', 'CommunityController@getPostReview');               // 获取贴子和评论信息
    Route::any('update/post/praise', 'CommunityController@updatePostPraise');         // 为贴子添加点赞
    Route::any('update/Like', 'CommunityController@updateLike');                      // 为评论点赞
    Route::any('user/review', 'CommunityController@addReview');                       // 帖子
    Route::any('add/post', 'CommunityController@addPost');                            // 发帖
    Route::any('post/num', 'CommunityController@getPostNum');                         // 获取帖子数量
    Route::any('user/join', 'CommunityController@getUserPostJoin');                   // 获取用户参与的帖子
    Route::any('user/all/post', 'CommunityController@getUserAllPost');                // 获取用户全部帖子

    Route::any('good/info', 'GoodController@getGoodInfo');                          // 获取一个商品的详情
    Route::any('good/amount', 'GoodController@getGoodAmount');                      // 获取商品剩余份数的
    Route::any('good/tag', 'GoodController@getTagGood');                            // 获取特定的商品
    Route::any('like/good', 'GoodController@getGoodLikeList');                      // 获取关键字商品信息
    Route::any('new/good', 'GoodController@getByTimeDesc');                         // 获取最新的商品

    Route::any('hotel/list', 'HotelController@getHotelList');                        // 获取酒店列表信息
    Route::any('Like/hotel/name', 'HotelController@getLikeHotelName');               // 获取相似的名字的酒店
    Route::any('hotel/content', 'HotelController@getHotelContent');                  // 获取一个酒店详细信息
    Route::any('hotel/info', 'HotelController@getHotelContent');                     // 获取酒店信息和房间内容
    Route::any('hotel/address', 'HotelController@getHotelAddress');                  // 酒店出发地相关信息
    Route::any('user/hotel/order', 'HotelController@getHotelOrder');                 // 获取用户酒店订单

    Route::any('travel/list', 'TravelController@getTravelList');                      // 获取旅游项目列表

    Route::any('user/friend', 'FriendController@getUserFriend');                      // 获取用户关注对象
    Route::any('add/friend', 'FriendController@addFriend');                           // 添加取消关注
    Route::any('is/friend', 'FriendController@isFriend');                             // 获取是不是朋友
    Route::any('add/dialogue', 'FriendController@addDialogue');                       // 添加聊天信息
    Route::any('update/dialogue', 'FriendController@changDialogueTag');               // 修改消息的状态
    Route::any('unread/dialogue', 'FriendController@getUnreadDialogue');              // 获取未读消息

    Route::any('update/image', 'ApiController@ajaxUpdateFileImage');                      // ajax上传图片
    Route::any('update/image2', 'ApiController@ajaxUpdateFileImage2');                    // ajax上传图片
    Route::any('image/name', 'ApiController@getAjaxImageName');                           // 获取ajax上传图片的名字

    //Route::any('wechate/pay', 'WxApiController@index');                                 // 微信支付
    Route::any('Home/Wxpay', 'WxApiController@index');
    Route::any('notify/url', 'WxApiController@NotifyUrl');                                // 微信回调地址
    Route::any('weixi/login', 'WxApiController@getUserInfo');                             // 微信授权登录回调地址

    Route::any('province', 'MapController@getProvince');                                  // 获取省份
    Route::any('city', 'MapController@getCity');                                          // 获取城市
    Route::any('district', 'MapController@getDistrict');                                  // 获取区域
    Route::any('wx/login/{url?}', 'WxApiController@userInfo');                            // 微信登录
    Route::any('native', 'WxApiController@native');                                       // 微信生成二维码
});

Route::group(['namespace' => 'Admin'], function () {
    Route::get('admin-login', 'IndexController@login');
    Route::get('admin-index', 'IndexController@index');
    Route::get('admin-welcome', 'IndexController@welcome');

    Route::get('admin-add', 'AdminController@add');
    Route::get('admin-list', 'AdminController@lists');
    Route::get('admin-permission', 'AdminController@permission');
    Route::get('admin-role', 'AdminController@role');
    Route::get('admin-role-add', 'AdminController@role_add');

    Route::get('article-add', 'ArticleController@add');
    Route::get('article-list', 'ArticleController@lists');

    Route::get('member-add', 'MemberController@add');
    Route::get('member-del', 'MemberController@del');
    Route::get('member-list', 'MemberController@lists');
    Route::get('member-record-browse', 'MemberController@browse');
    Route::get('member-record-download', 'MemberController@download');
    Route::get('member-record-share', 'MemberController@share');
    Route::get('member-show', 'MemberController@show');

    Route::get('picture-add', 'PictureController@add');
    Route::get('picture-list', 'PictureController@lists');
    Route::get('picture-show', 'PictureController@show');

    Route::get('product-add/{id?}', 'ProductController@add');  // 添加修改商品
    Route::get('product-brand', 'ProductController@brand');
    Route::get('product-category', 'ProductController@cateGory');
    Route::any('product-category-add', 'ProductController@cateGoryAdd');
    Route::get('product-list', 'ProductController@lists');
    Route::get('product-room', 'ProductController@roomList');             // 房间列表
    Route::any('product-hotel', 'ProductController@hotelList');           // 酒店订单

    Route::any('add/good/{id?}', 'ProductController@addGood');                  // 添加产品
    Route::any('add/brand/{id?}', 'ProductController@brandAdd');                // 添加旅游项目
    Route::any('add/room/{id?}', 'ProductController@addRoom');                  // 添加房间
    Route::any('add/hotel/{id?}', 'ProductController@hotelAdd');                // 添加酒店

    Route::get('system-base', 'SystemController@base');
    Route::get('system-category', 'SystemController@cateGory');
    Route::get('system-category-add', 'SystemController@cateGoryAdd');
    Route::get('system-data', 'SystemController@data');
    Route::get('system-log', 'SystemController@log');
    Route::get('system-shielding', 'SystemController@shielding');

    Route::get('feedback-list', 'PostController@lists');

    Route::get('order-travel', 'OrderController@travel');
    Route::get('order-hotel', 'OrderController@hotel');
    Route::get('order-good', 'OrderController@good');

    Route::post('all/del', 'PublicController@DelAll');                   // 通用删除
    Route::post('alert/admin', 'AdminController@alterAdmin');            // 修改密码
    Route::post('login/admin', 'AdminController@loginAdmin');            // 用户登录

});


Route::any('image/file', 'TestController@getImageFile');                  // 获取图片名称
Route::any('test', 'TestController@index');
Route::any('/', 'TestController@login');

Route::any('test2', function () {
    echo serialize(array('http://www.bananatrip.cn/img/s1.jpg', 'http://www.bananatrip.cn/img/s1.jpg', 'http://www.bananatrip.cn/img/s1.jpg'));
});   // 等级



