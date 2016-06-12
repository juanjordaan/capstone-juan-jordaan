'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Email = require('mongoose-type-email');
let Country = mongoose.model('Country');
let Skill = mongoose.model('Skill');
let ObjectId = mongoose.Schema.Types.ObjectId;
let uniqueValidator = require('mongoose-unique-validator');
let passportLocalMongoose = require('passport-local-mongoose');

//var passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema( require('./user.json'), { timestamps: true }  );

// UserSchema.pre('save', function(next) {
//   var user = this;
//
//   if (!user.isModified('password')) return next();
//
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);
//
//     bcrypt.hash(user.password, salt, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });
//
// UserSchema.methods.getFullName = function() {
//   return (this.firstname + ' ' + this.lastname);
// };
//
// UserSchema.methods.comparePassword = function(password, cb) {
//   bcrypt.compare(password, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//       cb(isMatch);
//   });
// };

UserSchema.plugin(uniqueValidator);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
