angular.module('hmsPatientDicom', ["ngCookies"])
    .directive('hmsPatientDicom', function($http,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-patient-dicom.html',
            scope: {
                url: "@",
                accessToken: "@",
                selectedPatient: "@",
                encounter: "@"
            },
            link: function($scope, element, attrs) {

                $scope.getDicomList = function() {
                    $http({
                            method : "GET",
                            url: $scope.url+"/Dicom/list",
                            headers: {
                               'Authorization': 'Bearer '+$scope.accessToken,
                               "Access-Control-Allow-Origin": "*"
                            },
                        }).then(function mySuccess(response) {
                            $scope.dicomFile = response.data.data;
                        }, function myError(response) {
                            $scope.error = response.statusText;
                    }); 
                }

            $scope.getDicomList();

               
            }
        };
    });
