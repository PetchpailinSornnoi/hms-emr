angular.module('hmsPatientMedication', ["ngCookies"])
    .directive('hmsPatientMedication', function($http,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-patient-medication.html',
            scope: {
                url: "@",
                encounter: "@",
                accessToken: "@"
            },
            link: function($scope, element, attrs) {
                console.log($scope.selectedPatient);
                console.log($scope.accessToken);

                $scope.getPatientMedication = function() {
                  $http({
                    method : "GET",
                    url: "http://"+$scope.url+"/Medication/drug/"+$scope.encounter,
                    headers: {
                       'Authorization': 'Bearer '+$scope.accessToken,
                       "Access-Control-Allow-Origin": "*"
                    },
                  }).then(function mySuccess(response) {
                        console.log(response.data.data);
                        $scope.patientMedication = response.data.data;
                       
                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 
                }


                $scope.getPatientMedication();
            }
        };
    });
