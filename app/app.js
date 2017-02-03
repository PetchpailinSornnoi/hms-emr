'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.materialize',
  'ngRoute',
  'ngCookies',
  'ui.layout',
  'hmsAuth',
  'hmsAppAuth',
  'hmsPatientList',
  'hmsPatientAllergy',
  'hmsPatientDemographic',
  'hmsPatientVitalsigns',
  'hmsPatientLabresult',
  'myApp.view1',
  'myApp.view2',
  'myApp.login',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  
    .when('/', {
          templateUrl: 'view1/view1.html',
          controller: 'View1Ctrl'
    })
    .when('/view1', {
          templateUrl: 'view1/view1.html',
          controller: 'View1Ctrl'
    })
    .when('/patient/:patientId', {
          templateUrl: 'view2/view2.html',
          controller: 'View2Ctrl'
    })
    .when('/login', {
          templateUrl: 'login/login.html',
          controller: 'LoginCtrl'
    })

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
