'use strict';

var jwt = require('jsonwebtoken');
var config = require('../config/settings.js');

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  });
};

exports.isAuthenticated = function (req, res, next){
  console.log('req = ' + req );
  console.log('req.session = ' + req.session );
  // console.log('req.session.user = ' + req.session.user );

  if (req.session != undefined){
    if (req.session.user) {
      console.log('User is authenticated');
      next();
      return true;
    }
  }

  console.log('User is NOT authenticated');
  // req.session.error = 'Access denied!';
  res.redirect('/#/login');
  return false;
};
