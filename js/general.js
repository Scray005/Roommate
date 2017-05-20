$( document ).ready(function(){
	
    $(".button-collapse").sideNav();
    $('.parallax').parallax();

});



$(()=>{

	$('.tooltipped').tooltip({delay: 50});
	$('.modal').modal();

	
	firebase.initializeApp(varConfig);
	


});	