(function() {
  'use strict';

  angular
  .module('app.about')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'about',
        config: {
          url: '/about',
          views: {
            'content@': {
              templateUrl:'/app/about/about.html',
              controller: 'AboutController',
              controllerAs: 'vm',
              title:'About'
            }
          }
        }
      }
    )
  }
})();
