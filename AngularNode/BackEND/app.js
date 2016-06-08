var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan     = require("morgan");
var cors = require('express-cors');
var multer = require('multer');
var jwt = require('jsonwebtoken');
// [SH] Require Passport
var passport = require('passport');



var config = require('./app/config/config.js');
var envConfig = require('./app/config/config.env.js');
// [SH] Bring in the Passport config after model is defined

var routes = require('./app/routes/index');
var publication = require('./app/routes/publication');

//It instantiates Express and assigns our app variable to it
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(cors({
    allowedOrigins: [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],
	headers: [
		'x-access-token', 'Content-Type',
    'Authorization',  'Bearer'
	]
}));

mongoose.connect(envConfig.mongoUrl, function(err){
  if(err) mongooseLog('Mongoose error: ' + err);
});

//MONGODB CONNECTION EVENTS.
mongoose.connection
    .on('connected', function () {
        mongooseLog('Connection open to ' + envConfig.mongoUrl);
    })
    .on('error',function (err) {
        mongooseLog('Connection error: ' + err);
    })
    .on('disconnected', function () {
        mongooseLog('Connection disconnected');
    });

function mongooseLog(data) {
  return console.log(data);
}

app.use(function(req, res, next){
  console.log(  "\033[34m \033[1m" + req.method , 
                "\033[36m \033[1m REQUEST URL: " + "\033[32m "+req.url , 
                "\033[36m \033[1m REQUEST TIME: " + "\033[32m "+ new Date() + "\033[31m ");
  next();
});

//app.use(logger('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());


//Back End Config
app.use('/api', publication);
app.use("/", routes);

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
