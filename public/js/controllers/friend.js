(function(app){
	app.controller('friendCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		 $scope.init_111=function(){
                                setTimeout(function(){
                                    imgzzz();
                                },2000)
                            }
	}]);
	
	app.controller('friend-listCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		
	}]);
	
	app.controller('postCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		
	}]);
	
	
	app.controller('talkCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		    $scope.init_333=function(){
                                setTimeout(function(){
                                    talkzzz();
                                },2000)
                                
                            }
		
	}]);
	
	app.controller('otherCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		
                       
                     
	}]);
	
	
	app.controller('otherjoinCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		
	}]);
	
	
	app.controller('otherjoinCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		
	}]);
	
		app.controller('otherpostCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		    $scope.init_222=function(){
                                setTimeout(function(){
                                    imgzzz();
                                },2000)
                                
                            }
	}]);
	
	
	
		app.controller('sendpostCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		

		
	}]);
	
		app.controller('hotelorderCtrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		
	}]);
	

	app.controller('ordermessCtrl',["$scope","friendService","$state", "$ionicModal","$ionicPopup",
	function($scope,friendService,$state, $ionicModal,$ionicPopup){
		
		 paymoney2();

	  $ionicModal.fromTemplateUrl('templates/xuzhi.html', {
	    scope: $scope
	   
	  }).then(function(modal6) {
	  	
	    $scope.modal6 = modal6;
	  });
		
	}]);
	
	app.controller('payorder2Ctrl',["$scope","friendService","$state",
	function($scope,friendService,$state){
		 $scope.init_pay2=function(){
                                
                                    paymoney2();
                              
                            }
	}]);
})(angular.module('app.controllers'));