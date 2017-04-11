angular.module('hmsPatientVitalsigns', ["ngCookies"])
    .directive('hmsPatientVitalsigns', function($http,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-patient-vitalsigns.html',
            scope: {
                url: "@",
                selectedPatient: "@",
                encounter: "@",
                accessToken: "@"
            },
            link: function($scope, element, attrs) {
                console.log($scope.encounter);
                // console.log($scope.accessToken);

                $scope.getPatientVitalSigns = function() {
                  $http({
                    method : "GET",
                    url:  $scope.url+"/Observation/vitalsign/"+$scope.selectedPatient+"/"+$scope.encounter,
                    //url: "http://localhost:9000/Observation/vital/09-95-000001",
                    headers: {
                       'Authorization': 'Bearer '+$scope.accessToken,
                       "Access-Control-Allow-Origin": "*"
                    },
                  }).then(function mySuccess(response) {
                        console.log(response.data.data);
                        $scope.patientVitalsigns = response.data.data;
                        // $scope.patient = response.data.data;
                       
                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 
                }


                $scope.getPatientVitalSigns();
            }
        };
    });


