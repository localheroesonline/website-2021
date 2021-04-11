var base_ur = "http://127.0.0.1:4000/";

// APP STORE BUTTON FIXED
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= $('#app-store-btn').offset().top) {
        $(".app-download-btn ").addClass("show-btn");

    } else {
        $(".app-download-btn").removeClass("show-btn");
    }
});


// REMOVE FIXED BUTTON ONCE REACH SCROLL TO BOTTOM
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= $('#re-block').offset().top) {
       $(".app-store").removeClass("app-store-btn-fixed-top");
        
    } else {
      
    }
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
  slidesToShow: 3, // Shows a three slides at a time
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

// REDIRECT VISITOR TO APP STORE / PLAY STORE DEPENDING ON OS
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

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
}

function DetectAndServe(campaign) {
  let os = getMobileOperatingSystem();
  if (os == "Android") {
      mixpanel.track("Goto App Marketplace", {
          "Marketplace": "Android",
          "Campaign": campaign,
      });
      window.location.href = "https://play.google.com/store/apps/details?id=com.localheroes.consumer";
  } else if (os == "iOS") {
      mixpanel.track("Goto App Marketplace", {
        "Marketplace": "iOS",
        "Campaign": campaign,
      });
      window.location.href = "https://apps.apple.com/us/app/lh-consumer/id1470938037";
  } else if (os == "Windows Phone") {
      mixpanel.track("Goto Local Heroes Home", {
          "Campaign": campaign,
      });
      window.location.href = "/";
  } else {
      mixpanel.track("Goto Local Heroes Home", {
        "Campaign": campaign,
      });
      window.location.href = "/";
  }
}

function SignupLead() {
  // TODO - Implement signup via MailChimp or signup via new API endpoint (which will write it to a new table in our DB)
}