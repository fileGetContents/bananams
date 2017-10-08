
     function paymoney(){
    
	  btn = document.getElementById('sendbtn');   
           
                    btn.onclick = function (){   
                
                    alert('提交订单成功,点击立即支付');   
               

                    btn.innerHTML = '立即支付';   
                    
                    btn.onclick=function(){
                    	
                    	window.location.href='pay.html';
                    }
   
                }   
                
            } ; paymoney()