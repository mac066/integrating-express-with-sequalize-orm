var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var debug = require('debug')('sequalize:server');
var http = require('http');

var port = process.env.PORT || '3000'
app.set('port', port);
var Sequelize = require('sequelize');
var sequelize = new Sequelize('vdiscover', 'root', null);

var Users = sequelize.define('users', {
  id : Sequelize.INTEGER,
  email: Sequelize.STRING,
  email_hash: Sequelize.STRING,
   
},{timestamps: false});

app.get('/', function(req,res,next){
    Users.findOne({where:{id:29}}).then(function(test){
      res.send(test)
    })
    // console.log(user)

})
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
// var models = require("./models");
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);
server.listen(port);
server.on('listening', function(){
    console.log('listening on 3000')
});
server.on('error', function(){
    console.log("error")
});


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