function attention(){
	 atten=document.getElementById("atten");

	if(atten.value=="关注TA"){
		atten.value="已关注";
	}
	else if(atten.value=="已关注"){
		atten.value="关注TA";
	}
	
}