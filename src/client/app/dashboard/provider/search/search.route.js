(function() {
  'use strict';

  angular
  .module('app.dashboard.search')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'dashboard.search',
        config: {
          url: '/search',
          templateUrl:'/app/dashboard/provider/search/search.html',
          controller: 'ProviderSearchController',
          controllerAs: 'vm',
          title:'Open Projects'
        }
      }
    );
  }
})();
