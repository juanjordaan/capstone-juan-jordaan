(function() {
  'use strict';

  angular
  .module('app.layout')
  .directive('mwFooter', mwFooter);

  function mwFooter () {
    var directive = {
      bindToController: true,
      controller: FooterController,
      controllerAs: 'vm',
      templateUrl: '/app/layout/footer.html'
    };

    function FooterController() {
      var vm = this;
    }

    return directive;
  }
})();
