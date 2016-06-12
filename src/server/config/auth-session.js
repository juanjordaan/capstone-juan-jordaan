'use strict';

let session = require('express-session');
let FileStore = require('session-file-store')(session);
// let basicAuth = require('./auth-basic');
let config = require('./settings');
let User = require('../../common/models/user');

module.exports = (
  function(){
    let sessions = {
      getSessionConfig: session({
        name: 'session-id',
        secret: config.secretKey,
        saveUninitialized: true,
        resave: true,
        store: new FileStore()
      }),
      getSessionAuth: sessionAuth
    };

    return sessions;

    function sessionAuth(req, res, next){
      console.log('req.headers = ' + JSON.stringify(req.headers, null, '\t') );

      if (!req.session.user){

        var authHeader = req.headers.authorization;
        if(!authHeader){
          // get user to type in username and password so we can authenticate them
          var err = new Error('You are not authenticated!');
          err.status = 401;
          next(err);
          return false;
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];

        console.log('user = ' + user);
        console.log('pass = ' + pass);

        User.find({email:user, password:pass}), function (err, data){
          if( err ) return res.status(401).json(errorFormatter.getResponse(err));

          if(data){
            console.log('Authenticated User');
            next();
            //return true;
          }
          else{
            let err = new Error('Wrong username/password combination.');
            err.status = 401;
            next(err);
            // return false;
          }
        };

        // if( basicAuth(req, res, next)){
        //   console.log('passed auth');
        //
        //   req.session.user = 'admin';
        // }
        // else {
        //   console.log('failed auth');
        // }
      }
      else{
        // if (req.session.user === 'admin') {
          console.log('req.session: ' + JSON.stringify(req.session, null, '\t') );
          next();
        // }
        // else {
        //   let err = new Error('You are not authenticated!');
        //   err.status = 401;
        //   next(err);
        // }
      }
    };
  }
)();
