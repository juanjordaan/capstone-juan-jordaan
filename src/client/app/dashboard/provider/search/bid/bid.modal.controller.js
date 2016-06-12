(function() {
  'use strict';

  angular.module('app.dashboard.search')
  .controller('ProviderBidModalController', ProviderBidModalController);

  ProviderBidModalController.$inject = ['$scope', 'close', 'project'];
  function ProviderBidModalController($scope, close, project){
    $scope.project = project;
    $scope.bidComment = '';
    $scope.close = function(result) {
      if( result === 'bid'){
        result = {'operation':'bid', 'bidComment':$scope.bidComment};
      }

      close(result, 500);
    };
  }
})();
