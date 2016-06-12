(function() {
  'use strict';

  angular.module('app.members')
  .controller('SessionController', SessionController)
  .controller('LogoutModalController', LogoutModalController)
  .factory('$localStorage', ['$window', function( $window ) {
    return {
      get: function( key, defaultValue ) { return $window.localStorage[key] || defaultValue; },
      set: function( key, value ) { $window.localStorage[key] = value; },
      getObject: function( key, defaultValue ) { return JSON.parse( $window.localStorage[key] || defaultValue ); },
      setObject: function( key, value ) { $window.localStorage[key] = JSON.stringify( value ); },
    };
  }]);

  SessionController.$inject = ['MessageInbox', '$location', 'ModalService', 'dataservice', 'AuthenticationService', '$localStorage', 'spinnerService'];
  function SessionController(MessageInbox, $location, ModalService, dataservice, AuthenticationService, $localStorage, spinnerService ){
    var session = this;
    session.login = login;
    session.loginFacebook = loginFacebook;
    session.logout = logout;
    session.loggedIn = function(){return AuthenticationService.isLogged};
    session.errors = [];
    session.credentials = $localStorage.getObject( 'userinfo','{}' );

    if( session.credentials.username && session.credentials.password){
      session.rememberMe = true;
    }
    else{
      session.rememberMe = false;
    }

    function login(){
      //spinner
      spinnerService.show('mainSpinner');

      dataservice.login().post(session.credentials)
      .$promise.then(
        function(response){
          AuthenticationService.user = response;
          AuthenticationService.isLogged = true;
          // console.log('session.rememberMe = ' + session.rememberMe);
          if(session.rememberMe) {
            $localStorage.setObject('userinfo', session.credentials);
          }
          else {
            $localStorage.setObject('userinfo', {});
          }

          if(MessageInbox.connect(session.credentials)){
            // console.log('MessageInbox says connected ...');
          }

          // clientSocket.connect(session.credentials);
          $location.path('dashboard');
          spinnerService.hide('mainSpinner');
        },
        function(response){
          AuthenticationService.isLogged = false;
          session.errors = response.data;
          spinnerService.hide('mainSpinner');
        }
      );
    };

    function loginFacebook() {
      if(session.rememberMe) {
        $localStorage.setObject('userinfo', session.credentials);
      }
      AuthenticationService.loginFacebook(session.credentials);
    };

    function logout(){
      spinnerService.show('mainSpinner');
      ModalService.showModal({
        templateUrl: 'app/members/logout/modal/logout.html',
        controller: "LogoutModalController"
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if(result == 'Yes'){
            AuthenticationService.logout();
            MessageInbox.disconnect();
            $location.path('home');
          }
        });

        spinnerService.hide('mainSpinner');
      });
    }
  }

  LogoutModalController.$inject = ['$scope', 'close'];
  function LogoutModalController($scope, close){
    $scope.close = function(result) {
 	    close(result, 500);
    }
  }
})();
