(function() {
  'use strict';

  angular
  .module('app.members.login')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'members_login',
        config: {
          url: '/login',
          views: {
            'content@': {
              templateUrl:'/app/members/login/login.html',
              controller: 'SessionController',
              controllerAs: 'vm',
              title:'Login'
            }
          }
        }
      }
    );
  }
})();
