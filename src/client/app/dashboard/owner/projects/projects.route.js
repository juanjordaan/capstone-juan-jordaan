(function() {
  'use strict';

  angular
  .module('app.dashboard.owner')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'dashboard.project',
        config: {
          url: '/project',
          templateUrl:'/app/dashboard/owner/projects/projects.html',
          controller: 'ProjectsController',
          controllerAs: 'vm',
          title:'Projects'
        }
      }
    );
  }
})();
