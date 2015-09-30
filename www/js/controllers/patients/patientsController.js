app.controller('PatientsCtrl',['$scope', '$state', 'patientsService', function($scope, $state, patientsService) {
        $scope.patients = [];
    $scope.noPatients = false;
        function getPatients() {
            patientsService.getPatients()
                .then(function (data) {
                    if(data.length === 0){
                        $scope.noPatients = true;
                    }
                    else if (data.length === 1){
                        $state.go('app.patient', {'patientId': data[0].id});
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
