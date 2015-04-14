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
	$('.vertical-center').flexVerticalCenter({
		parentSelector: '.article-main-row',
		debounceTimeout: 0,
		verticalOffset: '-50px',
		OnAttribute: 'padding-top'
	});
	verticalCenterSidebar();
});

})(jQuery);