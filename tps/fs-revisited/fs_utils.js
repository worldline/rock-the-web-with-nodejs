var fs = require('fs');
var async = require('async');
var join = require('path').join;

module.exports = {
  //
  statDir: function(path, done) {
    fs.readdir(path, function(err, content) {
      if (err) return done(err);
      
      async.map(content.map(function(elem) {
        return join(path, elem);
      }), fs.stat, done);
    });
  }
};