(function($) {
  
  function deg2rad(deg)
  {
    return deg*Math.PI/180;
  }
  function rad2deg(rad)
  {
    return rad*180/Math.PI;
  }
  
  
  $.fn.bobble = function(method) {

    return this.each(function() {
      var enteredAt_x = 0;
      var enteredAt_y = 0;
      var enteredAt_page_x = 0;
      var enteredAt_page_y = 0;
      var lastpos_x = 0;
      var lastpos_y = 0;
      var dampener = 10; //%


      function handleIn(target,pageX,pageY)
      {
        // on mouseover check to see if it's already moving.
        $(target).stop(true);
        $(target).css({'left': 0, 'top': 0, 'rotateZ': 0});
        enteredAt_y = pageY-$(target).offset().top;
        enteredAt_x = pageX-$(target).offset().left;
        enteredAt_page_x = pageX;
        enteredAt_page_y = pageY;
      }
      function handleMove(target,pageX,pageY)
      {
        var offset = $(target).offset();
        var x = pageX - (offset.left);
        var y = pageY - (offset.top);
        
        //pull and push effect - on mouse over, how much to drag the element in the given direction.
        var push_x = -(enteredAt_x - x)/dampener;
        var push_y = -(enteredAt_y - y)/dampener;

        $(target).css({'rotateZ': deg2rad(-push_x/1.5),
                     'left': (push_x*2.5),
                     'top': push_y/1.5,
                     'scale': 1+(push_y/500)});
      }
      function handleOut(target,pageX,pageY)
      {
        var leftAt_x = (pageX - enteredAt_page_x)/dampener;
        var leftAt_y = (pageY - enteredAt_page_y)/dampener;
        var leftAt_r = parseFloat(rad2deg($(this).css('rotateZ')));

        if (leftAt_x > 20)  leftAt_x = 10;
        if (leftAt_x < -20) leftAt_x = -10;
        if (leftAt_y > 20)  leftAt_y = 10;
        if (leftAt_y < -20) leftAt_y = -10;

        //mouse out bounce back animation
        $(target).animate({'left': -leftAt_x,     'top': -leftAt_y,     'rotateZ': deg2rad(-leftAt_r),     'scale': (1-(leftAt_y/500))},    100);
        $(target).animate({'left': leftAt_x*.9,   'top': leftAt_y*.9,   'rotateZ': deg2rad(leftAt_r*.9),   'scale': (1+(leftAt_y/500*.9))}, 100);
        $(target).animate({'left': -leftAt_x*.75, 'top': -leftAt_y*.66, 'rotateZ': deg2rad(-leftAt_r*.66), 'scale': (1-(leftAt_y/500*.66))},100);
        $(target).animate({'left': leftAt_x*.5,   'top': leftAt_y*.5,   'rotateZ': deg2rad(leftAt_r*.5),   'scale': (1+(leftAt_y/500*.5))}, 100);
        $(target).animate({'left': -leftAt_x*.25, 'top': -leftAt_y*.25, 'rotateZ': deg2rad(-leftAt_r*.25), 'scale': (1-(leftAt_y/500*.25))},100);
        $(target).animate({'left': 0,             'top': 0,             'rotateZ': 0,                      'scale': 1},                     100);
      }
      
      
      $(this).mouseover(function(e) {
        handleIn(this,e.pageX,e.pageY);
      });
      
      $(this).mousemove(function(e) {
        handleMove(this,e.pageX,e.pageY);
      });
     
      $(this).mouseout(function(e) {
        handleOut(this,e.pageX,e.pageY);
      });
      
      $(this).get(0).addEventListener("touchstart", function(e) {
        handleIn(this,e.targetTouches[0].pageX,e.targetTouches[0].pageY);
      }, false);
      
      $(this).get(0).addEventListener("touchmove", function(e) {
        e.preventDefault(); // disable iOS rubberband scrolling
        lastpos_x=e.targetTouches[0].pageX;
        lastpos_y=e.targetTouches[0].pageY;
        handleMove(this,e.targetTouches[0].pageX,e.targetTouches[0].pageY);
      }, false);
      $(this).get(0).addEventListener("touchend", function(e) {
        handleOut(this,lastpos_x,lastpos_y);
      }, false);
    });
  }
})(jQuery);
