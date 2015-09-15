var fs = require('fs');
if (process.argv.length !== 4) {
  throw new Error('you need to specify input and output file');
}
var inputFile = process.argv[2];
var outputFile = process.argv[3];

var input = fs.createReadStream(inputFile);
var output = fs.createWriteStream(outputFile);

input.on('readable', function() {
  var data = input.read();
  output.write(data.toString('base64'));
}).on('end', function() {
  output.end();
  console.log('file encoded into', outputFile);
}).on('error', function(err) {
  console.error('failed to encode file:', err.message);
});
