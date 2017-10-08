function datechange (){
      var lis = document.getElementById("dateul").getElementsByTagName("li");
   
    for(var i=0; i<lis.length; i++){


        lis[i].index = i;


      lis[i].onclick = function(){


              for(var j=0; j<lis.length; j++){
                lis[j].className = "";
                   lis[j].style.border="1px solid #A0A0A0";

              }


              this.className ="hover";
              this.style.border="1px solid #FFFFFF"


         




      }
    }

};datechange ()

function navchange (){
      var lis = document.getElementById("ul2").getElementsByTagName("li");
   
    for(var i=0; i<lis.length; i++){


        lis[i].index = i;


      lis[i].onclick = function(){


              for(var j=0; j<lis.length; j++){
             
                   lis[j].style.border="0";
                  lis[j].style.color="#484848 ";
              }

              this.style.color="rgb(255, 175, 21)";
              
              this.style.borderBottom="1px solid rgb(255, 175, 21)";


         




      }
    }

};navchange()

  $(document).ready(function(){
//	$('#left-panel-link').panelslider();
	$('#right-panel-link').panelslider({side: 'right', clickClose: false, duration: 200 });
	$('#close-panel-bt').click(function() {
		$.panelslider.close();
	});
});

$('#wrap').scroll(function(){
	var s=$('#wrap').scrollTop();
	
	if(s>=600){
	
		$('#ul2').addClass("fix");
		$('.top').show();
		
	}
	else{
	
		$('#ul2').removeClass("fix");
			$('.top').hide();
	}
	
})
//function fixNav(){
// var ul2 = document.getElementById("ul2");
// 
//var wrap=document.getElementById('wrap'); 	
//alert(wrap.scrollTop);
// if(wrap.scrollTop>100){
//
// 	ul2.className="fix";
// }
// else{
// 	ul2.className=" defaultClass";
// }
//};fixNav()