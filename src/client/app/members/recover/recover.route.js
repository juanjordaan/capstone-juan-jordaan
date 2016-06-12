(function() {
  'use strict';

  angular
  .module('app.members.recover')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'members_recover',
        config: {
          url: '/recover',
          views: {
            'content@': {
              templateUrl:'/app/members/recover/recover.html',
              controller: 'RecoverController',
              controllerAs: 'vm',
              title:'Recover'
            }
          }
        }
      }
    );
  }
})();
