 // Disable console.log
 var console = {};
 console.log = function() {};
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
/**
 * Parses and displays the blog feed from the Xerox Service. Also controls the blog switching function
 **/
(function($) {
	if ($(".blog-side")[0]) {
		var $data,
			$selectedBlog,
			$selectedBlogTitle,
			$blogList = $('.blog-side .selection ul'),
			$lastVisible;

		function noResultsError() {
			var $errorTitle = $('.blog-side').attr('data-error-title'),
				$errorText = $('.blog-side').attr('data-error-text');
			$('.blog-side').html('<div class="feed-error row no-gutter"><div class="col-md-1 col-sm-1 col-xs-1"><div class="icon"></div></div><div class="col-md-11 col-sm-11 col-xs-11"><div class="error-title">' + $errorTitle + '</div><p>' + $errorText + '</p></div></div>');

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

		$blogsURL = 'http://www.xerox.com/perl-bin/social_aggregator_service.pl?' + sourceArr + 'aggregation_strategy=alternate_by_source&show_count=' + $blogCount;
		// begin ajax call for blogs	

		$.ajax({
			type: "GET",
			url: $blogsURL,
			dataType: "JSONP",
			statusCode: {
				0: function() {
					noResultsError();
				},
				404: function() {
					noResultsError();
				},

				500: function() {
					noResultsError();
				}
			},
			error: function() {
				noResultsError();
			},
			success: function(data) {
					$data = data;
					if ($data.length < 1) {
						noResultsError();
					} else {
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
					}
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
					} else {
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
				$post.dow = moment(obj.updated).format("DD");
				$post.yam = moment(obj.updated).format("MMM, YYYY");

				if (obj.image_link) {
					$post.image = '<img src="' + obj.image_link + '"  />';
				} else {
					var $fallbackImage = $('.blog-side').attr('data-fallback-image');
					$post.image = '<img src="' + $fallbackImage + '"  />';
				}

				if ($post.excerpt.length > 90) {
					$post.excerpt = $post.excerpt.substr(0, 90) + '...';
				}

				$post.date = '<div class="date"><span class="day">' + $post.dow + '</span><span class="yam">' + $post.yam + '</span></div>';

				return $post;
			}
			// blog selector
		$('.selection ul a:not(#all)').click(function(e) {

			e.preventDefault();
			$blogList.slideToggle("fast");

			var $this = $(this);
			$selectedBlog = $this.attr('id'),
				$selectedBlogTitle = $this.text();
			$('.selected-blog').removeClass();
			$this.addClass('selected-blog');
			$('.selected-clone span').text($selectedBlogTitle);
			selectedBlogLoop();

		});


		// all blog selector
		$('.selection ul a#all').click(function(e) {

			e.preventDefault();
			$blogList.slideToggle("fast");
			var $this = $(this),
				$selectedBlogTitle = $this.text();
			$('.selected-blog').removeClass();
			$this.addClass('selected-blog');
			$('.selected-clone span').text($selectedBlogTitle);
			allBlogLoop();

		});
		$('.selection a.selected-clone').click(function(e) {
			e.preventDefault();
			$blogList.slideToggle("fast");
		});


	}

		 // Sitecatalyst 
		 $('.blog-side').on('click', 'a.title', function () {

			var $this = $(this),
			$curBlog = $this.parent().parent().attr('data-blog'),
			$curArticle = $this.text();
			xrx_sitecatalyst_action('hmpg-social-' + $curBlog + '-' + $curArticle);

		});

		 $('.blog-side').on('click', 'a.blog-image', function () {

			var $this = $(this),
			$curBlog = $this.parent().parent().attr('data-blog'),
			$curArticle = $this.parent().parent().find('.feed-right .title').text();
			xrx_sitecatalyst_action('hmpg-social-' + $curBlog + '-' + $curArticle + '-image');

		});

		$('.blog-side').on('click', 'a.comments-link', function () {

			var $this = $(this),
			$curBlog = $this.parent().parent().parent().attr('data-blog'),
			$curArticle = $this.parent().parent().parent().find('.feed-right .title').text();
			xrx_sitecatalyst_action('hmpg-social-' + $curBlog + '-' + $curArticle + '-comments');

		});

})(jQuery);
/**
 * Parses and displays the Twitter and LinkedIn feeds from the Xerox Service.
 **/
(function($) {
	if ($(".social-side")[0]) {

		/**
		 * Gets the social handles from the DOM, calculates the count and creates the feed URL
		 **/
		var $feeds = $('.social-side').attr('data-handles'),
			$feedArray = $feeds.split(','),
			sourceArr = [];
		for (i = 0; i < $feedArray.length; i++) {
			var sourceURL = 'source=' + $feedArray[i] + '&';
			sourceArr.push(sourceURL);
		}
		sourceArr = sourceArr.join([separator = '']);

		$feedsURL = 'http://www.xerox.com/perl-bin/social_aggregator_service.pl?' + sourceArr + 'aggregation_strategy=alternate_by_medium&show_count=4';

		function noSocialError() {
			var $errorTitle = $('.social-side').attr('data-error-title'),
				$errorText = $('.social-side').attr('data-error-text');
			$('.social-side').html('<div class="feed-error row no-gutter"><div class="col-md-1 col-sm-1 col-xs-1"><div class="icon"></div></div><div class="col-md-11 col-sm-11 col-xs-11"><div class="error-title">' + $errorTitle + '</div><p>' + $errorText + '</p></div></div>');
		}

		// hashtag parser
		String.prototype.parseHashtag = function() {
			return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
				var tag = t.replace("#", "%23");
				return t.link("http://twitter.com/search?q=" + tag)
					.replace(/^<a/, '$& target="_blank"');
			});

		};

		// Begin AJAX call to get the social feed
		$.ajax({
			type: "GET",
			url: $feedsURL,
			dataType: "JSONP",
			statusCode: {
				0: function() {
					noSocialError();
				},
				404: function() {
					noSocialError();
				},

				500: function() {
					noSocialError();
				}
			},
			error: function() {
				noSocialError();
			},
			success: function(data) {
					if (data.length < 1) {
						noSocialError();
					} else {

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

							function twitterFormat() {
								moment.locale('en', {
									// Format the date for Twitter
									relativeTime: {
										future: "in %s",
										past: "%s ago",
										s: "s",
										m: "1m",
										mm: "%dm",
										h: "1h",
										hh: "%dh",
										d: "1d",
										dd: "%d d",
										M: "a month",
										MM: "%d months",
										y: "a year",
										yy: "%d years"
									}
								});
								var currentTime = moment().utc(),
									postTime = moment(obj.updated).utc();
								var timeDiff = currentTime.diff(postTime)
								if (timeDiff > 86400000) {
									return moment(postTime).format('D MMM')
								} else {
									return moment($feed.updatedUTC).fromNow(true);
								}
							}

							function linkedInFormat() {
								// format the date for linkedIn
								moment.locale('en', {
									relativeTime: {
										future: "in %s",
										past: "%s ago",
										s: "seconds",
										m: "a minute",
										mm: "%d minutes",
										h: "1 hour",
										hh: "%d hours",
										d: "a day",
										dd: "%d days",
										M: "a month",
										MM: "%d months",
										y: "a year",
										yy: "%d years"
									}
								});

								return moment($feed.updatedUTC).fromNow();


							}
							var $newTab;
							var $feed = {};

							$feed.title = obj.title;
							$feed.title_twitter = $feed.title.parseHashtag();
							$feed.link = obj.link;
							$feed.index = i.toString();
							$feed.image = obj.image_link;
							$feed.author = obj.author;
							$feed.account = obj.account;
							$feed.account_name = obj.account_name;
							$feed.account_link = obj.account_link;
							$feed.excerpt = obj.excerpt;
							$feed.URLexcerpt = encodeURIComponent($feed.excerpt);
							$feed.URLtitle = encodeURIComponent($feed.title);
							$feed.medium = obj.medium.toLowerCase();
							$feed.updatedUTC = moment(obj.updated).utc();
							$feed.TWtimeago = twitterFormat();
							$feed.LItimeago = linkedInFormat();
							$feed.tweetLink2 = 'https://twitter.com/XeroxHealthcare/status/' + obj.native_id;



							// begin medium-specific items
							if ($feed.medium === 'twitter') {

								if (isIE8()) {
									var $newTab = ' target="_blank" ';

								}
								$feed.reply = '<a class="reply" ' + $newTab + ' href="https://twitter.com/intent/tweet?in_reply_to=' + obj.native_id + '">Reply</a>',
									$feed.retweet = '<a class="retweet" ' + $newTab + ' href="https://twitter.com/intent/retweet?tweet_id=' + obj.native_id + '">Retweet</a>',
									$feed.favorite = '<a class="favorite" ' + $newTab + ' href="https://twitter.com/intent/favorite?tweet_id=' + obj.native_id + '">Favorite</a>',
									$feed.tweetLink = '<a target="_blank" href="https://twitter.com/XeroxHealthcare/status/' + obj.native_id + '">' + $feed.TWtimeago + '</a>';

								var template = $.templates("#tw-tmpl-js");

								var htmlOutput = template.render($feed);

								$("#tw-tmpl").append(htmlOutput);

								if (isIE8()) {
									$('.tweet-text a[href^="http://"]').attr('target', '_blank');
								}

							} else if ($feed.medium === 'linkedin' && !isLiFound) {

								$feed.LIshare = 'https://www.linkedin.com/shareArticle?mini=true&url=' + $feed.link + '&title=' + $feed.URLtitle + '&summary=' + $feed.URLexcerpt + '&source=';
								if ($feed.excerpt.length > 170) {
									$feed.excerpt = $feed.excerpt.substr(0, 170) + '...';
								}
								if ($feed.title.length > 85) {
									$feed.title = $feed.title.substr(0, 85) + '...';
								}


								// Appends the content 
								var template = $.templates("#li-tmpl-js");

								var htmlOutput = template.render($feed);

								$("#li-tmpl").append(htmlOutput);
								isLiFound = true;
								continue;

							} else {
								continue;
							}
							$('.social-side .linkedin , .social-side .twitter').show();

						} //end else greater than 0 
					} // end loop
				} // end success
		}); // end ajax
	} // end if
})(jQuery);
/**
 * This file initializes the YouTube iFrame API and controls the image poster interaction. We cannot wrap this in jQuery so we use pure JS to ensure it always works
 **/

// check if the player is present
if (document.getElementById("player")) {

  var videoPoster = document.getElementById('embed-container');

  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // This function creates an <iframe> (and YouTube player) after the API code downloads
  var player;

  function onYouTubeIframeAPIReady() {
    // vidID is the video ID specified in the attribute (data-videoID) of #embed-container
    var vidID = document.getElementById("embed-container").getAttribute("data-videoID");

    player = new YT.Player('player', {
      videoId: vidID,
      events: {
        'onStateChange': onPlayerStateChange,
        'onReady': onPlayerReady

      },
      playerVars: {
        enablejsapi: 1,
        rel: 0,
        wmode: "opaque",
        wmode: "transparent",
        modestbranding: 1,
        autohide: 1
      }
    });
  }

  function onPlayerReady(event) {
    document.getElementById('embed-container').className += " video-ready";

    // Controls the video poster play
    var videoPosterClick = function() {
      document.getElementById('embed-container').className += " play";
      if (!Environment.isMobile()) {
        event.target.playVideo();
      }
    }

    if (isIE8()) {
      videoPoster.attachEvent('onclick', videoPosterClick);

    } else {
      videoPoster.addEventListener('click', videoPosterClick, false);
    }
  }


  // If the video is done, the video poster is shown
  function onPlayerStateChange(event) {

    var done = false;
    if (event.data === 0) {

      document.getElementById("embed-container").className = document.getElementById("embed-container").className.replace(/(?:^|\s)play(?!\S)/g, '');
      done = true;

    }
  }

}