(function() {
  'use strict';

  angular
  .module('app.members.recover')
  .factory('RecoverService', RecoverService);

  RecoverService.$inject = ['$location'];
  function RecoverService($location) {
    var fac = {};

    fac.recover = function ( username, password ){
      return true;
    };

    return fac;
  }
})();
