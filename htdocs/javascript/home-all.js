 // check for IE8
 function isIE8() {
   if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
      return true;
    }
    else {
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


/**
* Parses and displays the blog feed from the Xerox Service. Also controls the blog switching function
**/

(function($) {
var $data,
$selectedBlog,
$selectedBlogTitle,
$blogList = $('.blog-side .selection ul'),
$lastVisible;
function noResultsError() {
	$('.blog-side').html('<div class="noResultsError">Error retrieving feeds</div>');	/** MAKE SURE YOU SPEAK WITH CREATIVE OR COPY THAT THIS IS THE CORRECT VERBAGE.  THIS SHOULD ALSO BE AN ATTRIBUTE IN THE HTML FOR DIFFERENT LANGUAGES.  HOW DID YOU TEST THIS TO MAKE SURE IT DISPLAYER? **/
}	

/**
* Gets the blog handles from the DOM, calculates the count and creates the feed URL
**/
var $blogs = $('.blog-side').attr('data-handles'),
$blogArray = $blogs.split(','),
sourceArr = [],
$blogCount = $blogArray.length * 3;

for (i = 0; i < $blogArray.length; i++) {
	var sourceURL = 'source=' + $blogArray[i] + '&';
	sourceArr.push(sourceURL);
}
sourceArr = sourceArr.join([separator = '']); 

$blogsURL = 'http://www.xerox.com/perl-bin/social_aggregator_service.pl?' + sourceArr + 'aggregation_strategy=alternate_by_source&show_count=' + $blogCount + '&pretty=1';
console.log($blogsURL);
// begin ajax call for blogs	
	$.ajax({
	  type: "GET",
	  url: $blogsURL,
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
	  	/**
	  	* CHECK FOR A KNOWN ATTRIBUTE TO MAKE SURE THIS WAS A SUCCESS.  SOMETIME YOU CAN MAKE AN AJAX CALL AN YOU RECEIVE A JSON BACK BUT IT WILL BE AN 
	  	* ERROR INSTEAD.  BY CHECKING FOR A KNOWN ATTRIBUTE YOU WILL KNOW IF IT IS GOOD OR NOT.  IF BAD DISPLAY ERROR.
	  	**/
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

	// will always first display 3
	for (i = 0; i < 3; i++) {
		var $post = blogBuilder($data[i]);
			var template = $.templates("#blog-tmpl-js");

		 	var htmlOutput = template.render($post);

		 	$("#blog-tmpl").append(htmlOutput);
	   
	} // end loop
} //end allBlogLoop

function selectedBlogLoop() {
	$('.blog-side ul.blog-feed').html('');

	//begin the loop
	for (i = 0; i < $data.length; i++) {
		var $post = blogBuilder($data[i]);

	  if ($post.blog === $selectedBlog) {
	   		var template = $.templates("#blog-tmpl-js");

	    	var htmlOutput = template.render($post);

	    	$("#blog-tmpl").append(htmlOutput);
	   }
	   else {
	  		continue;
	   }
	   
	} // end loop
} //end selectedBlogLoop

function blogBuilder(obj) {
	 obj.title = obj.title || '';
	 obj.link = obj.link || '';
	 obj.source_id = obj.source_id || '';
	 obj.medium = obj.medium || '';
	 obj.image_link = obj.image_link || '';
	 obj.excerpt = obj.excerpt || '';
	 obj.comments_count = obj.comments_count || '0';
	 obj.comments_link = obj.comments_link || '';

	 var $post = {};
	 $post.title = obj.title;
	 $post.link = obj.link;
	 $post.index = i.toString();
	 $post.image;
	 $post.excerpt = obj.excerpt;
	 $post.comments_count = obj.comments_count;
	 $post.comments_link = obj.comments_link;
	 $post.blog = obj.source_id.substr(5); // takes out the "blog:" part of the source id
	 $post.dow = moment(obj.updated).format("D");
	 $post.yam = moment(obj.updated).format("MMM, YYYY");

	 if (obj.image_link) {
	 	$post.image = '<img src="' + obj.image_link + '"  />';
	 }
	 else {
	 	$post.image = '';
	 }

	if ($post.excerpt.length > 100) {
			$post.excerpt = $post.excerpt.substr(0, 100) + '...';
		}

		$post.date = '<div class="date"><span class="day">' + $post.dow + '</span><span class="yam">' + $post.yam + '</span></div>';
		//$post.content = '<div class="feed-left col-md-6 col-sm-12 col-xs-12"><a class="blog-image" target="_blank" href="' + $post.link + '">' + $post.date + ' ' + $post.image + '</a></div><div class="feed-right col-md-6 col-sm-12 col-xs-12"><a class="title" target="_blank" href="' + $post.link + '">' + $post.title + '</a><p>' + $post.comments_count + ' comments</p><p>' + $post.excerpt + '</p></div>';

		return $post;
}
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
/**
* Parses and displays the Twitter and LinkedIn feeds from the Xerox Service.
**/


(function($) {
var $feeds = $('.social-side').attr('data-handles'),
$feedArray = $feeds.split(','),
sourceArr = [];
for (i = 0; i < $feedArray.length; i++) {
	var sourceURL = 'source=' + $feedArray[i] + '&';
	sourceArr.push(sourceURL);
}
sourceArr = sourceArr.join([separator = '']); 

$feedsURL = 'http://www.xerox.com/perl-bin/social_aggregator_service.pl?' + sourceArr + 'aggregation_strategy=alternate_by_medium&show_count=4&pretty=1';
console.log($feedsURL);
function noSocialError() {
	$('.social-side').html('<div class="noSocialError">Error retrieving feeds</div>');			/** MAKE SURE YOU SPEAK WITH CREATIVE OR COPY THAT THIS IS THE CORRECT VERBAGE.  THIS SHOULD ALSO BE AN ATTRIBUTE IN THE HTML FOR DIFFERENT LANGUAGES.  HOW DID YOU TEST THIS TO MAKE SURE IT DISPLAYER? **/
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
	/**
	* MOVE ALL THE SOCIAL PARAMS TO ATTRIBUTES ON THE DOM FOR THAT COMPONENTS.  THIS IS SOURCE AND COUNT.  THIS CAN CHANGE PER LANGUAGE. GET RID OF THE PRETTY VAR.
	**/

	$.ajax({
	  type: "GET",
	  url: $feedsURL,
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
	  	    obj.author = obj.author || '';


	  	    var $feed = {};

	  	   	$feed.title = obj.title;
	  	   	$feed.title_twitter = $feed.title.parseHashtag();
	  	   	$feed.link = obj.link;
	  	   	$feed.index = i.toString();
	  	   	$feed.image = obj.image_link;
	  	   	$feed.author = obj.author;
	  	   	$feed.account = obj.account;
	  	   	$feed.account_name = obj.account_name;
	  	   	$feed.account_link =  obj.account_link;
	  	   	$feed.excerpt = obj.excerpt;
	  	   	$feed.dateNew = new Date(obj.updated);
	  	   	$feed.UTCtime = $feed.dateNew.toUTCString();
	  	   	$feed.URLexcerpt = encodeURIComponent($feed.excerpt);
	  	   	$feed.URLtitle = encodeURIComponent($feed.title);
	  	   	$feed.medium = obj.medium.toLowerCase();
	  	   	$feed.TWtimeago = moment(obj.updated).fromNow();
	  	   	$feed.LItimeago = moment(obj.updated).fromNow();


	  	   	// begin medium-specific items
	  	   	if ($feed.medium === 'twitter') {

	  	  		$feed.reply = '<a class="reply" href="https://twitter.com/intent/tweet?in_reply_to=' + obj.native_id +'">Reply</a>',
	  	   		$feed.retweet = '<a class="retweet" href="https://twitter.com/intent/retweet?tweet_id=' + obj.native_id +'">Retweet</a>',
	  	   		$feed.favorite = '<a class="favorite" href="https://twitter.com/intent/favorite?tweet_id=' + obj.native_id +'">Favorite</a>',
	  	   		$feed.tweetLink = '<a target="_blank" href="https://twitter.com/XeroxHealthcare/status/' + obj.native_id +'">' + $feed.TWtimeago + '</a>';

	  	   		 var template = $.templates("#tw-tmpl-js");

	  	   		 var htmlOutput = template.render($feed);

	  	   		 $("#tw-tmpl").append(htmlOutput);
	  	   	}
	  	   	else if ($feed.medium === 'linkedin'  && !isLiFound) {
	  	   		$feed.LIshare = 'https://www.linkedin.com/shareArticle?mini=true&url=' + $feed.link + '&title=' + $feed.URLtitle + '&summary=' + $feed.URLexcerpt + '&source=';

	  	   		/*if (obj.image_link) {
	  	   			//$feed.image = '<img src="' + obj.image_link + '" />';
	  	   		}
	  	   		else {
	  	   			$feed.image = '';
	  	   		}*/
	  	   		if ($feed.excerpt.length > 200) {
	  	   			$feed.excerpt = $feed.excerpt.substr(0, 200) + '...';
	  	   		}	


	  	   	// Appends the content 
	  	  	var template = $.templates("#li-tmpl-js");

	  	   	var htmlOutput = template.render($feed);

	  	   	$("#li-tmpl").append(htmlOutput);

	  	   		isLiFound = true;
	  	   		continue;

	  	   	}
	  	   	else {
	  	   		continue;
	  	   	}


	  	   
	  	} // end loop
	  } // end success
	}); // end ajax


})(jQuery);
/**
* This file initializes the YouTube iFrame API and controls the image poster interaction.
**/

// We cannot wrap this in jQuery so we use pure JS to ensure it always works
var videoPoster = document.getElementById('videoPoster');

// This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player) after the API code downloads
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        videoId: 'zmr2I8caF0c',         /*THIS SHOULD BE AN ATTRIBUTE IN YOUR HTML*/
        events: {
          'onStateChange': onPlayerStateChange,
          'onReady': onPlayerReady
          
        },
        playerVars: {
             wmode: "opaque",
             wmode: "transparent"
         }
      });
    }
/*       if(player)
       {
           var fn = function(){ player.playVideo(); }
           setTimeout(fn, 1000);
       }
    }
*/
function onPlayerReady(event) {
  //event.target.playVideo();
  // Controls the video poster play
  if (!Environment.isMobile()){
    var videoPosterClick = function() {
            /*if (!isIE8()) {
              document.getElementById('player').style.display = 'block';
             }*/
            // $('.embed-container').toggleClass('play');
            document.getElementById('embed-container').className += " play";

            event.target.playVideo();
    }

    if (isIE8()) {
      videoPoster.attachEvent('onclick', videoPosterClick);
    }
    else {
      videoPoster.addEventListener('click', videoPosterClick, false);
    }
  }
}

// If the video is done, the video poster is shown
  function onPlayerStateChange(event) {
    if (!Environment.isMobile()){

    var done = false;
      if (event.data === 0) {
        /*if (!isIE8()) {
          document.getElementById('player').style.display = 'none';
          }*/
          //$('.embed-container').toggleClass('play');
          document.getElementById("embed-container").className = document.getElementById("embed-container").className.replace( /(?:^|\s)play(?!\S)/g , '' );
         done = true;
      }
    }
    else {
      
    }
  }

      
