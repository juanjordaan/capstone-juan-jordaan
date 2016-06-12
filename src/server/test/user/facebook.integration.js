var supertest = require('supertest');
//var app = require('../test');
var app = require('../../app');
var assert = require('assert');
var testConfig = require('../test-config');
var Users = require('../../../common/models/user');

var token = '';

describe('Prepare Facebook Passport', function(){
  it('should delete all users', function(done){
    Users.remove({}, function(err){
      if (err) return done(err);
      done();
    });
  });
});

describe('Facebook Passport', function(){
  it('Should use facebook credentials', function(done){
    supertest(app)
    // https://localhost:3443/
    .get('/users/facebook')
    //.set('Accept', 'application/json')
    .expect(200)
    .send()
    .end(function(err, res){
      console.log('err = ' + err);
      if (err) return done(err);

      console.log('res.body = ' + JSON.stringify(res.body, null, '\t'));

      token = res.body.token;

      done();
    })
  });

  it('GET /dishes should pass with token', function(done) {
    supertest(app)
    .get('/dishes')
    .set('x-access-token', token)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      //assert.notDeepEqual([], res.body);
      //testDish1Id = res.body[0]._id;

      done();
    });

  // var j = request.jar();
  // var requestWithCookie = request.defaults({jar: j});
  //
  // // Authenticate, thus setting the cookie in the cookie jar
  // before(function(done) {
  //   requestWithCookie.post('https://localhost:3443/users/facebook', {user: 'foo', password: 'bar'}, done);
  // });
  //
  // it('should get the user profile', function (done) {
  //   requestWithCookie.get('https://localhost:3443/users/facebook', function (err, res, user) {
  //     assert.equal(user.login, 'foo');
  //     done();
  //   });
  // });

  // it('Should Register with Facebook credentials', function(done){
  //   supertest(app)
  //   .post('/users/register')
  //   .set('Content-Type', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(200)
  //   .send(testConfig.userCredentials)
  //   .end(function(err, res){
  //     if (err) return done(err);
  //
  //     done();
  //   })
  // });

});
