'use strict';

let express = require('express');
let router = express.Router();
let Message = require('../../common/models/message');
let bodyParser = require('body-parser');
let errorFormatter = require('./error.format.js').errorFormatter;
let Verify = require('./verify');

router.use(bodyParser.json());


//Verify.isAuthenticated,
router.route('/').get( Verify.isAuthenticated, getDashboard);

module.exports = router;

function getDashboard(req, res, next){
  return res.status(200);
}
