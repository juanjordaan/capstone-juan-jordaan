(function() {
  'use strict';

  angular.module('app.members')
  .factory('TokenInterceptor', TokenInterceptor)
  ;

  TokenInterceptor.$inject =  ['$q', '$window', '$location', 'AuthenticationService'];
  function TokenInterceptor($q, $window, $location, AuthenticationService){
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },

      requestError: function(rejection) {
        return $q.reject(rejection);
      },

      response: function (response) {
        if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
          AuthenticationService.isAuthenticated = true;
        }
        return response || $q.when(response);
      },

      responseError: function(rejection) {
        if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
          delete $window.sessionStorage.token;
          AuthenticationService.isAuthenticated = false;
          $location.path("/admin/login");
        }

        return $q.reject(rejection);
      }
    };
  }
})();
