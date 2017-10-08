(function(app){
	app.controller('homeCtrl',["$scope","homeService","$state",
	function($scope,homeService,$state){
		 
	}]);
	
	app.controller('home-classCtrl',["$scope","homeService","$state",
	function($scope,homeService,$state){
		
	}]);
	
	app.controller('home-specialCtrl',["$scope","homeService","$state",
	function($scope,homeService,$state){
		
	}]);
	
	
	app.controller('home-newCtrl',["$scope","homeService","$state",
	function($scope,homeService,$state){
		    
		
	}]);
	
	app.controller('payorderCtrl',["$scope","homeService","$state", "$ionicModal","$ionicPopup",
	function($scope,homeService,$state, $ionicModal,$ionicPopup){
		$scope.init_pay=function(){
                                
                                    paymoney();
                              
                           };
                           
       $ionicModal.fromTemplateUrl('templates/changeplace.html', {
	    scope: $scope
	  }).then(function(modal5) {
	    $scope.modal5 = modal5;
	  });
	  
	   $scope.createContact5 = function(c) {        
	   
	    $scope.modal5.hide();
	  };

	   $scope.showContact5 = function(s) {        
	   
	    $scope.modal5.show();
	  };
                       
                     
	}]);

	
		app.controller('allCtrl',["$scope","homeService","$state",
	function($scope,homeService,$state){
		

		
	}]);
	
		app.controller('detailsCtrl',["$scope","homeService","$state","$ionicModal",
	function($scope,homeService,$state,$ionicModal){
		
	  $ionicModal.fromTemplateUrl('templates/buy.html', {
	    scope: $scope
	  }).then(function(modal4) {
	    $scope.modal4 = modal4;
	    
	  });
	  
	   $scope.createContact4 = function(c) {        
	   
	    $scope.modal4.hide();
	  };

	   $scope.showContact4 = function(s) {        
	   
	    $scope.modal4.show(); 
	    choosezzz();
	  };
	}]);
	

	
})(angular.module('app.controllers'));