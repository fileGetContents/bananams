function add2(){
  

	
  document.getElementById("text_box2").value =  parseInt(document.getElementById("text_box2").value) +1;

};
 function minus2(){
    if(document.getElementById("text_box2").value > 1){
        document.getElementById("text_box2").value =parseInt( document.getElementById("text_box2").value) - 1;
    }
};
 
 function add3(){
  

	
  document.getElementById("text_box3").value =  parseInt(document.getElementById("text_box3").value) +1;

	};
 function minus3(){
    if(document.getElementById("text_box3").value > 0){
        document.getElementById("text_box3").value =parseInt( document.getElementById("text_box3").value) - 1;
    }
};
 function showbox(){
 	$('.scroll-content').show()
 };
 function closebox(){
 	$('.scroll-content').hide()
 };
   function paymoney(){
    
	  btn = document.getElementById('sendbtn2');   
           
                    btn.onclick = function (){   
                
                    alert('提交订单成功,点击立即支付');   
               

                    btn.innerHTML = '立即支付';   
                    
                    btn.onclick=function(){
                    	
                    	window.location.href='pay.html';
                    }
   
                }   
                
            } ;paymoney()  