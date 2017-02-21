'use strict';

angular.module('myApp.view3', ['ngRoute','ngCookies'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view2', {
//     templateUrl: 'view2/view2.html',
//     controller: 'View2Ctrl'
//   });
// }])

.controller('View3Ctrl', function($scope,$routeParams,$cookies,$window,$rootScope) {
	var practitioner = $cookies.getObject('practitioner');

    $rootScope.hnHasLoaded = false;

	$rootScope.practitionerInfo = practitioner.name[0].given_name+" "+practitioner.name[0].family_name+"("+practitioner.qualification+") ,"+practitioner.specialty_desc;

     if(practitioner === undefined || practitioner === null){
        console.log(practitioner);
        $rootScope.isLogin = false;
     }
     else{
        $rootScope.isLogin = true;
     }
    // $scope.patientId = $routeParams.patientId;
    // $scope.encounter = $routeParams.encounter;

    // $scope.token = $cookies.getObject('token');

    // $scope.showTabs = true;

    // $scope.redirectToNewPage = function(){
    //     alert("test");
    //     $window.location.href = '../DWV-Dicom/dwv/viewers/static/index.html';
    // }
    
});