(function (app) {
    app.factory("msg", ["$ionicLoading", "$ionicPopup", "$timeout", function ($ionicLoading, $ionicPopup) {
        return {
            text: function (template, noBackdrop) {
                template = template || "";
                var n = {
                    template: template,
                    duration:1000
                };
                if (noBackdrop) n["noBackdrop"] = true;
                $ionicLoading.show(n);
            },
            success: function (template, noBackdrop) {
                template = template || "";
                var n = {
                    template: '<i class="icon ion-ios-checkmark-outline pop-msg"></i><br>' + template,
                    duration: 1000
                };
                if (noBackdrop) n["noBackdrop"] = true;
                $ionicLoading.show(n);
            },
            error: function (template, noBackdrop) {
                template = template || "";
                var n = {
                    template: '<i class="icon ion-ios-close-outline pop-msg"></i><br>' + template,
                    duration: 1000
                };
                if (noBackdrop) n["noBackdrop"] = true;
                $ionicLoading.show(n);
            },
            hide: function () {
                $ionicLoading.hide()
            },
            loading: function (template) {
                template = template || "正在加载数据...";
                $ionicLoading.show({
                    template: '<ion-spinner class="nerve-loading"></ion-spinner><br>' + template
                });
                //超时退出
                setTimeout(function() {
                    $ionicLoading.hide();
                }, 11000);
            },
            alert: function (title, template) {
                var o = {
                    okText: "确定"
                };
                if (title && template) {
                    o["title"] = title;
                    o["template"] = template
                } else {
                    o["title"] = title;
                    o["cssClass"] = "pop-alert calm"
                }
                $ionicPopup.alert(o)
            },
            confirm: function (title, template, okText) {
                var n = {
                    okText: okText || "确定",
                    cancelText: "取消"
                };
                if (title && template) {
                    n["title"] = title;
                    n["template"] = template
                } else {
                    n["title"] = title;
                    n["cssClass"] = "pop-alert"
                }
                return $ionicPopup.confirm(n)
            }
        }
    }]);
})(angular.module('app.services'));