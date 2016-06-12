'use strict';

let express = require('express');
let router = express.Router();
let Message = require('../../common/models/message');
let bodyParser = require('body-parser');
var errorFormatter = require('./error.format.js').errorFormatter;

router.use(bodyParser.json());
// let Verify = require('./verify');

//Verify.verifyOrdinaryUser, Verify.verifyAdmin
router.route('/').post(createMessage);
router.route('/:messageId').delete(deleteMessage);
router.route('/user/:userId').get(getAllUserMessages);

module.exports = router;

function getAllUserMessages(req, res, next){
  Message.find({owner:req.params.userId})
  .populate('sender')
  .exec(function (err, data){
    //TODO : Mark sent messages as received
    for(let message of data )
      if( message.status === 'sent')
        message.status = 'received';

    if (err) throw err;
    res.json(data);
  });
};

function createMessage(req, res, next){
  req.body.sentDate = new Date();
  req.body.status = 'sent';

  //save one for the sender
  req.body.owner = req.body.sender;
  Message.create(req.body, function (err, data){
    if( err ) return res.status(422).json(errorFormatter.getResponse(err));

    //save one for the receiver
    req.body.owner = req.body.receiver;
    Message.create(req.body, function (err, data){
      if( err ) return res.status(422).json(errorFormatter.getResponse(err));

      return res.status(201).json({_id: data._id});
    });
  });
};

function deleteMessage(req, res, next){
  // console.log('req.body     = ' + JSON.stringify(req.body));
  console.log('req.params.messageId = ' + req.params.messageId);
  //console.log('req.params.userId = ' + JSON.stringify(req.params.userId, null, '\t'));
  Message.findOne({'_id':req.params.messageId}, function (err, data){
    if (err) {
      //console.log('response err = ' + JSON.stringify(err, null, '\t'));
      throw err;
    }

    //console.log('response data = ' + JSON.stringify(data, null, '\t'));
    if( data ){
      data.remove();
    }
    res.json();
  });
};
