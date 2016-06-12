(function() {
  'use strict';

  angular.module('app.members')
  .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$location', 'ModalService', 'dataservice'];
  function AuthenticationService($location, ModalService, dataservice){
    var auth = {
      user : {},
      isLogged: false,
      loginFacebook: loginFacebook,
      storeUser: storeUser,
      logout: logout
    }

    return auth;

    function loginFacebook() {
      console.log('window.location.protocol = ' + window.location.protocol);
      console.log('window.location.host = ' + window.location.host);
      // window.location = window.location.protocol + '//' + window.location.host + '/api/v1/users/facebook';
      window.location = window.location.protocol + '//' + window.location.host + '/facebook';
    };

    function storeUser(credentials){
      console.log('storeUser credentials = ' + credentials);
      storeUserCredentials(credentials);
    }

    function logout(){
      auth.user = {};
      auth.isLogged = false;
    }
  }
})();
