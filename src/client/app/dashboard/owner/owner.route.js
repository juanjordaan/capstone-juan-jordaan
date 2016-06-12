(function() {
  'use strict';

  angular
  .module('app.dashboard.owner')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'dashboard.owner',
        config: {
          url: '/owner',
          templateUrl:'/app/dashboard/owner/owner.html',
          controller: 'OwnerController',
          controllerAs: 'vm',
          title:'Project Owner'
        }
      }
    );
  }
})();
