$(document).ready(function(){
    $("li").mouseover(function(){
        $(this).animate({ opacity: '0.25'}, "fast");
    });
    $("li").mouseout(function(){
        $(this).animate({ opacity: '1.0'}, "fast");
    });    
});	