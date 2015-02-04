
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