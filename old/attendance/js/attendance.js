/******************************
*******   @author GHJ    ******
*******   @2013.05.20    ******
*******************************/

//表格滚动固定header.aside组件
(function($,window){
    //extent
    function tableScroll(options){
        var _this = this,
            tableWrap = $('.tableWrap',options.box).get(0),
            header = $('.tableWrap .header',options.box),
            hAside = $('.hAsideTable',options.box),
            aside = $('.aside',options.box),
            mTable = $('.mTable',options.box);

        this.init = function(){
            $('.inner',options.box).add(tableWrap).add(header).css({width:options.width,visibility:'visible'});
        }
        this.init();
        //scroll
        options.box.scroll(function(){
            var _t = $(this).scrollTop(),
                _l = $(this).scrollLeft(),
                t = _t - tableWrap.offsetTop,
                l = _l - tableWrap.offsetLeft,
                tableWrapTop = tableWrap.offsetTop,
                boxTop = options.box.get(0).offsetTop;
            if($.browser.msie){
                //for ie:fixed
                if(t > 0 && l < 0){
                    aside.css({top:'30px',left:0,position:'absolute'});
                    hAside.css({top:0,left:0,position:'absolute'});
                    header.css({top:boxTop,left:136-_l,position:'fixed'});
                }else if(t < 0 && l > 0) {
                    aside.css({top:boxTop + tableWrapTop + 30 -_t,left:'118px',position:'fixed'});
                    hAside.css({top:boxTop + tableWrapTop + 1 - _t,left:'118px',position:'fixed'});
                    header.css({top:0,left:0,position:'absolute'});
                }else if(t > 0 && l > 0){
                    aside.css({top:boxTop + tableWrapTop + 30 -_t,left:'118px',position:'fixed'});
                    hAside.css({top:boxTop + 1,left:'118px',position:'fixed'});
                    header.css({top:boxTop,left:136-_l,position:'fixed'});
                }else{
                    aside.css({top:'30px',left:0,position:'absolute'});
                    header.add(hAside).css({top:0,left:0,position:'absolute'});
                }
            }else{
                //for others: abs
                header.css({top:t>0?t:0});
                aside.add(hAside).css({left:l>0?l:0});
            }
        });
    }

    $.extend(tableScroll.prototype,{});

    $.jTableScroll = function(options){
        var opts = $.extend({}, $.jTableScroll.defaults, options);
        return new tableScroll(opts)
    }

    $.jTableScroll.defaults = {
        box: null,//jq obj
        width: null,
        callback: null
    }
})($,window);

//年月时间组件
(function($){
    $.fn.extend({
        jTimeSettings: function(options){
            var opts = {
                type: null,//time||null
                step: 1,//步进值
                speed:150, //按住后增加（减少）的速度
                delay:500,//按住后延迟
                min: 1,
                max: 12,
                init:null,//年或月初始值
                callback: null
            };
            options=$.extend(opts, options || {});

            var _this = this;

            this.each(function(){
                var _this = this,
                    ipt = $(this).find('input'),
                    btnEv,blurEv,t;

                switch (options.type){
                    case 'time':
                        //console.log('time');
                        var _h = $(ipt,_this).eq(0),
                            _m = $(ipt,_this).eq(1),
                            _h_val = _toString(_h.val()|0),
                            _m_val = _toString(_m.val()|0);
                        btnEv = function(o,n){
                            _h_val = _h.val()|0;
                            _m_val = _m.val()|0;
                            if($(o).hasClass('up')||n == 1){
                                _m_val += options.step;
                            }else if($(o).hasClass('down')||n == -1){
                                _m_val -= options.step;
                            }
                            if(_m_val >= 60){
                                _h_val += (_m_val / 60)|0;
                            }else if(_m_val < 0){
                                _h_val -= Math.abs((_m_val / 60)|0) + 1;
                                _m_val = _m_val%60 + 60
                            }
                            _m_val = _toString(_m_val%60);
                            _h_val = _toString((_h_val%24 + 24)%24);
                            _m.val(_m_val);
                            _h.val(_h_val);
                            typeof options.callback == "function" && options.callback([_h_val,_m_val]);
                        };
                        blurEv = function(o,max){
                            var val = _toString((o.value|0) > max ? 0 : (o.value|0));
                            $(o).val(val);
                            return val;
                        };
                        _h.blur(function(){
                            _h_val = blurEv(this,24);
                            typeof options.callback == "function" && options.callback([_h_val,_m_val]);
                        });
                        _m.blur(function(){
                            _m_val = blurEv(this,60);
                            typeof options.callback == "function" && options.callback([_h_val,_m_val]);
                        });
                        break;
                    default :
                        //console.log('');
                        var _ipt = $(ipt,_this).eq(0),
                            _ipt_val;
                        if(_ipt.val() == ""){_ipt.val(options.init);}
                        btnEv = function(o,n){
                            _ipt_val = _ipt.val()|0;
                            if(!(_ipt_val >= options.min && _ipt_val <= options.max)){
                                _ipt_val = options.init;
                            }else{
                                if($(o).hasClass('up')||n == 1){
                                    if(_ipt_val == options.max){return false;}
                                    _ipt_val += options.step;
                                }else if($(o).hasClass('down')||n == -1){
                                    if(_ipt_val == options.min){return false;}
                                    _ipt_val -= options.step;
                                }
                            }
                            _ipt.val(_ipt_val);
                            if(_ipt_val == options.min || _ipt_val == options.max){
                                $(o).addClass('disabled');
                            }else{
                                $(o).siblings('a').removeClass('disabled');
                            }
                            typeof options.callback == "function" && options.callback(_ipt_val);
                        };
                }

                $(_this).delegate("a","click", function(){
                    btnEv(this);
                });
                $(_this).delegate("a","mousedown", function(){
                    var _this = this;
                    var changeVal = function(){
                        btnEv(_this);
                        t = setTimeout(changeVal,options.speed);
                    };
                    t = setTimeout(changeVal,options.delay);
                });
                $(_this).delegate("a","mouseup mouseout", function(){
                    clearTimeout(t);
                });
                $(_this).mousewheel(function(e,n){
                    btnEv(null,n);
                    return false;
                });

            });
            //格式化数字
            function _toString(x){
                return x >= 0 && x < 10 ? x = '0' + x : x.toString();
            }
        }
    })
})(jQuery);


//下拉
(function($){
    $.fn.extend({
        jDropmenu: function(options){
            var opts = {
                json: null,
                init_text: "",
                init_value: "",
	            click: false,
                clickObj: null,
                callback: null
            };
            options=$.extend(opts, options || {});

            var tpl = '<li class="dropmenu_li" data-value = "{value}">{text}</li>';

            function sub(str,data) {
                return str
                    .replace(/{(.*?)}/igm,function($,$1) {
                        return data[$1]?data[$1]:$;
                    });
            }

            var clickEv = function(o){
                $('.jDropmenu').remove();
                var ul = ('<ul class="dropmenu"></ul>'),
                    menu = $(ul);
                $.each(options.json,function(a,b){
                    var li = sub(tpl, b);
                    menu.append(li);
                });

                $(o).addClass('jActive');
                menu.offset({top:$(o).offset().top + $(o).outerHeight(),left:$(o).offset().left});
                menu.addClass('jDropmenu').appendTo('body');
                menu.delegate('li','click',function(){
                    $(o).text($(this).text());
                    $.browser.msie ? $(o).attr('data-value',$(this).attr('data-value')) : o.dataset.value = this.dataset.value;
                    typeof options.callback == "function" && options.callback(o);
                });
                $(document).bind("click", function(a) {
                    !($(a.target).hasClass('jActive')) && $('.jDropmenu').remove() && $('.jActive').removeClass('jActive');
                });

            }

            return this.each(function(){
                var _this = this;

                if(options.init_value != "") $.browser.msie ? $(_this).attr('data-value',options.init_value) : _this.dataset.value = options.init_value;
                if(options.init_text != "") $(_this).text(options.init_text);

                if(options.click){
                    clickEv(options.clickObj);
                }else{
                    $(_this).bind('click',function(){
                        clickEv(this);
                    });
                }
            });
        }
    })
})(jQuery);





$(function(){
//tab
    var jTab = function (_tab, content, hoverclass) {
        _tab.click(function () {
            var index = _tab.index($(this));
            _tab.removeClass("active");
            $(this).addClass("active");
            content.hide();
            $(content.get(index)).show();
            return false;
        });
        _tab.mouseover(function () {
            $(this).addClass(hoverclass)
        });
        _tab.mouseout(function () {
            $(this).removeClass(hoverclass)
        });
    };
    //实例化
    var asideTab = new jTab($('.aNavList_li'), $('.box'), 'hover');
    var manageTab = new jTab($('.tab','.manage'), $('.bd','.manage'), 'hover');
    var smTab = new jTab($('.smNav_a'), $('.smCont'), 'hover');

    //表格
    var jtableScroll_schedule = $.jTableScroll({
        box:$('.schedule'),
        width:232 + $('.schedule .hMainTable th').length * 44
    });
    var jtableScroll_detail = $.jTableScroll({
        box:$('.detail .bd'),
        width:1162
    });

    //
    $('.jTime').jTimeSettings({
        type:'time',
        step:15,
        callback: function(o){
            console.log(o)
        }
    });
    $('.jMonth').jTimeSettings({
        max:12,
        min:1,
        init:(new Date()).getMonth(),
        callback: function(o){
            console.log(o)
        }
    });
    $('.jYear').jTimeSettings({
        max:2050,
        min:1900,
        init:(new Date()).getFullYear(),
        callback: function(o){
            console.log(o)
        }
    });


    //下拉
    $('.dropBox','.timeBox').jDropmenu({
        init_text: "一天",
        init_value: "1",
        json: [
            {
                text: '一天',
                value: 1
            },
            {
                text: '半天',
                value: 2
            },
            {
                text: '无',
                value: 3
            }
        ]
    });

    $('.schedule .mTable tr td:not(:first-child)').jDropmenu({
        init_value: "1",
        json: [
            {
                text: '00001',
                value: 1
            },
            {
                text: '00002',
                value: 2
            },
            {
                text: '00003',
                value: 3
            },
            {
                text: '99999',
                value: 4
            }
        ]
    });

	//pop下拉
	$('.dropBox','.popup').jDropmenu({
		init_text: "分钟",
		init_value: "1",
		json: [
			{
				text: '分钟',
				value: 1
			},
			{
				text: '小时',
				value: 2
			}
		]
	});

	//处理结果
	/*$('.handle','.detailResult').jDropmenu({
		json: [
			{
				text: '记旷工一天',
				value: 1
			},
			{
				text: '记旷工半天',
				value: 2
			},
			{
				text: '帮忙签退',
				value: 3
			}
		],
		callback: function(o){
			$(o).before("<span>" + $(o).text() + "</span><a href='javascript:;' class='undo'>撤销</a>").text("处 理").hide();
		}
	});*/
    $('.detailResult').delegate('.handle','click',function(){
        $(this).jDropmenu({
            json: [
                {
                    text: '记旷工一天',
                    value: 1
                },
                {
                    text: '记旷工半天',
                    value: 2
                },
                {
                    text: '帮忙签退',
                    value: 3
                }
            ],
            click: true,
            clickObj: this,
            callback: function(o){
                $(o).before("<span>" + $(o).text() + "</span><a href='javascript:;' class='undo'>撤销</a>").text("处 理").hide();
            }
        });

    }).delegate('.undo','click',function(){
        $(this).siblings('.handle').show().siblings().remove();
    });

    //部门下拉
    $('.ico04').click(function(){
        var li = $(this).parent('a').parent('li');
        li.hasClass('open')?li.removeClass('open').addClass('close'):li.removeClass('close').addClass('open');
    });
	//加班认可
	$('.overtimeHandle','.detail').mouseup(function(){
		console.log($(this).offset());
		$('.overtimeWindow').show().offset({top:$(this).offset().top + $(this).outerHeight(),left:$(this).offset().left});
	});
	$('.popup').mousedown(function(e){
		e.stopPropagation();
	}).delegate('.btn,.close','click',function(){
		$('.popup').hide();
	});

	//点击消失
	$(document).bind("mousedown", function(o) {
		//console.log(o.target)
		!$(o.target).hasClass('overtimeWindow')&&!$(o.target).hasClass('overtimeHandle')&&!$(o.target).hasClass('dropmenu_li')&&!$(o.target).hasClass('dropmenu')&&$('.overtimeWindow').hide();
	});

});

