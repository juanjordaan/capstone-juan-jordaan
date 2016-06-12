var supertest = require('supertest');
var app = require('../../app');
var assert = require('assert');
var Skill = require('../../../common/models/skill');
var testConfig = require('../test-config');

describe('Skills Prepare', function(){
  it('should delete all Skills', function(done){
    Skill.remove({}, function(err){
      if (err) return done(err);

      done();
    });
  });
});

describe('Skill Test', function(){
  it('should create Skills', function(done){
    for( var skill of testConfig.skills ){
      Skill.create({"name":skill.name}, function(err, data){
        if (err) return done(err);

        console.log('Created skill id: ' + data.id + " name:"+ data.name);
      });
    }

    done();
  });

  it('should get all skills via db interface', function(done){
    Skill.find( function(err, data){
      if (err) return done(err);

      done();
    });
  });

  it('should get all skills via rest interface', function(done){
    supertest(app)
    .get('/api/skills/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      done();
    });
  });
});
