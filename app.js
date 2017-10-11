var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);

io.on('connection', function (socket) {
  console.log("Connected to Socket!");
  socket.emit('news', { hello: 'world' });
  socket.on('message', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function (reason) {
    console.log("disconnected to Socket!");
    console.log(reason);
  });
  socket.on('error', function (error) {
  	console.log("ERROR");
    console.log(error);
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: 'error'});
});

module.exports = app;
