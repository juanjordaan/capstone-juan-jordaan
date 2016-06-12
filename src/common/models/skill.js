'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

let SkillSchema = new Schema( require('./skill.json'), { timestamps: true } );

SkillSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Skill', SkillSchema);
