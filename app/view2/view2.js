'use strict';

angular.module('myApp.view2', ['ngRoute','ngCookies'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view2', {
//     templateUrl: 'view2/view2.html',
//     controller: 'View2Ctrl'
//   });
// }])

.controller('View2Ctrl', function($scope,$routeParams,$cookies,$window,$rootScope, $sce) {
    $scope.patientId = $routeParams.patientId;
    $scope.encounter = $routeParams.encounter;

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

    $scope.redirectToNewPage = function(){
        alert("test");
        $window.location.href = '../DWV-Dicom/dwv/viewers/static/index.html';
    }
    //$scope.quippeURL = "http://10.103.10.61:9100/BDMSDefault.htm?cookieID=1478572578212&patientId="+$routeParams.patientId+"&episodeNumber="+$routeParams.encounter;
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.quippeURL = {src:"http://10.103.10.61:9100/BDMSDefault.htm?cookieID=1478572578212&patientId="+$routeParams.patientId+"&episodeNumber="+$routeParams.encounter, title:"Quippe"};

});