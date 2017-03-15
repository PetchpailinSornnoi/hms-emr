angular.module('hmsPatientAllergy', ["ngCookies"])
    .directive('hmsPatientAllergy', function($http,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-patient-allergy.html',
            scope: {
                url: "@",
                selectedPatient: "@",
                accessToken: "@"
            },
            link: function($scope, element, attrs) {
                console.log($scope.selectedPatient);
                console.log($scope.accessToken);

                $scope.getPatientAllergy = function() {
                  $http({
                    method : "GET",
                    url: "http://"+$scope.url+"/Allergy/"+$scope.selectedPatient,
                    headers: {
                       'Authorization': 'Bearer '+$scope.accessToken,
                       "Access-Control-Allow-Origin": "*"
                    },
                  }).then(function mySuccess(response) {
                        console.log(response.data.data);
                        $scope.patientAllergy = response.data.data;
                       
                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 
                }


                $scope.getPatientAllergy();
            }
        };
    });
