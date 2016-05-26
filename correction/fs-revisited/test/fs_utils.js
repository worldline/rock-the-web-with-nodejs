var fs_utils = require('../fs_utils');
var expect = require('chai').expect;
var path = require('path');

describe('FS utils', function() {

  var expected = [{
    path: 'fs_utils.js',
    status: 'file'
  }, {
    path: 'node_modules',
    status: 'directory'
  }, {
    path: 'package.json',
    status: 'file'
  }, {
    path: 'test',
    status: 'directory'
  }].map(function(item) {
    item.path = path.resolve(path.join(__dirname, '..', item.path));
    return item;
  });

  describe('getDirContent', function() {

    it('should return current folder content with absolute paths', function(done) {
      fs_utils.getDirContent('./', function(err, content) {
        expect(err).not.to.exist;
        expect(content).to.be.an.instanceOf(Array).that.has.lengthOf(expected.length);
        expected.forEach(function(item) {
          expect(content).to.include(item.path);
        });
        done();
      });
    });

    it('should fail when reading an unknown folder', function(done) {
      fs_utils.getDirContent('unknown', function(err) {
        expect(err).to.exist.and.to.have.property('message').that.include('ENOENT');
        done();
      });
    });
  });

  describe('getDirStat', function() {

    it('should return current folder with absolute path and status', function(done) {
      fs_utils.getDirStat('./', function(err, stats) {
        expect(err).not.to.exist;
        expect(stats).to.be.an.instanceOf(Array).that.has.lengthOf(expected.length);
        expected.forEach(function(item) {
          var result = stats.filter(function(elem) {
            return elem.path === item.path;
          })[0];
          expect(result, item.path + ' not found').to.exist;
          expect(result).to.have.property('status').that.equals(item.status);
        });
        done();
      });
    });

    it('should fail when reading an unknown folder', function(done) {
      fs_utils.getDirStat('unknown', function(err) {
        expect(err).to.exist.and.to.have.property('message').that.include('ENOENT');
        done();
      });
    });
  });
});
