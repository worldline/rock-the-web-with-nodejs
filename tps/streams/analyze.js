var fs = require('fs');

if (process.argv.length !== 3) {
  throw new Error('you need to specify input file');
}
var file = process.argv[2];

var analysis = {
  nbChunks: 0,
  totalSize: 0,
  nbReads: 0,
  chunkSize: 0
};

var readable = fs.createReadStream(file);

readable.on('readable', function() {
  for (var chunk = readable.read(); chunk !== null; chunk = readable.read()) {
    analysis.totalSize += chunk.length;
    analysis.nbReads++;
    analysis.chunkSize = analysis.chunkSize === 0 ? chunk.length : analysis.chunkSize;
  }
  analysis.nbChunks++;
}).on('error', function(err) {
  console.error('failed to cat file ' + file + ':', err);
}).on('end', function() {
  console.log('read ' + analysis.nbChunks + ' chunks (average ' + 
    analysis.chunkSize + ') in ' + analysis.nbReads + ' reads for ' + 
    analysis.totalSize + 'o');
});