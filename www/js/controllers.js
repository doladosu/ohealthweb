var app = angular.module('healthApp.controllers', []);

app.controller('AppCtrl', function($scope, $ionicModal, $ionicLoading, $state, $stateParams, $ionicPopup, authService) {

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
    if($scope.loginData.username === '' || $scope.loginData.password === '' || $scope.loginData.username === undefined
        || $scope.loginData.password === undefined){
      var alertPopup = $ionicPopup.alert({
        title: 'Invalid login!',
        template: 'Email address and password are required!'
      });
      alertPopup.then(function(res) {
      });
    }else{
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
            var alertPopup = $ionicPopup.alert({
              title: 'Error login!',
              template: 'Error occurred logging in!'
            });
            alertPopup.then(function(res) {
            });
          });
    }

  };
})

.controller('ForgotPasswordCtrl', function($scope, $ionicModal, $ionicLoading, $state, $stateParams, $ionicPopup, authService) {
      $scope.loginData = {};

  $scope.doForgotPassword = function () {
    if($scope.loginData.username === '' || $scope.loginData.username === undefined){
      var alertPopup = $ionicPopup.alert({
        title: 'Email address required!',
        template: 'Email address is required!'
      });
      alertPopup.then(function(res) {
      });
    }else{
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
            var alertPopup = $ionicPopup.alert({
              title: 'Error requesting password!',
              template: 'Error occurred requesting password!'
            });
            alertPopup.then(function(res) {
              //console.log('Thank you for not eating my delicious ice cream cone');
            });
          });
    }
  }
})

.controller('SignupPasswordCtrl', function($scope, $ionicModal, $ionicLoading, $state, $stateParams, $ionicPopup, authService) {
      $scope.loginData = {};

      $scope.doRegister = function () {
        if($scope.loginData.username === '' || $scope.loginData.password === '' || $scope.loginData.username === undefined
            || $scope.loginData.password === undefined || $scope.loginData.confirmpassword === '' || $scope.loginData.confirmpassword === undefined){
          var alertPopup = $ionicPopup.alert({
            title: 'All fields are required!',
            template: 'All fields are required!'
          });
          alertPopup.then(function(res) {
          });
        }
        else if($scope.loginData.password.toLowerCase() !== $scope.loginData.confirmpassword.toLowerCase()){
          var alertPopup = $ionicPopup.alert({
            title: 'Invalid registration info!',
            template: 'Password and Confirm password do not match!'
          });
          alertPopup.then(function(res) {
          });
        }
        else{
          $ionicLoading.show({
            template: 'Loading...'
          });
          var path = "/";
          authService.register($scope.loginData.username, $scope.loginData.password, $scope.loginData.confirmpassword).then(
              function (status) {
                //$stateParams.redirect will have the route
                //they were trying to go to initially
                if (!status) {
                  authService.login($scope.loginData.username, $scope.loginData.password).then(
                      function (status) {
                        //$stateParams.redirect will have the route
                        //they were trying to go to initially
                        if (!status) {
                          return;
                        }
                        if (status && $stateParams && $stateParams.redirect) {
                          path = path + $stateParams.redirect;
                        }
                        $ionicLoading.hide();
                        $state.go('app.patients');
                      }, function(err) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                          title: 'Error login!',
                          template: 'Error occurred logging in!'
                        });
                        alertPopup.then(function(res) {
                        });
                      });
                }
                if (status && $stateParams && $stateParams.redirect) {
                  path = path + $stateParams.redirect;
                }
                $ionicLoading.hide();
                $state.go('app.patients');
              }, function(err) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Error creating account!',
                  template: 'Error occurred creating account!'
                });
                alertPopup.then(function(res) {
                  //console.log('Thank you for not eating my delicious ice cream cone');
                });
              });
        }
      }
    });
