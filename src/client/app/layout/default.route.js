(function() {
  'use strict';

  angular
  .module('app.util')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'index',
        config: {
          url: '/',
          views: {
            'content': {
              templateUrl : '/app/home/home.html',
              controller: 'HomeController',
              controllerAs: 'vm',
              title: 'Home'
            },
          }
        }
      }
    )
  }
})();
