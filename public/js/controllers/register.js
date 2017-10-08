(function (app) {
    app.controller('registerCtrl', ["$scope", "registerService", "storage", "$state", "msg", "$http", "util","$timeout",
        function ($scope, registerService, storage, $state, msg, $http, util, $timeout) {
        	$scope.vm={
	        telephone:'',
	        pass:'',
	        code:'',
	      waitSeconds:'获取验证码'
	
            };
$scope.getVerifyCode = function(){
	var data={
		 telephone:$scope.vm.telephone,
		  pass:$scope.vm.pass,
		  code:$scope.vm.code,
		  waitSeconds:$scope.vm.waitSeconds
	};
	if($scope.vm.waitSeconds!="获取验证码"){
		msg.text("请稍后再试",true);
		return;
	};
	$scope.vm.waitSeconds = "正在发送";
	 registerService.getVerifyCode($scope.vm.telephone).then(function(result){
		waite(60);
		
	},function(error){
		$scope.vm.waitSeconds = "获取验证码";
		wait(0);
		msg.error(error.data.message);
		
	});
	
	
	};
	
	       var wait = function (seconds) {
            if (seconds > 0) {
                $scope.vm.waitSeconds = "" + seconds + "秒";
            } else {
                $scope.vm.waitSeconds = "获取验证码";
            }
            $timeout(function () {
                if (seconds >= 1)
                    wait(seconds - 1);
            }, 1000);
        };



		
	}]);
    })(angular.module('app.controllers'));