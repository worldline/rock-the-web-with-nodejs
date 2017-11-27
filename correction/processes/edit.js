const spawn = require('child_process').spawn;
const file = process.argv[2];

spawn('notepad', [file]).on('error', (err) => {
  console.error('failed to edit ' + file + ' with notepad:', err.code);
}).on('exit', (code) => {
  console.log('edition finished with code ' + code);
});
