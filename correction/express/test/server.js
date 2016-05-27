var expect = require('chai').expect;
var request = require('request');
var server = require('../server');

var baseUrl = 'http://127.0.0.1:3000';

describe('HTTP server', function() {
  before(server.start);
  after(server.stop);

  it('should return an error 404 if URL is not known', function(done) {
    request.get(baseUrl + '/plop', function(err, resp) {
      expect(err).not.to.exist;
      expect(resp).to.have.property('statusCode').that.equals(404);
      done();
    });
  });

  it('should return "hello John" if URL /hello/John', function(done) {
    request.get(baseUrl + '/hello/John', function(err, resp) {
      expect(err).not.to.exist;
      expect(resp).to.have.property('statusCode').that.equals(200);
      expect(resp.body).to.equals('Hello John');
      done();
    });
  });

  it('should return an HTTP 400 if firstname is too short', function(done) {
    request.get(baseUrl + '/hello/Jo', {json: true}, function(err, resp) {
      expect(err).not.to.exist;
      expect(resp).to.have.deep.property('headers.content-type').that.contains('application/json');
      expect(resp).to.have.property('statusCode').that.equals(400);
      expect(resp.body).to.deep.equal({ message: 'Firstname is too short: Jo' });
      done();
    });
  });
});
