var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var session = require('express-session')
var mongoose = require('mongoose')
var express = require('express');
var logger = require('morgan');
var path = require('path');
var passport = require('passport')
var flash = require('connect-flash')
var validator = require('express-validator')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

var app = express();

mongoose.connect('mongodb://localhost:27017/nodejs-shopping-cart', { useNewUrlParser: true })
require('./config/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator())
app.use(cookieParser());
app.use(session({ secret: 'supersecret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated()
  next()
})

app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
