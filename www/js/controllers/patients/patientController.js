app.controller('PatientCtrl',['$scope', '$stateParams', '$compile', 'patientsService',
    function($scope, $stateParams, $compile, patientsService) {
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
