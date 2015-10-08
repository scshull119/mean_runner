function initMap() {
  var courseMap = new google.maps.Map(document.getElementById('course-map'), {
    center: {lat: 40.771440, lng: -73.974180},
    scrollwheel: false,
    zoom: 14
  });

  var raceMap = new google.maps.Map(document.getElementById('race-map'), {
    center: {lat: 40.771440, lng: -73.974180},
    scrollwheel: false,
    zoom: 14
  });


  var courseKmlUrl = 'https://dl.dropboxusercontent.com/u/50332766/kml/prospect.kml';
  var courseKmlOptions = {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: courseMap
  };
  var courseKmlLayer = new google.maps.KmlLayer(courseKmlUrl, courseKmlOptions);

  var raceKmlUrl = 'https://dl.dropboxusercontent.com/u/50332766/kml/brooklynhalf.kml';
  var raceKmlOptions = {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: raceMap
  };
  var raceKmlLayer = new google.maps.KmlLayer(raceKmlUrl, raceKmlOptions);
}
