

$(document).ready(function() {

  var myApp = myApp || {};

  console.log("JS ready");

  // Button handles (global)
  var $left;
  var $right;

  // "Slide" handles (global)
  var $welcome;
  var $distance;
  var $days;

  // Set easy handles on UI buttons
  $left = $('#left');
  $right = $('#right');

  // Set easy handles on the various UI slides
  $welcome = $('#welcome-slide');
  $distance = $('#distance-slide');
  $days = $('#days-slide');

  // Listeners for welcome slide links..
  $('#launch-link').on('click', function(e) {
    e.preventDefault();
    slideOut($welcome, 'left');
    displayDistance('right');
  });

  // *****  Functions for Displaying various "slides" within user interface *****

  // Function for displaying Welcome slide...

  function displayWelcome(origin) {
    slideIn($welcome, origin);
    $left.hide();
    $right.hide();
  }

  // Function for displaying Distance Query slide...

  function displayDistance(origin) {
    slideIn($distance, origin);
    $left.show();
    $right.show();
    $left.on('click', function() {
      slideOut($distance, 'right');
      $left.off();
      $right.off();
      displayWelcome('left');
    });
    $right.on('click', function() {
      slideOut($distance, 'left');
      $left.off();
      $right.off();
      displayDays('right');
    });
  }

  function displayDays(origin) {
    slideIn($days, origin);
    $left.show();
    $right.show();
    $left.on('click', function() {
      slideOut($days, 'right');
      $left.off();
      $right.off();
      displayDistance('left');
    });
  }

  function slideIn($slide, direction) {
    console.log("Sliding in from " + direction + "!");

    var positionValue;

    if(direction === "left") {
      positionValue = '-100%';
    } else if(direction === "right") {
      positionValue = '100%';
    }

    $slide.css('left', positionValue);
    var slideObject = {};
    slideObject['left'] = '0';
    $slide.animate(slideObject);
  }


  function slideOut($slide, direction) {

    var positionValue;

    if(direction === "left") {
      positionValue = '-100%';
    } else if(direction === "right") {
      positionValue = '100%';
    }

    console.log("Sliding out to " + direction + "!");
    var slideObject = {};
    slideObject['left'] = positionValue;
    $slide.animate(slideObject, function() {
      console.log("Slide out COMPLETED");
    });
  }

});   // Closing document ready
