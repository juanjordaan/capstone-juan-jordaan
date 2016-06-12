(function() {
  'use strict';

  angular
  .module('app.dashboard.owner')
  .controller('OwnerController', OwnerController);

  OwnerController.$inject = ['dataservice', 'AuthenticationService', 'ModalService', 'spinnerService'];
  function OwnerController(dataservice, AuthenticationService, ModalService, spinnerService) {
    var vm = this;

    vm.projects = getProjects();
    vm.showBidderModal = showBidderModal;
    vm.acceptBid = acceptBid;
    vm.declineBid = declineBid;
    vm.errors = [];

    function getProjects(){
      spinnerService.show('mainSpinner');
      dataservice.projectOwner().list({'userId':AuthenticationService.user._id}).$promise.then(
        function(response){
          vm.projects = response;
          for( var proj of vm.projects ){
            for( var skill of proj.skill){
              skill.ticked=true;
            }
          }
          spinnerService.hide('mainSpinner');
        },
        function(response){
          console.log('2response = ' + JSON.stringify(response));
          if(Array.isArray(response.data)){ console.log('array of errors'); vm.errors = response.data; }
          else { vm.errors = [response.data.message]; }
          spinnerService.hide('mainSpinner');
        }
      );
    }

    function declineBid(projectId, bidderId, comment){
      console.log('Decline bid : { projectId :' + projectId + ' bidderId : ' + JSON.stringify(bidderId) + ' comment: ' + comment + '}');
      spinnerService.show('mainSpinner');
      dataservice.projectBid().put({'id':projectId}, {operation:'decline', bidderId:bidderId, comment:comment}).$promise.then(
        function(response){
          spinnerService.hide('mainSpinner');
          getProjects();
        },
        function(response){
          console.log('2response = ' + JSON.stringify(response));
          if(Array.isArray(response.data)){ console.log('array of errors'); vm.errors = response.data; }
          else { vm.errors = [response.data.message]; }
          spinnerService.hide('mainSpinner');
        }
      );
    }

    function acceptBid(projectId, bidderId, comment){
      console.log('Accept bid : { projectId :' + projectId + ' bidderId : ' + JSON.stringify(bidderId) + ' comment : ' + comment + '}');
      spinnerService.show('mainSpinner');
      dataservice.projectBid().put({'id':projectId}, {operation:'accept', bidderId:bidderId, comment:comment}).$promise.then(
        function(response){
          spinnerService.hide('mainSpinner');
          getProjects();
        },
        function(response){
          console.log('2response = ' + JSON.stringify(response));
          if(Array.isArray(response.data)){ console.log('array of errors'); vm.errors = response.data; }
          else { vm.errors = [response.data.message]; }
          spinnerService.hide('mainSpinner');
        }
      );
    }

    function showBidderModal(bidder){
      ModalService
      .showModal({
        templateUrl: 'app/dashboard/owner/bidder/bidder.modal.html',
        controller: 'OwnerBidderModalController',
        inputs: {
          bidder: bidder
        }
      })
      .then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
        });
      });
    }
  }
})();
