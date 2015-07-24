var app = angular.module('healthApp.controllers', []);

app.controller('AppCtrl', function($scope, $ionicModal, $ionicLoading, $state, $stateParams, authService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};


  $scope.logout = function() {
    authService.logout();
    $state.go("login");
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    var path = "/";
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
          $ionicLoading.hide();
          $state.go('app.patients');
        }, function(err) {
          $ionicLoading.hide();
          //vm.errorMessage = typeof err === 'string' ? err :
          //  typeof err !== 'undefined' && err !== null ? err.error_description : 'Unknown error!';
        });
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
});
