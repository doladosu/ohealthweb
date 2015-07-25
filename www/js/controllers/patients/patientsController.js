app.controller('PatientsCtrl',['$scope', '$state', 'patientsService', function($scope, $state, patientsService) {
        $scope.patients = [];
    $scope.noPatients = true;
        function getPatients() {
            patientsService.getPatients()
                .then(function (data) {
                    if(data.length > 0){
                        $scope.noPatients = false;
                    }
                    $scope.patients = data;
                });
        }

    $scope.addMember = function(){
        $state.go('app.addPatient');
    };

        function init() {
            getPatients();
        }

        init();
}]);
