const http = require('http');
const parse = require('url').parse;
const fs = require('fs');
const join = require('path').join;

const url = process.argv[2];
let file = parse(url).pathname;
// do not store '/' which lead to write on folder
if (file === '/') {
  file = 'index.html';
} else {
  // keep the last part only
  file = file.substring(file.lastIndexOf('/'));
}

http.get(url, (response) => {
  // write to file
  response.pipe(fs.createWriteStream(join('.', file))).on('error', (err) => {
    // write error
    console.error('Failed to write file ' + file, err.message);
  });
}).on('error', (err) => {
  // request error
  console.error('Failed to request ' + url, err.message);
});
