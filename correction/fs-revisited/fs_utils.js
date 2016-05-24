var fs = require('fs');
var resolve = require('path').resolve;
var async = require('async');

/**
 * Built an array of item names contained in a directory
 * @param {String} path - inspected path
 * @param {getDirContent-CB} done - completion callback
 *
 * @callback getDirContent-CB
 * @param {Error} err - an optionnal error if path cannot be read as directory
 * @param {String[]} result - directory content.
 */
exports.getDirContent = function(path, done) {
  // Rely on built-in function
  fs.readdir(path, function(err, content) {
    if (err) {
      // Or if (err != null), which is equivalent to err !== null || err !== undefined
      return done(err);
    }
    // map is not an asynchronous operation (no I/O), but looks like one
    // It will invoke the parameter function on each file, and will replace an array with
    // returned strings
    var result = content.map(function(item) {
      return resolve(path, item);
    });
    // Returns result
    done(null, result);
  })
};

/**
 * Returns details on each items contained into a given directory
 * @param {String} path - inspected path
 * @param {getDirStat-CB} done - completion callback, invoked with parameters:
 *
 * @callback getDirStat-CB
 * @param {Error} err - an optionnal error if path cannot be read as directory
 * @param {Object[]} result - details of each element contained
 * @param {String} result.path - inspected item path
 * @param {String} result.status - file, directory or unknown nature of the item
 * @param {Number} result.size - item size in octets
 */
exports.getDirStat = function(path, done) {
  // It begins like getDirContent()
  fs.readdir(path, function(err, content) {
    if (err) {
      return done(err);
    }

    async.map(content, fs.stat, function(err, results) {
      done(err, !err && results.map(function(stat, i) {
        return {
          path: resolve(path, content[i]),
          status: stat.isFile() ? 'file' : stat.isDirectory() ? 'directory' : 'unknown',
          size: stat.size
        }
      }));
    });
  });
};
