const fs_utils = require('../fs_utils');
const chai = require('chai');
const chaiAsPromised = chai.use(require('chai-as-promised'));
const expect = chai.expect;
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
    path: 'package-lock.json',
    status: 'file'
  }, {
    path: 'test',
    status: 'directory'
  }].map((item) => {
    item.path = path.resolve(path.join(__dirname, '..', item.path));
    return item;
  });

  describe('getDirContent', () => {

    it('should return current folder content with absolute paths', async () => {
      const content = await fs_utils.getDirContent('./');
      expect(content).to.be.an.instanceOf(Array).that.has.lengthOf(expected.length);
      expected.forEach((item) => {
        expect(content).to.include(item.path);
      });
    });

    it('should fail when reading an unknown folder', () => {
      return expect(fs_utils.getDirContent('unknown')).be.rejectedWith('ENOENT');
    });
  });

  describe('getDirStat', () => {

    it('should return current folder with absolute path and status', async () => {
      const stats = await fs_utils.getDirStat('./');
      expect(stats).to.be.an.instanceOf(Array).that.has.lengthOf(expected.length);
      expected.forEach((item) => {
        const result = stats.filter((elem) => {
          return elem.path === item.path;
        })[0];
        expect(result, item.path + ' not found').to.exist;
        expect(result).to.have.property('status').that.equals(item.status);
      });
    });

    it('should fail when reading an unknown folder', () => {
      return expect(fs_utils.getDirStat('unknown')).be.rejectedWith('ENOENT');
    });
  });
});
