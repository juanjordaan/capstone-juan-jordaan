'use strict';

let express = require('express');
let router = express.Router();
let Country = require('../../common/models/country');
let bodyParser = require('body-parser');

router.use(bodyParser.json());

//Verify.verifyOrdinaryUser, Verify.verifyAdmin
router.route('/').get(getAllCountries);

module.exports = router;

function getAllCountries(req, res, next){
  Country.find({}, function (err, data){
    if (err) throw err;
    res.json(data);
  });
};
