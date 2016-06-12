(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'dashboard',
        config: {
          url: '/dashboard',
          views: {
            'content@': {
              templateUrl:'/app/dashboard/dashboard.html',
              controller: 'DashboardController',
              controllerAs: 'vm',
              title:'Dashboard'
            }
          }
        }
      }
    );
  }
})();
