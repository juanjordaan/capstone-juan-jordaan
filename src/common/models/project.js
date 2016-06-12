'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Email = require('mongoose-type-email');
let User = mongoose.model('User');
let Skill = mongoose.model('Skill');
let ObjectId = mongoose.Schema.Types.ObjectId;
var uniqueValidator = require('mongoose-unique-validator');

let BidSchema = new Schema( require('./bid.json'), { timestamps: true } );
let ProjectSchema = new Schema( require('./project.json'), { timestamps: true } );

BidSchema.plugin(uniqueValidator);
ProjectSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Project', ProjectSchema);
