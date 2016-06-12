'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

let CountrySchema = new Schema( require('./country.json'), { timestamps: true } );
CountrySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Country', CountrySchema);
