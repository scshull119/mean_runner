angular.module('RaceMaker', []);

var couseKmlName;
var raceKmlName;

angular.module('RaceMaker').controller('RacesController', ['$scope', '$http', function($scope, $http) {

  var currentDate = Date.now();

  console.log("RaceMaker controller is working");

  $scope.races = [];
  $scope.newRace = {};

  $scope.users = [];
  $scope.newUser = {};

  $scope.courses = [];
  $scope.newCourse = {};

  $scope.distance = 1;
  $scope.days = 3;
  $scope.paceMins = 10;
  $scope.paceSecs  = 0;

  $scope.attemptingUser = {};
  $scope.currentUser;

  var weeklyIncrease = .35;
  var weeklyMiles;
  var goalMilesPerWeek;
  var goalRaceDistance;

  $scope.myCourse;
  $scope.myRace;

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
    });
  };

  $scope.getUsers = function() {
    $http.get('/api/users').then(function(response) {
      $scope.users = response.data;
    });
  };

  $scope.loginUser = function() {
    $http.post('/login', $scope.attemptingUser).then(function(response) {
      if(response.status === 401) {
        alert("Error!");
      } else {
        $scope.currentUser = response.data
        console.log($scope.currentUser);
      }
    });
  };

  $scope.logoutUser = function() {
    $http.post('/logout').then(function(response) {
      $scope.currentUser = null;
    });
  };

  $scope.createUser = function() {
    $http.post('/api/users', $scope.newUser).then(function(response) {
      $scope.users.push(response.data);
      $scope.newUser = {};
      slideOut($signup, 'left');
      displaySlide(outputOrder, 1, 'right');
    })
  };

  $scope.storeDistance = function() {
    $left.off();
    $right.off();

    $scope.distance = parseFloat($('#distance-input').val());
    $scope.newUser.startMileage = $scope.distance;

    if($scope.distance >= 4) {
      weeklyIncrease = .5;
    }
    console.log("Stored Distance: " + $scope.distance);

    $scope.myCourse = searchCourses();
    $scope.newUser.myCourse = $scope.myCourse;
    console.log($scope.myCourse.name);
    courseKmlName = $scope.myCourse.kmlName;

    slideOut($distance, 'left');
    displaySlide(newOrder, 2, 'right');
    $right.hide();
  };

  $scope.storeDays = function() {
    $left.off();
    $right.off();

    $scope.days = parseInt($('#days-input').val());
    $scope.newUser.startDays = $scope.days;
    weeklyMiles = $scope.distance * $scope.days;
    totalWeeklyIncrease = weeklyIncrease * $scope.days;
    goalMilesPerWeek = weeklyMiles + (totalWeeklyIncrease * 6);
    goalRaceDistance = $scope.distance + (weeklyIncrease * 6);
    console.log("Weekly Increase: " + weeklyIncrease + ", Starter Distance: " + $scope.distance);
    console.log("Stored Days/week: " + $scope.days);
    console.log("Goal Race Distance: " + goalRaceDistance + " miles");

    $scope.myRace = searchRaces();
    $scope.newUser.myRace = $scope.myRace;
    console.log($scope.myRace.name);
    raceKmlName = $scope.myRace.kmlName;

    initMap();

    slideOut($days, 'left');
    displaySlide(newOrder, 3, 'right');
    $right.hide();
  };

  $scope.storePace = function() {
    $left.off();
    $right.off();
    $scope.paceMins = parseInt($('#pace-mins').val());
    $scope.newUser.startPaceMins = $scope.paceMins;
    $scope.paceSecs = parseInt($('#pace-secs').val());
    $scope.newUser.startPaceSecs = $scope.paceSecs;
    console.log("Stored Pace: " + $scope.paceMins + ":" + $scope.paceSecs);
    projectRaceTime();
    console.log($scope.projectedTimeString);

    slideOut($pace, 'left');
    displaySlide(newOrder, 4, 'right');
    $right.hide();
  };

  $scope.noSave = function() {
    $left.off();
    $right.off();
    $('#distance-input').val('');
    $('#days-input').val('');
    $('#pace-mins').val('');
    $('#pace-secs').val('');
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

  function projectRaceTime() {
    var milePaceMins = $scope.paceMins;
    var milePaceSecs = $scope.paceSecs;
    var raceMileage = $scope.myRace.mileage;
    var mileDecimalMins = milePaceMins + (milePaceSecs / 60);

    var raceTime = mileDecimalMins * Math.pow(raceMileage, 1.06);

    if(raceTime >= 60) {
      var projectedHours = Math.floor(raceTime / 60);
      projectedHours.toString();
      raceTime -= projectedHours * 60;
    }

    var projectedMins = Math.floor(raceTime);
    var projectedSecs = Math.floor((raceTime - projectedMins) * 60);

    if(projectedHours) {
      $scope.projectedTimeString = projectedHours + ":" + precedingZero(projectedMins) + ":" + precedingZero(projectedSecs);
    } else {
      $scope.projectedTimeString = precedingZero(projectedMins) + ":" + precedingZero(projectedSecs);
    }
  }

  function precedingZero(myInt) {
    if(myInt < 10) {
      myInt = myInt.toString();
      return '0' + myInt;
    } else {
      myInt = myInt.toString();
      return myInt;
    }
  }

}]);
