// utility function for tagging actions for Xerox Site Catalyst instance

function xrx_sitecatalyst_action($action_label) {
	if (typeof xrx_hbx_proxy !== 'undefined') {
		xrx_hbx_proxy.xrxLid($action_label);
	}
}

$(document).ready(function(){
	var $label,
	$labelTitle;
	function scrollDepth() {
	}
	// if the adobe target code works we wait for that image to load
	if ($('.mboxDefault').is(':hidden')) {
		$( "#active-container-tmpl .hero-promo img" ).load(function() {
			// active container worked
			jQuery.scrollDepth({
			  userTiming: false,
			  pixelDepth: false,
			  percentage: false,
			  elements: ['.homepage-promos #active-container-tmpl .hero-promo .equal-col', '.homepage-promos #active-container-tmpl .promos .small-promo-a',  '.homepage-promos #active-container-tmpl .promos .small-promo-b',  '.homepage-promos #active-container-tmpl .promos .resource-desk', '.social-container .media-feature', '.social-container .blog-side' , '.social-container .social-side .twitter .tweet', '.social-container .social-side .linkedin .linkedin-text'],
			  eventHandler: function(data) {
			   
			    if (data.eventLabel === 'Baseline') {
			    	$labelTitle = 'Baseline'
			    }
			    else {
			    	$label = data.eventLabel,
			    	$labelTitle = $($label).attr('data-scroll-title');
			    }
			    xrx_sitecatalyst_action('hmpg-scroll-' + $labelTitle);
			  }
			});
		});
	}
	// if the target code fails we use the default image to detect load
	else {
		$( ".mboxDefault .hero-promo img" ).load(function() {
		    // active container failed
		    jQuery.scrollDepth({
		      userTiming: false,
		      pixelDepth: false,
		      percentage: false,
		      elements: ['.homepage-promos .mboxDefault .hero-promo .equal-col', '.homepage-promos .mboxDefault .promos .small-promo-a',  '.homepage-promos .mboxDefault .promos .small-promo-b',  '.homepage-promos .mboxDefault .promos .resource-desk', '.social-container .media-feature', '.social-container .blog-side' , '.social-container .social-side .twitter .tweet', '.social-container .social-side .linkedin .linkedin-text'],
		      eventHandler: function(data) {
		       
		        if (data.eventLabel === 'Baseline') {
		        	$labelTitle = 'Baseline'
		        }
		        else {
		        	$label = data.eventLabel,
		        	$labelTitle = $($label).attr('data-scroll-title');
		        }
			    xrx_sitecatalyst_action('hmpg-scroll-' + $labelTitle);
		      }
		    });
		});

	}


  });
 // Disable console.log
// var console = {};
// console.log = function() {};

var _gl = {};
_gl.TABLET_WIDTH = 768,
_gl.MOBILE_WIDTH = 320,
_gl.DESKTOP_OUTER_WIDTH = 970,
_gl.DESKTOP_INNER_WIDTH = 940;
 // check for IE8
 function isIE8() {
    if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
        return true;
    } else {
        return false;
    }
 }

 // check for mobile
 var Environment = {
    //mobile or desktop compatible event name, to be used with '.on' function
    TOUCH_DOWN_EVENT_NAME: 'mousedown touchstart',
    TOUCH_UP_EVENT_NAME: 'mouseup touchend',
    TOUCH_MOVE_EVENT_NAME: 'mousemove touchmove',
    TOUCH_DOUBLE_TAB_EVENT_NAME: 'dblclick dbltap',

    isAndroid: function() {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isIOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    isMobile: function() {
        return (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS() || Environment.isOpera() || Environment.isWindows());
    }
 };

//begin jQuery functions
 (function($) {


// responsive image loader

 $('.responsive-image').responsImg({
   breakpoints: {
     mobile: _gl.MOBILE_WIDTH,
     tablet: _gl.TABLET_WIDTH,
     desktop: _gl.DESKTOP_OUTER_WIDTH
   }
 });

   
function promogutter() {
    var $promos = $('.promos'); 
    if ($(window).width() < _gl.TABLET_WIDTH) {
       $promos.removeClass('no-gutter');
    }
    else {
        $promos.addClass('no-gutter');
    }
}
// active container and article page promo class switcher
if ($(".promos")[0]) {

    $(window).resize(function() {
         promogutter();
    });

    $(document).ready(function() {
        promogutter();
    });
 }



 })(jQuery);    
(function($) {
//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
function autoPlayYouTubeModal(){
	var $body = $('body');

  var trigger = $("body").find('.article-video-poster');
  trigger.click(function(e) {
    e.preventDefault();
    var theModal = $(this).data( "target" ),
    videoSRC = $(this).attr( "data-theVideo" ), 
    videoSRCauto = videoSRC+"?autoplay=1&modestbranding=1&theme=dark&showinfo=0&autohide=1&playsinline=0" ;
    $(theModal+' iframe').attr('src', videoSRCauto);
    //window.s_aE('load', s_YTi);
    $(theModal+' button.close').click(function (e) {
      
        $(theModal+' iframe').attr('src', videoSRC);
    });   
    $('#videoModal').on('hide.bs.modal', function (e) {
       $(theModal+' iframe').attr('src', videoSRC);
    });

  });
}
$(document).ready(function(){
  autoPlayYouTubeModal();
});
})(jQuery);
(function($) {

//check if carousel is present 	
if ($(".carousel")[0]) {

//initiate swipe on carousel

$('.carousel').on('slid.bs.carousel', function () {

	var $thisCarousel = $(this),
	$thisCarouselID = $thisCarousel.attr('id'),
	$thisCarouselInterval = $thisCarousel.attr('data-interval'),
	$lastItem = $thisCarousel.find('.carousel-inner .item:last');

		if ($thisCarousel.attr('data-clicked')) {
			// If the last item is active and either the indicators or the carousel controls were used to navigate to it, pause the carousel
			if ($lastItem.hasClass('active')) { 

				$thisCarousel.carousel('pause');

			}

		}
		else {
		 // If the carousel is automatically scrolling, this returns the carousel to the first item and pauses it
		  if ($lastItem.hasClass('active')) { 
		  	$thisCarousel.carousel('pause');

		  	setTimeout(function() {

		  	     $thisCarousel.carousel(0);
		  	     $thisCarousel.carousel('pause');

		  	}, $thisCarouselInterval);
		  }

		}
});
// Stops the carousel if using the carousel indicators
$('.carousel-indicators li').click(function() {

	var $clickedCarousel = $(this).parent().parent().parent(),
	$lastItem = $clickedCarousel.find('.carousel-inner .item:last'),
	$clickedCarouselID = $clickedCarousel.attr('id');

	$('#' + $clickedCarouselID).attr('data-clicked', true);
	$clickedCarousel.carousel('pause');
	// site catalyst recording
	var $ordinal_target_slide_number = $(this).data('slide-to')*1 + 1;
	xrx_sitecatalyst_action('button'+$ordinal_target_slide_number+'-bs-carousel-slide'+$ordinal_target_slide_number);
});

// Stops the carousel if using the right/left controls
$('.carousel-controls a').click(function() {

	var $clickedCarousel = $(this).parent().parent(),
	$clickedCarouselID = $clickedCarousel.attr('id');

	$('#' + $clickedCarouselID).attr('data-clicked', true);
	$clickedCarousel.carousel('pause');
	if ($(this).data('slide') == 'next') {
		xrx_sitecatalyst_action('rtarrow-bs-carousel');
	} else {
		xrx_sitecatalyst_action('ltarrow-bs-carousel');
	}

});
$(".carousel-inner").swipe({

		//Generic swipe handler for all directions
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			var $clickedCarousel = $(this).parent(),
			$clickedCarouselID = $clickedCarousel.attr('id');

			$clickedCarousel.carousel('next'); 

			$('#' + $clickedCarouselID).attr('data-clicked', true);
			$clickedCarousel.carousel('pause');
			xrx_sitecatalyst_action('rtarrow-bs-carousel');
		},
		swipeRight: function() {
			var $clickedCarousel = $(this).parent(),
			$clickedCarouselID = $clickedCarousel.attr('id');

			$clickedCarousel.carousel('prev'); 

			$('#' + $clickedCarouselID).attr('data-clicked', true);
			$clickedCarousel.carousel('pause');
			xrx_sitecatalyst_action('ltarrow-bs-carousel');

		}
	//Default is 75px, set to 0 for demo so any distance triggers swipe
	//threshold:0
});

/******* JS carousel height function ********/
/*
function setCarouselHeight(id) {
   var slideHeight = [];

   $(id+' .item').each(function() {
       // add all slide heights to an array
       slideHeight.push($(this).height());
       console.log(slideHeight);

   });

   // find the tallest item
   max = Math.max.apply(null, slideHeight);

   // set the slide's height
   $(id+' .text-block').each(function() {

       $(this).css('height',max+'px');

   });
}
setCarouselHeight('#main-slider');
*/
} //end if carousel
})(jQuery);

(function($) {
	
// check if navbar is present	
if ($(".navbar")[0]) {

//navbar variables
var $Window = $(window);

//change the + to - when opening on tablet/mobile
$( ".navbar-link, .navbar-toggle" ).click(function(e) {

	e.preventDefault();

	//navbar variable
	var $navbartoggle = $('.navbar-toggle');

	if ($('.navbar-collapse').hasClass('in')) {

		$navbartoggle.removeClass('toggle-open'); //plus sign

	}
	else {

		$navbartoggle.addClass('toggle-open'); //minus sign

	}
});


 //checks viewport and disables/enables secondary navigation 
function disableDD() {
	
	// dropdown variables
	var $dropdown = $('.dropdown-toggle'),
	$dropdownlink = $('.dropdown'),
	$windowwidth = $Window.width();
	
	if ($windowwidth > 970 && $dropdown.attr('data-toggle')) {

		$dropdown.addClass('disabled'); //disables dropdown

		if ($dropdown.attr('aria-expanded','true')) {

			$dropdown.attr('aria-expanded','false');
			$dropdownlink.removeClass('open'); // if the viewport is in mobile/tablet and the secondary nav is open, close it when moving to desktop 
		}
	}
	else {
		// enables dropdown on smaller viewports
		$dropdown.removeClass('disabled');
	}

}
$Window.resize(function () {

  	disableDD(); //checks viewport and disables/enables secondary navigation on resize

});

disableDD(); //checks viewport and disables/enables secondary navigation on page load 

} //end if navbar
})(jQuery);
(function($) {
$('[data-toggle="popover"]').popover({
	template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-title"></div><div class="popover-content"></div></div>'
});
$('[data-toggle="popover"]').click(function(e) { 
	e.preventDefault(); 
});
})(jQuery);
(function($) {
function verticalCenterSidebar() {
	if ($(window).width() > 970) {
		var $articleHeight = $('.article-main-row .main').height();
		if ($articleHeight < 1000) {
			$('.vertical-center').hide();
		}
		else {
			$('.vertical-center').show();
		}
	}	
}

$(window).resize(function() {
 verticalCenterSidebar();
});

$(document).ready(function() {
	if ($(".vertical-center")[0]) {
	$('.vertical-center').flexVerticalCenter({
		parentSelector: '.article-main-row',
		debounceTimeout: 0,
		verticalOffset: '-50px',
		OnAttribute: 'padding-top'
	});
	verticalCenterSidebar();
}
});

})(jQuery);