(function () {
  'use strict';

  angular
  .module('util.data')
  .factory('dataservice', dataservice);

  dataservice.$inject = ['$resource', 'restAPI', 'httpVerbs'];

  function dataservice($resource, restAPI, httpVerbs) {
    return {
      countries: countries,
      skills: skills,
      messages: messages,
      messageInbox: messageInbox,
      users: users,
      userSkills: userSkills,
      userRegister: userRegister,
      projects: projects,
      projectBid: projectBid,
      projectsOpen: projectsOpen,
      projectOwner: projectOwner,
      projectProvider: projectProvider,
      dashboard: dashboard,
      login: login,
      logout: logout
    };

    function countries( ){
      return $resource( restAPI+'/countries', null, httpVerbs );
    }

    function skills( ){
      return $resource( restAPI+'/skills', null, httpVerbs );
    }

    function messages( ){
      return $resource( restAPI+'/messages/:messageId', null, httpVerbs );
    }

    function messageInbox( ){
      return $resource( restAPI+'/messages/user/:userId', null, httpVerbs );
    }

    function users( ){
      return $resource( restAPI+'/users/:userId', null, httpVerbs );
    }

    function userSkills( ){
      return $resource( restAPI+'/users/:userId/skills', null, httpVerbs );
    }

    function userRegister( ){
      return $resource( restAPI+'/users/register', null, httpVerbs );
    }

    function projects( ){
      return $resource( restAPI+'/projects/:id', null, httpVerbs );
    }

    function projectBid( ){
      return $resource( restAPI+'/projects/:id/bid', null, httpVerbs );
    }

    function projectsOpen(){
      return $resource( restAPI+'/projects/open/:userId', null, httpVerbs );
    }

    function projectOwner(){
      return $resource( restAPI+'/projects/owner/:userId', null, httpVerbs );
    }

    function projectProvider(){
      return $resource( restAPI+'/projects/provider/:userId', null, httpVerbs );
    }

    function dashboard(){
      return $resource( restAPI+'/dashboard', null, httpVerbs );
    }

    function login(){
      return $resource( restAPI+'/login', null, httpVerbs );
    }

    function logout(){
      return $resource( restAPI+'/logout', null, httpVerbs );
    }
  }
})();
