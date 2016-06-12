(function() {
  'use strict';

  angular.module('app.dashboard.messages')
  .controller('MessagesDeleteModalController', MessagesDeleteModalController);

  MessagesDeleteModalController.$inject = ['$scope', 'close', 'message'];
  function MessagesDeleteModalController($scope, close, message){
    $scope.message = message;
    $scope.close = function(result) {
      if( result === 'delete'){
        result = {'operation':'delete', 'message':message};
      }

      close(result, 500);
    };
  }
})();
