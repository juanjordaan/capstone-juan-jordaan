var supertest = require('supertest');
var app = require('../../app');
var assert = require('assert');
var Country = require('../../../common/models/country');
var testConfig = require('../test-config');

var country;

describe('Countries Prepare', function(){
  it('should delete all Countries', function(done){
    Country.remove({}, function(err){
      if (err) return done(err);

      console.log('Deleted ALL users');
      done();
    });
  });
});

describe('Country Test', function(){
  it('should create Countries', function(done){
    for( var country of testConfig.countries ){
      Country.create({"name":country.name}, function(err, data){
        if (err) return done(err);

        console.log('Created country id: ' + data.id + " name:"+ data.name);
      });
    }

    done();
  });

  it('should get all countries via db interface', function(done){
    Country.find( function(err, data){
      if (err) return done(err);

      done();
    });
  });

  it('should get all countries via rest interface', function(done){
    supertest(app)
    .get('/api/countries/')
    // .set('x-access-token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      done();
    });
  });
});
