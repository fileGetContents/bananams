(function(app){
	app.controller('personCtrl',["$scope","personService","$state","$ionicActionSheet",
	function($scope,personService,$state,$ionicActionSheet){
		 $scope.show = function() {

                  var hideSheet = $ionicActionSheet.show({
                      buttons: [
                        { text: '国内热线：4001161023' },
//                      { text: '关闭' }
                      ],
                   
                      titleText: '香蕉旅行',
                      cancelText: '关闭',
                      buttonClicked: function(index) {
                      
                        return true;
                      }
                  });



              };  
		 
	}]);
	
	app.controller('orderCtrl',["$scope","personService","$state",
	function($scope,personService,$state){
		    $scope.init_order=function(){
                                
                                   orderchange();
                               
                            }
	}]);
	
	app.controller('moneybagCtrl',["$scope","personService","$state","$ionicPopup",
	function($scope,personService,$state, $ionicPopup){
		
		 // Triggered on a button click, or some other target
         $scope.showPopup = function() {
           $scope.data = {}

           // 自定义弹窗
           var myPopup = $ionicPopup.show({
             template: '<input type="number" ng-model="data.money">',
             title: '微信支付',
             subTitle: '请输入充值金额',
             scope: $scope,
             buttons: [
               { text: 'Cancel' },
               {
                 text: '<b>OK</b>',
                 type: 'button-energized',
                 onTap: function(e) {
                   if (!$scope.data.money) {
                    
                     e.preventDefault();
                   } else {
                     return $scope.data.money;
                   }
                 }
               },
             ]
           });
          };
		
	}]);
	
	
	app.controller('messageCtrl',["$scope","personService","$state","$ionicModal","$interval",
	function($scope,personService,$state,$ionicModal,$interval){
		  $ionicModal.fromTemplateUrl('templates/name.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	   $scope.canClick=false;
      $scope.description="获取验证码";
      var second=59;
     var timerHandler;
      $scope.getTestCode=function(){
      	timerHandler=$interval(function(){
             if(second<=0){
            $interval.cancel(timerHandler);
             second=59;
            $scope.description="获取验证码";
             $scope.canClick=false;
         }else{
            $scope.description=second+"s后重发";
             second--;
           $scope.canClick=true;
       }
             },1000)
     };
	  $scope.createContact = function(n) {        
	          newname();
	    $scope.modal.hide();
	  };
	  
	   $ionicModal.fromTemplateUrl('templates/phone.html', {
	    scope: $scope
	  }).then(function(modal2) {
	    $scope.modal2 = modal2;
	 
	  });
	  
	  $scope.createContact2 = function(p) {        
	    newphone();
	    $scope.modal2.hide();
	  };
 $ionicModal.fromTemplateUrl('templates/email.html', {
	    scope: $scope
	  }).then(function(modal3) {
	    $scope.modal3 = modal3;
	  });
	  
	  $scope.createContact3= function(e) {        
	     newemail();
	    $scope.modal3.hide();
	  };
	     
		
	}]);
	
	app.controller('madeCtrl',["$scope","personService","$state", 
	function($scope,personService,$state){
		  
                     
	}]);

	
		app.controller('allCtrl',["$scope","personService","$state",
	function($scope,personService,$state){
		

		
	}]);
	
		app.controller('detailsCtrl',["$scope","personService","$state","$ionicModal",
	function($scope,personService,$state,$ionicModal){
		
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