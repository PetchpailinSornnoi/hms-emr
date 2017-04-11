angular.module('hmsPatientLabresult', ["ngCookies"])
    .directive('hmsPatientLabresult', function($http,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-patient-labresult.html',
            scope: {
                selectedPatient: "@",
                accessToken: "@",
                encounter: "@",
                setCode: "@",
                url : "@"
            },
            link: function($scope, element, attrs) {
                console.log($scope.selectedPatient);
                console.log($scope.accessToken);

                $scope.getPatientLabresult = function() {
                  // Observation/labresult/09-17-001101/O09-17-048651/N620?pretty=true
                  $http({
                    method : "GET",
                    url: $scope.url+"/Observation/labresult/"+$scope.selectedPatient+"/"+$scope.encounter+"/"+$scope.setCode,
                    // url: "http://"+$scope.url+"/Observation/labresult/09-17-001101/O09-17-048651/N620",
                    headers: {
                       'Authorization': 'Bearer '+$scope.accessToken,
                       "Access-Control-Allow-Origin": "*"
                    },
                  }).then(function mySuccess(response) {
                        console.log(response.data.data);
                        $scope.patientLabresult = response.data.data;
                       
                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 
                }


                $scope.getPatientLabresult();
            }
        };
    });


