'use strict';

let cookieParser = require('cookie-parser');
let basicAuth = require('./auth-basic');
let config = require('./settings');

module.exports = (
  function(){
    let salt = config.secretKey;

    let cookies = {
      getCookieParser : cookieParser(salt),
      getCookieAuth: cookieAuth
    };

    return cookies;

    function cookieAuth (req, res, next) {
      console.log('req.signedCookies.user = ' + JSON.stringify(req.signedCookies.user, null, '\t') );
      console.log('req.headers = ' + JSON.stringify(req.headers, null, '\t') );

      // check if cookie in the header
      if (!req.signedCookies.user) {
        // user has not been verified yet
        if( basicAuth(req, res, next)){
          console.log('passed auth');
          //set the signed cookie in the header
          res.cookie('user', 'admin', {signed:true});
        }
      }
      else {
        //there is a cookie in the header
        if (req.signedCookies.user === 'admin') {
          next();
        }
        else {
          let err = new Error('You are not authenticated!');
          err.status = 401;
          next(err);
        }
      }
    };
  }
)();
