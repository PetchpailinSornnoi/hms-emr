'use strict';

angular.module('myApp.login', ['ngRoute'])

.controller('LoginCtrl', function($scope,$rootScope,$cookies) {

	$rootScope.hnHasLoaded = false;

	$scope.$on('token', function (event, result) {
         $scope.tokenHasLoaded = true;
         $scope.preload = true;
         $scope.token = result.data;
    });

});