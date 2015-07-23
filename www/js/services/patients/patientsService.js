(function () {

    var injectParams = ['$http', 'config'];

    var patientsFactory = function ($http, config) {
        var serviceBase = config.serviceBase;
        var factory = {};

        factory.getPatients = function () {
            return $http.get(serviceBase + 'patients').then(
                function (results) {
                    return results.data;
                });
        };

        factory.getPatient = function (patientId) {
            return $http.get(serviceBase + 'patients/' + patientId).then(
                function (result) {
                    return result.data;
                });
        };

        return factory;
    };

    patientsFactory.$inject = injectParams;

    angular.module('healthApp').factory('patientsService', patientsFactory);
}());
