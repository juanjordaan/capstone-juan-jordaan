(function() {
  'use strict';

  angular
  .module('app.dashboard.messages')
  .run(getRoute);

  getRoute.$inject = ['routeUtil'];

  function getRoute(routeUtil) {
    routeUtil.addState(
      {
        name: 'dashboard.messages',
        config: {
          url: '/messages',
          templateUrl:'/app/dashboard/messages/messages.html',
          controller: 'SocketMessagesController',
          controllerAs: 'vm',
          title:'Messages'
        }
      }
    );
  }
})();
