var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');



const stripe = require('stripe')('sk_test_Exsg9IzoUZSav22qakc5DmRk00X6zOi4Yq');


var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var restaurants = require('./routes/restaurants');
var visitUnlock = require('./routes/visitUnlock');
var history = require('./routes/history');
var userDetails = require('./routes/userDetails');
var stripePayment = require('./routes/stripePayment');
var newPlatterPartner = require('./routes/newPlatterPartner');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/v1/signup', signup);
app.use('/api/v1/users', users);
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/login', login);
app.use('/api/v1/visitUnlock', visitUnlock);
app.use('/api/v1/history', history);
app.use('/api/v1/userDetails', userDetails);
app.use('/api/v1/stripePayment', stripePayment);
app.use('/api/v1/newPlatterPartner', newPlatterPartner);

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
