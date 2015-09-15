var http = require('http');
var expect = require('chai').expect;
var startServer = require('../static');

describe('Static server', function() {

  var server = null;
  var port = 8001;

  before(function(done) {
    server = startServer(port, function(err) {
      done(err);
    });
  });

  it('should return existing file', function(done) {
    http.get('http://localhost:1000/greetings.txt', function(res) {
      expect(res).to.have.property('statusCode').that.equal(200);
      var data = '';
      res.on('data', function(chunk) {
        data += chunk.toString();
      }).on('error', done).on('end', function() {
        expect(data).to.include('Hello');
        done();
      });
    }).on('error', function(err) {
      console.log('coucou');
      done(err);
    });
  });

  after(function(done) {
    server.close(done);
  });

});
