angular.module('hmsAppAuth', ["ngCookies"])
    .directive('hmsAppAuth', function($http,$rootScope,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-app-auth.html',
            scope: {
                username: "@",
                password: "@",
                clientId: "@",
                clientSecret: "@",
            },
            link: function($scope, element, attrs) {
                $http({
                    method : "POST",
                    url : "http://localhost:9000/o/token/?grant_type=password&username=admin&password=1qazxsw2&client_id=8006w2gVLUH1BVPUn42eFXBKEHWCQJf0XUrhwhI4&client_secret=r59k06WRHi2XToCOUk9wBn7ZJqfYPGtXnMtoHieTDMeF9ZRjepRExZS5KUhe1JZLdmqmoIoL3CKZWfpZGmuuGe8N2fNVLtnl3fWWHsLqRaPSdXnRxAYaGLwBzdlsFyS2"
                    // url : "http://localhost:9000/o/token/?grant_type=password&username="+
                    // $scope.username+"&"+$scope.password+"="+$scope.clientId+"&"+$scope.clientSecret+"="+$scope.clientSecret
                }).then(function mySuccess(response) {
        
                // console.log(response);
                $scope.accessToken = response.data.access_token;

                $cookies.putObject('token',response.data);

                $rootScope.$broadcast('token', {
                    data: $scope.accessToken
                });

                }, function myError(response) {
                    $scope.error = response.statusText;
                }); 
            }
        };
    });


