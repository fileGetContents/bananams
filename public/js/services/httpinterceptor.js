(function (app) {
    app.factory("authHttpInterceptor", ["$q", "$injector", "storage", function ($q, $injector,storage) {
        var $http = null, $state = null,msg=null;
        var getHttp = function () {
            if (!$http) {
                $http = $injector.get('$http');
            }
            return $http;
        };
        var getState = function () {
            if (!$state) {
                $state = $injector.get('$state');
            }
            return $state;
        }
        var getMsg = function () {
            if (!msg) {
                msg = $injector.get('msg');
            }
            return msg;
        }
        return {
            'request': function (config) {
                        return config;
                    },
            'requestError': function (rejection) {
                        return $q.reject(rejection);
                    },
            'response': function (response) {
                return response;
            },
            'responseError': function (rejection) {
                // console.log(JSON.stringify(rejection));
                if (rejection.status == 401) {
                    storage.remove('user');
                    storage.remove('token');
                    getHttp().defaults.headers.common["Authorization"] = undefined;
                    getState().go('login');
                    // alert("not login");
                    // return $q.reject(rejection);
                    return;
                }
                if (rejection.status==400) {
                    getMsg().error(rejection.data.message);
                }
                if (rejection.status==500) {
                    getMsg().error(rejection.data.message);
                }
                return $q.reject(rejection);
            }
        }
    }]);
})(angular.module('app.services'));