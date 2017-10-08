(function (app) {
    app.factory('registerService', ['$http', 'config', "util", function ($http, config, util) {
        return{
          login: function (telephone, pass) {
                return $http({
                    url: config.server + 'api/auth/login',
                    method: "post",
                    data: { telephone: phone, pass: pass,code:code}
                })
            },
        }
    }]);
})(angular.module('app.services'));