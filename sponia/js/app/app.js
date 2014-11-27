/*!
 * Created By remiel.
 * Date: 14-11-27
 * Time: 上午13:15
 */

require.config({
    baseUrl: location.port === "3000" ? "./js/app/" : "./js/app/",
    paths: {
        "$":(new RegExp(" AppleWebKit/")).test(navigator.userAgent) ? "../lib/zepto/zepto.min" : "../lib/jquery/jquery-1.11.1.min"
        ,"Swipe": "../module/swipe/swipe"

        ,"Base": "../module/base"

        ,"header": "../module/app/header/header"
    },
    shim: {
        "$": {
            exports: "$"
        }
        ,"Swipe": {
            deps: ["$"],
            exports: "Swipe"
        }

    }
});
//
require(["Base","header","Swipe"],function(Base,header,Swipe){
    console.log('[app init]');
    var $ = Base.$;
    var u = Base.utils;

    Base.BASE_URL = location.port === "3000" ? "" : "./assets";
    //init $wrapper
    var $wrapper = $('.wrapper');

    var $swipe = $('#js-swipe')
        ,$swipe__item = $swipe.find('.swipe-item')
        ,swipeLength = $swipe__item.length
        ,$swipe__dotBox = $('<div>').addClass('swipe-dot-box')
        ,$swipe__dot
        ,activeClass = '_active'
        ,startIndex = 0;
    if(swipeLength > 1){
        for(var i = 0;i < swipeLength;i++){
            $swipe__dotBox.append('<i>')
        }
        $swipe__dot = $swipe__dotBox.find('i');
        $swipe__dot.eq(startIndex).addClass('_active');
        $swipe.append($swipe__dotBox);
        var swipe = Swipe($swipe[0],{
            startSlide: startIndex,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: function(index, elem) {},
            transitionEnd: function(index, elem) {
                $swipe__dot
                    .removeClass(activeClass)
                    .eq(index)
                    .addClass(activeClass);
            }
        });
    }

});

