angular.module('RaceMaker', []);

angular.module('RaceMaker').controller('RacesController', ['$scope', '$http', function($scope, $http) {

  console.log("RaceMaker controller is working");

  $scope.races = [];
  $scope.newRace = {};

  $scope.courses = [];
  $scope.newCourse = {};

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

}]);
