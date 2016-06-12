var supertest = require('supertest');
//var app = require('../test');
var app = require('../../app');
var assert = require('assert');
var Users = require('../../../common/models/user');
var Country = require('../../../common/models/country');
var testConfig = require('../test-config');
var Project = require('../../../common/models/project');
var Skill = require('../../../common/models/skill');
var Message = require('../../../common/models/message');

var provider;
var owner;
var testProject1 = testConfig.testProject1;

describe('Project Prepare', function(){
  it('should delete all Users', function(done){
    Users.remove({}, function(err){
      if (err) return done(err);

      done();
    });
  });

  it('should delete all Projects', function(done){
    Project.remove({}, function(err){
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

describe('Project Test', function(){
  it('should register service provider', function(done){
    Country.findOne({"name":testConfig.userCredentials.countryName}, function(err, data){
      if (err) return done(err);

      testConfig.userCredentials.country = data;

      Skill.find({'name':{$in: ['EJB']}}, function(err, data){
        if (err) return done(err);

        //console.log('data = ' + JSON.stringify(data, null, '\t'));
        testConfig.userCredentials.skill = data;

        supertest(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .send(testConfig.userCredentials)
        .end(function(err, res){
          if (err) return done(err);

          assert(res.body._id, 'must have an id');
          testConfig.userCredentials._id = res.body._id;
          provider = testConfig.userCredentials;
          done();
        })
      })
    })
  });

  it('should register project owner', function(done){
    Country.findOne({"name":testConfig.ownerCredentials.countryName}, function(err, data){
      if (err) return done(err);

      testConfig.ownerCredentials.country = data;

      Skill.find({'name':{$in: ['JPA']}}, function(err, data){
        if (err) return done(err);

        //console.log('data = ' + JSON.stringify(data, null, '\t'));
        testConfig.userCredentials.skill = data;

        supertest(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .send(testConfig.ownerCredentials)
        .end(function(err, res){
          if (err) return done(err);

          assert(res.body._id, 'must have an id');
          testConfig.ownerCredentials._id = res.body._id;
          owner = testConfig.ownerCredentials;
          done();
        })
      })
    })
  });

  it('should create project', function(done){
    testProject1.provider = null;
    testProject1.owner = owner;
    testProject1.createDate = new Date();

    Skill.find({'name':{$in: testConfig.testProject1.skill}}, function(err, data){
      if (err) {
        //console.log('error res1 = ' + JSON.stringify(res, null, '\t') );
        return done(err);
      }

      testConfig.testProject1.skill = data;

      //console.log('provider = ' + JSON.stringify(provider, null, '\t'));

      supertest(app)
      .post('/api/projects')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .send(testProject1)
      .end(function(err, res){
        if (err) {
          //console.log('error res2 = ' + JSON.stringify(res, null, '\t') );
          return done(err);
        }

        assert(res.body._id, 'must have an id');
        testProject1._id = res.body._id;
        done();
      })
    })
  });

  it('provider with required skill should receive a message from project', function(done){
    supertest(app)
    .get('/api/messages/user/'+provider._id)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) {
        //console.log('error res = ' + JSON.stringify(res, null, '\t'));
        return done(err);
      }

      var messages = res.body;
      //console.log(' messages = ' + JSON.stringify(messages, null, '\t'));
      assert(messages.length == 1);
      assert(messages[0].title === 'New Project : ' + testProject1.title)
      //console.log('messages.text = ' + JSON.stringify(messages[0].text, null, '\t'));
      done();
    })
  });

  it('provider should send a bid', function(done){
    var bid = {
      'bidder': provider,
      'comment': 'ME !! ME !! ME !!'
    };

    supertest(app)
    .post('/api/projects/' + testProject1._id + '/bid')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .send(bid)
    .end(function(err, res){
      if (err) {
        //console.log('error res = ' + JSON.stringify(res, null, '\t'));
        return done(err);
      }

      done();
    })
  });

  it('creator should receive an email about the bid received', function(done){
    supertest(app)
    .get('/api/messages/user/'+owner._id)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) {
        //console.log('error res = ' + JSON.stringify(res, null, '\t'));
        return done(err);
      }

      var messages = res.body;
      //console.log(' messages = ' + JSON.stringify(messages, null, '\t'));
      assert(messages.length == 1);
      assert(messages[0].title === 'New Bid Received')
      //console.log('messages.text = ' + JSON.stringify(messages[0].text, null, '\t'));
      done();
    })
  });

  it('creator should see a bid', function(done){
    supertest(app)
    .get('/api/projects/' + testProject1._id + '/bid')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) {
        console.log('error res = ' + JSON.stringify(err, null, '\t'));
        return done(err);
      }

      assert(res.body.length == 1);

      done();
    })
  });

  it('should update project with a provider and set as started', function(done){
    testProject1.provider = provider;
    testProject1.startDate = new Date();

    supertest(app)
    .put('/api/projects/' + testProject1._id)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .send(testProject1)
    .end(function(err, res){
      if (err) {
        //console.log('error res = ' + JSON.stringify(res, null, '\t') );
        return done(err);
      }

      assert(res.body._id, 'must have an id');
      testProject1 = res.body;

      done();
    })
  });

  it('should update project with provider ratings and set as completed', function(done){
    testProject1.providerRating = 5;
    testProject1.providerRatingComment = 'Comment 1';
    testProject1.startDate = new Date();

    supertest(app)
    .put('/api/projects/' + testProject1._id)
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .send(testProject1)
    .end(function(err, res){
      if (err) {
        console.log('error res = ' + JSON.stringify(res, null, '\t') );
        return done(err);
      }

      assert(res.body._id, 'must have an id');
      assert(res.body.providerRating === testProject1.providerRating);
      assert(res.body.providerRatingComment === testProject1.providerRatingComment);

      testProject1 = res.body;
      done();
    })
  });
});
