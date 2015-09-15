var http = require('http');
var parse = require('url').parse;
var fs = require('fs');
var port = process.argv[2];

http.createServer().on('request', function(req, res){
  var input = fs.createReadStream(parse(req.url).pathname.slice(1)).on('error', function() {
    res.statusCode = 404;
    res.end();
    input.close();
  });
  input.pipe(res).on('error', function(err) {
    console.log('writable error', err);
    input.close();
  });
}).on('error', function(err) {
  console.log('unexpected error', err);
}).listen(port, function() {
  console.log('server listening on port ' + port);
});
