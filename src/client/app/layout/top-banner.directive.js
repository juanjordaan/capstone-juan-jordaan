(function() {
  'use strict';

  angular
  .module('app.layout')
  .directive('mwTopBanner', mwTopBanner);

  function mwTopBanner () {
    var directive = {
      bindToController: true,
      controller: TopBannerController,
      controllerAs: 'vm',
      restrict: 'EA',
      templateUrl: '/app/layout/top-banner.html'
    };

    function TopBannerController() {
      var vm = this;
    }

    return directive;
  }
})();
