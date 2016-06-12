/**
* Module dependencies.
*/

'use strict';

let express = require('express');
let app = express();
let morgan = require('morgan');
let path = require('path');
let fs = require('fs');

let mongoose = require('mongoose');
let config = require('./config/settings');

let bodyParser = require('body-parser');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let passport = require('passport');
let auth = require('./config/auth-passport');

//let errorHandler = require('errorhandler');

var cors = require('cors');
app.use(cors());
app.options('*', cors()); // include before other routes

// load in the appropriate order for mongoose.model to load
let index = require('./routes/index');
let country = require('./routes/country');
let skill = require('./routes/skill');
let user = require('./routes/user');
let dashboard = require('./routes/dashboard');
let project = require('./routes/project');
let message = require('./routes/message');
let session = require('./routes/session');
let facebook = require('./routes/facebook');

app.use(morgan('dev'));

let join = require('path').join;

mongoose.connect(config.mongoUrl);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('close', console.error.bind(console, 'connection closed:'));
db.once('open', function () { console.log('Connected correctly to server'); });
//mongoose.Schema.set('toJSON', { virtuals: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(passport.initialize());
// Secured Content
// let auth = require('./config/auth-cookie');
// app.use(auth.getCookieParser);
// app.use(auth.getCookieAuth);

app.set('views', __dirname + '/../views');
app.use(express.static(path.join(__dirname, '/../client')));
app.use('/bower_components', express.static(path.join(__dirname, '/../../bower_components')));
app.use('/app', express.static(path.join(__dirname, '/../client/app')));
app.use('/fonts', express.static(path.join(__dirname, '/../client/fonts')));
app.use('/images', express.static(path.join(__dirname, '/../client/images')));
// app.use('/scripts', express.static(path.join(__dirname, '/../client/scripts')));
app.use('/styles', express.static(path.join(__dirname, '/../client/styles')));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/', index);
//TODO fix url /api
app.use('/api', session);
app.use('/users', facebook);
app.use('/api/countries', country);
app.use('/api/users', user);
app.use('/api/skills', skill);
app.use('/api/dashboard', dashboard);
app.use('/api/projects', project);
app.use('/api/messages', message);

// ***** Security *****
// var helmet = require('helmet');
// app.use(helmet());
// app.disable('x-powered-by');


// let auth = require('./config/auth-session');
// app.use(auth.getSessionConfig);
// app.use(auth.getSessionAuth);
//
// app.use(function(err,req,res,next) {
//   res.writeHead(err.status || 500, { 'WWW-Authenticate': 'Basic', 'Content-Type': 'text/plain' });
//   res.end(err.message);
// });


// ***** Error Handling *****
//catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Resource Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('1 app.err = ' + err);

    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
     res.json([err.message]);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('2 app.err = ' + err);
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
  res.json([ err.message]);
});

module.exports = app;
