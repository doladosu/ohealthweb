(function () {

    var value = {
        serviceBase: 'http://www.gerimedic.com/api/',
        clientId: 'healthApp'
    };

    angular.module('healthApp').value('config', value);

}());