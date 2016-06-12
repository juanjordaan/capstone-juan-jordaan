(function() {
  'use strict';

  angular
  .module('app.home')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$timeout'];

  function HomeController($timeout) {
    var vm = this;

    vm.feature1 = {};
    vm.feature1.show = true;
    vm.feature1.name = 'Super Widget 1';
    vm.feature1.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus nisi et diam tempus, nec vulputate ligula rutrum. In bibendum blandit turpis, ac efficitur tellus vestibulum nec.';
    vm.feature1.label = 'Special';
    vm.feature1.price = '9.99';
    vm.feature1.sm_descr = '';
    vm.feature1.heading = 'Featured Promotion';
    vm.feature1.message = '';
    vm.feature1.image = '';

    vm.feature2 = {};
    vm.feature2.show = true;
    vm.feature2.name = 'Super Widget 2';
    vm.feature2.description = 'Aenean a placerat erat. Vivamus accumsan viverra augue vitae aliquam. Nulla orci libero, posuere nec volutpat eget, sodales id mauris.';
    vm.feature2.label = 'New';
    vm.feature2.price = '3.99';
    vm.feature2.sm_descr = '';
    vm.feature2.heading = 'New Arival';
    vm.feature2.message = '';
    vm.feature2.image = '';

    vm.feature3 = {};
    vm.feature3.show = true;
    vm.feature3.name = 'Super Widget 3';
    vm.feature3.description = 'In dignissim porta dui, eget lacinia libero condimentum sit amet. Curabitur non euismod ex. Integer at eros dui.';
    vm.feature3.label = 'Hot';
    vm.feature3.price = '4.99';
    vm.feature3.sm_descr = '';
    vm.feature3.heading = 'Best Selling';
    vm.feature3.message = '';
    vm.feature3.image = '';
  }
})();
