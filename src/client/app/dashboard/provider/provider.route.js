(function() {
  'use strict';

  angular
  .module('app.dashboard.provider')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'dashboard.provider',
        config: {
          url: '/provider',
          templateUrl:'/app/dashboard/provider/provider.html',
          controller: 'ProviderController',
          controllerAs: 'vm',
          title:'Service Provider'
        }
      }
    );
  }
})();
