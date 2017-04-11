  angular.module('hmsPatientList', ["ngCookies"])
    .directive('hmsPatientList', function($http,$window,$rootScope,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-patient-list.html',
            scope: {
                url: "@",
                practitionerId: "@",
                date: "@",
                accessToken: "@",
            },
            link: function($scope, element, attrs) {

                $scope.patientlist = [];
            

                $scope.getPatient = function(key,hn) {
                  console.log(hn);
                  $http({
                    method : "GET",
                    url : $scope.url+"/Patient/"+hn,
                    headers: {
                       'Authorization': 'Bearer '+$scope.accessToken,
                       "Access-Control-Allow-Origin": "*"
                    },
                  }).then(function mySuccess(response) {
                        var patient = response.data.data;
                        $scope.patientlist[key].name = patient.name[0].family_name+" "+patient.name[0].given_name;
                        $scope.patientlist[key].gender = patient.gender;
                        $scope.patientlist[key].birthDate = patient.birth_date;

                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 
                }

                $scope.getPatientList = function() {
                  //console.log($scope.accessToken);
                  
                  $http({
                    method : "GET",
                    url : $scope.url+"/Encounter/"+$scope.practitionerId+"?date="+$scope.date,
                    headers: {
                       'Authorization': 'Bearer '+$scope.accessToken,
                       "Access-Control-Allow-Origin": "*"
                    },
                  }).then(function mySuccess(response) {
                        // console.log(response.data.data);
                        var patient = {};

                        response.data.data.forEach(function(item,index){
                            var i = index;
                            patient = {};
                            patient.encounter = item.identifier;
                            item.patient.identifier.forEach(function(item,index){
                               if(item.type === 'PASID'){
                                  patient.hn = item.value;
                                  $scope.getPatient(i,patient.hn);
                               }
                                
                            });
                            $scope.patientlist.push(patient);
                        });

                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 
                },

                $scope.patientDetail = function(hn,en) {
                    var selectedpatient = {
                        'patientId' : hn,
                        'encounter' : en
                    };
                    
                    $cookies.putObject('selectedpatient',selectedpatient);
                    $window.location='#!/patient/'+hn+"/"+en;
                };

                //console.log($scope.practitionerId);
                $scope.$watch('practitionerId', function(newValue, oldValue) {
                    if (newValue){
                        $scope.getPatientList();
                    }
                }, true);
                
            }
        };
    });


