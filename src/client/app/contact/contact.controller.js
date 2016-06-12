(function() {
  'use strict';

  angular
  .module('app.contact')
  .controller('ContactController', ContactController);

  ContactController.$inject = ['$q'];

  function ContactController($q) {
    var vm = this;
  }
})();
