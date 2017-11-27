const http = require('http');
const parse = require('url').parse;
const fs = require('fs');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length-1;

if (cluster.isMaster) {
  cluster.schedulingPolicy = cluster.SCHED_RR;

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    // wire logging facilities
    worker.on('message', (status) => {
      console.log(status.id + ' processed file ' + status.path);
    });
  }
  cluster.on('online', (worker) => {
    console.log('worker ' + worker.id + '(' + worker.process.pid + ') is online !');
  });
  cluster.on('listening', (worker) => {
    console.log('worker ' + worker.id + '(' + worker.process.pid + ') is listening !');
  });
} else {
  // worker code, similar to http://runnable.com/VK_VnQU_2sVNnv8o/rocktheweb-server
  http.createServer((req, res) => {
    const path = parse(req.url).pathname.slice(1);
    // just send request to master for logging
    process.send({id: cluster.worker.id, path: path});
    fs.createReadStream(path).on('error', () => {
      res.statusCode = 404;
      res.end();
    }).pipe(res);
  }).listen(process.argv[2], () => {
    console.log('worker ' + cluster.worker.id + '('+ process.pid + ') ready !');
  });
}