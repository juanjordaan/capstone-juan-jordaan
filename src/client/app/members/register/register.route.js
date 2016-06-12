(function() {
  'use strict';

  angular
  .module('app.members.register')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'members_register',
        config: {
          url: '/register',
          views: {
            'content@': {
              templateUrl:'/app/members/register/register.html',
              controller: 'RegisterController',
              controllerAs: 'vm',
              title:'Register'
            }
          }
        }
      }
    );
  }
})();
