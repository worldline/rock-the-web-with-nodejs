const http = require('http');
const parse = require('url').parse;
const fs = require('fs');
const port = process.argv[2];

http.createServer().on('request', (req, res) => {
  var input = fs.createReadStream(parse(req.url).pathname.slice(1)).on('error', () => {
    res.statusCode = 404;
    res.end();
    input.close();
  });
  input.pipe(res).on('error', (err) => {
    console.log('writable error', err);
    input.close();
  });
}).on('error', (err) => {
  console.log('unexpected error', err);
}).listen(port, () => {
  console.log('server listening on port ' + port);
});
