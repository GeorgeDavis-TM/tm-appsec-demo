var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs')

var sql = require('./services/sqlite/sqlite.js');
var utils = require('./utils/utils.js')

var users = require('./services/sqlite/users.js')

require("trend_app_protect");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/fileRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('json spaces', 4);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', fileRouter);

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

var checkDBExists = () => {
  const path = './tm-appsec-demo.db'
  try {
    if (!fs.existsSync(path)) {
      sql.initDB();
    }
  } catch (err) {
    console.error(err)
  }
}

checkDBExists();

// users.putUser(1588351811, 'george', 'password', 'toronto');
// users.putUser(1588351812, 'george', 'pasword', 'toronto');
// users.putUser(15888373, 'eer','rrr', 'rrre2');
// console.log("Hey - " + users.getUser('iH3QYQe8-'));
// console.log(users.getAllUsers());

module.exports = app;
