/*!
 * Created By remiel.
 * Date: 14-11-27
 * Time: 上午13:37
 */
define(['$'],function($){
    console.log("module:Base");

    var utils = {};
    utils.support = {'touch': 'ontouchend' in document};
    utils.events = (utils.support.touch)
        ? {down: 'touchstart', move: 'touchmove', up: 'touchend', click: 'tap'}
        : {down: 'mousedown', move: 'mousemove', up: 'mouseup', click: 'click'};
    if($.os && ($.os.phone || $.os.tablet)){
        //utils.events.click = 'tap';
    }else{
        utils.events.click = 'click';
    }
    utils.getProperty = function(name) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms', '']
            , testStyle = document.createElement('div').style;

        for (var i = 0; i < prefixes.length; ++i) {
            if (testStyle[prefixes[i] + name] !== undefined) {
                return prefixes[i] + name;
            }
        }
        // Not Supported
        return;
    };

    $.extend(utils.support, {
        'transform': !! (utils.getProperty('Transform'))
        , 'transform3d': !! (window.WebKitCSSMatrix && 'm11' in new WebKitCSSMatrix())
    });
    utils.renderTpl = function(str,data) {
        return str
            .replace(/{(.*?)}/igm,function($,$1) {
                return typeof data[$1] !== "undefined" ? data[$1] : "";
            });
    };

    return {
        utils: utils,
        ui:{},
        $:$,
        BASE_URL: location.port === "3000" ? "" : ""
    }
});