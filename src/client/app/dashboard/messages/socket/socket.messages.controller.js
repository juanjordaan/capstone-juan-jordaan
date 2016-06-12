(function() {
  'use strict';

  angular.module('app.dashboard.messages')
  .controller('SocketMessagesController', SocketMessagesController);

  SocketMessagesController.$inject = ['$scope', 'ModalService', 'MessageInbox', 'spinnerService'];
  function SocketMessagesController($scope, ModalService, MessageInbox, spinnerService) {
    var vm = this;

    vm.messages = MessageInbox.getMessages();
    vm.showConfirmDelete = showConfirmDelete;
    vm.showMessage = showMessage;
    vm.deleteMessage = MessageInbox.deleteMessage;

    // $scope.$on('socket:newMessage', function (ev, data) {
    //   console.log('newMessage:data = ' + data);
    // });

    function showConfirmDelete(message){
      ModalService
      .showModal({
        templateUrl: 'app/dashboard/messages/modal/messages.delete.modal.html',
        controller: 'MessagesDeleteModalController',
        inputs: {
          message: message
        }
      })
      .then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if(result.operation){
            spinnerService.show('mainSpinner');
            vm.deleteMessage(result.message);
            spinnerService.hide('mainSpinner');
          }
        });
      });
    }

    function showMessage(message){
      ModalService
      .showModal({
        templateUrl: 'app/dashboard/messages/modal/messages.detail.modal.html',
        controller: 'MessagesDetailModalController',
        inputs: {
          message: message
        }
      })
      .then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if(result.operation){
            spinnerService.show('mainSpinner');
            vm.deleteMessage(result.message);
            spinnerService.hide('mainSpinner');
          }
        });
      });
    }
  };
})();
