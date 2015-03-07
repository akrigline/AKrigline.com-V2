if (document.getElementById('home')) {

    /* 
    Image Panning Effect
    Code modified from malihu.gr
    http://manos.malihu.gr/jquery-image-panning/
    */

    function imageScroll() {
        //$outer_container=$("#intro");
        $imagePan_panning=$("#intro .panning");
        $imagePan=$("#intro");
        $imagePan_container=$("#intro .imagePanner");
        $pseudoImage=$('.welcome');
     
        //$imagePan_panning.css("margin-top",($imagePan.height()-$imagePan_panning.height())/2+"px");
        containerWidth=$imagePan.width();
        containerHeight=$imagePan.height();
        totalContentW=$imagePan_panning.width();
        totalContentH=$imagePan_panning.height();
        $imagePan_container.css("width",totalContentW).css("height",totalContentH).css('left',-((totalContentW-containerWidth)/2));
     
        function MouseMove(e){
            var mouseCoordsX=(e.pageX - $imagePan.offset().left);
            var mouseCoordsY=(e.pageY - $imagePan.offset().top);
            var mousePercentX=mouseCoordsX/containerWidth;
            var mousePercentY=mouseCoordsY/containerHeight;
            var destX=-(((totalContentW-(containerWidth))-containerWidth)*(mousePercentX));
            var destY=-(((totalContentH-(containerHeight))-containerHeight)*(mousePercentY));
            var thePosA=mouseCoordsX-destX;
            var thePosB=destX-mouseCoordsX;
            var thePosC=mouseCoordsY-destY;
            var thePosD=destY-mouseCoordsY;
            var marginL=$imagePan_panning.css("marginLeft").replace("px", "");
            var marginT=$imagePan_panning.css("marginTop").replace("px", "");
            var animSpeed=500; //ease amount
            var easeType="easeOutCubic";
            if(mouseCoordsX>destX || mouseCoordsY>destY){
                $imagePan_container.stop().animate({left: -thePosA-marginL, top: -thePosC-marginT}, animSpeed,easeType); //with easing
            } else if(mouseCoordsX<destX || mouseCoordsY<destY){
                $imagePan_container.stop().animate({left: thePosB-marginL, top: thePosD-marginT}, animSpeed,easeType); //with easing
            } else {
                $imagePan_container.stop();
            }
        }

        //$imagePan_panning.css("margin-left",($imagePan.width()-$imagePan_panning.width())/2).css("margin-top",($imagePan.height()-$imagePan_panning.height())/2);
     
        $pseudoImage.bind("mousemove", function(event){
            MouseMove(event);
        });

    };

    $(window).load(imageScroll);

    // Reset ScrollSpy on Resize
    $(window).resize(

        function () {
            var $spy = $(this).scrollspy('refresh');
            $pseudoImage.unbind("mousemove");
        },
        imageScroll
    );

    $(document).ready( function() {
        //Initialize Sticky.js
        $(".top-nav").sticky({
            topSpacing:0,
            getWidthFrom:'#intro',
            responsiveWidth:true
        });

        // Initialize LocalScroll
        $('.top-nav').localScroll({
            duration:500,
            hash:true,
            offset: -65
        });

        //Initialize Morphext
        $(".scrollThrough h1").Morphext({
            animation: "flipInX",
            separator: ",",
            speed: 7500
        });
        //Set up Delayed Morphext
        setTimeout( function (){
            $(".scrollThroughOffset h1").css('display', 'none');
            $(".scrollThroughOffset .hideme").css('display', 'inline-block');
            $(".scrollThroughOffset .hideme").Morphext({
                // The [in] animation type. Refer to Animate.css for a list of available animations.
                animation: "flipInX",
                // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
                separator: ",",
                // The delay between the changing of each phrase in milliseconds.
                speed: 7500
            });
        }, 3750 );

        //Initialize Parllax
        $('#scene').parallax({
            relativeInput: true,
            clipRelativeInput: true
        });
    });

};


/*
Ask for Device Width
and Iframe width
Divide Device by iframe
apply decimal to transform
*/
function iframeWidth() {
    $device = $('.device');
    $iframe = $('.viewport iframe');

    var deviceWidth = $device.width();
    var frameWidth = $iframe.width();
    var scale = deviceWidth / frameWidth;

    $iframe.css({
        "// zoom": scale,
        "-moz-transform": "scale(" + scale + ")",
        "-o-transform": "scale(" + scale + ")",
        "-webkit-transform": "scale(" + scale + ")",
    });
};

$(document).ready( iframeWidth );
$(window).resize( iframeWidth );

$device = $('.device');

$('#iphone-toggle').click( function(){
    if ( $device.hasClass('device-desktop') ) {

        $device.removeClass('device-desktop');
        $device.addClass('device-phone');
        iframeWidth();

    } else if ( $device.hasClass('device-tablet') ) {

        $device.removeClass('device-tablet');
        $device.addClass('device-phone');
        iframeWidth();

    } else {

    }
});

$('#ipad-toggle').click( function(){
    if ( $device.hasClass('device-desktop') ) {

        $device.removeClass('device-desktop');
        $device.addClass('device-tablet');
        iframeWidth();

    } else if ( $device.hasClass('device-phone') ) {

        $device.removeClass('device-phone');
        $device.addClass('device-tablet');
        iframeWidth();

    } else {

    }
});

$('#mbp-toggle').click( function(){
    if ( $device.hasClass('device-tablet') ) {

        $device.removeClass('device-tablet');
        $device.addClass('device-desktop');
        iframeWidth();

    } else if ( $device.hasClass('device-phone') ) {

        $device.removeClass('device-phone');
        $device.addClass('device-desktop');
        iframeWidth();

    } else {

    }
});
