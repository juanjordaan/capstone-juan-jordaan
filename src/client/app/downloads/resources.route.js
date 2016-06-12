(function() {
  'use strict';

  angular
  .module('app.resources')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'resources',
        config: {
          url: '/resources',
          views: {
            'content': {
              templateUrl: '/app/downloads/resources.html',
              controller: 'ResourcesController',
              controllerAs: 'vm',
              title: 'Resources'
            }
          }
        }
      }
    );
  }
})();
