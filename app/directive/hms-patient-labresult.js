angular.module('hmsPatientLabresult', ["ngCookies"])
    .directive('hmsPatientLabresult', function($http,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-patient-labresult.html',
            scope: {
                selectedPatient: "@",
                accessToken: "@"
            },
            link: function($scope, element, attrs) {
                console.log($scope.selectedPatient);
                console.log($scope.accessToken);

                $scope.getPatientLabresult = function() {
                  $http({
                    method : "GET",
                    // url: "http://localhost:9000/Observation/lab/"+$scope.selectedPatient,
                    url: "http://localhost:9000/Observation/lab/09-95-000001",
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


