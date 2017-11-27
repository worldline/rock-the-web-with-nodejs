const fs_utils = require('../fs_utils');
const expect = require('chai').expect;
const path = require('path');

describe('FS utils', () => {

  const expected = [{
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
  }].map((item) => {
    item.path = path.resolve(path.join(__dirname, '..', item.path));
    return item;
  });

  describe('getDirContent', () => {

    it('should return current folder content with absolute paths', (done) => {
      fs_utils.getDirContent('./', (err, content) => {
        expect(err).not.to.exist;
        expect(content).to.be.an.instanceOf(Array).that.has.lengthOf(expected.length);
        expected.forEach((item) => {
          expect(content).to.include(item.path);
        });
        done();
      });
    });

    it('should fail when reading an unknown folder', (done) => {
      fs_utils.getDirContent('unknown', (err) => {
        expect(err).to.exist.and.to.have.property('message').that.include('ENOENT');
        done();
      });
    });
  });

  describe('getDirStat', () => {

    it('should return current folder with absolute path and status', (done) => {
      fs_utils.getDirStat('./', (err, stats) => {
        expect(err).not.to.exist;
        expect(stats).to.be.an.instanceOf(Array).that.has.lengthOf(expected.length);
        expected.forEach((item) => {
          const result = stats.filter((elem) => {
            return elem.path === item.path;
          })[0];
          expect(result, item.path + ' not found').to.exist;
          expect(result).to.have.property('status').that.equals(item.status);
        });
        done();
      });
    });

    it('should fail when reading an unknown folder', (done) => {
      fs_utils.getDirStat('unknown', (err) => {
        expect(err).to.exist.and.to.have.property('message').that.include('ENOENT');
        done();
      });
    });
  });
});
