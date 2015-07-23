var app = angular.module('healthApp.controllers', []);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

    .controller('LoginCtrl', function($location, $scope, $stateParams, authService) {
      $scope.doLogin = function() {
        var path = "/";
        console.log('Doing login', $scope.loginData);
        authService.login($scope.loginData.username, $scope.loginData.password).then(
            function (status) {
              //$stateParams.redirect will have the route
              //they were trying to go to initially
              if (!status) {
                //vm.errorMessage = 'Unable to login';
                return;
              }
              if (status && $stateParams && $stateParams.redirect) {
                path = path + $stateParams.redirect;
              }

              $location.path(path);
              $scope.modal.hide();

            }, function(err) {
              //vm.errorMessage = typeof err === 'string' ? err :
                //  typeof err !== 'undefined' && err !== null ? err.error_description : 'Unknown error!';
            });

      };
    });
