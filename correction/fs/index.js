const utils = require('./fs_utils');

utils.getDirContent('index.js', (err) => {
  console.log('getDirContent(\'index.js\'): can\'t print dir on file:', err);
});

utils.getDirContent('../unknown', (err) => {
  console.log('\ngetDirContent(\'unknown\'): can\'t print unknown folder:', err);
});

utils.getDirContent('../', (err, content) => {
  if (err) {
    console.error('unexpected error:', err);
  }
  console.log('\ngetDirContent(\'../\'):\n', content);
});

utils.getDirStat('index.js', (err) => {
  console.log('\ngetDirStat(\'index.js\'): can\'t stat file:', err);
});

utils.getDirStat('../unknown', (err) => {
  console.log('\ngetDirStat(\'unknown\'): can\'t stat unknown folder:', err);
});

utils.getDirStat('.', (err, stats) => {
  if (err) {
    console.error('unexpected error:', err);
  }
  console.log('\ngetDirStat(\'.\'):');
  stats.forEach((stat) => {
    console.log(stat);
  });
});
