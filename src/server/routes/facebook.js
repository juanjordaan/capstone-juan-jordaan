'use strict';

let express = require('express');
let router = express.Router();
let User = require('../../common/models/user');
let bodyParser = require('body-parser');
let errorFormatter = require('./error.format.js').errorFormatter;
let passport = require('passport');
let Verify = require('./verify');

router.use(bodyParser.json());

router.get('/facebook', passport.authenticate('facebook'), function(req, res){});
//TODO fix url remove /users
// router.route('/users/facebook/callback').get(facebookCallback);

router.get('/users/facebook/callback', function(req,res,next){
  // console.log('req = ' + JSON.stringify(req, null, '\t'));
  // console.log('res = ' + JSON.stringify(res, null, '\t'));
  console.log('facebookCallback 1');
  passport.authenticate('facebook',
  // {
  //   successRedirect: '/',
  //   failureRedirect: '/'
  // },
  function(err, user, info) {
    console.log('facebookCallback 2');
    // if(err) { return handleError(res, err); }
    if(err) { console.log('facebookCallback 3 err'); return next(err); }

    if (!user) {
      console.log('facebookCallback 4');
      return res.status(401).json({err: info});
    }
    console.log('facebookCallback 5');
    req.logIn(user, function(err) {
      console.log('facebookCallback 6');
      if (err) {
        console.log('facebookCallback 7 err');
        return res.status(500).json({err: 'Could not log in user'});
      }

      console.log('facebookCallback 8');
      var token = Verify.getToken(user);

      console.log('facebookCallback 9');

      //http://stackoverflow.com/questions/11758079/how-to-get-the-url-parameters-using-angular-js
      //use Hashbang mode to be compatible with older browsers
      //https://docs.angularjs.org/guide/$location
      var newLocation = '/#!/?';
      newLocation += 'success=true&';
      newLocation += 'token=' + token+'&';
      newLocation += 'username=' + user.username;

      res.writeHead(302, {'Location': newLocation});
      res.end();
    });
  })(req,res,next);
})

module.exports = router;
