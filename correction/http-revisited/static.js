const http = require('http');
const parse = require('url').parse;
const fs = require('fs');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length-1;

module.exports = (port, done) => {
  // worker code, similar to http://code.runnable.com/VZ04KJR4mWIbiHca/rocktheweb-server
  return http.createServer((req, res) => {
    const path = parse(req.url).pathname.slice(1);
    fs.createReadStream(path).on('error', () => {
      res.statusCode = 404;
      res.end();
    }).pipe(res);
  }).listen(port, () => {
    console.log('worker ' + process.pid + ' listening on port ' + port);
    done();
  });
};