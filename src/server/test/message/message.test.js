var supertest = require('supertest');
var app = require('../../../bin/www');
//var app = require('../../app');
var assert = require('assert');
var User = require('../../../common/models/user');
var Message = require('../../../common/models/message');
var Country = require('../../../common/models/country');
var testConfig = require('../test-config');
var Skill = require('../../../common/models/skill');

var user1 = testConfig.userCredentials;
var user2 = testConfig.ownerCredentials;
var u1m1;
var u2m1;

describe('Message Prepare', function(){
  it('should delete all Users', function(done){
    User.remove({}, function(err){
      if (err) return done(err);

      done();
    });
  });

  it('should delete all Messages', function(done){
    Message.remove({}, function(err){
      if (err) return done(err);

      done();
    });
  });
});

describe('Messages Test', function(){
  it('should register user 1', function(done){
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
          console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));
          return done(err);
        }

        //console.log('res = ' + JSON.stringify(res, null, '\t'));
        assert(res.body._id, 'must have an id');
        testConfig.userCredentials._id = res.body._id;
        user1 = testConfig.userCredentials;
        //console.log('user1 = ' + JSON.stringify(user1));
        done();
      })
    })
  });

  it('should register user 2', function(done){
    Country.findOne({"name":testConfig.ownerCredentials.countryName}, function(err, data){
      if (err) {
        console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));
        return done(err);
      }

      testConfig.ownerCredentials.country = data;

      var userSkills = [];
      for( var skill of testConfig.ownerCredentials.skill ){
        Skill.findOne({"name":skill}, function(err, data){
          if (err) {
            console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));
            return done(err);
          }
          //console.log('found skill = ' + JSON.stringify(data, null, '\t') );
          userSkills.push(data);
        })
      }
      testConfig.ownerCredentials.skill = userSkills;

      supertest(app)
      .post('/api/users/register')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .send(testConfig.ownerCredentials)
      .end(function(err, res){
        if (err) {
          console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));
          return done(err);
        }

        //console.log('res = ' + JSON.stringify(res, null, '\t'));
        assert(res.body._id, 'must have an id');
        testConfig.ownerCredentials._id = res.body._id;
        user2 = testConfig.ownerCredentials;
        //console.log('user2 = ' + JSON.stringify(user2));
        done();
      })
    })
  });

  it('user1 should send a message to user2', function(done){

    testConfig.messageTemplate.title = 'Test Message 1';
    testConfig.messageTemplate.text='';
    testConfig.messageTemplate.sender = user1;
    testConfig.messageTemplate.receiver = user2;

    supertest(app)
    .post('/api/messages/')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .send(testConfig.messageTemplate)
    .end(function(err, res){
      if (err) {
        console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));
        return done(err);
      }

      //console.log('res = ' + JSON.stringify(res, null, '\t'));
      assert(res.body._id, 'must have an id');
      testConfig.messageTemplate._id = res.body._id;
      u1m1 = testConfig.messageTemplate;
      //console.log('u1m1 = ' + JSON.stringify(u1m1));
      done();
    })
  });

  it('user2 should receive a message from user1', function(done){
    supertest(app)
    .get('/api/messages/user/'+user2._id)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) {
        console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));
        return done(err);
      }

      var messages = res.body;
      assert(messages.length == 1);
      assert(messages[0].title === "Test Message 1")
      u2m1 = messages[0];
      //console.log('messages = ' + JSON.stringify(messages, null, '\t'));
      done();
    })
  });

  it('user2 should delete a message from user1', function(done){
    supertest(app)
    .delete('/api/messages/'+u2m1._id)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) {
        console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));
        return done(err);
      }

      // var messages = res.body;
      // assert(messages.length == 1);
      // assert(messages[0].title === "Test Message 1")
      // u2m1 = messages[0];
      //console.log('messages = ' + JSON.stringify(messages, null, '\t'));
      done();
    })
  });

  it('user2 should have no messages', function(done){
    supertest(app)
    .get('/api/messages/user/'+user2._id)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) {
        console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));
        return done(err);
      }

      var messages = res.body;
      assert(messages.length == 0);
      done();
    })
  });

  it('user1 should have a message sent by himself', function(done){
    supertest(app)
    .get('/api/messages/user/'+user1._id)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) {
        console.log('error res.text = ' + JSON.stringify(res.text, null, '\t'));
        return done(err);
      }

      var messages = res.body;
      assert(messages.length == 1);
      assert(messages[0].title === "Test Message 1")
      done();
    })
  });
});
