(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .directive('mwDashboardNav', DashboardNavDirective);

  function DashboardNavDirective() {
    var directive = {
      bindToController: true,
      controller: DashboardNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      templateUrl: '/app/dashboard/dashboard-nav.html'
    };

    function DashboardNavController() {
      var vm = this;
    }

    return directive;
  }
})();
