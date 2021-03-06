'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.materialize',
  'ngRoute',
  'ngCookies',
  'ui.layout',
  'hmsAuth',
  'hmsAppAuth',
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
  'myApp.login',
  'myApp.version'
])


// .run(function($rootScope, $templateCache) {
//    $rootScope.$on('$viewContentLoaded', function() {
//       $templateCache.removeAll();
//    });
// })

.controller('mainCtrl', function($scope,$rootScope,$cookies,$window) {
    
    $rootScope.apiUrl = "http://172.18.62.213:10101/hmsgw";

    if($window.location.hostname !== 'localhost'){
       $rootScope.apiUrl = "http://"+$window.location.host+"/hmsgw";
    }

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
        $window.location='#!/patientlist';
      }
      else if(val === "new"){
        $window.location='ehr/#!/patientlist';
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


  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
