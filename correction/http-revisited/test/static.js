const http = require('http');
const expect = require('chai').expect;
const startServer = require('../static');

describe('Static server', () => {

  let server = null;
  const port = 8001;

  before((done) => {
    server = startServer(port, (err) => {
      done(err);
    });
  });

  it('should return existing file', (done) => {
    http.get('http://localhost:' + port + '/greetings.txt', (res) => {
      expect(res).to.have.property('statusCode').that.equal(200);
      let data = '';
      res.on('data', (chunk) => {
        data += chunk.toString();
      }).on('error', done).on('end', () => {
        expect(data).to.include('Hello');
        done();
      });
    }).on('error', (err) => {
      console.log('coucou');
      done(err);
    });
  });

  after((done) => {
    server.close(done);
  });

});
