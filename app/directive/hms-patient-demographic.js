angular.module('hmsPatientDemographic', ["ngCookies"])
    .directive('hmsPatientDemographic', function($http,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-patient-demographic.html',
            scope: {
                selectedPatient: "@",
                accessToken: "@"
            },
            link: function($scope, element, attrs) {
               
                console.log($scope.selectedPatient);
                console.log($scope.accessToken);


                $scope.getPatientDemographic = function() {
                  $http({
                    method : "GET",
                    url: "http://localhost:9000/Patient/"+$scope.selectedPatient,
                    headers: {
                       'Authorization': 'Bearer '+$scope.accessToken,
                       "Access-Control-Allow-Origin": "*"
                    },
                  }).then(function mySuccess(response) {
                        console.log(response.data.data);
                        $scope.patient = response.data.data;
                       
                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 
                }

                

                // $scope.$watch('$scope.selectedPatient', function (newValue, oldValue) {
                //     // if (newValue && newValue !== oldValue) {
                //     //     // We have a new value set, and it's not the same as the old.
                //     //     // Do something
                //     //      $scope.getPatientDemographic();

                //     // }
                //     console.log(oldValue);
                // });

            $scope.$watch('selectedPatient', function(newValue, oldValue) {
                if (newValue){
                    $scope.getPatientDemographic();
                }
            }, true);
                
               
                
            }
        };
    });


