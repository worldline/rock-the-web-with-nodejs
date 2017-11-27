const fs = require('fs');

if (process.argv.length !== 3) {
  throw new Error('you need to specify input file');
}

const file = process.argv[2];
fs.createReadStream(file).on('error', (err) => {
  console.error('failed to cat file ' + file + ':', err);
}).pipe(process.stdout);
