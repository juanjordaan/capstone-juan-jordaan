'use strict';

let express = require('express');
let router = express.Router();
let User = require('../../common/models/user');
let bodyParser = require('body-parser');
let errorFormatter = require('./error.format.js').errorFormatter;

router.use(bodyParser.json());

//Verify.verifyOrdinaryUser, Verify.verifyAdmin
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).put(updateUser);
router.route('/:id/skills').get(getUserSkills).put(updateUserSkills);
router.route('/register').post(register);
//router.route('/login').post(login);
//Verify.verifyOrdinaryUser
//router.route('/logout').get(logout);

module.exports = router;

function getAllUsers(req, res, next){
  User.find({}, function (err, data){
    if (err) throw err;
    res.json(data);
  });
};

function getUser(req, res, next){
  User.findById(req.params.id, function (err, data){
    if (err) throw err;
    res.json(data);
  });
};

function updateUser(req, res, next){
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function (err, data) {
      if( err ) return res.status(422).json(errorFormatter.getResponse(err));
      res.json(data);
    }
  );
};

function getUserSkills(req, res, next){
  User.findById(req.params.id)
  .populate('skill')
  .exec(function(err, data){
    if (err) throw err;

    res.json(data.skill);
  });
};

function updateUserSkills(req, res, next){
  User.findById(req.params.id, function(err, data){
    if( err ) return res.status(422).json(errorFormatter.getResponse(err));

    data.skill = req.body;

    data.save(function(err, data){
      if( err ) return res.status(304).json([{message: err}]);
    });

    res.json();
  });
};

// function login(req, res, next){
//   passport.authenticate('local', function(err, user, info){
//     if(err) return next(err);
//
//     if(!user){
//       return res.status(401).json({ err: info });
//     }
//
//     req.logIn(user, function(err){
//       if (err) {
//         return res.status(500).json({ err: 'Could not log in user' });
//       }
//
//       console.log('User in users : ' + user);
//
//       var token = Verify.getToken(user);
//
//       res.status(200).json({
//         status: 'Login successful!',
//         success: true,
//         token: token
//       });
//     });
//   })(req,res,next);
// };

function register(req, res){
  //User.register(new User({ username : req.body.username }), req.body.password, function(err, user){
    //if( err ) return res.status(422).json(errorFormatter.getResponse(err));
    // console.log('req.body = ' + JSON.stringify(req.body, null, '\t'));
    req.body.username = req.body.email.toLowerCase();
    User.create(req.body, function(err, data){
      if( err ) {
        console.log('register err = ' + JSON.stringify(err, null, '\t'));
        return res.status(422).json(errorFormatter.getResponse(err));
      }

      // passport.authenticate('local')(req, res, function(){
      return res.status(201).json({_id: data._id});
      // });
    });
  //});
};

// function logout(req, res){
//   req.logout();
//   res.status(200).json({ status: 'Bye!' });
// };

/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };
