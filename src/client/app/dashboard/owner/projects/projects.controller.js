(function() {
  'use strict';

  angular
  .module('app.dashboard.owner')
  .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$location', 'dataservice', 'ModalService', 'AuthenticationService', 'spinnerService'];
  function ProjectsController($location, dataservice, ModalService, AuthenticationService, spinnerService) {
    var vm = this;

    vm.project = {};
    vm.project.name = '';
    vm.project.owner = AuthenticationService.user._id;
    vm.project.provider = null;
    vm.project.skill = [];
    vm.project.title = '';
    vm.project.description = '';

    vm.skills = [];

    vm.errors = [];
    vm.createProject = createProject;

    spinnerService.show('mainSpinner');
    dataservice.skills().list().$promise.then(
      function(response){ vm.skills = response; spinnerService.hide('mainSpinner'); },
      function(response){
        console.log('response.data = ' + JSON.stringify(response.data));
        vm.errors = response.data;
        spinnerService.hide('mainSpinner');
      }
    );

    function createProject(){
      spinnerService.show('mainSpinner');
      dataservice.projects().post(vm.project).$promise.then(
        function(response){ $location.path('dashboard'); spinnerService.hide('mainSpinner');},
        function(response){
          console.log('response.data = ' + JSON.stringify(response.data));
          if(Array.isArray(response.data)){ console.log('array of errors'); vm.errors = response.data; }
          else { vm.errors = [response.data.message]; }
          spinnerService.hide('mainSpinner');
          console.log('vm.errors = ' + JSON.stringify(vm.errors));
        }
      );
    }
  }
})();
