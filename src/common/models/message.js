'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = mongoose.model('User');
let ObjectId = mongoose.Schema.Types.ObjectId;
var uniqueValidator = require('mongoose-unique-validator');

let MessageSchema = new Schema( require('./message.json'), { timestamps: true } );
MessageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Message', MessageSchema);
