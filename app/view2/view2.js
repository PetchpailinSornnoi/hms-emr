'use strict';

angular.module('myApp.view2', ['ngRoute','ngCookies'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view2', {
//     templateUrl: 'view2/view2.html',
//     controller: 'View2Ctrl'
//   });
// }])

.controller('View2Ctrl', function($scope,$routeParams,$cookies,$window) {
    $scope.patientId = $routeParams.patientId;
    $scope.token = $cookies.getObject('token');

    $scope.showTabs = true;

    $scope.redirectToNewPage = function(){
        alert("test");
        $window.location.href = '../DWV-Dicom/dwv/viewers/static/index.html';
    }
    
});