var utils = require('./fs_utils');

utils.getDirContent('index.js', function(err) {
  console.log('getDirContent(\'index.js\'): can\'t print dir on file:', err);
});

utils.getDirContent('../unknown', function(err) {
  console.log('\ngetDirContent(\'unknown\'): can\'t print unknown folder:', err);
});

utils.getDirContent('../', function(err, content) {
  if (err) {
    console.error('unexpected error:', err);
  }
  console.log('\ngetDirContent(\'../\'):\n', content);
});

utils.getDirStat('index.js', function(err) {
  console.log('\ngetDirStat(\'index.js\'): can\'t stat file:', err);
});

utils.getDirStat('../unknown', function(err) {
  console.log('\ngetDirStat(\'unknown\'): can\'t stat unknown folder:', err);
});

utils.getDirStat('.', function(err, stats) {
  if (err) {
    console.error('unexpected error:', err);
  }
  console.log('\ngetDirStat(\'.\'):\n', stats);
});
