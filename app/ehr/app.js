'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'ui.layout',
  'hmsAuth',
  'hmsAppAuth',
  'hmsPatientDicom',
  'hmsPatientList',
  'hmsPatientAllergy',
  'hmsPatientDemographic',
  'hmsPatientVitalsigns',
  'hmsPatientLabresult',
  'hmsPatientMedication',
  'hmsPractitionerInfo',
  'hmsLogout',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.medcinsearch',
  'myApp.quippenote',
  'myApp.login',
  'myApp.econsent',
  'myApp.version'
])
// .run(function($rootScope, $templateCache) {
//    $rootScope.$on('$viewContentLoaded', function() {
//       $templateCache.removeAll();
//    });
// })
.controller('mainCtrl', function($scope,$rootScope,$cookies,$window) {
     // $scope.token = $cookies.getObject('token');
     // console.log($scope.token);
     // $scope.abc = $cookies.getObject('abc');



     var practitioner = $cookies.getObject('practitioner');

     if(practitioner === undefined || practitioner === null){
        console.log(practitioner);
        $rootScope.isLogin = false;
     }
     else{
        $rootScope.isLogin = true;
        $window.location='#!/patientlist';
     }


    $rootScope.openNewPage = function(val){
      if(val ===  "old"){
        $window.location='/hmsemr/';
      }
      else if(val === "new"){
        $window.location='#!/patientlist';
      }
      else{
        $window.location='/';
      }

    },
     
    $rootScope.logout = function(event){
      event.preventDefault();
      
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
            $cookies.remove(k);
        });

        $rootScope.isLogin = false;

        $window.location='#!/';

    }


    
})

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  
    .when('/patientlist', {
          templateUrl: 'view1/view1.html',
          controller: 'View1Ctrl'
    })
    // .when('/view1', {
    //       templateUrl: 'view1/view1.html',
    //       controller: 'View1Ctrl'
    // })
    .when('/patient/:patientId/:encounter', {
          templateUrl: 'view2/view2.html',
          controller: 'View2Ctrl'
    })
    .when('/', {
          templateUrl: 'login/login.html',
          controller: 'LoginCtrl'
    })
    .when('/labresult/:patientId/:encounter/:file/', {
          templateUrl: 'view3/view3.html',
          controller: 'View3Ctrl'
    })
    // .when('/labresult/', {
    //       templateUrl: 'view3/view3.html',
    //       controller: 'View3Ctrl'
    // })
    .when('/medcinsearch', {
          templateUrl: 'medcinsearch/medcinsearch.html',
          controller: 'medcinsearchCtrl'
    })
    .when('/econsent', {
          templateUrl: 'econsent/econsent.html',
          controller: 'econsentCtrl'
    })
    .when('/quippenote/:patientId/:encounter/', {
          templateUrl: 'quippenote/quippenote.html',
          controller: 'quippenoteCtrl'
    })


  $routeProvider.otherwise({redirectTo: '/patientlist'});
}]);
