'use strict';

angular.module('myApp.medcinsearch', ['ngRoute','ngCookies'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view2', {
//     templateUrl: 'view2/view2.html',
//     controller: 'View2Ctrl'
//   });
// }])

.controller('medcinsearchCtrl', function($scope,$routeParams,$cookies,$window,$rootScope,$http) {

   
	var practitioner = $cookies.getObject('practitioner').practitioner;

    $rootScope.hnHasLoaded = false;

	$rootScope.practitionerInfo = practitioner.name[0].given_name+" "+practitioner.name[0].family_name+"("+practitioner.qualification+") ,"+practitioner.specialty_desc;

     if(practitioner === undefined || practitioner === null){
        $rootScope.isLogin = false;
     }
     else{
        $rootScope.isLogin = true;
     }
    
    // $scope.searchMedcin = function(){
        
    //     $http({
    //         method : "GET",
    //         // url: "http://10.103.10.61:9100/ws.aspx/Medcin/Search?Query="+$scope.query+"&DataFormat=2",
    //         url: "http://10.103.10.60:1881/medcinquery?Query="+$scope.query
    //     }).then(function mySuccess(response) {
    //         $scope.medcinDetail = JSON.stringify(response.data, undefined, 2);
    //     }, function myError(response) {
    //         $scope.error = response.statusText;
    //     }); 
    // }
    
});