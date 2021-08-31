var base_ur = "{{ site.url }}";

// APP STORE BUTTON FIXED
// $(window).scroll(function() {    
//     var scroll = $(window).scrollTop();
//     if (scroll >= $('#app-store-btn').offset().top) {
//         $(".app-download-btn ").addClass("show-btn");

//     } else {
//         $(".app-download-btn").removeClass("show-btn");
//     }
// });


// APP STORE BUTTON FIXED
// $(window).scroll(function() {    
//     var scroll = $(window).scrollTop();
//     if (scroll >= $('#re-block').offset().top) {
//        $(".app-store").removeClass("app-store-btn-fixed-top");
//         // $(".mockup-image ").addClass("add-p");
//     } else {
//         // $(".app-store").removeClass("app-store-btn-fixed-top");
//         // $(".mockup-image ").removeClass("add-p");
//     }
// });

$(window).scroll(function() { 
  if($(window).scrollTop() > 0){
      $(".page-header ").addClass("on-scroll-el");
      //$(".hero-tab ").addClass("on-scroll-fixed-tab");
  }
  else{
    $(".page-header ").removeClass("on-scroll-el");
    // $(".hero-tab").removeClass("on-scroll-fixed-tab");
  }  

  if($(window).scrollTop() >= ($('#app-store-btn').offset().top-20)){
    $(".app-download-btn ").addClass("show-btn");
  }
  else{
    $(".app-download-btn").removeClass("show-btn");
  }
});



$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


$(document).ready(function () {
	$(document).on('click','.nav-item',function(){
		var checkDevice = isMobileDevice();
		if(checkDevice==true){
			$("#check").prop("checked", false);
		}	
	});	
});


// HAMBURGER
$('.hamburger').click(function(){
    $(this).find('i').toggleClass('fa-bars fa-times-circle')
});

var width = $(window).width();
if (width <= 576) {
  $(".app-navbar").addClass("mobile-navbar");

} else {
    $(".app-navbar").removeClass("mobile-navbar");
}



// MOBILE NAVBAR CLOSE ICON
$('.mobile-navbar a').click(function(){
    $(this).find('i').toggleClass('fa-bars fa-times-circle')
});


// CATEGORY DROPDOWN
$('.category-dropdown-btn').click(function() {
    $("i", this).toggleClass("fa-chevron-down fa-chevron-up");

    var selText = $(this).text();
    console.log( selText);
    $(this).parents('.dropdown').find('.dropdown-toggle').val(selText);
});

