(function($) {
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
});

// Stops the carousel if using the right/left controls
$('.carousel-controls a').click(function() {

	var $clickedCarousel = $(this).parent().parent(),
	$clickedCarouselID = $clickedCarousel.attr('id');

	$('#' + $clickedCarouselID).attr('data-clicked', true);
	$clickedCarousel.carousel('pause');

});
$(".carousel-inner").swipe( {

		//Generic swipe handler for all directions
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			var $clickedCarousel = $(this).parent(),
			$clickedCarouselID = $clickedCarousel.attr('id');

			$clickedCarousel.carousel('next'); 

			$('#' + $clickedCarouselID).attr('data-clicked', true);
			$clickedCarousel.carousel('pause');
		},
		swipeRight: function() {
			var $clickedCarousel = $(this).parent(),
			$clickedCarouselID = $clickedCarousel.attr('id');

			$clickedCarousel.carousel('prev'); 

			$('#' + $clickedCarouselID).attr('data-clicked', true);
			$clickedCarousel.carousel('pause');

		},
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
})(jQuery);
(function($) {

// If using IE8, this adds a "last child" class to apply last-child css to the element

function last_child() {

    if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
        $('*:last-child').addClass('last-child');
    }

}

last_child();

})(jQuery);
(function($) {

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

})(jQuery);
(function($) {
$('[data-toggle="popover"]').popover({
	template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-title"></div><div class="popover-content"></div></div>'
});
$('[data-toggle="popover"]').click(function(e) { 
	e.preventDefault(); 
})
})(jQuery);