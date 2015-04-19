// active container


function activeContainer(persona){
    
    if ($("#active-container-tmpl")[0]) {
        var $acJSON =  xrx_ac_json,
            $personaFound = false;
            $('.mboxDefault').hide().removeClass('AC-active');
            if (persona === 'sho') {
                var chosenValue = Math.random() < 0.5 ? 'sho' : 'sho-b';
                persona = chosenValue;
                if (chosenValue === 'sho-b') {
                    xrx_pagename_suffix = "test";
                }
            }
            if (persona === 'sho-a') {
                persona = 'sho';
            }
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
                obj.heroLarge.subHead = obj.heroLarge.subHead || '';
                obj.smallPromoA.blurb = obj.smallPromoA.subHead || '';
                obj.smallPromoB.blurb = obj.smallPromoB.subHead || '';
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

                //small promo A
                $promos.smallPromoACTA = obj.smallPromoA.ctaCopy;
                $promos.smallPromoASlug = obj.smallPromoA.slug;
                $promos.smallPromoACTAUrl = obj.smallPromoA.ctaUrl;
                $promos.smallPromoATitle = obj.smallPromoA.title;
                $promos.smallPromoAImg = obj.smallPromoA.imagePath;
                $promos.smallPromoASubhead = obj.smallPromoA.subHead;

                //small promo B
                $promos.smallPromoBCTA = obj.smallPromoB.ctaCopy;
                $promos.smallPromoBSlug = obj.smallPromoB.slug;
                $promos.smallPromoBCTAUrl = obj.smallPromoB.ctaUrl;
                $promos.smallPromoBTitle = obj.smallPromoB.title;
                $promos.smallPromoBImg = obj.smallPromoB.imagePath;
                $promos.smallPromoBSubhead = obj.smallPromoB.subHead;


                // locale 
                $promos.locale = xrx_locale_short;
                
                // Appends the content 
                var template = $.templates("#active-container-tmpl-js"),
                htmlOutput = template.render($promos);

                $("#active-container-tmpl").prepend(htmlOutput).addClass('persona-' + persona).addClass('AC-active');
                // responsive image loader

                $('.responsive-image').responsImg({
                    breakpoints: {
                        mobile: 320,
                        tablet: 768,
                        desktop: 970
                    }
                });
                var colorChange = Math.random() < 0.5 ? 'lavender-promo' : 'violet-promo';
                       //$color = colorChange;
                       //var arr = ['lavender-promo', 'violet-promo'],
                       //idx = Math.floor(Math.random() * arr.length);
                       var $promoA = $('.small-promo-a .promo-row-inner .equal-col.col-md-6.col-sm-8.col-xs-12');
                       if (!$promoA.hasClass(colorChange)) {
                           $promoA.removeClass('violet-promo');
                           $promoA.addClass(colorChange);
                       }

                    //  $('.responsive-image').data('responsImg').recheck();
                return false;
            } else {
                    //$personaFound = false;
                return true;
            }

        });
        $('.hero-promo').on('click', ' a.article-tile', function (e) {
            if($(e.target).hasClass('article-cta')){        //The cta was clicked
                xrx_sitecatalyst_action('hmpg-hero-ac-top-' + persona + '-' + $(this).find('.article-cta').text());
            }else{
                xrx_sitecatalyst_action('hmpg-hero-ac-top-' + persona + '-img-' + $(this).find('h1').text());
            }
        });
        $('.small-promo-a').on('click', ' a.article-tile', function (e) {
            if($(e.target).hasClass('article-cta')){        //The cta was clicked
                xrx_sitecatalyst_action('hmpg-panel-ac-center-' + persona + '-' + $(this).find('.article-cta').text());
            }else{
                xrx_sitecatalyst_action('hmpg-panel-ac-center-' + persona + '-img-' + $(this).find('h4').text());
            }
        });
       
    }
}
