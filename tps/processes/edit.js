var spawn = require('child_process').spawn;
var file = process.argv[2];

spawn('notepad', [file]).on('error', function(err) {
  console.error('failed to edit ' + file + ' with notepad:', err.code);
}).on('exit', function(code) {
  console.log('edition finished with code ' + code);
});