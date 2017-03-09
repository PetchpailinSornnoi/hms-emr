angular.module('hmsLogout', ["ngCookies"])
    .directive('hmsLogout', function($http,$window,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-logout.html',
            scope: {
                url: "@",
                selectedPatient: "@",
                accessToken: "@"
            },
            link: function($scope, element, attrs) {
               
                $scope.logout = function(){
                    // event.preventDefault();
                    console.log("log out");
      
                    var cookies = $cookies.getAll();
                    
                    angular.forEach(cookies, function (v, k) {
                        $cookies.remove(k);
                    });

                    $window.location='/#!/login';

                }
                
            }
        };
    });


