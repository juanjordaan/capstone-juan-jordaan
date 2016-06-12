(function() {
  'use strict';

  angular
  .module('app.dashboard.provider')
  .controller('ProviderController', ProviderController);

  ProviderController.$inject = ['dataservice', 'AuthenticationService', 'spinnerService'];
  function ProviderController(dataservice, AuthenticationService, spinnerService) {
    var vm = this;

    vm.projects = getProviderProjects();
    vm.errors = [];

    function getProviderProjects(){
      spinnerService.show('mainSpinner');
      dataservice.projectProvider().list({userId:AuthenticationService.user._id}).$promise.then(
        function(response){
          console.log('response = ' + JSON.stringify(response, null, '\t'));
          vm.projects = response;
          spinnerService.hide('mainSpinner');
        },
        function(response){
          console.log('error response.data = ' + JSON.stringify(response.data));
          vm.errors = response.data;
          spinnerService.hide('mainSpinner');
        }
      );
    }
  }
})();
