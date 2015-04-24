// active container


function activeContainer(persona){
    
    if ($("#active-container-tmpl")[0]) {
        var $acJSON =  xrx_ac_json,
            $personaFound = false;
            $('.mboxDefault').hide().removeClass('AC-active');
            if (persona === 'sho') {
                // disabling a/b test for now 4/24/15
                // persona = Math.random() < 0.5 ? 'sho' : 'sho-b';
            }
            if (persona === 'sho-b') {
                xrx_pagename_suffix = "test";
            }
            if (persona === 'sho-a') {
                persona = 'sho';
            }
            var result = $acJSON.hasOwnProperty(persona);
            if (!result) {
              persona = 'sho';
            }
        $.each($acJSON, function(key, value) {

            if (key === persona) {

                var $type = key,
                obj = value;
                
                obj.heroLarge.ctaUrl = obj.heroLarge.ctaUrl || '';
                obj.smallPromoA.ctaUrl = obj.smallPromoA.ctaUrl || '';
                obj.heroLarge.subHead = obj.heroLarge.subHead || '';
                obj.smallPromoA.subHead = obj.smallPromoA.subHead || '';
                obj.heroLarge.ctaTarget = obj.heroLarge.ctaTarget || '';
                obj.smallPromoA.ctaTarget = obj.smallPromoA.ctaTarget || '';

                var $promos = {};

                // persona key
                $promos.persona =  persona;
                // hero large
                $promos.heroLargeCTA = obj.heroLarge.ctaCopy;
                $promos.heroLargeCTAUrl = obj.heroLarge.ctaUrl;
                $promos.heroLargeSlug = obj.heroLarge.slug;
                $promos.heroLargeTitle = obj.heroLarge.title;
                $promos.heroLargeImg = obj.heroLarge.imagePath;
                $promos.heroLargeSubhead = obj.heroLarge.subHead;
                $promos.heroLargeCTATarget = obj.heroLarge.ctaTarget;

                //small promo A
                $promos.smallPromoACTA = obj.smallPromoA.ctaCopy;
                $promos.smallPromoASlug = obj.smallPromoA.slug;
                $promos.smallPromoACTAUrl = obj.smallPromoA.ctaUrl;
                $promos.smallPromoATitle = obj.smallPromoA.title;
                $promos.smallPromoAImg = obj.smallPromoA.imagePath;
                $promos.smallPromoASubhead = obj.smallPromoA.subHead;
                $promos.smallPromoACTATarget = obj.smallPromoA.ctaTarget;

               

                // locale 
                $promos.locale = xrx_locale_short;
                
                // Appends the content 
                var template = $.templates("#active-container-tmpl-js"),
                htmlOutput = template.render($promos);

                $("#active-container-tmpl").prepend(htmlOutput).addClass('persona-' + persona).addClass('AC-active');

                $('.responsive-image').responsImg({
                    breakpoints: {
                        mobile: 320,
                        tablet: 768,
                        desktop: 970
                    }
                });
   
                return false;
            } else {
                return true;
            }

        });
        $('.hero-promo').on('click', ' a.article-tile', function (e) {
            if ($(this).hasClass('article-video-poster')) {
                // check if it is a video
                if($(e.target).hasClass('article-cta')){        //The cta was clicked
                    xrx_sitecatalyst_action('hmpg-hero-ac-top-video-' + persona + '-' + $(this).find('.article-cta').text());
                }else{
                    xrx_sitecatalyst_action('hmpg-hero-ac-top-video-' + persona + '-img-' + $(this).find('h1').text());
                }
            }
            else {
                // not a video
                if($(e.target).hasClass('article-cta')){        //The cta was clicked
                    xrx_sitecatalyst_action('hmpg-hero-ac-top-' + persona + '-' + $(this).find('.article-cta').text());
                }else{
                    xrx_sitecatalyst_action('hmpg-hero-ac-top-' + persona + '-img-' + $(this).find('h1').text());
                }
            }

        });
        $('.small-promo-a').on('click', ' a.article-tile', function (e) {
            if ($(this).hasClass('article-video-poster')) {
                // check if it is a video
                if($(e.target).hasClass('article-cta')){        //The cta was clicked
                    xrx_sitecatalyst_action('hmpg-panel-ac-center-video-' + persona + '-' + $(this).find('.article-cta').text());
                }else{
                    xrx_sitecatalyst_action('hmpg-panel-ac-center-video-' + persona + '-img-' + $(this).find('h4').text());
                }
            }
            else {
                // not a video
                if($(e.target).hasClass('article-cta')){        //The cta was clicked
                    xrx_sitecatalyst_action('hmpg-panel-ac-center-' + persona + '-' + $(this).find('.article-cta').text());

                }else{
                    xrx_sitecatalyst_action('hmpg-panel-ac-center-' + persona + '-img-' + $(this).find('h4').text());
                }

            }

        });
       
    }
}
