var http = require('http');
var parse = require('url').parse;
var fs = require('fs');
var join = require('path').join;

var url = process.argv[2];
var file = parse(url).pathname;
// do not store '/' which lead to write on folder
if (file === '/') {
  file = 'index.html';
} else {
  // keep the last part only
  file = file.substring(file.lastIndexOf('/'));
}

http.get(url, function(response) {
  // write to file
  response.pipe(fs.createWriteStream(join('.', file))).on('error', function(err) {
    // write error
    console.error('Failed to write file ' + file, err.message);
  });
}).on('error', function(err) {
  // request error
  console.error('Failed to request ' + url, err.message);
});