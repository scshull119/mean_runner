

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
    $welcome.hide();
    displayDistance();
  });

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
      $left.off();
      $right.off();
      displayWelcome();
    });
    $right.on('click', function() {
      $distance.hide();
      $left.off();
      $right.off();
      displayDays();
    });
  }

  function displayDays() {
    $days.show();
    $left.show();
    $right.show();
    $left.on('click', function() {
      $days.hide();
      displayDistance();
    });
  }

});   // Closing document ready
