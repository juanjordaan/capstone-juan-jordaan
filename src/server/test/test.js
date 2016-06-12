var express = require('express');
var app = require('../../bin/www');

require('./db.init.js');

require('./country/country.test.js');

require('./skill/skill.test.js');

require('./skill/skill.rest.test.js');

require('./user/user.test.js');

require('./user/user.register.test.js');

require('./message/message.test.js');

require('./project/full.test.js');

module.exports = app;
