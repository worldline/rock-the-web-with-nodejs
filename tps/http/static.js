var http = require('http');
var parse = require('url').parse;
var fs = require('fs');
var port = process.argv[2];

http.createServer(function(req, res){
  fs.createReadStream(parse(req.url).pathname.slice(1)).on('error', function() {
    res.statusCode = 404;
    res.end();
  }).pipe(res);
}).listen(port, function() {
  console.log('server listening on port ' + port);
}).on('error', function(err) {
  console.log('unexpected error', err);
});
