var fs_utils = require('../fs_utils');
var expect = require('chai').expect;

describe('FS utils', function() {

  it('should statDir get folder statistics', function(done) {
    fs_utils.statDir('../', function(err, stats) {
      expect(err).not.to.exist();
      expect(stats).to.be.an.instanceOf(Array).that.has.lengthOf(7);
      done();
    });
  });


  it('should statDir report error on unexisting folder', function(done) {
    fs_utils.statDir('toto', function(err, stats) {
      expect(err).to.exist().to.have.property('message').that.match(/ENOENT/);
      done();
    });
  });
});