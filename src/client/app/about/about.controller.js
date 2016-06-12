(function() {
  'use strict';

  angular
  .module('app.about')
  .controller('AboutController', AboutController);

  AboutController.$inject = ['$q'];

  function AboutController($q) {
    var vm = this;
  }
})();
