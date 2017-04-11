angular.module('hmsPatientDemographic', ["ngCookies"])
    .directive('hmsPatientDemographic', function($http,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'template/hms-patient-demographic.html',
            scope: {
                url: "@",
                selectedPatient: "@",
                accessToken: "@"
            },
            link: function($scope, element, attrs) {
               
                console.log($scope.selectedPatient);
                console.log($scope.accessToken);


                $scope.getPatientDemographic = function() {
                  $http({
                    method : "GET",
                    url: $scope.url+"/Patient/"+$scope.selectedPatient,
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
                },
                $scope._getAge =  function (dateString) {
                    var now = new Date();
                    var today = new Date(now.getYear(), now.getMonth(), now.getDate());

                    var yearNow = now.getYear();
                    var monthNow = now.getMonth();
                    var dateNow = now.getDate();

                    var dob = new Date(dateString.substring(6, 10),
                            dateString.substring(0, 2) - 1,
                        dateString.substring(3, 5)
                    );

                    var yearDob = dob.getYear();
                    var monthDob = dob.getMonth();
                    var dateDob = dob.getDate();
                    var age = {};
                    var ageString = "";
                    var yearString = "";
                    var monthString = "";
                    var dayString = "";


                    var yearAge = yearNow - yearDob;

                    if (monthNow >= monthDob)
                        var monthAge = monthNow - monthDob;
                    else {
                        yearAge--;
                        var monthAge = 12 + monthNow - monthDob;
                    }

                    if (dateNow >= dateDob)
                        var dateAge = dateNow - dateDob;
                    else {
                        monthAge--;
                        var dateAge = 31 + dateNow - dateDob;

                        if (monthAge < 0) {
                            monthAge = 11;
                            yearAge--;
                        }
                    }

                    age = {
                        years: yearAge,
                        months: monthAge,
                        days: dateAge
                    };

                    if (age.years > 1) yearString = "y";
                    else yearString = "y";
                    if (age.months > 1) monthString = "m";
                    else monthString = "m";
                    if (age.days > 1) dayString = " days";
                    else dayString = " day";


                    if ((age.years > 0) && (age.months > 0) && (age.days > 0))
                        ageString = age.years + yearString + " " + age.months + monthString;// + ", and " + age.days + dayString + " old";
                    else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
                        ageString = age.days + dayString + " old";
                    else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
                        ageString = age.years + yearString;// + " old. Happy Birthday!";
                    else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
                        ageString = age.years + yearString + " and " + age.months + monthString;// + " old";
                    else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
                        ageString = age.months + monthString; // + " and " + age.days + dayString + " old";
                    else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
                        ageString = age.years + yearString;// + " and " + age.days + dayString + " old";
                    else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
                        ageString = age.months + monthString;// + " old";
                    else ageString = "Oops! Could not calculate age!";

                    return ageString;
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


