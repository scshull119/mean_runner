angular.module('RaceMaker', []);

angular.module('RaceMaker').controller('RacesController', ['$scope', '$http', function($scope, $http) {

  var currentDate = Date.now();

  console.log("RaceMaker controller is working");

  $scope.races = [];
  $scope.newRace = {};

  $scope.courses = [];
  $scope.newCourse = {};

  $scope.distance = 1;
  $scope.days = 3;
  $scope.paceMins = 10;
  $scope.paceSecs  = 0;

  var weeklyIncrease = .35;
  var weeklyMiles;
  var goalMilesPerWeek;
  var goalRaceDistance;

  var myCourse;
  var myRace;

  $scope.getRaces = function() {
    $http.get('/api/races').then(function(response) {
      $scope.races = response.data;
    });
  };
  $scope.getRaces();

  $scope.createRace = function() {
    $http.post('/api/races', $scope.newRace).then(function(response) {
      $scope.races.push(response.data);
      $scope.newRace = {};
    })
  };

  $scope.getCourses = function() {
    $http.get('/api/courses').then(function(response) {
      $scope.courses = response.data;
    });
  };
  $scope.getCourses();

  $scope.createCourse = function() {
    $http.post('/api/courses', $scope.newCourse).then(function(response) {
      $scope.courses.push(response.data);
      $scope.newCourse = {};
    })
  };

  $scope.getUsers = function() {
    $http.get('/api/races').then(function(response) {
      $scope.races = response.data;
    });
  };

  $scope.createUser = function() {
    $http.post('/api/races', $scope.newRace).then(function(response) {
      $scope.races.push(response.data);
      $scope.newRace = {};
    })
  };

  $scope.storeDistance = function() {
    $left.off();
    $right.off();

    $scope.distance = parseFloat($('#distance-input').val());

    if($scope.distance >= 4) {
      weeklyIncrease = .5;
    }
    console.log("Stored Distance: " + $scope.distance);
    myCourse = searchCourses();
    console.log(myCourse.name);

    slideOut($distance, 'left');
    displaySlide(newOrder, 2, 'right');
    $right.hide();
  };

  $scope.storeDays = function() {
    $left.off();
    $right.off();

    $scope.days = parseInt($('#days-input').val());
    weeklyMiles = $scope.distance * $scope.days;
    totalWeeklyIncrease = weeklyIncrease * $scope.days;
    goalMilesPerWeek = weeklyMiles + (totalWeeklyIncrease * 6);
    goalRaceDistance = $scope.distance + (weeklyIncrease * 6);
    console.log("Weekly Increase: " + weeklyIncrease + ", Starter Distance: " + $scope.distance);
    console.log("Stored Days/week: " + $scope.days);
    console.log("Goal Race Distance: " + goalRaceDistance + " miles");

    myRace = searchRaces();
    console.log(myRace.name);

    slideOut($days, 'left');
    displaySlide(newOrder, 3, 'right');
    $right.hide();
  };

  $scope.storePace = function() {
    $left.off();
    $right.off();
    $scope.paceMins = $('#pace-mins').val();
    $scope.paceSecs = $('#pace-secs').val();
    console.log("Stored Pace: " + $scope.paceMins + ":" + $scope.paceSecs);
    slideOut($pace, 'left');
    displaySlide(newOrder, 4, 'right');
    $right.hide();
  };

  $scope.noSave = function() {
    $left.off();
    $right.off();
    slideOut($signup, 'left');
    displaySlide(outputOrder, 1, 'right');
  };

  function searchCourses() {
    var potentialCourses = [];
    for(var i = 0; i < $scope.courses.length; i++) {
      if($scope.distance > ($scope.courses[i].mileage * .75) && $scope.distance < ($scope.courses[i].mileage * 1.25)) {
        potentialCourses.push($scope.courses[i]);
      }
    }
    if(potentialCourses.length) {
      var courseIndex = Math.floor(Math.random() * potentialCourses.length);
      return potentialCourses[courseIndex];
    } else {
      return false;
    }
  }

  function searchRaces() {
    var potentialRaces = [];
    var closestRace;
    var closestRaceDifference = 3000;
    for(var i = 0; i < $scope.races.length; i++) {
      var raceDate = Date.parse($scope.races[i].date)
      var raceDistance =  $scope.races[i].mileage;
      var leadTimeWeeks = (raceDate - currentDate) / 604800000;
      if(($scope.distance + (leadTimeWeeks * weeklyIncrease)) > (raceDistance * .9) && leadTimeWeeks >= 4) {
        potentialRaces.push($scope.races[i]);
      }
    }
    if(potentialRaces.length > 0) {
      for(var j = 0; j < potentialRaces.length; j++) {
        var raceDifference = Math.abs(potentialRaces[j].mileage - goalRaceDistance);
        if(raceDifference < closestRaceDifference) {
          closestRaceDifference = raceDifference;
          closestRace = potentialRaces[j];
        }
      }
      return closestRace;
    } else {
      return false;
    }
  }

}]);
