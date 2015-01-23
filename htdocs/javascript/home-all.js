(function($) {
var $data,
$selectedBlog,
$lastVisible;
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
	  	$data = data;
	  	// sort function (backwards)
	  	function sortByKey(array, key) {
	  	    return array.sort(function(b, a) {
	  	        var x = a[key];
	  	        var y = b[key];
	  	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	  	    });
	  	}

	  	//sort by date
	  	$data = sortByKey($data, 'updated');

	  	allBlogLoop();
	  } // end success
	}); // end ajax

function allBlogLoop() {
	$('.blog-side ul').html('');
	//begin the loop
	for (i = 0; i < $data.length; i++) {
	    obj = $data[i];
	    obj.title = obj.title || '';
	    obj.link = obj.link || '';
	    obj.source_id = obj.source_id || '';
	    obj.medium = obj.medium || '';
	    obj.image_link = obj.image_link || '';
	    obj.excerpt = obj.excerpt || '';
	    obj.comments_count = obj.comments_count || '0';

	   	var $title = obj.title,
	   	$link = obj.link,
	   	$index = i.toString(),
	   	$image,
	   	$excerpt = obj.excerpt,
	   	$comments_count = obj.comments_count,
	   	$blog,
	   	$dow = moment(obj.updated).format("D"),
	   	$yam = moment(obj.updated).format("MMM, YYYY");
	   	if (obj.image_link) {
	   		$image = '<img src="' + obj.image_link + '" />';
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
	   	var $date = '<div class="date"><span class="day">' + $dow + '</span><span class="yam">' + $yam + '</span></div>',
	   	$content = '<div class="feed-left col-md-6 col-sm-12 col-xs-12"><a class="blog-image" target="_blank" href="' + $link + '">' + $date + '' + $image + '</a></div><div class="feed-right col-md-6 col-sm-12 col-xs-12"><a class="blog-title" target="_blank" href="' + $link + '">' + obj.title + '</a><p>' + $comments_count + ' comments</p><p>' + $excerpt + '</p></div>';
	   if ($index <= 2) {
	   	$('.blog-side ul').append('<li data-index="' + $index + '" class="col-md-12 col-sm-6 col-md-12 ' + $blog + '">' + $content + '</li>');
	   }
	   else {
	   		continue;
	   }
	   
	} // end loop
} //end allBlogLoop

function selectedBlogLoop() {
	$('.blog-side ul').html('');

	//begin the loop
	for (i = 0; i < $data.length; i++) {
	    obj = $data[i];
	    obj.title = obj.title || '';
	    obj.link = obj.link || '';
	    obj.source_id = obj.source_id || '';
	    obj.medium = obj.medium || '';
	    obj.image_link = obj.image_link || '';
	    obj.excerpt = obj.excerpt || '';
	    obj.comments_count = obj.comments_count || '0';

	   	var $title = obj.title,
	   	$link = obj.link,
	   	$index = i.toString(),
	   	$image,
	   	$excerpt = obj.excerpt,
	   	$comments_count = obj.comments_count,
	   	$blog,
	   	$dow = moment(obj.updated).format("D"),
	   	$yam = moment(obj.updated).format("MMM, YYYY");
	   	if (obj.image_link) {
	   		$image = '<img src="' + obj.image_link + '"  />';
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
	   	var $date = '<div class="date"><span class="day">' + $dow + '</span><span class="yam">' + $yam + '</span></div>',
	   	$content = '<div class="feed-left col-md-6 col-sm-12 col-xs-12"><a class="blog-image" target="_blank" href="' + $link + '">' + $date + '' + $image + '</a></div><div class="feed-right col-md-6 col-sm-12 col-xs-12"><a class="blog-title" target="_blank" href="' + $link + '">' + obj.title + '</a><p>' + $comments_count + ' comments</p><p>' + $excerpt + '</p></div>';
	  if ($blog === $selectedBlog) {
	   	$('.blog-side ul').append('<li data-index="' + $index + '" class="col-md-12 col-sm-6 col-md-12 ' + $blog + '">' + $content + '</li>');
	   }
	   else {
	  		continue;
	   }
	   
	} // end loop
} //end selectedBlogLoop

// blog selector
$('.selection a:not(#all)').click(function(e) {

	e.preventDefault();
	var $this = $(this);
	$selectedBlog = $this.attr('id');
	$('.selected-blog').removeClass();
	$this.addClass('selected-blog');
	selectedBlogLoop();

});


// all blog selector
$('.selection a#all').click(function(e) {

	e.preventDefault();
	var $this = $(this);
	$('.selected-blog').removeClass();
	$this.addClass('selected-blog');
	allBlogLoop();

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
	  	   	$UTCtime = new Date(obj.updated).toISOString(),
	  	   	$URLexcerpt = encodeURIComponent($excerpt),
	  	   	$URLtitle = encodeURIComponent($title),
	  	   	$medium = obj.medium.toLowerCase(),
	  	   	$TWtimeago = moment($UTCtime).twitterShort(),
	  	   	$LItimeago = moment($UTCtime).fromNow();
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
      
