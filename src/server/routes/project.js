'use strict';

let express = require('express');
let router = express.Router();
let Project = require('../../common/models/project');
let User = require('../../common/models/user');
let bodyParser = require('body-parser');
let Message = require('../../common/models/message');
let errorFormatter = require('./error.format.js').errorFormatter;
// let SocketManager = require('../util/socket-manager');
// let Verify = require('./verify');


router.use(bodyParser.json());
//Verify.verifyOrdinaryUser, Verify.verifyAdmin
router.route('/').post(createProject);
router.route('/:id').get(getProject).put(updateProject);
router.route('/:id/bid').post(createBid).get(getBids).put(updateBid);
// router.route('/:id/bid/:bidderId/comment/:comment').put(acceptBid).delete(declineBid);
router.route('/open/:userId').get(getOpenProjects);
router.route('/owner/:userId').get(getOwnerProjects);
router.route('/provider/:userId').get(getProviderProjects);

module.exports = router;

function createProject(req, res, next){
  if(!req.body.createDate) req.body.createDate = new Date();
  //if(!req.body.skill) return res.status(422).json([{message: 'Please choose required skills'}]);
  //if(req.body.skill.length == 0) return res.status(422).json([{message: 'Please choose required skills'}]);
  //console.log('req.body = ' + JSON.stringify(req.body,  null, '\t'));
  //console.log('req.body.skill = ' + JSON.stringify(req.body.skill,  null, '\t'));
  req.body.status = 'New';
  Project.create(req.body, function (err, data){
    if( err ) return res.status(422).json(errorFormatter.getResponse(err));

    var projectSkills = [];
    for(let skill of req.body.skill)
      projectSkills.push(skill._id);

    User.find({skill: { $in: req.body.skill }}, function (err, data){
      if( err ) return res.status(422).json(errorFormatter.getResponse(err));

      // TODO : replace with email template
      for( let user of data ){
        //console.log('New Project message created for user ' + user.firstname + ' ' + user.lastname);
        var message = {
          'owner':user._id,
          'sender': req.body.owner,
          'receiver':user._id,
          'title':'New Project : ' + req.body.title,
          'sentDate': new Date(),
          'text':'A new Project has been created that require some of your skills, we thought you might be interested : ' + req.body.description,
        };

        //console.log('new message = ' + JSON.stringify(message, null, '\t'));

        Message.create(message, function (err, data){
          if( err ) return res.status(422).json(errorFormatter.getResponse(err));

          req.app.get('SocketManager').newMessage(data);
        });
      }
    });

    return res.status(201).json({_id: data.id});
  });
};

function getOpenProjects(req, res, next){
  User.findById(req.params.userId)
  .populate('skill')
  .exec( function (err, user){
    if( err ) return res.status(422).json(errorFormatter.getResponse(err));

    Project.find({
      skill: { $in: user.skill },
      startDate:null,
      owner:{ $ne:user},
      status:'New'
    })
    .populate('skill')
    .populate('owner')
    .exec(function (err, data){
      if( err ) return res.status(422).json(errorFormatter.getResponse(err));

      return res.status(200).json(data);
    });
  });
};

function getProject(req, res, next){
  Project.findById(req.params.id, function (err, data) {
    if( err ) return res.status(422).json(errorFormatter.getResponse(err));

    return res.status(200).json(data);
  });
};

// function deleteProject(req, res, next){
//   Project.findByIdAndRemove(req.params.dishId, function (err, res) {
//     if( err ) return res.status(422).json([{message: err}]);
//       return res.status(201).json({id: data._id});
//   });
// };

function updateProject(req, res, next){
  Project.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function (err, data) {
      if( err ) return res.status(422).json(errorFormatter.getResponse(err));
      res.json(data);
    }
  );
};

function getOwnerProjects(req, res, next){
  Project.find({'owner':req.params.userId})
  .populate('skill')
  .populate('provider')
  .populate({
    path:'provider.skill',
    model: 'Skill'
  })
  .populate({
    path:'bids.bidder.skill',
    model: 'Skill'
  })
  .exec(function (err, projects){
    if (err) throw err;

    // console.log('projects[0].provider.skill = ' + projects[0].provider.skill);
    res.json(projects);
  });
};

function getProviderProjects(req, res, next){
  Project.find({'provider':req.params.userId})
  .populate('skill')
  .populate('owner')
  .exec(function (err, data){
    if (err) throw err;

    res.json(data);
  });
};

function createBid(req, res, next){
  Project.findById(req.params.id, function(err, project){
    if (err) throw err;

    project.bids.push(req.body);
    project.save(function (err, project){
      if( err ) return res.status(422).json(errorFormatter.getResponse(err));

      var message = {
        'sentDate': new Date(),
        'owner':project.owner,
        'sender': req.body.bidder._id,
        'receiver':project.owner,
        'title':'New Bid Received',
        'text':'You have received a new bid for project \'' + project.name + '\', open your project in the Dashboard to view!',
      };

      Message.create(message, function (err, data){
        if( err ) return res.status(422).json(errorFormatter.getResponse(err));

        req.app.get('SocketManager').newMessage(data);
      });

      return res.status(201).json();
    });
  });
};

function getBids(req, res, next){
  Project.findById(req.params.id)
  // .populate('bids')
  .exec(function(err, data){
    if (err) {
      console.log('err = ' + JSON.stringify(err, null, '\t'));
      throw err;
    }

    res.json(data.bids);
  });
};

function updateBid(req, res, next){
  let operation = req.body.operation;
  let bidderId = req.body.bidderId;
  let bidComment = req.body.comment;

  Project.findById(req.params.id, function (err, project) {
    if( err ) return res.status(422).json(errorFormatter.getResponse(err));

    if( operation === 'update'){
      throw new Error('update bid received');
    }
    else if( operation === 'accept'){
      for (let i = (project.bids.length - 1); i >= 0; i--) {
        if( project.bids[i].bidder._id === bidderId && project.bids[i].comment === bidComment ){
          project.startDate = new Date();
          project.provider = project.bids[i].bidder;
          project.status = 'Started';

          var message = {
            'sentDate': project.startDate,
            'owner':project.provider,
            'sender': project.owner,
            'receiver':project.provider,
            'title':'Bid Accepted',
            'text':'Congratulations! Your bid for the project \'' + project.title + '\' has been accepted. The project will now appear on your dashboard.',
          };

          Message.create(message, function (err, data){
            if( err ) return res.status(422).json(errorFormatter.getResponse(err));

            req.app.get('SocketManager').newMessage(data);
          });
        }

        project.bids.splice(i, 1);
      }
    }
    else if( operation === 'decline'){
      for (let i = (project.bids.length - 1); i >= 0; i--) {
        if( project.bids[i].bidder._id === bidderId && project.bids[i].comment === bidComment ){
          project.bids.splice(i, 1);
        }
      }
    }
    else{
      throw new Error('unknown bid operation received : ' + operation);
    }

    project.save(function (err, result) {
      if( err ) return res.status(422).json(errorFormatter.getResponse(err));

      return res.status(200).json(result);
    });
  });
}
