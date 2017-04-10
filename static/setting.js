var Spinner_Opts = {
  lines: 13 // The number of lines to draw
, length: 18 // The length of each line
, width: 14 // The line thickness
, radius: 42 // The radius of the inner circle
, scale: 0.5 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#000' // #rgb or #rrggbb or array of colors
, opacity: 0.25 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1 // Rounds per second
, trail: 60 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}

$(function(){
    $("#wrapper").scroll(function(){
        $("#outerpanel")
            .scrollLeft($("#wrapper").scrollLeft());
    });
    $("#outerpanel").scroll(function(){
        $("#wrapper")
            .scrollLeft($("#outerpanel").scrollLeft());
    });
});

$(function(){
    $("#wrapper2").scroll(function(){
        $("#outerpanel2")
            .scrollLeft($("#wrapper2").scrollLeft());
    });
    $("#outerpanel2").scroll(function(){
        $("#wrapper2")
            .scrollLeft($("#outerpanel2").scrollLeft());
    });
});


$(function(){
    $("#wrapper1").scroll(function(){
        $("#outerpanel1")
            .scrollLeft($("#wrapper1").scrollLeft());
    });
    $("#outerpanel1").scroll(function(){
        $("#wrapper1")
            .scrollLeft($("#outerpanel1").scrollLeft());
    });
});

$(function() {
      $('.selectbar').barrating({
        theme: 'bars-1to10'
      });
   });


var Loading_Spinner = new Spinner(Spinner_Opts).spin(d3.select('#spin').node());
Unfreeze();

TP_path=['R_n_HM','R_r_HM','R_n_GM','R_r_GM','R_n_AM','R_r_AM']
TP_explore=['R_n_HM','R_r_HM','R_n_GM','R_r_GM','R_n_AM','R_r_AM']