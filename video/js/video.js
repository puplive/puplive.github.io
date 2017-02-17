;!function (doc, win) {
    "use strict";
    var fontScale;
    fontScale = function(){
        var innerWidth = Math.min(win.innerWidth,win.innerHeight);
        if (!innerWidth) {
            return false;
        }
        if(innerWidth<=768){
            doc.documentElement.style.fontSize = (16 * innerWidth / 320)  + 'px';
        }else{
            doc.documentElement.style.fontSize='16px'
        }       
    };
    fontScale();
    if(win.addEventListener){
        win.addEventListener('resize', fontScale, false);
        win.addEventListener('load',fontScale,false);
        var evt = "onorientationchange" in window ? "orientationchange" : "resize";
        window.addEventListener(evt, function() {
            location.reload()
        }, false);
    }
}(document, window);

// 导航css3动画
$('#nav_btn').on('click', function(event) {
    event.preventDefault();
    var $nav = $('#nav');
    if ($nav.hasClass('nav_in')){
        $nav.removeClass('nav_in').addClass('nav_out')

    }else{
        $nav.removeClass('nav_out').addClass('nav_in')
    }
});
