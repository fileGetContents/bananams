(function (app) {
    app.factory('userService', ['$http', 'config', "util", 'storage', function ($http, config, util, storage) {
        return {
            login: function (telephone, pass) {
                return $http({
                    url: config.server + 'user/login',
                    method: "post", 
                  
                    data: { telephone: telephone, pass: pass},
                    dataType:'json',
                    success:function(obj){
                    	console.log(obj)
                    	
                    }
                   
                })
            },
            getVerifyCode:function (mobile) {
                return $http({
                    url: config.server + 'api/auth/code',
                    method: "post",
                    data: { phone: mobile}
                })
            },

            isLogin: function () {
             return !util.empty(storage.get("token")) && storage.getObject("user");
            }
        };
    }]);
})(angular.module('app.services'));