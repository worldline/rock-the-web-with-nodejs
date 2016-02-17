var Hapi = require('hapi');
var handlebars = require('handlebars');
var vision = require('vision');

var server = new Hapi.Server();
server.connection({port: 3000});

server.register([
  vision,
  require('./hello')
], function(err) {
  if (err) {
    console.error('failed to load plugins', err);
  }

  server.views({
    engines: {
      xml: handlebars
    },
    relativeTo: __dirname,
    path: 'templates'
  });
});

module.exports = server;
