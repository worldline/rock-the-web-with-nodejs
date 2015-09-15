var http = require('http');
var parse = require('url').parse;
var fs = require('fs');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length-1;
var port = process.argv[2];

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    // use an IIFE to avoid scope problems
    (function(worker) {
      // wire logging facilities
      worker.on('message', function(path) {
        console.log(worker.id + ' (' + worker.process.pid + ') processed file ' + path);
      });
    })(cluster.fork());
  }
} else {
  // worker code, similar to http://code.runnable.com/VZ04KJR4mWIbiHca/rocktheweb-server
  http.createServer(function(req, res){
    var path = parse(req.url).pathname.slice(1);
    // just send request to master for logging
    process.send(path);
    fs.createReadStream(path).on('error', function() {
      res.statusCode = 404;
      res.end();
    }).pipe(res);
  }).listen(port, function() {
    console.log('worker ' + process.pid + ' listening on port ' + port);
  });
}
