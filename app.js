var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multiparty = require('connect-multiparty');
var moment = require('moment');



//require model
var models_path = './models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = models_path + '/' +file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.js/.test(file)) {
                require(newPath)
            }
        }else if (stat.isDirectory()){
            walk(path);
        }
    });
};
walk(models_path);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//mongodb
var dbURI = "mongodb://localhost/lkn";
mongoose.Promise = global.Promise;
mongoose.connect(dbURI);

app.locals.moment = moment;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multiparty());
app.use(session({
    secret: 'lkn',
    store: new MongoStore({
        url: dbURI,
        collection: 'sessions'
    })
}));

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
