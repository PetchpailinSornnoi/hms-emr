angular.module('hmsPatientVitalsigns', ["ngCookies"])
    .directive('hmsPatientVitalsigns', function($http, $cookies) {
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
                            method: "GET",
                            url: "http://" + $scope.url + "/Observation/vitalsign/" + $scope.selectedPatient + "/" + $scope.encounter,
                            //url: "http://localhost:9000/Observation/vital/09-95-000001",
                            headers: {
                                'Authorization': 'Bearer ' + $scope.accessToken,
                                "Access-Control-Allow-Origin": "*"
                            },
                        }).then(function mySuccess(response) {
                            console.log(response.data.data);

                            $scope.data = response.data.data;
                            //$scope.patientVitalsigns = response.data.data;

                            $scope.getCurrentVitalSigns(response.data.data);



                            //document.getElementById("bp-systolic").style.width = "70%"
                            // $scope.patient = response.data.data;

                        }, function myError(response) {
                            $scope.error = response.statusText;
                        });
                    },


                    $scope.getPatientDemographic = function() {
                        $http({
                            method: "GET",
                            url: "http://" + $scope.url + "/Patient/" + $scope.selectedPatient,
                            headers: {
                                'Authorization': 'Bearer ' + $scope.accessToken,
                                "Access-Control-Allow-Origin": "*"
                            },
                        }).then(function mySuccess(response) {

                            var birth_date = response.data.data.birth_date;
                            $scope.age = $scope._getAge(birth_date);
                            $scope.genderimageurl = $scope._getImageurl(response.data.data.gender);

                        }, function myError(response) {
                            $scope.error = response.statusText;
                        });
                    },
                    $scope._getImageurl = function(gender){
                      if(gender === 'F'){
                          return "https://www.ehrscape.com/demo/img/body-blank-female.png";
                      }
                      else if(gender === 'M'){
                          return "https://www.ehrscape.com/demo/img/body-blank-male.png";
                      }
                      else{
                          return "";
                      }

                    },
                    $scope._getAge = function(dateString) {
                        var now = new Date();
                        var today = new Date(now.getYear(), now.getMonth(), now.getDate());

                        var yearNow = now.getYear();
                        var monthNow = now.getMonth();
                        var dateNow = now.getDate();

                        // var dob = new Date(dateString.substring(6, 10),
                        //     dateString.substring(0, 2) - 1,
                        //     dateString.substring(3, 5)
                        // );

                        var dob = new Date(dateString);

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

                        // if (age.years > 1) yearString = "y";
                        // else yearString = "y";
                        // if (age.months > 1) monthString = "m";
                        // else monthString = "m";
                        // if (age.days > 1) dayString = " days";
                        // else dayString = " day";


                        // if ((age.years > 0) && (age.months > 0) && (age.days > 0))
                        //     ageString = age.years + yearString + " " + age.months + monthString; // + ", and " + age.days + dayString + " old";
                        // else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
                        //     ageString = age.days + dayString + " old";
                        // else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
                        //     ageString = age.years + yearString; // + " old. Happy Birthday!";
                        // else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
                        //     ageString = age.years + yearString + " and " + age.months + monthString; // + " old";
                        // else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
                        //     ageString = age.months + monthString; // + " and " + age.days + dayString + " old";
                        // else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
                        //     ageString = age.years + yearString; // + " and " + age.days + dayString + " old";
                        // else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
                        //     ageString = age.months + monthString; // + " old";
                        // else ageString = "Oops! Could not calculate age!";

                        //return ageString;
                        return age.years;
                    },
                    $scope._getStatus = function(bmi){
                      console.log(bmi);

                      if (bmi < 18.5) {
                        return "Underweight (Risk)";
                      } else if (bmi < 25) {
                        return "Normal";
                      } else if (bmi < 30) {
                        return "Overweight";
                      } else {
                        return "Obese";
                      } 
                    },
                    $scope.getCurrentVitalSigns = function(data) {

                        var max = 0;
                        var index_arr = [];

                        for (var i = 0; i < data.length; i++) {
                            var d = new Date(data[i].issued.substr(0, 10));
                            var date = d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);


                            if (date >= max) {
                                max = date;

                                if (data[i].value !== "") {
                                    index_arr.push(data[i]);
                                }



                            }
                            // console.log(date);

                        }

                        console.log(max);
                        console.log(index_arr);

                        for (var j = 0; j < index_arr.length; j++) {
                            for (var k = 0; k < index_arr.length; k++) {

                                if (k !== j && index_arr[j].code.setcode === index_arr[k].code.setcode) {
                                    //console.log("k = "+k+", j = "+j);
                                    console.log(index_arr[j].code.set_desc);
                                    var max = Math.max(k, j);
                                    index_arr.splice(max);
                                }
                            }
                            // console.log(index_arr[j].code.setcode);
                        }

                        console.log(index_arr);


                        $scope.patientVitalsigns = index_arr;




                    }


                $scope.getPatientVitalSigns();
                $scope.getPatientDemographic();
            }
        };
    });
