app.controller('PatientCtrl',['$scope', '$stateParams', 'patientsService', function($scope, $stateParams, patientsService) {
    $scope.patient = [];


    function getPatient(patientId){
        patientsService.getPatient(patientId)
            .then(function (data) {
                $scope.patient = data;
            });
    }

    function init() {
        var patientId = $stateParams.patientId;
        getPatient(patientId);
    }

    init();
}]);
