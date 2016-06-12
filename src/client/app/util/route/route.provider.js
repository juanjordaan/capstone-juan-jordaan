(function() {

  angular
  .module('util.router')
  .provider('routeUtil', routeUtilProvider);

  routeUtilProvider.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routeUtilProvider($stateProvider, $urlRouterProvider ){

    this.$get = RouteUtil;
    RouteUtil.$inject = ['$state'];
    function RouteUtil($state){
      var service = {
        getStates: getStates,
        addState: addState
      };

      init();

      return service;

      function init(){
        $urlRouterProvider.otherwise('/');
        // TODO: handleViewChange
        // TODO: handleErrors
      }

      function getStates(){
        return $state.get();
      }

      function addState(state){
        $stateProvider.state(state.name, state.config);
      }
    }
  }
})();
