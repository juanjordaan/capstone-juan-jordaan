(function() {
  'use strict';

  angular
  .module('app.members.recover')
  .controller('RecoverController', RecoverController);

  RecoverController.$inject = ['$location', 'RecoverService'];
  function RecoverController($location, RecoverService) {
    var vm = this;

    vm.recover = recover;
    vm.username = '';

    function recover() {
      console.log('username = ' + angular.toJson(vm));

      $location.path('home');
    }
  }
})();
