'use strict';

let User = require('../../common/models/user');

// exports.authenticated = function (req, res, next){
//   console.log('req.headers.authorization = ' + JSON.stringify(req.headers.authorization, null, '\t') );
//
//   let authHeader = req.headers.authorization;
//
//   if(!authHeader){
//     // get user to type in username and password so we can authenticate them
//     let err = new Error('1 You are not authenticated!');
//     err.status = 401;
//     next(err);
//     return false;
//   }
//
//   let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
//   let user = auth[0];
//   let pass = auth[1];
//
//   User.find({email:user, password:pass}), function (err, data){
//     if( err ) return res.status(401).json(errorFormatter.getResponse(err));
//
//     if(data){
//       console.log('Authenticated User');
//       next();
//       return true;
//     }
//     else{
//       let err = new Error('Wrong username/password combination.');
//       err.status = 401;
//       next(err);
//       return false;
//     }
//   };
// };

module.exports = function auth (req, res, next){
  console.log('req.headers.authorization = ' + JSON.stringify(req.headers.authorization, null, '\t') );

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

  //TODO findOne
  User.find({email:user, password:pass}), function (err, data){
    if( err ) return res.status(401).json(errorFormatter.getResponse(err));

    if(data){
      console.log('Authenticated User');
      next();
      return true;
    }
    else{
      let err = new Error('Wrong username/password combination.');
      err.status = 401;
      next(err);
      return false;
    }
  };
};
