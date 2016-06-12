var supertest = require('supertest');
//var app = require('../test');
var app = require('../../app');
var assert = require('assert');
var Users = require('../../../common/models/user');
var Country = require('../../../common/models/country');
var testConfig = require('../test-config');
var Skill = require('../../../common/models/skill');

var user;

describe('Users Prepare', function(){
  it('should delete all Users', function(done){
    Users.remove({}, function(err){
      if (err) return done(err);

      done();
    });
  });
});

describe('User Test', function(){
  it('should create a user', function(done){
    //console.log('testConfig.userCredentials.countryName = ' + testConfig.userCredentials.countryName);
    Country.findOne({"name":testConfig.userCredentials.countryName}, function(err, data){
      if (err) {
        return done(err);
      }

      //console.log('country121 = ' + data);
      //console.log('data.name = ' + data.name);
      testConfig.userCredentials.country = data;

      var userSkills = [];
      for( var skill of testConfig.userCredentials.skill ){
        Skill.findOne({"name":skill}, function(err, data){
          //console.log('found skill = ' + JSON.stringify(data, null, '\t') );
          userSkills.push(data);
        })
      }
      testConfig.userCredentials.skill = userSkills;

      Users.create(testConfig.userCredentials, function(err, data){
        if (err) {
          console.log('err ' + JSON.stringify(err, null, '\t'));
          return done(err);
        }

        user = data;
        //console.log('Created user '+ JSON.stringify(data, null, '\t'));
        done();
      });
    });
  });

  it('should get all users', function(done){
    Users.find( function(err, data){
      if (err) return done(err);

      done();
    });
  });

  it('should get 1 user', function(done){
    Users.findById(user._id, function(err, data){
      if (err) return done(err);

      done();
    });
  });

  it('should update 1 user', function(done){
    user.firstname = 'Juan123';
    user.lastname = 'Jordaan';

    //console.log('user.id = ' + user._id);
    Users.findByIdAndUpdate(user._id, { $set: user }, { new: true }, function(err, data){
      if (err) return done(err);

      //console.log('user = ' + user);
      assert(data.firstname === user.firstname)

      user = data;
      done();
    });
  });

  // it('should delete 1 user', function(done){
  //   user.firstname = 'Juan';
  //   user.lastname = 'Jordaan';
  //
  //   Users.findByIdAndRemove(user.id, function(err){
  //     if (err) return done(err);
  //
  //     Users.findById(user.id, function(err, data){
  //       if (err) return done(err);
  //
  //       console.log('data = ' + data);
  //       done();
  //     });
  //   });
  // });
});
