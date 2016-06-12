(function() {
  'use strict';

  angular.module('app.members')
  .controller('HeaderController', ['$scope', '$state' ,'$stateParams', '$rootScope', 'AuthenticationService',
    function ($scope, $state, $stateParams, $rootScope, AuthenticationService) {
      $scope.loggedIn = false;
      $scope.username = '';

      //read GET variables from GET request set by redirect from Facebook callback
      var token = $scope.$location.search().token;
      var succes = $scope.$location.search().success;
      var username = $scope.$location.search().username;

      if (succes) {
        AuthFactory.storeUser({username:username, token: token});
        $rootScope.$broadcast('login:Successful');
      }

      if(AuthenticationService.isLogged()) {
        $scope.loggedIn = true;
        $scope.username = AuthenticationService.getUsername();
      }

      $scope.logOut = function() {
        AuthenticationService.logout();
        $scope.loggedIn = false;
        $scope.username = '';
      };

      $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthenticationService.isLogged();
        $scope.username = AuthenticationService.getUsername();
      });

      $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthenticationService.isLogged();
        $scope.username = AuthenticationService.getUsername();
      });

      $scope.stateis = function(curstate) {
        return $state.is(curstate);
      };
    }
  ])
})();
