(function() {
  'use strict';

  angular
  .module('app.dashboard.search')
  .controller('ProviderSearchController', ProviderSearchController);

  ProviderSearchController.$inject = ['$location', 'dataservice', 'ModalService', 'AuthenticationService', 'spinnerService'];
  function ProviderSearchController($location, dataservice, ModalService, AuthenticationService, spinnerService) {
    var vm = this;

    vm.projects = [];
    vm.errors = [];
    vm.showBidModal = showBidModal;

    spinnerService.show('mainSpinner');
    dataservice.projectsOpen().list({'userId':AuthenticationService.user._id}).$promise.then(
      function(response){ vm.projects = response; spinnerService.hide('mainSpinner'); },
      function(response){
        console.log('error response.data = ' + JSON.stringify(response.data));
        vm.errors = response.data;
        spinnerService.hide('mainSpinner');
      }
    );

    function showBidModal(project){
      ModalService
      .showModal({
        templateUrl: 'app/dashboard/provider/search/bid/bid.modal.html',
        controller: 'ProviderBidModalController',
        inputs: {
          project: project
        }
      })
      .then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if(result.operation){
            spinnerService.show('mainSpinner');
            dataservice.projectBid().post({'id': project._id}, {'bidder':AuthenticationService.user, 'comment':result.bidComment}).$promise.then(
              function(response){ spinnerService.hide('mainSpinner'); },
              function(response){
                console.log('error response.data = ' + JSON.stringify(response.data));
                vm.errors = response.data;
                spinnerService.hide('mainSpinner');
              }
            );
          }
        });
      });
    }
  }
})();
