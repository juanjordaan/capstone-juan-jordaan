(function() {
  'use strict';

  angular
  .module('app.layout')
  .directive('mwTopNav', mwTopNav);

  function mwTopNav () {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      templateUrl: '/app/layout/top-nav.html'
    };

    function TopNavController() {
      var vm = this;
    }

    return directive;
  }
})();
