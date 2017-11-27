const fs = require('fs');

if (process.argv.length !== 3) {
  throw new Error('you need to specify input file');
}
const file = process.argv[2];

const analysis = {
  readable: 0,
  totalSize: 0,
  nbReads: 0,
  chunkSize: 0
};

const readable = fs.createReadStream(file);

readable.on('readable', () => {
  for (let chunk = readable.read(); chunk !== null; chunk = readable.read()) {
    analysis.totalSize += chunk.length;
    analysis.nbReads++;
    analysis.chunkSize = analysis.chunkSize === 0 ? chunk.length : analysis.chunkSize;
  }
  analysis.readable++;
}).on('error', (err) => {
  console.error('failed to analyse file ' + file + ':', err);
}).on('end', () => {
  console.log('received ' + analysis.readable + ' events and read ' +
    analysis.nbReads + ' chunks (average ' +
    analysis.chunkSize + ') for ' +
    analysis.totalSize + 'o');
});
