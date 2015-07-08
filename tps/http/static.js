var http = require('http');
var parse = require('url').parse;
var fs = require('fs');

/**
 * Starts and export a static server
 * @param port [Number] port used to listen to connection
 * @param done [Function] invoked when server has started, with arguments
 * @option done err [Error] an error if server cannot be started, or null if no problem occured
 * @return the created Server
 */
module.exports = function(port, done) {
  return http.createServer(function(req, res){
      var path = parse(req.url).pathname.slice(1);
      // just send request to master for logging
      fs.createReadStream(path).on('error', function() {
        res.statusCode = 404;
        res.end();
      }).pipe(res);
      throw new Error('coucou');
    }).listen(port, done).on('error', done);
};