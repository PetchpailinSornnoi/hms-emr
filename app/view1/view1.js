'use strict';

angular.module('myApp.view1', ['ngRoute','ngCookies'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html',
//     controller: 'View1Ctrl'
//   });
// }])

.controller('View1Ctrl', function($scope,$http,$cookies,$rootScope) {
    $scope.practitioner  = $cookies.getObject('practitioner');
    $scope.token = $cookies.getObject('token');

    $scope.showTabs = true;

    var practitioner = $cookies.getObject('practitioner');

    $rootScope.practitionerInfo = practitioner.name[0].given_name+" "+practitioner.name[0].family_name+"("+practitioner.qualification+") ,"+practitioner.specialty_desc;

     if(practitioner === undefined || practitioner === null){
        console.log(practitioner);
        $rootScope.isLogin = false;
     }
     else{
        $rootScope.isLogin = true;
     }
    
    // $http.get('data/posts.json').
    // success(function(data, status, headers, config) {
    //     //$scope.demographics = data;
        
    // }).
    // error(function(data, status, headers, config) {
    //   // log error
    // });
   
    







});