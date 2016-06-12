angular.module('util.javascriptNews', ['ui.router', 'ngResource', 'ngRoute', 'youtube-embed'])
.config(['$locationProvider', function($locationProvider) {

//allow reading GET variables passed via main page URL
//this is required for the OAuth Facebook integration
//the default is '!' but whithout specifing this it wont work
//$locationProvider requires ngRout module
//https://docs.angularjs.org/guide/$location
  $locationProvider.hashPrefix('!');
}]);
