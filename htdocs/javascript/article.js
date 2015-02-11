
(function($) {
var $promos = $('.promos');	
$('.vertical-center').flexVerticalCenter({ cssAttribute: 'padding-top', parentSelector: '.article-right' });
$('.vertical-center').show();

function promogutter() {
if ($(window).width() < 768) {
   $promos.removeClass('no-gutter');
}
else {
	$promos.addClass('no-gutter');
}
}
 promogutter();

$(window).resize(function() {
 promogutter();
});
})(jQuery);
(function($) {
//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
function autoPlayYouTubeModal(){
	var $body = $('body');

  var trigger = $("body").find('[data-toggle="modal"]');
  trigger.click(function() {
    var theModal = $(this).data( "target" ),
    videoSRC = $(this).attr( "data-theVideo" ), 
    videoSRCauto = videoSRC+"?autoplay=1&modestbranding=1&theme=dark&showinfo=0&autohide=1" ;
    $(theModal+' iframe').attr('src', videoSRCauto);
    $(theModal+' button.close').click(function () {
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
$('.responsive-image').responsImg({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    desktop: 940
  }
});
})(jQuery);
(function($) {
$(document).ready(function(){

	$('.quote-tweet .tweet').each(function() {
		var $tweetText = $(this).parent().find('p').text(),
		$tweetTextEncode = encodeURIComponent($tweetText),
		$tweetURLEncode = encodeURIComponent(window.location.href);
		$(this).attr('href' , 'https://twitter.com/intent/tweet?text=' + $tweetTextEncode +'&url=' + $tweetURLEncode);
	});
});

})(jQuery);