/*!
 * Created by remiel on 13-10-22.
 */
(function($){
    $.fn.render_news = function(options){
        var opts = $.extend( {}, $.fn.render_news.defaults, options );
        function sub(str,data) {
            return str
                .replace(/{(.*?)}/igm,function($,$1) {
                    return data[$1]?data[$1]:$;
                });
        }

        var news_list_tpl = [
            '<div class="news_item">',
            '<div class="news_date">{date}</div>',
            '<div class="news_title">{title}</div>',
            '<div class="news_info">{info}</div>',
            '<img class="news_thumb" src="{img}" alt="{alt}"/>',
            '<div class="news_bar">',
            '<a class="news_link" href="{link}">查看详情</a>',
            '</div>',
            '</div>'
        ].join('');
        var news_detail_tpl = [
            '<div class="news_detail_inner">',
            '<div class="news_title">{title}</div>',
            '<div class="news_date">{date}</div>',
            '<img class="news_thumb" src="{img}" alt="{alt}"/>',
            '<div class="news_info">{info}</div>',
            '<div class="news_cnt">{content}</div>',
            '</div>'
        ].join('');

        var tpl,html = [];
        switch (opts.type){
            case "list" :
                tpl = news_list_tpl;
                break;
            case "detail" :
                tpl = news_detail_tpl;
                break;
            default :
                break;
        }

        $.each(opts.data,function(index,item){
            html.push(sub(tpl,item));
        });

        $(this).append(html.join(''));

        typeof opts.callback == "function" && opts.callback.call(this);

        return this;
    };
    $.fn.render_news.defaults = {
        data: [],
        type: "list",//detail
        callback: function(){}
    };

})($);