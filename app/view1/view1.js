'use strict';

angular.module('myApp.view1', ['ngRoute','ngCookies'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html',
//     controller: 'View1Ctrl'
//   });
// }])

.controller('View1Ctrl', function($scope,$http,$cookies) {
    $scope.practitioner  = $cookies.getObject('practitioner');
    $scope.token = $cookies.getObject('token');

    $scope.showTabs = true;
    
    // $http.get('data/posts.json').
    // success(function(data, status, headers, config) {
    //     //$scope.demographics = data;
        
    // }).
    // error(function(data, status, headers, config) {
    //   // log error
    // });
   
    







});