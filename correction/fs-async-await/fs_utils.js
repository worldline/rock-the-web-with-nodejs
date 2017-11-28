const fs = require('fs');
const resolve = require('path').resolve;
const async = require('async');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

/**
 * Built an array of item names contained in a directory
 * @param {String} path - inspected path
 *
 * @return {Promise<String[]>} - directory content.
 */
exports.getDirContent = async function(path) {
  // Rely on built-in function
  const content = await readdir(path);
  return content.map((item) => {
    return resolve(path, item);
  });
};

/**
 * Returns details on each items contained into a given directory
 * @param {String} path - inspected path
 *
 * @return {Promise<Object[]>} result - details of each element contained
 * @param {String} result.path - inspected item path
 * @param {String} result.status - file, directory or unknown nature of the item
 * @param {Number} result.size - item size in octets
 */
exports.getDirStat = async function(path) {
  const content = await readdir(path);
  const promises = content.map((filename) => {
    return stat(filename);
  });
  const results = await Promise.all(promises);
  return results.map((stat, i) => {
    return {
      path: resolve(path, content[i]),
      status: stat.isFile() ? 'file' : stat.isDirectory() ? 'directory' : 'unknown',
      size: stat.size
    };
  })
};
