/* 
Image Panning Effect
Code modified from malihu.gr
http://manos.malihu.gr/jquery-image-panning/
*/

$(window).load(function() {
    //$outer_container=$("#intro");
    $imagePan_panning=$("#intro .panning");
    $imagePan=$("#intro");
    $imagePan_container=$("#intro .imagePanner");
 
    //$imagePan_panning.css("margin-top",($imagePan.height()-$imagePan_panning.height())/2+"px");
    containerWidth=$imagePan.width();
    containerHeight=$imagePan.height();
    totalContentW=$imagePan_panning.width();
    totalContentH=$imagePan_panning.height();
    $imagePan_container.css("width",totalContentW).css("height",totalContentH);
 
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
        var animSpeed=1000; //ease amount
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
 
    $(window).bind("mousemove", function(event){
        MouseMove(event);
    });
});
 
$(window).resize(function() {
    $imagePan.unbind("mousemove");
    $imagePan_container.css("top",0).css("left",0);
    $(window).load();
});

$('.top-nav').affix({
    offset: {
        top: $('.welcome').height()
    }
});