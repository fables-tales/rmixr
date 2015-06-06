(function(){
    document.addEventListener('keypress',function(deets){
        if(deets.charCode===32) window.togglePlayPause();
    });
}());

