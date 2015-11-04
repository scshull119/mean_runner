// Set easy handles on UI buttons
var $left = $('#left');
var $right = $('#right');

// Set easy handles on the various UI slides
var $welcome = $('#welcome-slide');
var $distance = $('#distance-slide');
var $days = $('#days-slide');
var $pace = $('#pace-slide');
var $signup = $('#signup-slide');
var $login = $('#login-slide');
var $profile = $('#profile-slide');
var $course = $('#course-slide');
var $race = $('#race-slide');


// *****  Functions for Displaying various "slides" within user interface *****

// Function for displaying Welcome slide...

function displayWelcome(origin) {
  slideIn($welcome, origin);
  $left.hide();
  $right.hide();
}

// Function and arrays for managing slide order and forward/back controls.

var newOrder = [$welcome, $distance, $days, $pace, $signup];
var loginOrder = [$welcome, $login];
var outputOrder = [$welcome, $course, $race];

function displaySlide(orderArray, index, origin) {
  $slide = orderArray[index];
  slideIn($slide, origin);

  if(index > 1) {
    $left.show();
    $left.on('click', function() {
      slideOut($slide, 'right');
      $left.off();
      $right.off();
      displaySlide(orderArray, (index - 1), 'left');
    });

  } else if(index === 1) {
    $left.show();
    $left.on('click', function() {
      slideOut($slide, 'right');
      $left.off();
      $right.off();
      displayWelcome('left');
    });

  } else {
    $left.off();
    $left.hide();
  }

  if(index < (orderArray.length - 1)) {
    $right.show();
    $right.on('click', function() {
      slideOut($slide, 'left');
      $left.off();
      $right.off();
      displaySlide(orderArray, (index + 1), 'right');
    });

  } else {
    $right.off();
    $right.hide();
  }
}

// Functions for moving slides in and out to/from the left and right

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


$(document).ready(function() {

  console.log("JS ready");

  // Listeners for welcome slide links..
  $('#launch-link').on('click', function(e) {
    e.preventDefault();
    slideOut($welcome, 'left');
    displaySlide(newOrder, 1, 'right');
    $right.hide();
  });

  $('#login-link').on('click', function(e) {
    e.preventDefault();
    slideOut($welcome, 'left');
    displaySlide(loginOrder, 1, 'right');
  });


});   // Closing document ready
