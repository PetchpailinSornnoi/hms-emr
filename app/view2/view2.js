'use strict';

angular.module('myApp.view2', ['ngRoute','ngCookies'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view2', {
//     templateUrl: 'view2/view2.html',
//     controller: 'View2Ctrl'
//   });
// }])

.controller('View2Ctrl', function($scope,$routeParams,$cookies,$window,$rootScope) {

    $rootScope.hnHasLoaded = true;

    $rootScope.patientId = $routeParams.patientId;
    $rootScope.encounter = $routeParams.encounter;

    $rootScope.token = $cookies.getObject('token');



    $scope.showTabs = true;

    var practitioner = $cookies.getObject('practitioner');

    // console.log(practitioner);

    $rootScope.practitionerInfo = practitioner.name[0].given_name+" "+practitioner.name[0].family_name+"("+practitioner.qualification+") ,"+practitioner.specialty_desc;


     if(practitioner === undefined || practitioner === null){
        console.log(practitioner);
        $rootScope.isLogin = false;
     }
     else{
        $rootScope.isLogin = true;
     }

    $scope.redirectToNewPage = function(){
        alert("test");
        $window.location.href = '../DWV-Dicom/dwv/viewers/static/index.html';
    }
    
});