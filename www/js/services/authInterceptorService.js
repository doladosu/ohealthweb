(function() {
    'use strict';

    var injectParams = ['$q', 'localStorageService', '$log'];
    var authInterceptorFactory = function($q, localStorageService, $log) {
        var service = {};

        service.request = function (config) {

            config.headers = config.headers || {};

            // If we specify auth header overwrite, strip the extra header and move along
            if (config.headers.OverWriteAuthInjector === true) {
                config.headers.OverWriteAuthInjector = undefined;
                return config;
            }

            // No overwride, let's put out own auth in
            var localAuthData = localStorageService.get('authorizationData');
            if (localAuthData) {
                config.headers.Authorization = 'Bearer ' + localAuthData.token;
                config.headers['x-refreshToken'] = localAuthData.refreshToken;
            }
            return config;
        };

        service.response = function(response) {
            // If we get a new access token, update our auth data
            var newToken = response.headers('access-token');
            if (typeof newToken !== 'undefined' && newToken !== null) {
                var localAuthData = localStorageService.get('authorizationData');
                localAuthData.token = newToken;
                localStorageService.set('authorizationData', localAuthData);
            }
            return response;
        };

        return service;
    };

    authInterceptorFactory.$inject = injectParams;
    var module = angular.module('healthApp');
    module.factory('authInterceptor', authInterceptorFactory);
    module.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);
})();