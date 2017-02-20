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
                // practitioner: "@"
            },
            link: function($scope, element, attrs) {

                $scope.patientlist = [];
                
                // var accessToken = $cookies.getObject('token').access_token;
                // var practitioner  = $cookies.getObject('practitioner');


                //console.log(practitioner);

                // $scope.createPatientlist = function(obj){
                //     console.log(obj);
                // }

                $scope.getPatient = function(key,hn) {
                  console.log(hn);
                  $http({
                    method : "GET",
                    url : "http://"+$scope.url+"/Patient/"+hn,
                    headers: {
                       'Authorization': 'Bearer '+$scope.accessToken,
                       "Access-Control-Allow-Origin": "*"
                    },
                  }).then(function mySuccess(response) {
                        var patient = response.data.data;
                        console.log(patient.gender);
                        console.log(patient.birth_date);
                        $scope.patientlist[key].name = patient.name[0].family_name+" "+patient.name[0].given_name;
                        $scope.patientlist[key].gender = patient.gender;
                        $scope.patientlist[key].birthDate = patient.birth_date;

                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 
                }

                $scope.getPatientList = function() {
                  console.log($scope.accessToken);
                  
                  $http({
                    method : "GET",
                    //url : "http://localhost:9000/Encounter/"+practitioner.identifier+"?date="+$scope.date,
                    url : "http://"+$scope.url+"/Encounter/"+$scope.practitionerId+"?date="+$scope.date,
                    headers: {
                       'Authorization': 'Bearer '+$scope.accessToken,
                       "Access-Control-Allow-Origin": "*"
                    },
                  }).then(function mySuccess(response) {
                        console.log(response.data.data);

                        var patient = {};
                        //$scope.patientlist = response.data.data;
                        //$scope.createList(obj);

                        // response.data.data.forEach(function(item,index){
                        //     console.log(item);
                        //     console.log(item.identifier);
                        // });

                        response.data.data.forEach(function(item,index){
                            var i = index;
                            patient = {};
                            patient.encounter = item.identifier;
                            item.patient.identifier.forEach(function(item,index){
                               if(item.type === 'PASID'){
                                  patient.hn = item.value;
                                  console.log("patient hn "+patient.hn);
                                  $scope.getPatient(i,patient.hn);
                               }
                                
                            });
                            $scope.patientlist.push(patient);
                        });

                        console.log($scope.patientlist);

                        // $scope.patientlist = patientlist;

                        // console.log(patientlist);



                    }, function myError(response) {
                        $scope.error = response.statusText;
                    }); 
                },

                $scope.patientDetail = function(hn,en) {
                    $window.location='#!/patient/'+hn+"/"+en;
                };

               
                //console.log($scope.practitionerId);

                $scope.$watch('practitionerId', function(newValue, oldValue) {
                    if (newValue){
                        console.log(newValue);
                        $scope.getPatientList();
                    }
                }, true);
                
            }
        };
    });


