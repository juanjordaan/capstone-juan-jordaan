'use strict';

let socketHandler = function () { this.auth = {'username': '', 'password': ''} };
let User = require('../../common/models/user');

socketHandler.prototype.getUser = function(){ return this.auth; };

socketHandler.prototype.handleConnect = function (socket) {
  socket.on('ferret', function (name, fn) {
    fn('woot');
  });

  socket.on('auth', function (auth, fn) {
    //auth = JSON.parse(auth);
    console.log('1 this.auth = ' + JSON.stringify(this.auth));
    this.auth = auth;
    console.log('2 this.auth = ' + JSON.stringify(this.auth));
    console.log('data.username = ' + auth.username);
    console.log('data.password = ' + auth.password);

    User.findOne({'username':auth.username.toLowerCase(), 'password':auth.password})
    .exec(function (err, data){
      if(err){ fn('error: ' + errorFormatter.getResponse(err)); }

      if(data){ fn('ok'); }
      else{ fn('error: Wrong username/password combination.'); }
    });
  });

  socket.on('fetchAll', function(data, fn){

  });

  socket.on('ping', function (name, fn) {
    fn('pong');
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
    // socket.emit('user disconnected');
  });
};

module.exports = new socketHandler;
