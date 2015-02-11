(function($) {

// If using IE8, this adds a "last child" class to apply last-child css to the element

function last_child() {

    if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
        $('*:last-child').addClass('last-child');
    }

}

last_child();

})(jQuery);
