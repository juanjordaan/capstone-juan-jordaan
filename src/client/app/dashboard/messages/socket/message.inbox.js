(function() {
  'use strict';

  angular.module('app.dashboard.messages')
  .factory('MessageInbox', MessageInbox);

  MessageInbox.$inject = ['growl', 'socketFactory', 'serverURL'];
  function MessageInbox(growl, socketFactory, serverURL){
    var messages = [];
    var initialized = false;
    var connection;
    var socket;

    function authenticate(credentials){
      // console.log('authenticating');
      socket.emit('auth', credentials, function (response) {
        //TODO - Error handling
        console.log('socket connection : ' + response.status);

        fetchMessages();
      });

      return true;
    }

    function fetchMessages(){
      // console.log('fetchAllMessages');
      socket.emit('fetchAllMessages', '', function (response) {
        messages = response.payload;
        // console.log('(messages.length = ' + messages.length);
        if(messages.length > 0){
          // console.log('Doing growl for pulled messages');
          growl.success("Your messages have been retreived", {title: 'Messages', ttl: 5000});
        }
        else {
          growl.success("No new messages", {title: 'Messages', ttl: 5000});
        }
      });
    }

    function deleteMessage(message){
      socket.emit('deleteMessage', message._id, function (response) {
        if( response.status == 'ok' ){
          var i = messages.indexOf(message);
          messages.splice(i, 1);
        };
      });
    }

    function getMessages(){
      // console.log('returning ' + messages.length + ' messages');
      return messages;
    }

    function connect(credentials){
      if(!initialized){
        connection = io.connect(serverURL, {'forceNew':true});
        socket = socketFactory({
          // prefix: 'notice~',
          ioSocket: connection
        });

        socket.on('connect', function () {
          authenticate(credentials);
        });

        socket.on('newMessages', function (payload) {
          messages.push(payload);
          // console.log('Doing growl for push message');
          growl.success("New message has been received", {title: 'Messages', ttl: 5000});
          // socket.forward('newMessage', payload);
        });

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

    return {getMessages, deleteMessage, connect, disconnect};
  }
})();
