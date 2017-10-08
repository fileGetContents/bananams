(function (app) {
    app.controller('loginCtrl', ["$scope", "userService", "storage", "$state", "msg", "$http", "util","$timeout",
        function ($scope, userService, storage, $state, msg, $http, util, $timeout) {
        $scope.vm = {
            telephone:'',
	        pass:''
        };
        $scope.login = function () {
            msg.loading('登录中...');
            userService.login($scope.vm.telephone, $scope.vm.pass).then(function (result) {
                msg.hide();
                storage.setObject('user', result.data.data.user);
                storage.set('token', result.data.data.token);
                $http.defaults.headers.common["Authorization"] = 'Bearer ' + result.data.data.token;
                $state.go('app.start');
            }, function (error) {
                msg.hide();
            });
            
        }
        //获取验证码
   
   
    }]);
  
})(angular.module('app.controllers'));