(function (app) {
    app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    	$stateProvider
    	
     .state("frame",{
                url:"/frame",
                abstract:true,
                templateUrl:"templates/frame.html",
                 controller: 'tabsCtrl'
            })
            .state("frame.start",{
                url:"/start",
                views:{
                    "start":{
                        templateUrl:"templates/start.html",
                        controller: 'startCtrl'
                    }
                }
            })
            
            
            
                   .state("frame.small",{
                url:"/start/small",
                views:{
                    "start":{
                        templateUrl:"templates/small.html",
                        controller: 'smallCtrl'
                    }
                }
            })
            
                 .state("frame.outdoor",{
                url:"/start/outdoor",
                views:{
                    "start":{
                        templateUrl:"templates/outdoor.html",
                        controller: 'outdoorCtrl'
                    }
                }
            })
             .state("frame.activedetails",{
                url:"/start/activedetails",
                views:{
                    "start":{
                        templateUrl:"templates/activedetails.html",
                         controller: 'activedetailsCtrl'
                    }    
                 }      
            })
            
             .state("frame.live",{
                url:"/start/live",
                views:{
                    "start":{
                        templateUrl:"templates/live.html",
                        controller: 'liveCtrl'
                   
                        
                    }
                }
            })
             
              .state("frame.abroad",{
                url:"/start/abroad",
                views:{
                    "start":{
                        templateUrl:"templates/abroad.html",
                       controller: 'abroadCtrl'
                   
                   
                        
                    }
                }
            })
             
             .state("frame.pannel",{
                url:"/start/activedetails/pannel",
                views:{
                    "start":{
                        templateUrl:"templates/pannel.html",
                         controller: 'pannelCtrl'
                   
                        
                    }
                }
            })
              
                   .state("frame.hotel",{
                url:"/start/live/hotel",
                views:{
                    "start":{
                        templateUrl:"templates/hotel.html",   
                      controller: 'hotelCtrl'
                   
                        
                    }
                }
            }) 
            
                        .state("frame.hotelorder",{
                url:"/start/live/hotel/hotelorder",
                views:{
                    "start":{
                        templateUrl:"templates/hotelorder.html",
                          controller: 'hotelorderCtrl'
                   
                   
                        
                    }
                }
            }) 
             .state("frame.addplace2",{
                url:"/start/addplace",
                views:{
                    "start":{
                        templateUrl:"templates/addplace2.html",
                         controller: 'addplaceCtrl'
                   
                        
                    }
                }
            })
             
                   .state("frame.ordermess",{
                url:"/start/activedetails/ordermess",
                views:{
                    "start":{
                        templateUrl:"templates/ordermess.html",
                        
                    controller: 'ordermessCtrl'
                        
                    }
                }
            })
             
              
            .state("frame.friend",{
                url:"/friend",
                views:{
                    "friend":{
                        templateUrl:"templates/friend.html",
                     controller: 'friendCtrl'
                    }
                }
            })
            .state("frame.home",{
                url:"/home",
                views:{
                    "home":{
                        templateUrl:"templates/home.html",
                        controller: 'homeCtrl'
                    }
                }
            })
            .state("frame.person",{
                url:"/person",
                views:{
                    "person":{
                        templateUrl:"templates/person.html",
                         controller: 'personCtrl'
                    }
                }
            })
             .state("frame.order",{
                url:"/person/order",
                views:{
                    "person":{
                        templateUrl:"templates/order.html",
                       controller: 'orderCtrl'
                    }
                }
            })
                 .state("frame.moneybag",{
                url:"/person/moneybag",
                views:{
                    "person":{
                        templateUrl:"templates/moneybag.html",
                         controller: 'moneybagCtrl'
                    }
                }
            }) 
            .state("frame.message",{
                url:"/person/message",
                views:{
                    "person":{
                        templateUrl:"templates/message.html",
                         controller: 'messageCtrl'
                     
                        
                    }
                }
            })     
           
          
              .state("frame.made",{
                url:"/person/made",
                views:{
                    "person":{
                        templateUrl:"templates/made.html",
                           controller: 'madeCtrl'
                    }
                }
            })
            .state("frame.friend-list",{
                url:"/friend/friend-list",
                views:{
                    "friend":{
                        templateUrl:"templates/friend-list.html",
                           controller: 'friend-listCtrl'
                    }
                }
            })
                .state("frame.post",{
                url:"/friend/post",
                views:{
                    "friend":{
                        templateUrl:"templates/post.html",
                        controller: 'postCtrl'
                    }
                }
            })
                     .state("frame.other",{
                url:"/friend/other",
                views:{
                    "friend":{
                        templateUrl:"templates/other.html",
                         controller: 'otherCtrl'
                    }
                }
            })
            
            
         
               .state("frame.otherjoin",{
                url:"/friend/other/otherjoin",
                views:{
                    "friend":{
                        templateUrl:"templates/otherjoin.html",
                        controller: 'otherjoinCtrl'
                    }
                }
            })
         .state("frame.talk",{
                url:"/friend/talk",
                views:{
                    "friend":{
                        templateUrl:"templates/talk.html",
                     controller: 'talkCtrl'
                    }
                }
            })
     
     .state("frame.otherpost",{
                url:"/friend/other/otherpost",
                views:{
                    "friend":{
                        templateUrl:"templates/otherpost.html",
                      controller: 'otherpostCtrl'
                    }
                }
            })
  .state("frame.sendpost",{
                url:"/friend/sendpost",
                views:{
                    "friend":{
                        templateUrl:"templates/sendpost.html",
                         controller: 'sendpostCtrl'
                    }
                }
            })


            .state("frame.home-class",{
                url:"/home/home-class",
                views:{
                    "home":{
                        templateUrl:"templates/home-class.html",
                        controller: 'home-classCtrl'
                    }
                }
            })
            .state("frame.home-special",{
                url:"/home/home-special",
                views:{
                    "home":{
                        templateUrl:"templates/home-special.html",
                         controller: 'home-specialCtrl'
                    }
                }
            })
            .state("frame.home-new",{
                url:"/home/home-new",
                views:{
                    "home":{
                        templateUrl:"templates/home-new.html",
                        controller: 'home-newCtrl'
                    }
                }
            })

  .state("frame.payorder",{
                url:"/home/payorder",
                views:{
                    "home":{
                        templateUrl:"templates/payorder.html",
                      controller: 'payorderCtrl'
                    }
                }
            })
  .state("frame.payorder2",{
                url:"/start/payorder",
                views:{
                    "start":{
                        templateUrl:"templates/payorder2.html",
                        controller: 'payorder2Ctrl'
                    }
                }
            })
  .state("frame.pay",{
                url:"/home/payorder/pay",
                views:{
                    "home":{
                        templateUrl:"templates/pay.html",
                         controller: 'payCtrl'
                    }
                }
            })

.state("frame.pay2",{
                url:"/start/payorder/pay2",
                views:{
                    "start":{
                        templateUrl:"templates/pay2.html",
                        controller: 'payCtrl'
                    }
                }
            })


 .state("frame.addplace",{
                url:"/home/payorder/addplace",
                views:{
                    "home":{
                        templateUrl:"templates/addplace.html",
                          controller: 'addplaceCtrl'
                    }
                }
            })

            .state("frame.all",{
                url:"/home/all",
                views:{
                    "home":{
                        templateUrl:"templates/all.html",
                        controller: 'allCtrl'
                    }
                }
            })

            .state("frame.details",{
                url:"/home/details",
                views:{
                    "home":{
                        templateUrl:"templates/details.html",
                        controller: 'detailsCtrl'

                    }
                }
            })




//登录界面 
.state('login', { 
url: '/login', 

templateUrl: "templates/login.html", 
controller: 'loginCtrl'

}) 
//注册 
.state('register', { 
url: '/register', 
templateUrl: "templates/register.html",
controller: 'registerCtrl'


});




        $urlRouterProvider.otherwise("/frame/start")
    }]);

})(angular.module('app'));