angular.module('hmsAuth', ["ngCookies"])
    .directive('hmsAuth', function($http,$window,$cookies,$rootScope) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-auth.html',
            scope: {
                url : '@',
                username: "@",
                date: "@",
                accessToken: "="
            },
            link: function($scope, element, attrs) {

              
                
                
                // $scope.$on('token', function (event, result) {
                //     $scope.receivedData = result.data;
                //     $scope.accessToken = result.data;

                // });

               

                // $scope.$on('publishHn', function (event, result) {
                //     $scope.receivedData = result.data;
                //     $scope.hn = result.data;
                // });

                $scope.login = function(){
                    var user_authen = "009900203";
                    var pass_authen = "865202d8a5d38f56e428b3c0b512510c";

                    $http({
                        method : "GET",
                        url: $scope.url+"/user/authentication",
                        //url: "http://172.18.62.213/hmsgw/user_authentication?user=009900203&pass=865202d8a5d38f56e428b3c0b512510c",
                        headers: {
                           'Authorization': 'Bearer '+$scope.accessToken,
                           "Access-Control-Allow-Origin": "*"
                        },
                        params: {"user": user_authen , "pass": pass_authen}
                    }).then(function mySuccess(response) {
                        console.log(response.data.data);
                        var practitioner = response.data.data;
                        console.log(practitioner);


                        $cookies.putObject('practitioner', practitioner);

                     
                        var cookieWObject = $cookies.getObject('practitioner');
                        console.log(cookieWObject);


                        $window.location='#!/patientlist';
                        
                    }, function myError(response) {
                        console.log(response);
                        $scope.error = response.statusText;
                    }); 

                }

            }
        };
    });


