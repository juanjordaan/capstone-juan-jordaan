'use strict';

let express = require('express');
let router = express.Router();
let Skill = require('../../common/models/skill');
let bodyParser = require('body-parser');

router.use(bodyParser.json());

//Verify.verifyOrdinaryUser, Verify.verifyAdmin
router.route('/').get(getAllSkills);

module.exports = router;

function getAllSkills(req, res, next){
  Skill.find({}, function (err, data){
    if (err) throw err;
    res.json(data);
  });
};
