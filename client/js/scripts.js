$(document).ready(function() {
  console.log("JS ready");

  // Easy handles on the various UI slides
  var $welcome = $('#welcome-slide');
  var $distance = $('#distance-slide');

  $('#launch-link').on('click', function(e) {
    e.preventDefault();
    $welcome.hide();
    $distance.show();
  });
});
