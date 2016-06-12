(function() {
  'use strict';

  angular.module('app.dashboard.messages')
  .controller('MessagesDetailModalController', MessagesDetailModalController);

  MessagesDetailModalController.$inject = ['$scope', 'close', 'message'];
  function MessagesDetailModalController($scope, close, message){
    $scope.message = message;
    $scope.close = function(result) {
      if( result === 'delete'){
        result = {'operation':'delete', 'message':message};
      }

      close(result, 500);
    };
  }
})();
