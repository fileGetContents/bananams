<div class=" no" style="display: block;">
    <div id="order_banner1" class="order_banner light-bg">
        @foreach($travel as $v)
            <div class="order_tit">
                <span>订单号：{{$v->order_num}}</span>
                @if($v->order_tag  ==0)
                    <span>去支付</span>
                @elseif($v->order_tag ==10)
                    <span>已完成</span>
                @endif
            </div>
            <div class="ordercontent">
                <div class="imgbanner"><img src="{{$v->travel_host_image}}"></div>
                <div class="inform"><h2>{{$v->travel_name}}</h2>
                    <p>出行日期:{{$v->info_time}} </p>
                    <p>出行人数:成人 {{ $v->order_adult }} 人|儿童{{$v->order_child}}人</p>
                </div>
            </div>
            <div class="order_foot"><span>付款金额：￥{{$v->order_price}}</span><span><a href="pay.html">
                        <button class="samllbtn">评价</button>
                    </a></span></div>
        @endforeach
        @foreach($hotel as $value)
            <div class="order_tit">
                <span>订单号：{{$value->order_num}}</span>
                @if($value->order_tag ==0)
                    <span>待付款</span>
                @elseif($value->order_tag ==10)
                    <span>支付成功</span>
                @elseif($value->order_tag ==20)
                    <span>商家已接单</span>
                @elseif($value->order_tag ==30)
                    <span>商家拒绝接单（退款中）</span>
                @elseif($value->order_tag ==40)
                    <span>退款成功</span>
                @endif
            </div>
            <div class="ordercontent">
                <div class="imgbanner"><img src="{{$value->hotel_image}}"></div>
                <div class="inform"><h2>{{$value->hotel_name}}</h2>
                    <p>入住:{{date('Y-m-d',$value->order_time_start)}}离店:{{date('Y-m-d',$value->order_time_live)}}</p>
                    <p>{{$value->room_info}}</p>
                </div>
            </div>
            <div class="order_foot"><span>付款金额：￥{{$value->order_price}}</span><span>
                @if($value->order_tag ==0)
                        <a href="pay.html">
                            <button class="samllbtn">立即支付</button>
                        </a></span>
                @endif
            </div>
        @endforeach

        @foreach($good as $value)
            <div class="order_tit">
                <span>订单号：{{$value->order_pay_time}}</span>
                @if($value->order_tag ==0)
                    <span>等待付款</span>
                @elseif($value->order_tag ==10)
                    <span>已支付</span>
                @elseif($value->order_tag ==20)
                    <span>已发货</span>
                @endif
            </div>
            <div class="ordercontent">
                <div class="imgbanner"><img src="{{$value->good_image}}"></div>
                <div class="inform">{{$value->good_name}} {{$value->order_good_num}}件</div>
            </div>
            <div class="order_foot">
                <span>付款金额：￥{{$value->order_pay_money}}</span><span>
                   @if($value->order_tag ==0)
                        <a href="pay.html">
                            <button class="samllbtn">立即支付</button>
                        </a>
                    @endif
                </span>
            </div>
        @endforeach
    </div>
</div>
<!--旅游订单-->
<div id="travel" class="no">
    <div id="order_banner2" class="order_banner light-bg">
        <div id="order_banner3" class="order_banner light-bg">
            @foreach($travel as $v)
                <div class="order_tit">
                    <span>订单号：{{$v->order_num}}</span>
                    @if($v->order_tag  ==0)
                        <span>去支付</span>
                    @elseif($v->order_tag ==10)
                        <span>已完成</span>
                    @endif
                </div>
                <div class="ordercontent">
                    <div class="imgbanner"><img src="{{$v->travel_host_image}}"></div>
                    <div class="inform"><h2>{{$v->travel_name}}</h2>
                        <p>出行日期:{{$v->info_time}} </p>
                        <p>出行人数:成人 {{ $v->order_adult }} 人|儿童{{$v->order_child}}人</p>
                    </div>
                </div>
                <div class="order_foot"><span>付款金额：￥{{$v->order_price}}</span><span><a href="pay.html">
                            <button class="samllbtn">评价</button>
                        </a></span></div>
            @endforeach
        </div>
    </div>
</div>
<!--酒店订单-->
<div id="hotel" class="no">

    <div class="order_banner light-bg">
        @foreach($hotel as $value)
            <div class="order_tit">
                <span>订单号：{{$value->order_num}}</span>
                @if($value->order_tag ==0)
                    <span>待付款</span>
                @elseif($value->order_tag ==10)
                    <span>支付成功</span>
                @elseif($value->order_tag ==20)
                    <span>商家已接单</span>
                @elseif($value->order_tag ==30)
                    <span>商家拒绝接单（退款中）</span>
                @elseif($value->order_tag ==40)
                    <span>退款成功</span>
                @endif
            </div>
            <div class="ordercontent">
                <div class="imgbanner"><img src="{{$value->hotel_image}}"></div>
                <div class="inform"><h2>{{$value->hotel_name}}</h2>
                    <p>入住:{{date('Y-m-d',$value->order_time_start)}}离店:{{date('Y-m-d',$value->order_time_live)}}</p>
                    <p>{{$value->room_info}}</p>
                </div>
            </div>
            <div class="order_foot"><span>付款金额：￥{{$value->order_price}}</span><span>
                @if($value->order_tag ==0)
                        <a href="pay.html">
                            <button class="samllbtn">立即支付</button>
                        </a></span>
                @endif
            </div>
        @endforeach
    </div>

    {{--<div class="order_banner light-bg">--}}
    {{--<div class="order_tit">--}}
    {{--<span>订单号：28290473920820</span>--}}
    {{--<span>待付款</span>--}}
    {{--</div>--}}
    {{--<div class="ordercontent">--}}
    {{--<div class="imgbanner"><img src="../img/1.jpg"></div>--}}
    {{--<div class="inform"><h2>中工大酒店|豪华双人房</h2>--}}
    {{--<p>入住:11-24(今天)离店:11-25(明天)1晚</p>--}}
    {{--<p>双床|不含早|有wifi</p>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--<div class="order_foot"><span>付款金额：￥54.00</span><span><a href="pay.html">--}}
    {{--<button class="samllbtn">评价</button>--}}
    {{--</a></span></div>--}}
    {{--</div>--}}
</div>
<!--商品订单订单-->
<div id="good" class="has-header no">
    @foreach($good as $value)
        <div class="order_tit">
            <span>订单号：{{$value->order_pay_time}}</span>
            @if($value->order_tag ==0)
                <span>等待付款</span>
            @elseif($value->order_tag ==10)
                <span>已支付</span>
            @elseif($value->order_tag ==20)
                <span>已发货</span>
            @endif
        </div>
        <div class="ordercontent">
            <div class="imgbanner"><img src="{{$value->good_image}}"></div>
            <div class="inform">{{$value->good_name}} {{$value->order_good_num}}件</div>
        </div>
        <div class="order_foot">
            <span>付款金额：￥{{$value->order_pay_money}}</span><span>
                   @if($value->order_tag ==0)
                    <a href="pay.html">
                        <button class="samllbtn">立即支付</button>
                    </a>
                @endif
                </span>
        </div>
    @endforeach
</div>