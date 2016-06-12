(function() {
  'use strict';

  angular.module('app.dashboard.owner')
  .controller('OwnerBidderModalController', OwnerBidderModalController);

  OwnerBidderModalController.$inject = ['$scope', 'close', 'bidder'];
  function OwnerBidderModalController($scope, close, bidder){
    $scope.bidder = bidder;

    console.log('bidder = ' + JSON.stringify(bidder, null, '\t'));

    $scope.close = function(result) {
      close(result, 500);
    };
  }
})();
