const fs = require('fs');
if (process.argv.length !== 4) {
  throw new Error('you need to specify input and output file');
}
const inputFile = process.argv[2];
const outputFile = process.argv[3];

const input = fs.createReadStream(inputFile);
const output = fs.createWriteStream(outputFile);

input.on('readable', () => {
  const data = input.read();

  if(data !== null) {
    output.write(data.toString('base64'));
  }
}).on('end', () => {
  output.end();
  console.log('file encoded into', outputFile);
}).on('error', (err) => {
  console.error('failed to encode file:', err.message);
});
