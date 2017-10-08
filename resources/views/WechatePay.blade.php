<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width">
    <meta charset="UTF-8">
    <title>订单支付</title>
    <link href="{{asset('css/head.css')}}" rel="stylesheet">
    <link href="{{asset('css/pay.css')}}" rel="stylesheet">
    <script type="text/javascript">
        //调用微信JS api 支付
        function jsApiCall() {
            WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    <?php echo $jsApiParameters ?>,
                    function (res) {
                        WeixinJSBridge.log(res.err_msg);
                    }
            );
        }
        function callpay() {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                }
            } else {
                jsApiCall();
            }
        }
    </script>
    <script type="text/javascript">
        //获取共享地址
        function editAddress() {
            WeixinJSBridge.invoke(
                    'editAddress',
                    <?php echo $editAddress ?>,
                    function (res) {
                        var value1 = res.proviceFirstStageName;
                        var value2 = res.addressCitySecondStageName;
                        var value3 = res.addressCountiesThirdStageName;
                        var value4 = res.addressDetailInfo;
                        var tel = res.telNumber;
                    }
            );
        }
        window.onload = function () {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', editAddress, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', editAddress);
                    document.attachEvent('onWeixinJSBridgeReady', editAddress);
                }
            } else {
                editAddress();
            }
        };
    </script>
</head>
<body>

<ion-header-bar class="stable-bg bar bar-header" align-title="center">
    <button class="button " onclick="history.go(-1)">
        <i class="icon ion-android-arrow-back"></i>
				<span class="back-text">
				<img src="{{asset('/img/ion/return.png')}}">
				</span>
    </button>

    <div class="title title-center header-item" style="left: 15px; right: 15px;">订单支付</div>
</ion-header-bar>
<div class="content">
    <div class="moneybg">
        <img src="{{asset("img/paybag.png")}}">
        <p>付款金额</p>
        <p>￥{{$pay}}</p>
    </div>
    <button class="save light" onclick="callpay()">确认付款</button>
</div>
</body>
</html>
