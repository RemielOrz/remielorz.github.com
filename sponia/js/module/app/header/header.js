/*!
 * Created By remiel.
 * Date: 14/11/27
 * Time: 下午4:05
 */
define(["Base"],function(Base){
    console.log('[module: header]');
    var $ = Base.$;
    var u = Base.utils;

    var $win = $(window)
        ,$doc = $(document)
        ,$bd = $('body')
        ,$hd = $('.header')
        ,$sch = $hd.find('.search')
        ,$sch__ipt = $sch.find('.search__ipt')

        ,$iconNav = $hd.find('.icon-nav')
        ,$nav = $hd.find('.nav');

    var activeClass = '_active'
        ,evtName = '.header';

    //search
    $sch
        .on(u.events.click + evtName, function(){
            $(this).addClass(activeClass);
        })
        .on(u.events.click, 'input', function(){});
    $sch__ipt
        .on('blur' + evtName, function(){
            $sch.removeClass(activeClass);
        })
        .on('focus' + evtName, function(){
            $sch.addClass(activeClass);
        });

    //menu
    $iconNav.on(u.events.click + evtName, function(e){
        e.stopPropagation();
        if($win.width()<=640){
            $nav.toggleClass(activeClass);
        }
    });
    $doc.on(u.events.click + evtName, function(){
        if($nav.hasClass(activeClass)){
            $nav.removeClass(activeClass);
        }
    });
    $win.on('resize' + evtName, function(){
        console.log('resize')
        if($nav.hasClass(activeClass)){
            $nav.removeClass(activeClass);
        }
    });
});