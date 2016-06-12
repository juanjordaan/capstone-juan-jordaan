var supertest = require('supertest');
var app = require('../../../bin/www');
//var app = require('../../app');
var assert = require('assert');
var Users = require('../../../common/models/user');
var Country = require('../../../common/models/country');
var testConfig = require('../test-config');
var Skill = require('../../../common/models/skill');

var user = {};

describe('Users Prepare', function(){
  it('should delete all Users', function(done){
    Users.remove({}, function(err){
      if (err) return done(err);

      console.log('Deleted ALL users');
      done();
    });
  });
});

describe('User Register Test', function(){
  it('should fail registration with no details', function(done){
    supertest(app)
    .post('/api/users/register')
    .set('Content-Type', 'application/json')
    .expect(422)
    .send({})
    .end(function(err, res){
      if (err) return done(err);

      done();
    })
  });

  it('should register with details', function(done){
    Country.findOne({"name":testConfig.userCredentials.countryName}, function(err, data){
      if (err) return done(err);

      testConfig.userCredentials.country = data;

      var userSkills = [];
      for( var skill of testConfig.userCredentials.skill ){
        Skill.findOne({"name":skill}, function(err, data){
          //console.log('found skill = ' + JSON.stringify(data, null, '\t') );
          userSkills.push(data);
        })
      }
      testConfig.userCredentials.skill = userSkills;

      supertest(app)
      .post('/api/users/register')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .send(testConfig.userCredentials)
      .end(function(err, res){
        if (err) {
          //console.log('error res = ' + JSON.stringify(res, null, '\t'));
          return done(err);
        }

        //console.log('res = ' + JSON.stringify(res, null, '\t'));
        assert(res.body._id, 'must have an id');
        testConfig.userCredentials._id = res.body._id;
        user = testConfig.userCredentials;
        //console.log('user = ' + JSON.stringify(user));
        done();
      })
    })
  });

  it('should get user by id', function(done){
    supertest(app)
    .get('/api/users/' + user._id)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err){
        return done(err);
      }

      user = res.body;
      assert(res.body._id, 'must have an id');
      done();
    })
  });

  it('should update user', function(done){
    user.firstname = "nauJ";
    supertest(app)
    .put('/api/users/' + user._id)
    .send(user)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      assert(res.body._id, 'must have an id');
      assert(res.body.firstname === user.firstname);
      user = res.body;

      done();
    })
  });
});
