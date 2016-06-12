'use strict';

let express = require('express');
let router = express.Router();
let User = require('../../common/models/user');
let bodyParser = require('body-parser');
let errorFormatter = require('./error.format.js').errorFormatter;
let passport = require('passport');
let Verify = require('./verify');

router.use(bodyParser.json());
router.route('/login').post(login);
router.route('/logout').post(logout);

module.exports = router;

function login(req, res){
  console.log( 'authenticating : username = ' + req.body.username.toLowerCase() + ' password = ' + req.body.password);

  User.findOne({'username':req.body.username.toLowerCase(), 'password':req.body.password})
  .exec(function (err, data){
    if( err ) return res.status(401).json(errorFormatter.getResponse(err));

    if(data){
      console.log('Authenticated User');
      req.session = {};
      req.session.user = data.username;
      return res.status(200).json(data);
    }
    else{
      req.session = {};
      return res.status(401).json(['Wrong username/password combination.']);
    }
  })
}

function logout(req, res){
  req.logout();
  return res.status(200);
}
