var lab = exports.lab = require('lab').script();
var expect = require('chai').expect;
var server = require('../server');

var describe = lab.describe;
var it = lab.it;
var afterEach = lab.afterEach;
var beforeEach = lab.beforeEach;

describe('Hapi server', function() {

  it('should be started', function(done) {
    server.start(function(err) {
      expect(err).not.to.exist;
      server.inject('/', function(response) {
        expect(response).to.have.property('statusCode').that.equals(404);
        done();
      })
    })
  });

  describe('hello API', function() {

      beforeEach(function(done) {
        server.settings.debug.log = ['error'];
        server.start(done);
      });

      it('should say hello John', function(done) {
        var name = 'John' + Math.floor(Math.random()*10);
        server.inject('/hello/' + name, function(response) {
          expect(response).to.have.property('statusCode').that.equals(200);
          expect(response).to.have.deep.property('headers.content-type').that.includes('text/html');
          expect(response.payload).to.equals('Hi ' + name + ' !');
          done();
        });
      });

      it('should fail on too short name', function(done) {
        server.inject('/hello/jo', function(response) {
          expect(response).to.have.property('statusCode').that.equals(400);
          expect(response).to.have.deep.property('headers.content-type').that.includes('application/json');
          expect(response.result).to.have.property('message').that.includes('be at least 3 characters');
          done();
        });
      });
  });

  describe('hello view', function() {

      beforeEach(function(done) {
        server.settings.debug.log = ['error'];
        server.start(done);
      });

      it('should render xml content', function(done) {
        var name = 'John' + Math.floor(Math.random()*10);
        server.inject({
          url: '/hello/' + name,
          headers: {
            accept: 'application/xml'
          }
        }, function(response) {
          expect(response).to.have.property('statusCode').that.equals(200);
          expect(response).to.have.deep.property('headers.content-type').that.includes('application/xml');
          expect(response.payload).to.equals('<msg>Hello ' + name + '</msg>');
          done();
        });
      });
  });

  afterEach(function(done) {
    server.stop();
    done();
  });

});
