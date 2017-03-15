angular.module('hmsPractitionerInfo', ["ngCookies"])
    .directive('hmsPractitionerInfo', function($http,$cookies) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'ehr/template/hms-practitioner-info.html',
            scope: {
                // url: "@",
                // selectedPatient: "@",
                // encounter: "@",
                // accessToken: "@"
            },
            link: function($scope, element, attrs) {
                $scope.practitioner  = $cookies.getObject('practitioner');
                console.log($scope.practitioner);
                // practitioner.given_name
                // practitioner.family_name
                // practitioner.qualification
                // practitioner.specialty_desc
              

            }
        };
    });


