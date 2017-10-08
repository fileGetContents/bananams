function add(){
   var kuchun=document.getElementById("kuchun").innerHTML;
	if(document.getElementById("text_box1").value==kuchun){
		
		this.disabled="disabled";
	}
	else{
	
  document.getElementById("text_box1").value =  parseInt(document.getElementById("text_box1").value) +1;
}
	}
function minus(){
    if(document.getElementById("text_box1").value > 1){
        document.getElementById("text_box1").value =parseInt( document.getElementById("text_box1").value) - 1;
    }
}
function choosezzz() {	
var pitch=document.getElementsByClassName("pitch");
pitch[0].style.borderColor="red";
for(var i=0;i<pitch.length;i++){
pitch[i].onclick=function(){
	for(var j=0;j<pitch.length;j++){
		pitch[j].style.borderColor="";
	}
	this.style.borderColor="red";
}
	
}
};choosezzz() 
