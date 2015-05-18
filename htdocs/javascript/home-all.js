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
				//obj.comments_count = obj.comments_count || '0';
				//obj.comments_link = obj.comments_link || '';

				var $post = {};
				$post.title = obj.title;
				$post.link = obj.link;
				$post.index = i.toString();
				$post.image;
				$post.excerpt = obj.excerpt;
				//$post.comments_count = obj.comments_count;
				//$post.comments_link = obj.comments_link;
				$post.blog = obj.source_id.substr(5); // takes out the "blog:" part of the source id
				$post.day = moment(obj.updated).format("DD");
				$post.month = moment(obj.updated).format("MM");
				$post.year = moment(obj.updated).format("YYYY");

				if (obj.image_link) {
					$post.image = '<img src="' + obj.image_link + '"  />';
				} else {
					var $fallbackImage = $('.blog-side').attr('data-fallback-image');
					$post.image = '<img src="' + $fallbackImage + '"  />';
				}

				if ($post.excerpt.length > 120) {
					$post.excerpt = $post.excerpt.substr(0, 120) + '...';
				}

				$post.date = $post.month + '.' + $post.day + '.' + $post.year;

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
			xrx_sitecatalyst_action('hmpg-social-image-' + $curBlog + '-' + $curArticle);

		});

		/*$('.blog-side').on('click', 'a.comments-link', function () {

			var $this = $(this),
			$curBlog = $this.parent().parent().parent().attr('data-blog'),
			$curArticle = $this.parent().parent().parent().find('.feed-right .title').text();
			xrx_sitecatalyst_action('hmpg-social-comments-' + $curBlog + '-' + $curArticle);

		});*/

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
		console.log($feedsURL);
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
								else {
									var $newTab = '';
								}
								$feed.reply = '<a class="reply" ' + $newTab + ' href="https://twitter.com/intent/tweet?in_reply_to=' + obj.native_id + '">Reply</a>',
									$feed.retweet = '<a class="retweet" ' + $newTab + ' href="https://twitter.com/intent/retweet?tweet_id=' + obj.native_id + '">Retweet</a>',
									$feed.favorite = '<a class="favorite" ' + $newTab + ' href="https://twitter.com/intent/favorite?tweet_id=' + obj.native_id + '">Favorite</a>',
									$feed.tweetLink = '<a target="_blank" href="https://twitter.com/XeroxHealthcare/status/' + obj.native_id + '">&middot; ' + $feed.TWtimeago + '</a>';

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


// SiteCatalyst 
$('.social-side .linkedin').on('click', '.li-info a', function () {
	xrx_sitecatalyst_action('hmpg-social-linkedin-share');
});
$('.social-side .linkedin').on('click', 'a.linkedin-text', function () {
	var $this = $(this),
	$curArticle = $this.find('.feed-right .title').text();
	xrx_sitecatalyst_action('hmpg-social-linkedin-' + $curArticle);
});
$('.social-side .twitter').on('click', 'a.reply', function () {
	xrx_sitecatalyst_action('hmpg-social-twitter-reply');
});
$('.social-side .twitter').on('click', 'a.retweet', function () {
	xrx_sitecatalyst_action('hmpg-social-twitter-retweet');
});
$('.social-side .twitter').on('click', 'a.favorite', function () {
	xrx_sitecatalyst_action('hmpg-social-twitter-favorite');
});
$('.social-side .twitter').on('click', ' .tweet-text a', function () {
	var $this = $(this),
	$curArticle = $this.parent().text();
	xrx_sitecatalyst_action('hmpg-social-twitter-' + $curArticle);
});
$('.social-side .twitter').on('click', ' .account a', function () {
	var $this = $(this),
	$curArticle = $this.parent().parent().find('.tweet-text').text();
	xrx_sitecatalyst_action('hmpg-social-twitter-' + $curArticle);
});

	} // end if
})(jQuery);
/**
 * This file initializes the YouTube iFrame API and controls the image poster interaction. We cannot wrap this in jQuery so we use pure JS to ensure it always works
 **/

// check if the player is present
/*if (document.getElementById("player")) {

  var videoPoster = document.getElementById('embed-container');

  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // This function creates an <iframe> (and YouTube player) after the API code downloads
  var player;

  //custome event listener - suppressing this since it fails in IE8
  //document.addEventListener("YouTubeStateChange", onPlayerStateChange, false);

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
    var done = false, data = -1;

    if(event.eventData){
      data = event.eventData.data;
    }else if(event.data === 0){
      data = event.data;
    }

    if (data === 0) {
      document.getElementById("embed-container").className = document.getElementById("embed-container").className.replace(/(?:^|\s)play(?!\S)/g, '');
      done = true;
    }
  }
  
  function xrx_youtube_callback(eventData) {
    var done = false, data = -1;
    if(eventData) {
      data = eventData.data;
    }
    if (data === 0) {
      document.getElementById("embed-container").className = document.getElementById("embed-container").className.replace(/(?:^|\s)play(?!\S)/g, '');
      done = true;
    }
  }

}*/

//resource desk
(function($) {
    if ($(".rd-selection")[0]) {
        if (Environment.isMobile()) {
            $('#rd').selectpicker({ mobile: true });
        } 
        else {
            $('#rd').selectpicker();
            $(".scrollClass ul.dropdown-menu").mCustomScrollbar({
                axis:"y", // horizontal scrollbar
                theme: "xerox-theme",
                scrollInertia: 500
            });
          //  $('.scrollClass .dropdown-menu').scrollyou({ show: true });
           // $('.dropdown-menu').dropdown('toggle').css('left', '-2000%');
//            $('.bootstrap-select div.dropdown-menu').addClass('loading');
        }

         var colorChange = Math.random() < 0.5 ? 'lavender-promo' : 'violet-promo';
                var $promoA = $('.AC-active .small-promo-a .promo-row-inner .equal-col.col-md-6.col-sm-7.col-xs-12');
                if (!$promoA.hasClass(colorChange)) {
                    $promoA.removeClass('violet-promo');
                    $promoA.addClass(colorChange);
                }
                if ($('.mboxDefault').hasClass('AC-active')) {
                        $('.AC-active').css('visibility', 'visible');
                }

        // general resource desk variables
        var $rdList = $('#rd'),
            $rdListBoot = $('.bootstrap-select .dropdown-menu ul.inner'),
            $curKeyword,
            $curAnalytics,
            $elicitTmpl = $('#elicit-tmpl'),
            $homepagePromos = $('.homepage-promos'),
            $elicitResults = $('.elicit-results'),
            $selectedRDTitle,
            $curText,

            // data-attributes on the .resource-desk div for the URL structure and error messaging

            $resourceDesk = $('.resource-desk'),
            $sn = $resourceDesk.attr('data-sn'),
            $su = $resourceDesk.attr('data-su'),
            $l = $resourceDesk.attr('data-l'),
            $f = $resourceDesk.attr('data-f'),
            $error = $resourceDesk.attr('data-error'),
            $resultsErrorText = $resourceDesk.attr('data-results-error');
            $(function() {
                     /*   $('.bootstrap-select div.dropdown-menu ul').jScrollPane({
                            autoReinitialise: true,
                            verticalDragMaxHeight: 20,
                            verticalGutter: 0,
                            autoReinitialiseDelay: 1000
                        });*/
                      //  $('.dropdown-menu').dropdown('toggle').css('left', '0');
                     //   $('.bootstrap-select div.dropdown-menu').removeClass('loading');

                    });
        /*  $(function() {   
            $rdListBoot.jScrollPane({
                autoReinitialise: true,
                verticalDragMaxHeight: 20,
                verticalGutter: 0,
                autoReinitialiseDelay: 1000
            });

            $rdListBoot.removeClass('loading');
            });*/
            $('.bootstrap-select').on('show.bs.dropdown', function () {
              $(this).parents().find('.rd-select-wrapper').addClass('select-open');  
            })
            $('.bootstrap-select').on('hide.bs.dropdown', function () {
              $(this).parents().find('.rd-select-wrapper').removeClass('select-open');  
            })

            $(function() {

              $rdList.on('change', function(){
                $curKeyword = $(this).find("option:selected").val();
                getResults();

             //   alert($curKeyword);
              });
              
            });
        //opening and closing the resource desk menu when selecting an item
      /*  $('.rd-selection ul').on('click', 'a', function (e) {
            e.preventDefault();
            $rdList.slideToggle("fast").parent().toggleClass('list-open');
            var $this = $(this);
            $selectedRDTitle = $this.text();
            $('.rd-selected').removeClass();
            $this.parent().addClass('rd-selected');
            $('.rd-selected-clone span').text($selectedRDTitle).removeClass('default');

                if ($('.rd-selected-clone span').hasClass('default')) {
                    e.preventDefault();
                }
                else {
                e.preventDefault();
                $curKeyword = $(this).parents().find('.rd-selection').find('.rd-selected a').attr('data-keyword'),
                $curText = $(this).parents().find('.rd-selection').find('.rd-selected a').text();
                if ($homepagePromos.hasClass('rd-open')) {
                    $elicitTmpl.children().fadeOut('fast');
                }
                xrx_sitecatalyst_action('hmpg-ac-desk-' + $curText);

                getResults();
            }

        });
*/        
        // opening and closing the resource desk menu
       /* $('.rd-selection').on('click', 'a.rd-selected-clone', function (e) {
            e.preventDefault();
            $rdList.slideToggle("1000").parent().toggleClass('list-open');
            checkScroll();
        });*/
        function checkScroll() {
            /*if (!$rdList.has('.jspVerticalBar').length) {
              $rdList, function(){
                     var api = $(this).data('jsp');
                     api.reinitialise();
             }
            }*/
        }

        //initialize jscrollpane (masks the scrollbar on the resource desk menu)
     /*   $(function() {
            $rdList.jScrollPane({
                autoReinitialise: true,
                verticalDragMaxHeight: 20,
                verticalGutter: 0,
                autoReinitialiseDelay: 1000
            });
            $rdList.removeClass('loading');
        });*/
        // starts the elicit result retrieval when clicking the "go" button
        /*$('.resource-desk').on('click', '#elicit-submit', function (e) {
            if ($('.rd-selected-clone span').hasClass('default')) {
                e.preventDefault();
            }
            else {
            e.preventDefault();
            $curKeyword = $(this).parent().find('.rd-selection').find('.rd-selected a').attr('data-keyword'),
            $curText = $(this).parent().find('.rd-selection').find('.rd-selected a').text();
            if ($homepagePromos.hasClass('rd-open')) {
                $elicitTmpl.children().fadeOut('fast');
            }
            xrx_sitecatalyst_action('hmpg-ac-desk-' + $curText);

            getResults();
        }
        });*/

        // closes elicit results 
        $('.close-elicit').click(function(e) {
            e.preventDefault();
            $elicitResults.slideUp('slow');
            $homepagePromos.removeClass('rd-open');
            $elicitTmpl.delay('300').html('');

        });

        function elicitError() {
            $elicitTmpl.css('min-height', '50px');
            $elicitResults.addClass('elicit-error');
            $elicitTmpl.html('<li><p>' + $error + '</p><p>' + $resultsErrorText + ' <a href="http://www.xerox.com/search?q=' + $curKeyword + '&js_avail=1&locale=' + $l + '" target="_blank">' + $curText + '</a></p></li>');
            if (!$homepagePromos.hasClass('rd-open')) {
                $homepagePromos.addClass('rd-open');
                $elicitResults.delay(50).slideDown();

            }
        }
        // function to get the elicit search results
        function getResults() {
                $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        timeout: 3000,
                        url: 'http://xerox.elicitapp.com/s.ashx?q=' + encodeURIComponent($curKeyword) + '&r=17&sn=' + $sn + '&su=' + $su + '&l=' + $l + '&p=0&f=' + $f + '&_=1421247885992'

                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        //console.log(jqXHR, textStatus, errorThrown);
                        elicitError();
                    })
                    .done(function(msg) {
                        // empty the results if there are any
                        $elicitTmpl.html('');
                        var el = '',
                            obj = null;

                        if (msg.cs) {
                            for (var k = 0, len = msg.cs.length; k < len; k++) {
                                $elicitResults.removeClass('elicit-error');
                                var $resultLength = msg.cs[k].rs.length,
                                    $resultMinHeight = $resultLength * 70;
                                $elicitTmpl.css('min-height', $resultMinHeight);
                                for (var i = 0, l = msg.cs[k].rs.length; i < l; i++) {
                                    obj = msg.cs[k].rs[i];
                                    obj.n = obj.n || '';
                                    obj.d = obj.d || '';
                                    obj.i = obj.i || '';
                                    obj.k = obj.k || '';
                                    obj.r = obj.r || '';
                                    obj.u = obj.u || '';

                                    var $result = {};
                                    $result.title = obj.n;
                                    $result.desc = obj.d;
                                    $result.image = obj.i;
                                    $result.keyword = obj.k;
                                    $result.rank = obj.r;
                                    $result.url = obj.u;
                                    var template = $.templates("#elicit-tmpl-js");

                                    var htmlOutput = template.render($result);
                                    $elicitTmpl.append(htmlOutput);

                                    // set the view all results link
                                    var $keywordEncode = encodeURIComponent($curKeyword);
                                    var $url = 'http://www.xerox.com/search?q=' + $keywordEncode + '&js_avail=1&locale=' + $l ;
                                    $('#rd-view-all').attr('href', $url);
                                     

                                    $elicitTmpl.children().fadeIn('fast');
                                   

                                  //    var $scrollHeight = $('.AC-active .hero-promo').height();
                                 //  $('html,body').animate({scrollTop: $('.AC-active .hero-promo').offset().top + $scrollHeight});

                                } // end for i

                                

                                if (!$homepagePromos.hasClass('rd-open')) {
                                    $homepagePromos.addClass('rd-open');
                                    $elicitResults.delay(50).slideDown();

                                }
                                $('html,body').animate({
                                   scrollTop: $(".AC-active .resource-desk").offset().top
                                });
                                return false;
                            } //end for k
                          

                        } else {
                            // no results/error
                         elicitError();
                        }


                    });

            } //end getResults();

            $(document).on("click", "#elicit-tmpl .media a", function(e){
                var $curLink = $(this).find('.media-heading').text();
              xrx_sitecatalyst_action('hmpg-desk-Elicit-' + $curLink);
            });
    }
})(jQuery);
