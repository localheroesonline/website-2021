var base_ur = "http://127.0.0.1:4000/";

// ON SCROLL FIXED PRODUCT TAB ON MOBILE
$(window).scroll(function() { 

  if($(window).scrollTop() > 0){
      $(".page-header ").addClass("on-scroll-el");
  }
  else{
    $(".page-header ").removeClass("on-scroll-el");
  }  

  if($(window).scrollTop() >= ($('#app-store-btn').offset().top-20)){
    $(".app-download-btn ").addClass("show-btn");
  }
  else{
    $(".app-download-btn").removeClass("show-btn");
  }
});

// REDIRECT TO THE PRODUCT TAG
$('#bek-product').click(function(){
    $('#v-pills-products').toggleClass('active show');
    $('#v-pills-products-tab').toggleClass('active');
    $('#v-pills-about').toggleClass('active show');
    $('#v-pills-about-tab').toggleClass('active');
});


// PRODUCT DESCRIPTION SHOW MORE TEXT  
$(".more").toggle(function(){
  $(this).text("less..").siblings(".complete").show();    
}, function(){
  $(this).text("more..").siblings(".complete").hide();    
});

// TOOL TIP
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// CHECK MOBILE DEVICE
$(document).ready(function () {
	$(document).on('click','.nav-item',function(){
		var checkDevice = isMobileDevice();
		if(checkDevice==true){
			$("#check").prop("checked", false);
		}	
	});	
});

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// APP NAVBAR
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 400) {
        $(".app-navbar").addClass("light-navbar");
    }
    else{
      $(".app-navbar").removeClass("light-navbar");
    }
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

// TOGGLE ICON NAVBAR
$('.mobile-navbar a').click(function(){
    $(this).find('i').toggleClass('fa-bars fa-times-circle')
});


// SLICK SLIDER
$('.slick-carousel').slick({
  infinite: true,
  slidesToShow: 4, // Shows a three slides at a time
  slidesToScroll: 1, // When you click an arrow, it scrolls 1 slide at a time
  arrows: true, // Adds arrows to sides of slider
  dots: false, // Adds the dots on the bottom
  responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            adaptiveHeight: true,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
});

/* BEGIN Make the back link work in the product nav bar */

// Source: https://stackoverflow.com/questions/8814472/how-to-make-an-html-back-link
var element = document.getElementById('back-link');

// Provide a standard href to facilitate standard browser features such as 
//  - Hover to see link
//  - Right click and copy link
//  - Right click and open in new tab
element.setAttribute('href', document.referrer);

// We can't let the browser use the above href for navigation. If it does, 
// the browser will think that it is a regular link, and place the current 
// page on the browser history, so that if the user clicks "back" again,
// it'll actually return to this page. We need to perform a native back to
// integrate properly into the browser's history behavior
element.onclick = function() {
  history.back();
  return false;
}

/* END Make the back link work in the product nav bar */

// REDIRECT VISITOR TO APP STORE / PLAY STORE DEPENDING ON OS
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // window.alert(userAgent);
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    
    return "unknown";
};

function DetectAndServe(campaign) {
  event.preventDefault();
  let os = getMobileOperatingSystem();
  // window.alert(os);
  console.log('Campaign: ' + campaign);
  console.log('OS: ' + os);
  var url = "https://apps.apple.com/us/app/lh-consumer/id{{ site.ios_app_id }}";
  if (os == "Android") {
      mixpanel.track("Goto App Marketplace", {
        "Marketplace": "Android",
        "Campaign": campaign,
        "$os": os,  
      });
      console.log('Redirect to Android store');
      url = "https://play.google.com/store/apps/details?id={{ site.android_app_id }}";
  } else if (os == "iOS") {
      mixpanel.track("Goto App Marketplace", {
        "Marketplace": "iOS",
        "Campaign": campaign,
        "$os": os,
      });
      console.log('Redirect to iOS store');
      url = "https://apps.apple.com/us/app/lh-consumer/id{{ site.ios_app_id }}";
  // @todo: I disabled the redirect to the homepage as it is useless.
  // Redirect to apple store in case it is not android. Fix later.
  } else {
    mixpanel.track("Goto App Marketplace", {
      "Marketplace": "Unknown",
      "Campaign": campaign,
      "$os": os,
    });
    console.log('Fallback to iOS store');
    url = "https://apps.apple.com/us/app/lh-consumer/id{{ site.ios_app_id }}";
  }
  console.log(url);
  // Try redirect using jQuery
  $(location).attr('href',url);
  return;
};