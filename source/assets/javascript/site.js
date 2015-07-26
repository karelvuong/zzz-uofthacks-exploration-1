//= require_tree .
//= require lib/bootstrap.js
//= require lib/headroom.min.js
//= require lib/smooth-scroll.min.js

document.addEventListener("DOMContentLoaded", function(event) {
  // Headroom
  (function() {
    var header = document.getElementsByClassName('site-header')[0];
    var headroomHeader  = new Headroom(header, {
      "offset": header.offsetTop
    });

    headroomHeader.init();

    var footer = document.getElementsByClassName('uh-footer')[0];
    var headroomFooter  = new Headroom(footer, {
      "offset": header.offsetTop
    });

    headroomFooter.init();
  })();

  // Smooth scrolling
  (function() {
    smoothScroll.init({
      easing: "easeInOutCubic",
      offset: 40,
      speed: 350,
      callbackBefore: function ( toggle, anchor ) {
        var links = document.querySelectorAll('[data-scroll]'),
            len = links.length;

        for (var i = 0; i < len; i++) {
          removeClass(links[i], "active");
        }
      },
      callbackAfter: function ( toggle, anchor ) {
        var links = document.querySelectorAll('[data-scroll]'),
            len = links.length;

        for (var i = 0; i < len; i++) {
          addClass(toggle, "active");
        }
      }
    });

    function addClass(el, className) {
      if (el.classList)
        el.classList.add(className);
      else
        el.className += ' ' + className;
    }

    function removeClass(el, className) {
      if (el.classList)
        el.classList.remove(className);
      else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  })();
});

// Scrollspy
(function($) {
  $("body").scrollspy({
    target: ".site-header"
  });
})(jQuery);
