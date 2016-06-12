(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['dataservice', 'AuthenticationService', 'spinnerService'];

  function DashboardController(dataservice, AuthenticationService, spinnerService) {
    var vm = this;
    vm.errors = {};
    // TODO : replace with userId
    spinnerService.show('mainSpinner');
    dataservice.dashboard().get().$promise.then(
      function(response){ spinnerService.hide('mainSpinner'); },
      function(response){ vm.errors = response.data; spinnerService.hide('mainSpinner'); }
    );
  }
})();
