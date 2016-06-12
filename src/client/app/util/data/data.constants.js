(function() {
  'use strict';

  angular
  .module('app.util')
  // .constant('serverURL','http://localhost:3000')
  // .constant('restAPI','http://localhost:3000/api')
  .constant('serverURL','http://capstone-juan-jordaan.eu-gb.mybluemix.net')
  .constant('restAPI', 'http://capstone-juan-jordaan.eu-gb.mybluemix.net/api')
  .constant('httpVerbs', {'put': {method:'PUT'}, 'post': {method:'POST'}, 'list':  {method:'GET', isArray:true} } );
})();
