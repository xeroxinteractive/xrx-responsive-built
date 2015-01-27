(function($) {
var $data,
$selectedBlog,
$selectedBlogTitle,
$blogList = $('.blog-side .selection ul'),
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
	$('.blog-side ul.blog-feed').html('');
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
	   	if ($excerpt.length > 100) {
	   		$excerpt = $excerpt.substr(0, 100) + '...';
	   	}
	   	var $date = '<div class="date"><span class="day">' + $dow + '</span><span class="yam">' + $yam + '</span></div>',
	   	$content = '<div class="feed-left col-md-6 col-sm-12 col-xs-12"><a class="blog-image" target="_blank" href="' + $link + '">' + $date + '' + $image + '</a></div><div class="feed-right col-md-6 col-sm-12 col-xs-12"><a class="title" target="_blank" href="' + $link + '">' + obj.title + '</a><p>' + $comments_count + ' comments</p><p>' + $excerpt + '</p></div>';
	   if ($index <= 2) {
	   	$('.blog-side ul.blog-feed').append('<li data-index="' + $index + '" class="col-md-12 col-sm-6 col-md-12 ' + $blog + '">' + $content + '</li>');
	   }
	   else {
	   		continue;
	   }
	   
	} // end loop
} //end allBlogLoop

function selectedBlogLoop() {
	$('.blog-side ul.blog-feed').html('');

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
	   	if ($excerpt.length > 100) {
	   		$excerpt = $excerpt.substr(0, 100) + '...';
	   	}
	   	var $date = '<div class="date"><span class="day">' + $dow + '</span><span class="yam">' + $yam + '</span></div>',
	   	$content = '<div class="feed-left col-md-6 col-sm-12 col-xs-12"><a class="blog-image" target="_blank" href="' + $link + '">' + $date + '' + $image + '</a></div><div class="feed-right col-md-6 col-sm-12 col-xs-12"><a class="title" target="_blank" href="' + $link + '">' + obj.title + '</a><p>' + $comments_count + ' comments</p><p>' + $excerpt + '</p></div>';
	  if ($blog === $selectedBlog) {
	   	$('.blog-side ul.blog-feed').append('<li data-index="' + $index + '" class="col-md-12 col-sm-6 col-md-12 ' + $blog + '">' + $content + '</li>');
	   }
	   else {
	  		continue;
	   }
	   
	} // end loop
} //end selectedBlogLoop

// blog selector
$('.selection ul a:not(#all)').click(function(e) {

	e.preventDefault();
	$blogList.slideToggle( "fast" );

	var $this = $(this);
	$selectedBlog = $this.attr('id'),
	$selectedBlogTitle = $this.text();
	$('.selected-blog').removeClass();
	$this.addClass('selected-blog');
	$('.selected-clone').text($selectedBlogTitle);
	selectedBlogLoop();

});


// all blog selector
$('.selection ul a#all').click(function(e) {

	e.preventDefault();
	$blogList.slideToggle( "fast" );
	var $this = $(this),
	$selectedBlogTitle = $this.text();
	$('.selected-blog').removeClass();
	$this.addClass('selected-blog');
	$('.selected-clone').text($selectedBlogTitle);
	allBlogLoop();

});
$('.selection a.selected-clone').click(function(e) {
	e.preventDefault();
	$blogList.slideToggle( "fast" );
});


})(jQuery);
(function($) {
var $thedata = [
   {
      "source_id" : "tw:ServicesatXerox",
      "account" : "@ServicesatXerox",
      "account_name" : "Xerox Services",
      "media_id" : "tag:twitter.com,2008:ServicesatXerox/statuses/559736352221442049",
      "account_link" : "http://twitter.com/#!/ServicesatXerox",
      "native_id" : "559736352221442049",
      "medium" : "Twitter",
      "updated_epoch" : "1422286520",
      "title" : "How to Pass the SEC’s Cybersecurity Test in 9 Steps #Cybersecurity #eDiscoveryTalk blog, <a target=\"_blank\" href=\"http://xrx.sm/qkt\">xrx.sm/qkt</a>",
      "id" : "tw:ServicesatXerox-tag:twitter.com,2008:ServicesatXerox/statuses/559736352221442049",
      "updated" : "2015-01-26T07:35:20-08:00"
   },
   {
      "link" : "http://xerox.bz/1BrBGt4",
      "excerpt" : "In a Jan. 13 presentation to the federal Health IT Policy Committee, Annie Fine, M.D., a medical epidemiologist in the New York City Department of Health and Mental Hygiene, described both the sophisticated software used to track disease outbreaks such as Ebola, as well as how better integration with clinicians' electronic health records (EHRs) would improve her department's capabilities.",
      "source_id" : "li:Xerox",
      "account" : "Xerox",
      "media_id" : "linkedin:s5965493223588712448",
      "account_link" : "http://www.linkedin.com/company/xerox?trk=hb_tab_compy_id_1373",
      "native_id" : "s5965493223588712448",
      "medium" : "LinkedIn",
      "updated_epoch" : "1422284452",
      "updated" : "2015-01-26T07:00:52-08:00",
      "id" : "li:Xerox-linkedin:s5965493223588712448",
      "title" : "NYC Talks Data Needs for Disease Outbreak Management",
      "image_link" : "https://hbr.org/resources/images/article_assets/2015/01/JAN15_23_CA33252.jpg"
   },
   {
      "source_id" : "tw:XeroxHealthcare",
      "account" : "@XeroxHealthcare",
      "account_name" : "Xerox Healthcare",
      "media_id" : "tag:twitter.com,2008:XeroxHealthcare/statuses/559730001445388290",
      "account_link" : "http://twitter.com/#!/XeroxHealthcare",
      "native_id" : "559730001445388290",
      "medium" : "Twitter",
      "updated_epoch" : "1422285006",
      "title" : "Patients increasingly open to video doctor visits: <a target=\"_blank\" href=\"http://xerox.bz/1GZf3lE\">xerox.bz/1GZf3lE</a> #Telehealth via <a target=\"_blank\" href=\"http://twitter.com/#!/FierceHealthIT\">@FierceHealthIT</a>",
      "id" : "tw:XeroxHealthcare-tag:twitter.com,2008:XeroxHealthcare/statuses/559730001445388290",
      "updated" : "2015-01-26T07:10:06-08:00"
   },
   {
      "link" : "http://xerox.bz/15BWiDH",
      "excerpt" : "The fast-changing customer care market will continue to shift the goal posts in 2015. The way that customer support is requested, expected and required to be delivered will grow in variety and importance over the coming year. Here are my predictions of how and where brands will interact with their customers over the coming 12 months.",
      "source_id" : "li:Xerox",
      "account" : "Xerox",
      "media_id" : "linkedin:s5965448088570126336",
      "account_link" : "http://www.linkedin.com/company/xerox?trk=hb_tab_compy_id_1373",
      "native_id" : "s5965448088570126336",
      "medium" : "LinkedIn",
      "updated_epoch" : "1422273678",
      "updated" : "2015-01-26T04:01:18-08:00",
      "id" : "li:Xerox-linkedin:s5965448088570126336",
      "title" : "The Shifting Support Channels of 2015",
      "image_link" : "http://i.huffpost.com/gen/1464944/thumbs/o-US_UK_CA-facebook.jpg"
   }
];
function noSocialError() {
	$('#social-feed').html('<div class="noSocualError">Error retrieving feeds</div>');
	console.log('error');
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
	  	   	$dateNew = new Date(obj.updated),
	  	   	$UTCtime = $dateNew.toUTCString(),
	  	   	$URLexcerpt = encodeURIComponent($excerpt),
	  	   	$URLtitle = encodeURIComponent($title),
	  	   	$medium = obj.medium.toLowerCase(),
	  	   	$TWtimeago = moment(obj.updated).fromNow(),
	  	   	$LItimeago = moment(obj.updated).fromNow();


	  	   	// begin medium-specific items
	  	   	if ($medium === 'twitter') {

	  	   		$title = $title.parseHashtag();
	  	   		var $reply = '<a class="reply" href="https://twitter.com/intent/tweet?in_reply_to=' + obj.native_id +'">Reply</a>',
	  	   		$retweet = '<a class="retweet" href="https://twitter.com/intent/retweet?tweet_id=' + obj.native_id +'">Retweet</a>',
	  	   		$favorite = '<a class="favorite" href="https://twitter.com/intent/favorite?tweet_id=' + obj.native_id +'">Favorite</a>',
	  	   		$tweetLink = '<a target="_blank" href="https://twitter.com/XeroxHealthcare/status/' + obj.native_id +'">' + $TWtimeago + '</a>';
	  	   		$('.social-side .twitter').append('<div data-index="' + $index + '"><p class="account"><a href="' + obj.account_link + '" target="_blank">' + obj.account_name + ' ' + obj.account + '</a> ' + $tweetLink + '</p><p>' + $title + '</p><div class="twitter-actions">' + $reply + ' ' + $retweet + ' ' + $favorite + '</div></div>');
	  	   		 
	  	   	}
	  	   	else if ($medium === 'linkedin'  && !isLiFound) {
	  	   		var $LIshare = 'https://www.linkedin.com/shareArticle?mini=true&url=' + $link + '&title=' + $URLtitle + '&summary=' + $URLexcerpt + '&source=';

	  	   		if (obj.image_link) {
	  	   			$image = '<img src="' + obj.image_link + '" />';
	  	   		}
	  	   		else {
	  	   			$image = '';
	  	   		}
	  	   		if ($excerpt.length > 200) {
	  	   			$excerpt = $excerpt.substr(0, 200) + '...';
	  	   		}	

	  	   		$('.social-side .linkedin').append('<a class="linkedin-text" href="' + $link + '" target="_blank"><div class="row no-gutter"><div class="feed-left col-md-4 col-sm-6 col-xs-12">' + $image + '</div><div class="feed-right col-md-8 col-sm-6 col-xs-12"><div><span class="title">' + $title + '</span><span class="author">by ' + obj.account + '</span></div></div><div class="feed-p col-md-12 col-sm-6 col-xs-12"><p>' + $excerpt + '</p></div></div></a><p><a target="_blank" href="' + $LIshare + '">Share</a> ' + $LItimeago + '</p>');

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
 function isMobile() {
  if ($('html').hasClass('mobile')) {
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
      if (!isMobile()){
      $('#videoPoster').click(function() {
        if (!isIE8()) {
          $('#player').show();
         }
        player.playVideo();
        $('#videoPoster').hide();

      });
    }

      function onPlayerStateChange(event) {
        if (!isMobile()){

        var done = false;
        if (event.data === 0) {
          if (!isIE8()) {
            $('#player').hide();
            }

          $('#videoPoster').show();
           done = true;
        }
      }
      else {
        
      }
    }

     
      function stopVideo() {
        player.stopVideo();
      }
      
