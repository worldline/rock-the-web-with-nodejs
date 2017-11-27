const express = require('express');
const app = express();
const morgan = require('morgan');

let server;

app.use(morgan());

app.get('/hello/:name', (req, res, next) => {
  const name = req.params.name;
  if(name.length < 3) {
    return next('Firstname is too short: ' + name);
  }
  res.send('Hello ' + req.params.name);
});

// error middleware
app.use((err, req, res, next) => {
  res.status(400).send({ message: err });
});

exports.start = (cb) => {
  cb = cb || (()  => {});
  server = app.listen(3000, (err) => {
    if(err) {
      console.log('Cannot start server !', err);
      return cb(err);
    }
    console.log('Server is listening on port 3000!');
    cb();
  });
};

exports.stop = () => {
  server.close();
};