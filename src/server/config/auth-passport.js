'use strict';

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let Skill = require('../../common/models/skill');
let Country = require('../../common/models/country');
let User = require('../../common/models/user');
let config = require('./settings');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let FacebookStrategy = require('passport-facebook').Strategy;

exports.facebook = passport.use(new FacebookStrategy(
  {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done){
    User.findOne({ OauthId: profile.id }, function(err, user){
       // handle errors!
      if(err) console.log(err);

      if (!err && user !== null){
        done(null, user);
      }
      else{
        user = new User({ username: profile.displayName });

        user.OauthId = profile.id;
        user.OauthToken = accessToken;
        user.save(function(err){
          // handle errors!
          if(err){
            console.log(err);
          }else{
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));
