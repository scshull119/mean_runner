// Button handles (global)
var $left
var $right

// "Slide" handles (global)
var $welcome
var $distance

$(document).ready(function() {
  console.log("JS ready");

  // Set easy handles on UI buttons
  $left = $('#left');
  $right = $('#right');


  // Set easy handles on the various UI slides
  $welcome = $('#welcome-slide');
  $distance = $('#distance-slide');

  // Listeners for welcome slide links..
  $('#launch-link').on('click', function(e) {
    e.preventDefault();
    $welcome.hide();
    displayDistance();
  });

});   // Closing document ready


// *****  Functions for Displaying various "slides" within user interface *****

// Function for displaying Welcome slide...

function displayWelcome() {
  $welcome.show();
  $left.hide();
  $right.hide();
}

// Function for displaying Distance Query slide...

function displayDistance() {
  $distance.show();
  $left.show();
  $right.show();
  $left.on('click', function() {
    $distance.hide();
    displayWelcome();
  });
}
