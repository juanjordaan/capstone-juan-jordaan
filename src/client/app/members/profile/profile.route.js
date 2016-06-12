(function() {
  'use strict';

  angular
  .module('app.members.profile')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'members_profile',
        config: {
          url: '/profile',
          views: {
            'content@': {
              templateUrl:'/app/members/profile/profile.html',
              controller: 'ProfileController',
              controllerAs: 'vm',
              title:'Profile'
            }
          }
        }
      }
    );
  }
})();
