var http = require('http');
var parse = require('url').parse;
var fs = require('fs');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length-1;

if (cluster.isMaster) {
  cluster.schedulingPolicy = cluster.SCHED_RR;

  for (var i = 0; i < numCPUs; i++) {
    var worker = cluster.fork();
    // wire logging facilities
    worker.on('message', function(status) {
      console.log(status.id + ' processed file ' + status.path);
    });
  }
  cluster.on('online', function(worker) {
    console.log('worker ' + worker.id + '(' + worker.process.pid + ') is online !');
  });
  cluster.on('listening', function(worker) {
    console.log('worker ' + worker.id + '(' + worker.process.pid + ') is listening !');
  });
} else {
  // worker code, similar to http://runnable.com/VK_VnQU_2sVNnv8o/rocktheweb-server
  http.createServer(function(req, res){
    var path = parse(req.url).pathname.slice(1);
    // just send request to master for logging
    process.send({id: cluster.worker.id, path: path});
    fs.createReadStream(path).on('error', function() {
      res.statusCode = 404;
      res.end();
    }).pipe(res);
  }).listen(process.argv[2], function() {
    console.log('worker ' + cluster.worker.id + '('+ process.pid + ') ready !');
  });
}