$(".like").click(function () {

    if (this.src.match("after")) {
        this.src = "../img/zan.png";

    }
    else {
        this.src = "../img/zanafter.png";


    }
});


$(".pinglun").click(function () {
    $(this).siblings('.pinglun-box').removeClass('no');

})


$(".cancel").click(function () {
    $(this).parent().parent().parent().parent().addClass('no');

})


var buy_button = document.getElementsByClassName("buy_button");
buy_button.click = function () {
    var buy = document.getElementsByClassName("buy");
    buy.className = "show";
    alert("zhu")
};


//$(document).ready(function(){
////	$('#left-panel-link').panelslider();
//	$('#right-panel-link').panelslider({side: 'right', clickClose: false, duration: 200 });
//	$('#close-panel-bt').click(function() {
//		$.panelslider.close();
//	});
//});

 