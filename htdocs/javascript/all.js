(function($) {

function noResultsError() {
	$('.blog-side').html('<div class="noResultsError">Error retrieving feeds</div>');
}	
// begin ajax call for blogs	
	$.ajax({
	  type: "GET",
	  url: "http://www.xerox.com/perl-bin/social_aggregator_service.pl?source=blog:simplifywork&source=blog:hotspot&source=blog:governmentinsights&source=blog:hrinsights&aggregation_strategy=alternate_by_source&show_count=12&pretty=1",
	  dataType: "JSONP",
	  statusCode: {
	      0: function () {
	          noResultsError();
	      },
	      404: function () {
	      	noResultsError();
	      },

	      500: function () {
	          noResultsError();
	      }
	  },
	  error: function () {
	      noResultsError();
	  },
	  success: function (data) {

	  	// sort function (backwards)
	  	function sortByKey(array, key) {
	  	    return array.sort(function(b, a) {
	  	        var x = a[key];
	  	        var y = b[key];
	  	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	  	    });
	  	}

	  	//sort by date
	  	data = sortByKey(data, 'updated');

	  	//begin the loop
	  	for (i = 0; i < data.length; i++) {
	  	    obj = data[i];
	  	    obj.title = obj.title || '';
	  	    obj.link = obj.link || '';
	  	    obj.source_id = obj.source_id || '';
	  	    obj.medium = obj.medium || '';
	  	    obj.image_link = obj.image_link || '';

	  	   	var $title = obj.title,
	  	   	$link = obj.link,
	  	   	$index = i.toString(),
	  	   	$image,
	  	   	$blog,
	  	   	$dow = moment(obj.updated).format("D"),
	  	   	$yam = moment(obj.updated).format("MMM YY");
	  	   	if (obj.image_link) {
	  	   		$image = '<img src="' + obj.image_link + '" width="100" height="100" />';
	  	   	}
	  	   	else {
	  	   		$image = '';
	  	   	}

	  	   	switch (obj.source_id) {
	  	   		case 'blog:simplifywork':
	  	   		    $blog = 'simplifywork';
	  	   		    break;
	  	   		case 'blog:hrinsights':
	  	   		    $blog = 'hrinsights';
	  	   		    break;  
	  	   		case 'blog:governmentinsights':
	  	   		    $blog = 'governmentinsights';
	  	   		    break;     
	  	   		case 'blog:hotspot':
	  	   		    $blog = 'hotspot';
	  	   		    break;
	  	   		default:
	  	   		    $blog = '';                       
	  	   	}

	  	   if ($index > 2) {
	  	   	$('.blog-side ul').append('<li style="display:none;" data-index="' + $index + '" class="' + $blog + '"><a target="_blank" href="' + $link + '"><div class="feed-left">' + $image + '</div><div class="feed-right">' + obj.title + ' ' + $dow + ' ' + $yam + '</div></a></li>');
	  	   }
	  	   else {
	  	   	$('.blog-side ul').append('<li style="display:block;" data-index="' + $index + '" class="' + $blog + '"><a target="_blank" href="' + $link + '"><div class="feed-left">' + $image + '</div><div class="feed-right">' + obj.title + ' ' + $dow + ' ' + $yam + '</div></a></li>');
	  	   }
	  	   
	  	} // end loop
	  } // end success
	}); // end ajax

// blog selector
$('.selection a:not(#all)').click(function(e) {
	e.preventDefault();
	var $this = $(this),
	$thisID = $this.attr('id');
	$( ".blog-side ul li" ).each(function() {
	 	if ($(this).hasClass($thisID)) {
			$(this).show();
		}
	 	else {
			$(this).hide();
		}
	});
});

// all blog selector
$('.selection a#all').click(function(e) {
	e.preventDefault();
	$( ".blog-side ul li" ).each(function() {
	 	if ($(this).attr('data-index') <= 2) {
			$(this).show();
		}
	 	else {
			$(this).hide();
		}
	});
});


})(jQuery);
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
	// site catalyst recording
	if (typeof xrx_hbx_proxy !== 'undefined') {
		var $ordinal_target_slide_number = $(this).data('slide-to')*1 + 1;
		xrx_hbx_proxy.xrxLid("bs-carousel-"+$clickedCarouselID+"-to-slide"+$ordinal_target_slide_number);
	}
});

// Stops the carousel if using the right/left controls
$('.carousel-controls a').click(function() {

	var $clickedCarousel = $(this).parent().parent(),
	$clickedCarouselID = $clickedCarousel.attr('id');

	$('#' + $clickedCarouselID).attr('data-clicked', true);
	$clickedCarousel.carousel('pause');
	// site catalyst recording
	if (typeof xrx_hbx_proxy !== 'undefined') {
		xrx_hbx_proxy.xrxLid("bs-carousel-"+$clickedCarouselID+"-"+$(this).data('slide')+'-slide');
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
			// site catalyst recording
			if (typeof xrx_hbx_proxy !== 'undefined') {
				xrx_hbx_proxy.xrxLid("bs-carousel-"+$clickedCarouselID+'-next-slide');
			}
		},
		swipeRight: function() {
			var $clickedCarousel = $(this).parent(),
			$clickedCarouselID = $clickedCarousel.attr('id');

			$clickedCarousel.carousel('prev'); 

			$('#' + $clickedCarouselID).attr('data-clicked', true);
			$clickedCarousel.carousel('pause');
			// site catalyst recording
			if (typeof xrx_hbx_proxy !== 'undefined') {
				xrx_hbx_proxy.xrxLid("bs-carousel-"+$clickedCarouselID+'-prev-slide');
			}

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
});
})(jQuery);
(function($) {

function noSocialError() {
	$('#social-feed').html('<div class="noSocualError">Error retrieving feeds</div>');
}	

// hashtag parser
String.prototype.parseHashtag = function() {
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		var tag = t.replace("#","%23");
		return t.link("http://twitter.com/search?q="+tag)
		 .replace(/^<a/, '$& target="_blank"');
	});

};

// begin ajax call for social

	$.ajax({
	  type: "GET",
	  url: "http://www.xerox.com/perl-bin/social_aggregator_service.pl?source=tw:XeroxCorp&source=tw:ServicesatXerox&source=tw:XeroxHealthcare&source=tw:XeroxTransportation&tw:XeroxProduction&source=li:Xerox&aggregation_strategy=alternate_by_medium&show_count=4&pretty=1",
	  dataType: "JSONP",
	  statusCode: {
	      0: function () {
	         noSocialError();
	      },
	      404: function () {
	      	noSocialError();
	      },

	      500: function () {
	        noSocialError();
	      }
	  },
	  error: function () {
	    noSocialError();
	  },
	  success: function (data) {

	  	// sort function (backwards)
	  	function sortByKey(array, key) {
	  	    return array.sort(function(b, a) {
	  	        var x = a[key];
	  	        var y = b[key];
	  	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	  	    });
	  	}

	  	//sort by date
	  	data = sortByKey(data, 'updated');
	  	var isLiFound = false;

	  	//begin the loop
	  	for (i = 0; i < data.length; i++) {
	  	    obj = data[i];
	  	    obj.title = obj.title || '';
	  	    obj.excerpt = obj.excerpt || '';
	  	    obj.link = obj.link || '';
	  	    obj.id = obj.id || '';
	  	    obj.native_id = obj.native_id || '';
	  	    obj.account = obj.account || '';
	  	    obj.account_name = obj.account_name || '';
	  	    obj.account_link = obj.account_link || '';
	  	    obj.source_id = obj.source_id || '';
	  	    obj.medium = obj.medium || '';
	  	    obj.image_link = obj.image_link || '';

	  	   	var $title = obj.title,
	  	   	$link = obj.link,
	  	   	$index = i.toString(),
	  	   	$image,
	  	   	$account,
	  	   	$excerpt = obj.excerpt,
	  	   	$URLexcerpt = encodeURIComponent($excerpt),
	  	   	$URLtitle = encodeURIComponent($title),
	  	   	$medium = obj.medium.toLowerCase(),
	  	   	$TWtimeago = moment(obj.updated).twitter(),
	  	   	$LItimeago = moment(obj.updated).fromNow();
	  	   	moment.locale('en', {
	  	   	    relativeTime : {
	  	   	        future: "in %s",
	  	   	        past:   "%s ago",
	  	   	        s:  "seconds",
	  	   	        m:  "1 minute",
	  	   	        mm: "%d minutes",
	  	   	        h:  "1 hour",
	  	   	        hh: "%d hours",
	  	   	        d:  "1 day",
	  	   	        dd: "%d days",
	  	   	        M:  "1 month",
	  	   	        MM: "%d months",
	  	   	        y:  "a year",
	  	   	        yy: "%1 years"
	  	   	    }
	  	   	});

	  	   	// begin medium-specific items
	  	   	if ($medium === 'twitter') {

	  	   		$title = $title.parseHashtag();
	  	   		var $reply = '<a href="https://twitter.com/intent/tweet?in_reply_to=' + obj.native_id +'">Reply</a>',
	  	   		$retweet = '<a href="https://twitter.com/intent/retweet?tweet_id=' + obj.native_id +'">Retweet</a>',
	  	   		$favorite = '<a href="https://twitter.com/intent/favorite?tweet_id=' + obj.native_id +'">Favorite</a>';
	  	   		$('.social-side .twitter').append('<div data-index="' + $index + '"><p class="account"><a href="' + obj.account_link + '" target="_blank">' + obj.account_name + ' ' + obj.account + '</a> ' + $TWtimeago + '</p><p>' + $title + '</p><div class="twitter-actions">' + $reply + ' ' + $retweet + ' ' + $favorite + '</div></div>');
	  	   		 
	  	   	}
	  	   	else if ($medium === 'linkedin'  && !isLiFound) {
	  	   		var $LIshare = 'https://www.linkedin.com/shareArticle?mini=true&url=' + $link + '&title=' + $URLtitle + '&summary=' + $URLexcerpt + '&source=';

	  	   		if (obj.image_link) {
	  	   			$image = '<img src="' + obj.image_link + '" width="100" height="100" />';
	  	   		}
	  	   		else {
	  	   			$image = '';
	  	   		}


	  	   		$('.social-side .linkedin').append('<div data-index="' + $index + '">' + $image + '<div class="title">' + $title + '</div><div class="author">' + obj.account + '</div><p>' + $excerpt + '</p><p><a target="_blank" href="' + $LIshare + '">Share</a> ' + $LItimeago + '</p></div>');

	  	   		isLiFound = true;
	  	   	}
	  	   	else {
	  	   		continue;
	  	   	}


	  	   
	  	} // end loop
	  } // end success
	}); // end ajax



})(jQuery);
 // check for IE8 
 function isIE8() {
   if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
      return true;
    }
    else {
      return false;
    }
 }
 // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          videoId: 'zmr2I8caF0c',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          },
          playerVars: {
               wmode: "opaque",
               wmode: "transparent"
           }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
      //  event.target.playVideo();
      }
      // blog selector
      $('#videoPoster').click(function() {
        if (!isIE8()) {
          $('#player').show();
         }
        player.playVideo();
        $('#videoPoster').hide();

      });
      var done = false;

      function onPlayerStateChange(event) {
        if (event.data === 0) {
          if (!isIE8()) {
            $('#player').hide();
            }

          $('#videoPoster').show();
           done = true;
        }
      }

     
      function stopVideo() {
        player.stopVideo();
      }
      
