'use strict';

angular.module('myApp.view3', ['ngRoute','ngCookies'])
.controller('View3Ctrl', function($scope,$routeParams,$cookies,$window,$rootScope) {

    $rootScope.hnHasLoaded = true;

    //$scope.fileurl = "https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/"+$routeParams.file;
    $scope.fileurl = "http://172.18.62.213/hmsgw/Dicom/"+$routeParams.file;
    //$scope.fileurl = "http://localhost:8009/getDICOM";
    $scope.dicomURL ="DWV-Dicom/dwv/viewers/static/index.html?input="+$scope.fileurl;
    //$scope.dicomURL = "DWV-Dicom/dwv/viewers/static/index.html";

    $scope.patientId = $routeParams.patientId;
    $scope.encounter = $routeParams.encounter;

    $scope.token = $cookies.getObject('token');

	var practitioner = $cookies.getObject('practitioner').practitioner;


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