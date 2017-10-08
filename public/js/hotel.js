$('#wrap').scroll(function(){
	var s=$('#wrap').scrollTop();

	if(s>=550){
		
	
		$('.defaultClass2').addClass("fix");
		
		
	}
	else{
	
		$('.defaultClass2').removeClass("fix");
		
	}
	
})
 function hotelbtn1(){ 
  	var mess1=document.getElementById("mess1");
  	var yinxiang=document.getElementById("yinxiang");
  	var mess2=document.getElementById("mess2");
  	var yuding=document.getElementById("yuding");
  	var fangxin=document.getElementById("fangxin");
  	yinxiang.onclick = function(){
  	yinxiang.style.borderBottom="1px solid #FFAF15";
  	fangxin.style.borderBottom="";
  	
  	yuding.style.display="block";
 
  	if(mess1.style.display="none"){
  		mess1.style.display="block";
  		mess2.style.display="none";
  		
  	}
  	}
 };hotelbtn1()
  
    function hotelbtn2(){ 
  	var mess1=document.getElementById("mess1");
  	var fangxin=document.getElementById("fangxin");
  	var mess2=document.getElementById("mess2");
  	var yuding=document.getElementById("yuding");
  	fangxin.onclick = function(){
  	fangxin.style.borderBottom="1px solid #FFAF15";
  	yuding.style.display="none";
    yinxiang.style.borderBottom="";
  	if(mess2.style.display="none"){
  		mess2.style.display="block";
  		mess1.style.display="none";
  		
  	}
  	}
  };hotelbtn2()
        function hotelbtn3(){ 
  	var mess1=document.getElementById("mess1");
  	var fangxin=document.getElementById("fangxin");
  	var mess2=document.getElementById("mess2");
  	var yuding=document.getElementById("yuding");
  	yuding.onclick = function(){
  	fangxin.style.borderBottom="1px solid #FFAF15";
  	yuding.style.display="none";
    yinxiang.style.borderBottom="";
  	if(mess2.style.display="none"){
  		mess2.style.display="block";
  		mess1.style.display="none";
  		
  	}
  	}
  };hotelbtn3()
  