@foreach($post as $value)
    <li class="frind-kuang">
        <div class="xinxikuang">
            <div class="po-avt-wrap"><a href="other.html?id={{$value->user_id}}">
                    <img class="po-avt data-avt" src="{{$value->user_headimgurl}}"></a>
            </div>
            <div class="po-cmt"><p class="po-name" id="name">{{$value->user_name}}</p>
                <div class="post"><p>{!! $value->post_content !!}</p>
                    <div class="container">
                        <ul class="baguetteBoxOne gallery">
                            {!! $value->post_images !!}
                        </ul>
                    </div>
                </div>
                <p id="date" class="time">{{  $time [$value->post_id]}}</p>
                <div class="oprate c-icon" style="width:50px;height:50px;line-height:50px;padding:15px;">
                    <img class="c-icon" style="float:right;" src="../img/que.png">
                </div>
                <div class="zan-bg no" style="display: none;">
                    <div class="pinglun">
                        <img src="../img/pinglun.png" width="20px" height="20px">
                        <span>评论<span id="pinglun_data">{{$num[$value->post_id]}}</span></span>
                    </div>
                    <div class="pinglun-box no">
                        <div class="inner cover">
                            <p class="lead emoji-picker-container">
                            <textarea autofocus="" style="width:100%;" class="form-control textarea-control" rows="4" cols="50" placeholder="回复帖子" data-emojiable="true"></textarea>
                            </p>
                        </div>
                        <div class="replay">
                            <ul class="face">
                                <li>
                                    <button post_id="{{$value->post_id}}" class="button-clear btn cancel add_post">发送
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="zan">
                        <img class="dianzhan" post_id="{{$value->post_id}}" src="../img/zan.png" width="20px"
                             height="20px">
                        <span>赞</span><span id="like_data">{{$value->post_praise}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="r"></div>
        <div class="cmt-wrap">
            <div class="like">
                <div class="xinxin"><img src="../img/l.png"></div>
                @foreach( $like[$value->post_id] as $key=> $v )
                    @if(empty($v))
                    @elseif($key < 4)
                        <img class="po-avt data-avt zanavt" src="{{$user[$v->praise_post_id]['headimgurl']}}">
                    @endif
                @endforeach
            </div>
            <div class="cmt-list">
                <div class="xinxin"><img src="../img/pinglunicon.png"></div>
                <div class="quanbupinglun {{$value->post_id}}">
                    @foreach($reply[$value->post_id]  as $v)
                        <div>
                            <div class="avtkuang">
                                <img class="po-avt data-avt zanavt pinglunavt" src="{{$user[$v->reply_user_id]['headimgurl']}}">
                            </div>
                            <div user_id="{{$v->reply_user_id}}" post_id="{{$value->post_id}}" class="pingluncontent"><span>{{$user[$v->reply_user_id]['nick_name']}}</span>
                                @if($v->reply_friend_id != 0)回复
                                <span>{{$user[$v->reply_friend_id]['nick_name']}}</span> @endif
                                <div>{!! $v->reply_text !!}</div>
                            </div>
                        </div>
                    @endforeach
                    {{--<div>--}}
                    {{--<div class="avtkuang">--}}
                    {{--<img class="po-avt data-avt zanavt pinglunavt"--}}
                    {{--src="http://www.bananatrip.com/img/hotel8.jpeg">--}}
                    {{--</div>--}}
                    {{--<div class="pingluncontent"><span>李晨</span>回复<span>范冰冰 ：</span><span class="shijian">2017/7/12  15:51</span>--}}
                    {{--<div>小肥羊~初七情人节见！定格我们的爱情吧❤</div>--}}
                    {{--</div>--}}
                    {{--</div>--}}
                    {{--<div>--}}
                    {{--<div class="avtkuang">--}}
                    {{--<img class="po-avt data-avt zanavt pinglunavt"--}}
                    {{--src="http://www.bananatrip.com/img/hotel8.jpeg">--}}
                    {{--</div>--}}
                    {{--<div class="pingluncontent"><span>王思聪：</span><span class="shijian">2017/7/13 13:21</span>--}}
                    {{--<div>我女朋友多，团购才能搞定啊！</div>--}}
                    {{--</div>--}}
                    {{--</div>--}}
                </div>
            </div>
        </div>
    </li>
@endforeach