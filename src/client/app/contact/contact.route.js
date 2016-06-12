(function() {
  'use strict';

  angular
  .module('app.contact')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'contact',
        config: {
          url: '/contact',
          views: {
            'content@': {
              templateUrl:'/app/contact/contact.html',
              controller: 'ContactController',
              controllerAs: 'vm',
              title:'Contact'
            }
          }
        }
      }
    )
  }
})();
