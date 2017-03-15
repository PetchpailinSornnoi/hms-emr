'use strict';

angular.module('myApp.view2', ['ngRoute','ngCookies'])

.controller('View2Ctrl', function($scope,$routeParams,$cookies,$window,$rootScope, $sce,$http) {
    $scope.patientId = $routeParams.patientId;
    $scope.encounter = $routeParams.encounter;

    $scope.setcode = "N620";

    $scope.dicomURL = "DWV-Dicom/dwv/viewers/static/index.html";
    $scope.showTabs = true;

    $rootScope.token = $cookies.getObject('token');
    $rootScope.hnHasLoaded = true;

    var practitioner = $cookies.getObject('practitioner').practitioner;

    $rootScope.practitionerInfo = practitioner.name[0].given_name+" "+practitioner.name[0].family_name+"("+practitioner.qualification+") ,"+practitioner.specialty_desc;

    // console.log("## Patient Obj##");
    // console.log($cookies.getObject('patient'));
   

    
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


    var selectedpatient = $cookies.getObject('practitioner').practitioner;

    //$scope.quippeURL = "http://10.103.10.61:9100/BDMSDefault.htm?cookieID=1478572578212&patientId="+$routeParams.patientId+"&episodeNumber="+$routeParams.encounter;
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.quippeURL = {src:"http://172.18.62.227:9100/BDMSDefault.htm?patientId="+$routeParams.patientId+"&episodeNumber="+$routeParams.encounter, title:"Quippe"};
     

    $http({
            method : "GET",
            url: "http://172.18.62.213/hmsgw/Dicom/list",
            headers: {
                'Authorization': 'Bearer '+$rootScope.token.access_token,
                "Access-Control-Allow-Origin": "*"
            },
        }).then(function mySuccess(response) {
            //$scope.dicomFile = response.data;
            $scope.dicomFile = response.data;
        }, function myError(response) {
            $scope.error = response.statusText;
    }); 
});