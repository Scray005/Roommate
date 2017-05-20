$( document ).ready(function(){
	
    $(".button-collapse").sideNav();
    $('.parallax').parallax();
    $(".button-collapse").sideNav();

});



$(()=>{

	$('.tooltipped').tooltip({delay: 50});
	$('.modal').modal();

	
	firebase.initializeApp(config);
	


});	