var supertest = require('supertest');
var app = require('../../bin/www');
var assert = require('assert');
var Users = require('../../common/models/user');
var testConfig = require('./test-config');

describe('DB Init', function(){
  it('should run a query against db', function(done){
    Users.find( function(err, data){
      if (err) return done(err);

      //console.log('data = ' + JSON.stringify(data));
      done();
    });
  });
});
