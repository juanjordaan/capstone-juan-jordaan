var supertest = require('supertest');
//var app = require('../test');
var app = require('../../app');
var assert = require('assert');
var Users = require('../../../common/models/user');


describe('Users Prepare', function(){
  it('should delete all Users', function(done){
    Users.remove({}, function(err){
      if (err) return done(err);

      console.log('Deleted users');
      done();
    });
  });
});


describe('Basic-Auth Security Test', function(){
  it('should return 401', function(done) {
    supertest(app)
      .get('/random-url')
      .expect(401, done);
  });

  it('Should Fail Authentication with wrong credentials', function(done){
    supertest(app)
    .get('/')
    .set('Accept', 'application/json')
    .set('authorization', 'Basic YWRtaW46cGFzc3dvcg==')
    .expect(401)
    .end(function(err, res){
      if (err) return done(err);

      done();
    })
  });

  it('Should Pass Authentication with correct credentials', function(done){
    supertest(app)
    .get('/')
    .set('Accept', 'application/json')
    .set('authorization', 'Basic YWRtaW46cGFzc3dvcmQ==')
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      done();
    })
  });
});
