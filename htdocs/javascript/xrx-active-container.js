// active container


function activeContainer(persona){
    
    if ($("#active-container-tmpl")[0]) {
        var $acJSON =  xrx_ac_json,
            $personaFound = false;

        $.each($acJSON, function(key, value) {
            if (key === persona) {

                var $type = key,
                obj = value;
                
                obj.heroLarge.ctaURL = obj.heroLarge.ctaURL || '';
                obj.smallPromoA.ctaURL = obj.smallPromoA.ctaURL || '';
                obj.smallPromoB.ctaURL = obj.smallPromoB.ctaURL || '';
                var $promos = {};
                // hero large
                $promos.heroLargeCTA = obj.heroLarge.ctaCopy;
                $promos.heroLargeCTAUrl = obj.heroLarge.ctaUrl;
                $promos.heroLargeSlug = obj.heroLarge.slug;
                $promos.heroLargeTitle = obj.heroLarge.title;

                //small promo A
                $promos.smallPromoACTA = obj.smallPromoA.ctaCopy;
                $promos.smallPromoASlug = obj.smallPromoA.slug;
                $promos.smallPromoACTAUrl = obj.smallPromoA.ctaUrl;
                $promos.smallPromoATitle = obj.smallPromoA.title;

                //small promo B
                $promos.smallPromoBCTA = obj.smallPromoB.ctaCopy;
                $promos.smallPromoBSlug = obj.smallPromoB.slug;
                $promos.smallPromoBCTAUrl = obj.smallPromoB.ctaUrl;
                $promos.smallPromoBTitle = obj.smallPromoB.title;


                // locale 
                $promos.locale = xrx_locale_short;
                
                // Appends the content 
                var template = $.templates("#active-container-tmpl-js"),
                htmlOutput = template.render($promos);

                $("#active-container-tmpl").prepend(htmlOutput);
                // responsive image loader

                $('.responsive-image').responsImg({
                    breakpoints: {
                        mobile: _gl.MOBILE_WIDTH,
                        tablet: _gl.TABLET_WIDTH,
                        desktop: _gl.DESKTOP_OUTER_WIDTH
                    }
                });
                var arr = ['turquoise-promo', 'lavender-promo', 'violet-promo'],
                idx = Math.floor(Math.random() * arr.length);
                if (!$('#small-promo-a').hasClass(arr[idx])) {
                    $('#small-promo-a').removeClass('turquoise-promo');
                    $('#small-promo-a').addClass(arr[idx]);
                }

                    //  $('.responsive-image').data('responsImg').recheck();
                return false;
            } else {
                    //$personaFound = false;
                return true;
            }

        });
        
    }
}

