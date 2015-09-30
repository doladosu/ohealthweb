// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('healthApp', ['ionic', 'LocalStorageModule', 'healthApp.controllers', 'ngMap'])

.run(['$rootScope', '$state','authService', '$ionicPlatform', '$ionicModal',
      function($rootScope, $state, authService, $ionicPlatform) {
      authService.fillAuthData();
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
    }])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

      .state('login', {
          url: "/login",
          templateUrl: "templates/login.html",
          controller: 'AppCtrl'
      })
      .state('forgotpassword', {
          url: "/forgot-password",
          templateUrl: "templates/forgotpassword.html",
          controller: 'ForgotPasswordCtrl'
      })
      .state('signup', {
          url: "/signup",
          templateUrl: "templates/signup.html",
          controller: 'SignupPasswordCtrl'
      })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
          onEnter: function($state, authService) {
              if (!authService.user.isAuthenticated) {
                  $state.go('login');
              }
          }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
      .state('app.patients', {
        url: '/patients',
        views: {
          'menuContent': {
            templateUrl: 'templates/patients/patients.html',
            controller: 'PatientsCtrl'
          }
        }
      })
      .state('app.addPatient', {
          url: '/patient/add',
          views: {
              'menuContent': {
                  templateUrl: 'templates/patients/addpatient.html',
                  controller: 'AddPatientCtrl'
              }
          }
      })
      .state('app.patient', {
        url: '/patients/:patientId',
        views: {
          'menuContent': {
            templateUrl: 'templates/patients/patient.html',
            controller: 'PatientCtrl'
          }
        }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
