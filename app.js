var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var stripe = require('stripe')('sk_test_Exsg9IzoUZSav22qakc5DmRk00X6zOi4Yq');


var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var restaurants = require('./routes/restaurants');
var visitUnlock = require('./routes/visitUnlock');
var app = express();

var mysql = require("mysql");
//Database connection

// app.use(function(req, res, next){
// 	global.connection = mysql.createConnection({
// 		host     : 'platter.czij2qpurlps.us-east-2.rds.amazonaws.com',
// 		port	 :  3306,
// 		user     : 'platter',
// 		password : '$G237platter',
// 		database : 'platter'
// 	});
// 	connection.connect();
// 	next();
// });

app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'password',
		database : 'platter'
	});
	connection.connect();
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/v1/signup', signup);
app.use('/api/v1/users', users);
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/login', login);
app.use('/api/v1/visitUnlock', visitUnlock);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
