'use strict';

//let express = require('express');
//let app = express();

let mongoose = require('mongoose');
let config = require('./settings');

let Skill = require('../../common/models/skill');
let Country = require('../../common/models/country');
let User = require('../../common/models/user');
let Message = require('../../common/models/message');
let Project = require('../../common/models/project');

//TODO : Move Skill and Country list to config folder.
let testConfig = require('../test/test-config');
let assert = require('assert');

mongoose.connect(config.mongoUrl);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('close', console.error.bind(console, 'connection closed:'));
db.once('open', function (err) {
  if (err) {
    console.log('24 err = ' + JSON.stringify(err, null, '\t'))
    throw err;
  }

  console.log("Connected correctly to server");

  // db.collection().list(function(){
  //
  // });

  db.collection('users').drop(function () {

  });

  db.collection('projects').drop(function () {

  });

  Skill.remove({}, function(err){
    if (err) {
      console.log('41 err = ' + JSON.stringify(err, null, '\t'))
      throw err;
    }

    for( var skill of testConfig.skills ){
      Skill.create({"name":skill.name}, function(err, data){
        if (err) throw err;
          console.log('Created skill id: ' + data.id + " name:"+ data.name);
      });
    }

    Country.remove({}, function(err){
      if (err) {
          console.log('48 err = ' + JSON.stringify(err, null, '\t'))
          throw err;
      }

      for( var country of testConfig.countries ){
        Country.create({"name":country.name}, function(err, data){
          if (err) throw err;
            console.log('Created country id: ' + data.id + " name:"+ data.name);
        });
      }

      User.remove({}, function(err){
        if (err) {
          console.log('55 err = ' + JSON.stringify(err, null, '\t'))
          throw err;
        }

        Message.remove({}, function(err){
          if (err) {
            console.log('62 err = ' + JSON.stringify(err, null, '\t'))
            throw err;
          }

          Project.remove({}, function(err){
            if (err) {
              console.log('69 err = ' + JSON.stringify(err, null, '\t'))
              throw err;
            }
            console.log('CLOSING');
            db.close();
          });
        });
      });
    });
  });
});
