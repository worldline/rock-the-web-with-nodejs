const expect = require('chai').expect;
const request = require('request');
const server = require('../server');

const baseUrl = 'http://127.0.0.1:3000';

describe('HTTP server', () => {
  before(server.start);
  after(server.stop);

  it('should return an error 404 if URL is not known', (done) => {
    request.get(baseUrl + '/plop', (err, resp) => {
      expect(err).not.to.exist;
      expect(resp).to.have.property('statusCode').that.equals(404);
      done();
    });
  });

  it('should return "hello John" if URL /hello/John', (done) => {
    request.get(baseUrl + '/hello/John', (err, resp) => {
      expect(err).not.to.exist;
      expect(resp).to.have.property('statusCode').that.equals(200);
      expect(resp.body).to.equals('Hello John');
      done();
    });
  });

  it('should return an HTTP 400 if firstname is too short', (done) => {
    request.get(baseUrl + '/hello/Jo', {json: true}, (err, resp) => {
      expect(err).not.to.exist;
      expect(resp).to.have.deep.property('headers.content-type').that.contains('application/json');
      expect(resp).to.have.property('statusCode').that.equals(400);
      expect(resp.body).to.deep.equal({ message: 'Firstname is too short: Jo' });
      done();
    });
  });
});
