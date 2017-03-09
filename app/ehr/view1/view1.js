'use strict';

angular.module('myApp.view1', ['ngRoute','ngCookies'])

.controller('View1Ctrl', function($scope,$http,$cookies,$rootScope) {
    var practitioner = $cookies.getObject('practitioner').practitioner;

    $scope.practitioner  = $cookies.getObject('practitioner');
    $scope.token = $cookies.getObject('token');
    $scope.showTabs = true;

    $rootScope.hnHasLoaded = false;
    $rootScope.practitionerInfo = practitioner.name[0].given_name+" "+practitioner.name[0].family_name+"("+practitioner.qualification+") ,"+practitioner.specialty_desc;


     if(practitioner === undefined || practitioner === null){
        $rootScope.isLogin = false;
     }
     else{
        $rootScope.isLogin = true;
     }
    

     if($cookies.getObject('selectedpatient') === undefined){
        $rootScope.isSelectedHn = false;
     }
     else{
        $rootScope.isSelectedHn = true;
        $rootScope.patientId = $cookies.getObject('selectedpatient').patientId;
        $rootScope.encounter = $cookies.getObject('selectedpatient').encounter;
     }
});