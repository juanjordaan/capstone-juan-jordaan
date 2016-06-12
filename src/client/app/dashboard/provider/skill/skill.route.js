(function() {
  'use strict';

  angular
  .module('app.dashboard.skill')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'dashboard.skill',
        config: {
          url: '/skill',
          templateUrl:'/app/dashboard/provider/skill/skill.html',
          controller: 'ProviderSkillController',
          controllerAs: 'vm',
          title:'Projects'
        }
      }
    );
  }
})();
