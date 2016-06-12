(function() {
  'use strict';

  angular
  .module('app.dashboard.skill')
  .controller('ProviderSkillController', ProviderSkillController);

  ProviderSkillController.$inject = ['$location', 'dataservice', 'ModalService', 'AuthenticationService', 'spinnerService'];
  function ProviderSkillController($location, dataservice, ModalService, AuthenticationService, spinnerService) {
    var vm = this;

    vm.skills = [];

    vm.availableSkills = [];

    vm.errors = [];
    vm.updateSkills = updateSkills;

    spinnerService.show('mainSpinner');
    dataservice.skills().list().$promise.then(
      function(response){ vm.availableSkills = response; spinnerService.hide('mainSpinner');},
      function(response){
        console.log('response.data = ' + JSON.stringify(response.data));
        vm.errors = response.data;
        spinnerService.hide('mainSpinner');
      }
    );

    spinnerService.show('mainSpinner');
    dataservice.userSkills().list({'userId':AuthenticationService.user._id}).$promise.then(
      function(response){
        vm.skills = response;
        for(var skill of vm.skills ){
          for(var availableSkill of vm.availableSkills){
            if(availableSkill.name === skill.name){
              availableSkill.ticked=true;
              break;
            }
          }
        }
        spinnerService.hide('mainSpinner');
      },
      function(response){
        console.log('response = ' + JSON.stringify(response));
        vm.errors = response.data;
        console.log('vm.errors = ' + JSON.stringify(vm.errors));
        spinnerService.hide('mainSpinner');
      }
    );

    function updateSkills(){
      spinnerService.show('mainSpinner');
      dataservice.userSkills().put({'userId':AuthenticationService.user._id}, vm.skills).$promise.then(
        function(response){ $location.path('dashboard'); spinnerService.hide('mainSpinner');},
        function(response){
          vm.errors = response.data;
          console.log('vm.errors = ' + JSON.stringify(vm.errors));
          spinnerService.hide('mainSpinner');
        }
      );
    }
  }
})();
