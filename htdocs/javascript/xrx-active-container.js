// active container


function activeContainer(persona){
    
    if ($("#active-container-tmpl")[0]) {
        var $acJSON =  xrx_ac_json,
            $personaFound = false;
            var result = $acJSON.hasOwnProperty(persona);
            if (!result) {
              var persona = 'sho';
            }
        $.each($acJSON, function(key, value) {

            if (key === persona) {

                var $type = key,
                obj = value;
                
                obj.heroLarge.ctaUrl = obj.heroLarge.ctaUrl || '';
                obj.smallPromoA.ctaUrl = obj.smallPromoA.ctaUrl || '';
                obj.smallPromoB.ctaUrl = obj.smallPromoB.ctaUrl || '';
                var $promos = {};
                // hero large
                $promos.heroLargeCTA = obj.heroLarge.ctaCopy;
                $promos.heroLargeCTAUrl = obj.heroLarge.ctaUrl;
                $promos.heroLargeSlug = obj.heroLarge.slug;
                $promos.heroLargeTitle = obj.heroLarge.title;
                $promos.heroLargeImg = obj.heroLarge.imagePath;

                //small promo A
                $promos.smallPromoACTA = obj.smallPromoA.ctaCopy;
                $promos.smallPromoASlug = obj.smallPromoA.slug;
                $promos.smallPromoACTAUrl = obj.smallPromoA.ctaUrl;
                $promos.smallPromoATitle = obj.smallPromoA.title;
                $promos.smallPromoAImg = obj.smallPromoA.imagePath;

                //small promo B
                $promos.smallPromoBCTA = obj.smallPromoB.ctaCopy;
                $promos.smallPromoBSlug = obj.smallPromoB.slug;
                $promos.smallPromoBCTAUrl = obj.smallPromoB.ctaUrl;
                $promos.smallPromoBTitle = obj.smallPromoB.title;
                $promos.smallPromoBImg = obj.smallPromoB.imagePath;


                // locale 
                $promos.locale = xrx_locale_short;
                
                // Appends the content 
                var template = $.templates("#active-container-tmpl-js"),
                htmlOutput = template.render($promos);

                $("#active-container-tmpl").prepend(htmlOutput);
                // responsive image loader

                $('.responsive-image').responsImg({
                    breakpoints: {
                        mobile: 320,
                        tablet: 768,
                        desktop: 970
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
        $('.hero-promo').on('click', ' a.article-cta', function () {
            var $curLink = $(this).text();
            xrx_sitecatalyst_action('hmpg-hero-ac-top-' + persona + '-' + $curLink);
        });
        $('#small-promo-a').on('click', ' a.article-cta', function () {
            var $curLink = $(this).text();
            xrx_sitecatalyst_action('hmpg-panel-ac-left' + persona + '-' + $curLink);
        });
        $('#small-promo-b').on('click', ' a.article-cta', function () {
            var $curLink = $(this).text();
            xrx_sitecatalyst_action('hmpg-panel-ac-center' + persona + '-' + $curLink);
        });
    }
}

