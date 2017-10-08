(function (app) {
    //localStorage相关
    app.factory("storage", ["$window", function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, value) {
                return $window.localStorage[key] || value;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return $window.localStorage[key] && ($window.localStorage[key].indexOf("{") == 0 || $window.localStorage[key].indexOf("[") == 0) ? JSON.parse($window.localStorage[key]) : {};
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
            },
            clear: function () {
                $window.localStorage.clear()
            }
        };
    }]);
})(angular.module('app.services'));