(function() {
  'use strict';

  angular.module('app.socket', [])
  .factory('clientSocket', clientSocket);

  clientSocket.$inject = ['socketFactory', 'serverURL'];
  function clientSocket(socketFactory, serverURL) {
    var initialized = false;
    var connection;
    var socket;

    function connect(credentials){
      if(!initialized){
        connection = io.connect(serverURL, {'forceNew':true});
        socket = socketFactory({
          // prefix: 'notice~',
          ioSocket: connection
        });

        socket.on('connect', function () {
          socket.emit('auth', credentials, function (response) {
            //TODO - Error handling
            console.log('socket connection : ' + response.status);
          });
        })

        initialized = true;
      }

      return initialized;
    }

    function disconnect(){
      if(initialized){
        socket.emit('end');
        socket.disconnect();
        initialized = false;
      }
    }

    function getSocket(){
      return socket;
    }

    // function on(eventName, callback){
    //   socket.on(eventName), callback;
    // }
    //
    // function emit(eventName, payload, callback){
    //   socket.emit(eventName, payload, callback);
    // }

    return {connect, disconnect, getSocket};
  };
})();
