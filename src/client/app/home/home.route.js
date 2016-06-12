(function() {
  'use strict';

  angular
  .module('app.home')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'home',
        config: {
          url: '/',
          views: {
            'content': {
              templateUrl: '/app/home/home.html',
              controller: 'HomeController',
              controllerAs: 'vm',
              title: 'Home'
            }
          }
        }
      }
    );
  }
})();
