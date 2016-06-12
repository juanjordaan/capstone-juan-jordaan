var supertest = require('supertest');
var app = require('../../app');
var assert = require('assert');
var Skill = require('../../../common/models/skill');
var User = require('../../../common/models/user');
var Country = require('../../../common/models/country');
var testConfig = require('../test-config');

var skills = [];
var user = [];

describe('Skills Prepare', function(){
  it('should delete all Users', function(done){
    User.remove({}, function(err){
      if (err) return done(err);

      done();
    });
  });
});

describe('Skill Test', function(){
  it('should get all skills via rest interface', function(done){
    supertest(app)
    .get('/api/skills/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) {
        console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));

        return done(err);
      }

      skills = res.body;
      done();
    });
  });

  it('should register with details', function(done){
    Country.findOne({"name":testConfig.userCredentials.countryName}, function(err, data){
      if (err) {
        //res.text = res.text.replace('\\', '');
        console.log('error res.text = ' + res.text);
        return done(err);
      }

      testConfig.userCredentials.country = data;

      testConfig.userCredentials.skill = [];

      supertest(app)
      .post('/api/users/register')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .send(testConfig.userCredentials)
      .end(function(err, res){
        if (err) {
          console.log('\n\n\n');
          console.log('res.text         = ' + res.text);
          //console.log('res.text.message = ' + res.text.message);
          //console.log('JSON.parse(res.text)[0] = ' + res.text[0];
          //var errors = JSON.parse(res.text)[0].message.errors;

          //var errors = JSON.parse(res.text).errors;
          //console.log('\n\n\n');
          //console.log('JSON.stringify(errors) = ' + JSON.stringify(errors));
          //for( var index in errors ){
            //console.log('JSON.stringify(errors[index]) = ' + JSON.stringify(errors[index]));
            //console.log('JSON.stringify(errors[index]) = ' + JSON.stringify(errors[index]));
          //}
          return done(err);
        }

        assert(res.body._id, 'must have an id');
        testConfig.userCredentials._id = res.body._id;
        user = testConfig.userCredentials;
        done();
      })
    })
  });

  // it('should get (0) skills for user', function(done){
  //   supertest(app)
  //   .get('/api/users/' + user._id + '/skills')
  //   .set('Content-Type', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(200)
  //   .end(function(err, res){
  //     if (err) {
  //       console.log('error res = ' + JSON.stringify(res, null, '\t'));
  //       return done(err);
  //     }
  //
  //     assert(res.body.length == 0, 'must have 0 skills');
  //     done();
  //   })
  // });
  //
  // it('should create (1) skill for user', function(done){
  //   supertest(app)
  //   .put('/api/users/' + user._id + '/skills')
  //   .set('Content-Type', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(200)
  //   .send(skills[0])
  //   .end(function(err, res){
  //     if (err) {
  //       console.log('error res = ' + JSON.stringify(res, null, '\t'));
  //       return done(err);
  //     }
  //
  //     done();
  //   })
  // });
  //
  // it('should get (1) skills for user', function(done){
  //   supertest(app)
  //   .get('/api/users/' + user._id + '/skills')
  //   .set('Content-Type', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(200)
  //   .end(function(err, res){
  //     if (err) {
  //       console.log('error res = ' + JSON.stringify(res, null, '\t'));
  //       return done(err);
  //     }
  //
  //     assert(res.body.length == 1, 'must have 1 skill');
  //     user.skill = res.body;
  //     done();
  //   })
  // });
  //
  // it('should create (2) skill for user', function(done){
  //   supertest(app)
  //   .put('/api/users/' + user._id + '/skills')
  //   .set('Content-Type', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(200)
  //   .send([skills[1], skills[2]])
  //   .end(function(err, res){
  //     if (err) {
  //       console.log('error res = ' + JSON.stringify(res, null, '\t'));
  //       return done(err);
  //     }
  //
  //     done();
  //   })
  // });
  //
  // it('should get (2) skills for user', function(done){
  //   supertest(app)
  //   .get('/api/users/' + user._id + '/skills')
  //   .set('Content-Type', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(200)
  //   .end(function(err, res){
  //     if (err) {
  //       console.log('error res = ' + JSON.stringify(res, null, '\t'));
  //       return done(err);
  //     }
  //
  //     assert(res.body.length == 2, 'must have 2 skill');
  //     user.skill = res.body;
  //     done();
  //   })
  // });
});
