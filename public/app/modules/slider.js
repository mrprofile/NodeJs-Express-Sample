define(['jquery', 'flexslider'], function (jquery, flexslider) {

	return {
    Start: function (element, $, adZone, adKeywords) {
        if ($.fn.flexslider) {
            $(element).flexslider({
                useCss: false, animation: "slide", slideshow: false, animationLoop: true,
                start: this.StartCallback, peekValue: 1340 / 1400.0, resize: this.StartCallback,
                before: this.callAd, smoothHeight: true,
            });
        }
    },
    callAd: function (slide) {
        var $_toSlide = $(slide.slides[slide.animatingTo]),
            $promo_ads = $_toSlide.find('[class*=" promo-ad_"]');
        for (var i = 0; i < $promo_ads.length; i++) {
            var promoAdKeywords = $($promo_ads[i]).attr('data-ad-keywords');
            if ($($promo_ads[i]).find('.AdPlaceHolder').length == 0) {
                Show_SlideZoneAd("300x250", ESQTV.ui.gbl.adZone, promoAdKeywords.toString(), $promo_ads[i]);
            }
        }
    },
    StartCallback: function (slide) {
        var _width = slide.w, _height = slide.h, _slide = slide.slides[slide.currentSlide],
            _scaledWidth = (_width / 1340.0), _boxWidth = _scaledWidth * 340.0, _heightPercent = _scaledWidth * 340 * (270 / 340.0);

        if (_width > 481) {

            if (_width > 768) {
                while (slide.removedSlidesArray.length > 0) {
                    var _slideToAdd = slide.removedSlidesArray.pop();
                    slide.addSlide(_slideToAdd["slide"], _slideToAdd["pos"]);
                }
            } else {
                var slidesToRemove = [], i = 0;
                for (; i < slide.slides.length; i++) {
                    if ($(slide.slides[i]).find('.template4').length > 0) {
                        slidesToRemove.push($(slide.slides[i]));
                        slide.removedSlidesArray.push({ slide: slide.slides[i], pos: (i == slide.slides.length - 1) ? undefined : i });
                        continue;
                    }
                }

                for (var k = 0; k < slidesToRemove.length; k++) {
                    slide.removeSlide(slidesToRemove[k]);
                }
            }


            var slideUrl, _slideObj, len = slide.slides.length - 1, _htmlContainer, _promoContainer, _promo, _htmlLen, _promoLen, img, _index = 0;

            while (_index <= len) {
                _slideObj = slide.slides[_index];
                _htmlContainer = $(_slideObj).find('.element-container');
                _promoContainer = $(_slideObj).find('.promo-container .show-promo');
                _promo = $(_slideObj).find('.promo-container');
                _htmlLen = _htmlContainer.length;
                _promoLen = _promoContainer.length;

                slideUrl = $(_slideObj).attr('data-src');
                $slideImg = $(_slideObj).find('div.slide-link > img');
                if ($slideImg.length == 0) {
                    var __slide = slide;
                    img = new Image();
                    img.onload = function () {
                        $(this).fadeIn();
                        __slide.setup();
                    }
                    $(_slideObj).find('div.slide-link').append(img);
                    img.src = slideUrl;
                } else {
                    $slideImg.attr('src', slideUrl).fadeIn();
                }

                if (_htmlLen > 0) {
                    $(_htmlContainer).css('font-size', (_scaledWidth * 100) + "%").addClass("tablet");
                }

                if (_promoLen) {
                    var _widthPercent = (340 * (_promoLen / 2)) * _scaledWidth;

                    if (_promoLen > 2) {
                        $(_promo).css('width', ((_boxWidth + 20) * 3) + 1);
                        $(_promoContainer).css('width', _boxWidth).css('height', _heightPercent);
                    } else {
                        $(_promo).css('width', _widthPercent);
                        $(_promoContainer).css('width', _boxWidth).css('height', _heightPercent);
                    }
                    var imgUrl;
                    for (var j = 0; j < _promoLen; j++) {
                        imgUrl = $(_promoContainer[j]).find('.show-promo-img-container > a > img, .show-promo-img-container > img').attr('data-src');
                        $(_promoContainer[j]).find('.show-promo-img-container > a > img, .show-promo-img-container > img').attr('src', imgUrl);
                    }
                    _promo.addClass("tablet");
                }

                _index++;
            }

            var $clones = $('.clone');
            for (var i = 0; i < slide.cloneCount; i++) {
                var $clone = $($clones[i]), $cloneImg = $clone.find('div.slide-link > img'),
                    cloneUrl = $clone.attr('data-src'), img;
                if ($cloneImg.length == 0) {
                    img = new Image();
                    img.onload = function () {
                        $(this).fadeIn();
                    }
                    $clone.find('div.slide-link').append(img);
                    img.src = cloneUrl;
                } else {
                    $cloneImg.attr('src', cloneUrl).fadeIn();
                }
            }

        } else {

            var slidesToRemove = [], i = 0;
            for (; i < slide.slides.length; i++) {
                if ($(slide.slides[i]).find('.template4').length > 0) {
                    slidesToRemove.push($(slide.slides[i]));
                    slide.removedSlidesArray.push({ slide: slide.slides[i], pos: (i == slide.slides.length - 1) ? undefined : i });
                    continue;
                }
                var $_slideObj = $(slide.slides[i]), $slideImg = $_slideObj.find('div.slide-link > img'), slideUrl;

                slideUrl = $_slideObj.attr('data-src').replace('_L', '_M');
                if ($slideImg.length == 0) {
                    var __slide = slide;
                    img = new Image();
                    img.onload = function () {
                        $(this).fadeIn();
                        __slide.setup();
                    }
                    $_slideObj.find('div.slide-link').append(img);
                    img.src = slideUrl;

                } else {
                    $slideImg.attr('src', slideUrl).fadeIn();
                }
                $slideImg = $_slideObj.find('div.slide-link > img');
                $_slideObj.find('.mobile-container').width($slideImg.width() + .5);

            }


            for (var k = 0; k < slidesToRemove.length; k++) {
                slide.removeSlide(slidesToRemove[k]);
            }


            var $clones = $('.clone');
            for (var i = 0; i < slide.cloneCount; i++) {
                var $clone = $($clones[i]), $cloneImg = $clone.find('div.slide-link > img'),
                    cloneUrl = $clone.attr('data-src').replace('_L', '_M'), img;
                if ($cloneImg.length == 0) {
                    img = new Image();
                    $clone.find('div.slide-link').append(img);
                    img.onload = function () {
                        $(this).fadeIn();
                    }
                    img.src = cloneUrl;
                } else {
                    $cloneImg.attr('src', cloneUrl).fadeIn();
                }
            }


        }


    }
}

});