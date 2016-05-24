var express = require('express');
var app = express();
var morgan = require('morgan');

var server;

app.use(morgan());

app.get('/hello/:name', function (req, res, next) {
  var name = req.params.name;
  if(name.length < 3) {
    return next('Firstname is too short: ' + name);
  }
  res.send('Hello ' + req.params.name);
});

// error middleware
app.use(function(err, req, res, next) {
  res.status(400).send({ message: err });
});

exports.start = function(cb) {
  cb = cb || function() {};
  server = app.listen(3000, function (err, httpServer) {
    if(err) {
      console.log('Cannot start server !', err);
      return cb(err);
    }
    console.log('Server is listening on port 3000!');
    cb();
  });
};

exports.stop = function() {
  server.close();
};