app.controller('PatientsCtrl',['$scope', 'patientsService', function($scope, patientsService) {
        $scope.patients = [];

        function getPatients() {
            patientsService.getPatients()
                .then(function (data) {
                    $scope.patients = data;
                });
        }

        function init() {
            getPatients();
        }

        init();
}]);
