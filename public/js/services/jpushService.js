(function (app) {
    //工具类服务
    app.factory("jpushService", ['$http', '$window', '$document', function ($http, $window, $document) {
        var jpushServiceFactory = {};
        //var jpushapi=$window.plugins.jPushPlugin;
        //启动极光推送
        var _init = function (config) {
            $window.plugins.jPushPlugin.init();
            // //设置tag和Alias触发事件处理
            // document.addEventListener('jpush.setTagsWithAlias',config.stac,false);
            //打开推送消息事件处理
            $window.plugins.jPushPlugin.openNotificationInAndroidCallback = config.oniac;
            //IOS打开通知栏消息
            // $window.plugins.jPushPlugin.receiveMessageIniOSCallback=config.notify;

            $window.plugins.jPushPlugin.setDebugMode(true);
            $window.plugins.jPushPlugin.setDebugModeFromIos();
            $window.plugins.jPushPlugin.setCrashLogON();
            $window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);

            //点击推送通知
            document.addEventListener("jpush.openNotification", config.notify, false);
            //前台收到推送
            document.addEventListener("jpush.receiveNotification", config.notify, false);
            //后台收到推送
            document.addEventListener("jpush.backgroundNotification", config.notify, false);

            // document.addEventListener("jpush.setTagsWithAlias", onTagsWithAlias, false);
            // document.addEventListener("deviceready", onDeviceReady, false);
            // document.addEventListener("jpush.openNotification", onOpenNotification, false);
            // document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
            document.addEventListener("jpush.receiveMessage", config.notify, false);
        }

        //获取状态
        var _isPushStopped = function (fun) {
            $window.plugins.jPushPlugin.isPushStopped(fun)
        }
        //停止极光推送
        var _stopPush = function () {
            $window.plugins.jPushPlugin.stopPush();
        }

        //重启极光推送
        var _resumePush = function () {
            $window.plugins.jPushPlugin.resumePush();
        }

        //设置标签和别名
        var _setTagsWithAlias = function (tags, alias) {
            $window.plugins.jPushPlugin.setTagsWithAlias(tags, alias);
        }

        //设置标签
        var _setTags = function (tags) {
            $window.plugins.jPushPlugin.setTags(tags);
        }

        //设置别名
        var _setAlias = function (alias) {
            $window.plugins.jPushPlugin.setAlias(alias);
        }

        jpushServiceFactory.init = _init;
        jpushServiceFactory.isPushStopped = _isPushStopped;
        jpushServiceFactory.stopPush = _stopPush;
        jpushServiceFactory.resumePush = _resumePush;

        jpushServiceFactory.setTagsWithAlias = _setTagsWithAlias;
        jpushServiceFactory.setTags = _setTags;
        jpushServiceFactory.setAlias = _setAlias;
        return jpushServiceFactory;
    }]);
})(angular.module('app.services'));




