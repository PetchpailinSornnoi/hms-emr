'use strict';

angular.module('myApp.quippenote', ['ngRoute','ngCookies'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view2', {
//     templateUrl: 'view2/view2.html',
//     controller: 'View2Ctrl'
//   });
// }])

.controller('quippenoteCtrl', function($scope,$routeParams,$cookies,$window,$rootScope,$http,$sce) {

   
	var practitioner = $cookies.getObject('practitioner').practitioner;

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

    

     $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.quippeURL = {src:"http://172.18.62.227:9100/GLSDefault.htm?patientId="+$routeParams.patientId+"&EpisodeNumber="+$routeParams.encounter+"&Username=009900203&templateId=shared:AAD1FB61DA6B4116B441BD14C6FAE232", title:"Quippe"};

    
});