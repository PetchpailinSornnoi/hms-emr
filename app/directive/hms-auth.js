angular.module('hmsAuth', ["ngCookies"])
    .directive('hmsAuth', function($http,$window,$cookies,$rootScope) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-auth.html',
            scope: {
                username: "@",
                date: "@"
            },
            link: function($scope, element, attrs) {
                
                $scope.$on('token', function (event, result) {
                    $scope.receivedData = result.data;
                    $scope.accessToken = result.data;
                });

                // $scope.$on('publishHn', function (event, result) {
                //     $scope.receivedData = result.data;
                //     $scope.hn = result.data;
                // });

                $scope.login = function(){
                    var user_authen = "009900203";
                    var pass_authen = "6ZoYxCjLONXyYIU2eJIuAw==";
                    $http({
                        method : "GET",
                        url: "http://localhost:9000/user_authentication",
                        headers: {
                           'Authorization': 'Bearer '+$scope.accessToken,
                           "Access-Control-Allow-Origin": "*"
                        },
                        params: {"user": user_authen , "pass": pass_authen}
                    }).then(function mySuccess(response) {
                        var practitioner = response.data.practitioner[0].practitioner;

                        $cookies.putObject('practitioner', practitioner);

                     
                        // var cookieWObject = $cookies.getObject('practitioner');
                        // console.log(cookieWObject);


                        $window.location='/#!/view1';
                        
                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 

                }

            }
        };
    });


