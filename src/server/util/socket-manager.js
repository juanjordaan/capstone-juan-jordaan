'use strict';

let User = require('../../common/models/user');
let Message = require('../../common/models/message');

let SocketManager = function(){
  var sockets = [];

  function handleConnect(socket){
    socket.on('auth', function (auth, fn){
      console.log('socket authenticating : ' + JSON.stringify(auth));
      // console.log('auth.password = ' + auth.password);

      User.findOne({'username':auth.username.toLowerCase(), 'password':auth.password})
      .exec(function (err, data){
        var response = {};

        if(err){
          response.status = 'error';
          response.payload =  errorFormatter.getResponse(err);
          fn(response);
          return;
        }

        if(data){
          response.status = 'ok';
          socket.user = data;
          socket.user._id = data._id;
          // console.log('socket.user = ' + JSON.stringify(socket.user));
          sockets.push(socket);
          fn(response);
          console.log('client socket count : ' + sockets.length);
        }
        else{
          response.status = 'error';
          response.payload =  ['Wrong username/password combination.'];
          fn(response);
        }
      });
    });

    socket.on('fetchAllMessages', function(data, fn){
      // console.log('socket.user = ' + socket.user);
      Message.find({owner:socket.user._id})
      .populate('sender')
      .exec(function (err, data){
        //TODO : Mark sent messages as received
        for(let message of data ){
          if( message.status === 'sent'){
            message.status = 'received';
          }
        }

        var response = {};

        if (err) {
          response.status = 'error';
          response.payload =  err;
          fn(response);
          return;
        };

        response.status = 'ok';
        response.payload =  data;
        fn(response);
      });
    });

    socket.on('deleteMessage', function(messageId, fn){
      var response = {};

      Message.findOne({'_id':messageId}, function (err, data){
        if (err) {
          response.status = 'error';
          response.payload =  err;
          fn(response);
          return;
        };

        //console.log('response data = ' + JSON.stringify(data, null, '\t'));
        if( data ){
          data.remove();
        }

        response.status = 'ok';
        response.payload =  data;
        fn(response);
      });
    });

    socket.on('end', function(data, fn){
      // console.log('got end');
      socket.disconnect();
      socket.close();
    });

    socket.on('disconnect', function(){
      // console.log('got disconnect');
      var i = sockets.indexOf(socket);
      sockets.splice(i, 1);
      console.log('client socket count : ' + sockets.length);
    });
  };

  function newMessage( message ){
    var response = {};

    console.log('client socket count : ' + sockets.length);
    for( var s of sockets ){
      if(JSON.stringify(s.user._id) === JSON.stringify(message.receiver)){
        console.log('user is online for push');
        s.emit('newMessages', message, function (response) {

        });
      }
    }
  }

  return {handleConnect, newMessage};
}

module.exports = SocketManager;
