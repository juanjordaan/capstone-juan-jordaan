var supertest = require('supertest');
var app = require('../../bin/www');
var assert = require('assert');
var bodyParser = require('body-parser');
var testConfig = require('../test-config');
var Favorites = require('../../models/favorites');
var Users = require('../../models/user');
var Dishes = require('../../models/dishes');

var token = '';
var testDish1 = {};
var testDish2 = {};
var testFavorite = {};
var testUser = {};

describe('Favorites Prepare', function(){
  it('should delete all favorites', function(done){
    Favorites.remove({}, function(err){
      if (err) return done(err);
      done();
    });
  });

  it('should delete all dishes', function(done){
    Dishes.remove({}, function(err){
      if (err) return done(err);
      done();
    });
  });

  it('should create first dish', function(done){
    Dishes.create( testConfig.testDish1, function(err, dish){
      if (err) return done(err);

      dish.comments.push(testConfig.testDishComment1);
      dish.save(function (err, dish){
        if (err) throw err;
        res.json(dish);
      });

      testDish1 = dish;
      done();
    });
  });

  it('should create second dish', function(done){
    Dishes.create( testConfig.testDish2, function(err, dish){
      if (err) return done(err);

      testDish2 = dish;
      done();
    });
  });

  it('should delete all users', function(done){
    Users.remove(({}), function(err, dish){
      if (err) return done(err);

      done();
    });
  });
});

describe('Favorite - Users', function(){
  it('GET /favorites should fail and return 403', function(done){
    supertest(app)
    .get('/favorites')
    .expect(403, done);
  });

  it('Should Register with credentials', function(done){
    supertest(app)
    .post('/users/register')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .send(testConfig.userCredentials)
    .end(function(err, res){
      if (err) return done(err);

      Users.findOne({"username":testConfig.userCredentials.username}, function(err, user){
        if (err) return done(err);

        testUser = user;
        done();
      });
    })
  });

  it('Should Login with correct credentials', function(done){
    supertest(app)
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .send(testConfig.userCredentials)
    .end(function(err, res){
      if (err) return done(err);

      assert.notEqual(null, res.body.token);
      assert.notEqual(undefined, res.body.token);
      token = res.body.token;
      done();
    })
  });

  it('GET /favorites should be null', function(done){
    supertest(app)
    .get('/favorites/')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      assert.equal(null, res.body);
      done();
    })
  });

  it('should create a favorite from first dish', function(done){
    supertest(app)
    .post('/favorites')
    .set('x-access-token', token)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .send({"_id":testDish1._id})
    .end(function(err, res){
      if (err) return done(err);

      console.log('res.body = ' + JSON.stringify(res.body, null, '\t'));

      assert.equal(''+res.body.postedBy, ''+testUser._id);
      assert.equal(''+res.body.dishes[0], ''+testDish1._id);
      done();
    })
  });

  it('should avoid duplicate favorites', function(done){
    supertest(app)
    .post('/favorites')
    .set('x-access-token', token)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .send({"_id":testDish1._id})
    .end(function(err, res){
      if (err) return done(err);

      console.log('res.body = ' + JSON.stringify(res.body, null, '\t'));

      assert.equal(''+res.body.postedBy, ''+testUser._id);
      assert.equal(''+res.body.dishes[0], ''+testDish1._id);
      assert.equal(res.body.dishes[1], undefined);
      done();
    })
  });

  it('should fetch one favorite with details', function(done){
    supertest(app)
    .get('/favorites')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      testFavorite = res.body;
      console.log('testFavorite = ' + JSON.stringify(testFavorite, null, '\t'));
      //console.log('testUser  = ' + JSON.stringify(testUser, null, '\t'));

      assert.equal(''+testFavorite.postedBy._id, ''+testUser._id);
      assert.equal(testFavorite.postedBy.username, testUser.username);
      assert.equal(testFavorite.postedBy.password, testUser.password);
      assert.equal(testFavorite.postedBy.admin, testUser.admin);

      assert.equal(''+testFavorite.dishes[0]._id, ''+testDish1._id);
      assert.equal(''+testFavorite.dishes[0].name, ''+testDish1.name);

      done();
    })
  });

  it('should add second dish to favorites', function(done){
    supertest(app)
    .post('/favorites')
    .set('x-access-token', token)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .send({"_id":testDish2._id})
    .end(function(err, res){
      if (err) return done(err);

      assert.equal(''+res.body.postedBy, ''+testUser._id);
      assert.equal(''+res.body.dishes[1], ''+testDish2._id);
      done();
    })
  });

  it('should fetch two favorites with details', function(done){
    supertest(app)
    .get('/favorites')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      testFavorite = res.body;
      console.log('testFavorite = ' + JSON.stringify(testFavorite, null, '\t'));
      //console.log('testUser  = ' + JSON.stringify(testUser, null, '\t'));

      assert.equal(''+testFavorite.postedBy._id, ''+testUser._id);
      assert.equal(testFavorite.postedBy.username, testUser.username);
      assert.equal(testFavorite.postedBy.password, testUser.password);
      assert.equal(testFavorite.postedBy.admin, testUser.admin);

      assert.equal(''+testFavorite.dishes[0]._id, ''+testDish1._id);
      assert.equal(''+testFavorite.dishes[0].name, ''+testDish1.name);

      assert.equal(''+testFavorite.dishes[1]._id, ''+testDish2._id);
      assert.equal(''+testFavorite.dishes[1].name, ''+testDish2.name);

      done();
    })
  });

  it('should delete first favorite and return remaining structure', function(done){
    supertest(app)
    .delete('/favorites/' + testDish1._id)
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      assert.equal(''+res.body.dishes[0], ''+testDish2._id);
      done();
    });
  });

  it('should fetch one favorites with details', function(done){
    supertest(app)
    .get('/favorites')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      testFavorite = res.body;
      console.log('testFavorite = ' + JSON.stringify(testFavorite, null, '\t'));
      //console.log('testUser  = ' + JSON.stringify(testUser, null, '\t'));

      assert.equal(''+testFavorite.postedBy._id, ''+testUser._id);
      assert.equal(testFavorite.postedBy.username, testUser.username);
      assert.equal(testFavorite.postedBy.password, testUser.password);
      assert.equal(testFavorite.postedBy.admin, testUser.admin);

      assert.equal(''+testFavorite.dishes[0]._id, ''+testDish2._id);
      assert.equal(''+testFavorite.dishes[0].name, ''+testDish2.name);

      done();
    })
  });

  it('should create a favorite from first dish', function(done){
    supertest(app)
    .post('/favorites')
    .set('x-access-token', token)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .send({"_id":testDish1._id})
    .end(function(err, res){
      if (err) return done(err);

      done();
    })
  });

  it('should delete all favorites', function(done){
    supertest(app)
    .delete('/favorites')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      done();
    });
  });

  it('GET /favorites should be null', function(done){
    supertest(app)
    .get('/favorites')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);

      assert.equal(null, res.body);

      done();
    })
  });
});

function extractId(text){
  var newId = text.substring(text.length - 24, text.length);
  return newId;
}
