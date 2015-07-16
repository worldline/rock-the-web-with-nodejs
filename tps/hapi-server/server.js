var Hapi = require('hapi');
/*var string = require('joi').string;
var join = require('path').join;*/
var handlebars = require('handlebars');

var server = new Hapi.Server();
server.connection({port: 3000});

/*server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler: function(req, reply) {
    if (req.headers.accept && req.headers.accept.indexOf('xml') >= 0) {
        reply.view('hello', req.params).type('application/xml');
    } else {
        reply('Hi ' + req.params.name + ' !');
    }
  },
  config: {
    validate: {
      params: {
        name: string().min(3).max(10)
      }
    }
  }
});*/
server.register(require('./hello'), function(err) {
  if (err) {
    console.error('failed to load plugins', err);
  }
});

server.views({
  engines: {
    xml: handlebars
  },
  relativeTo: __dirname,
  path: 'templates'
});

module.exports = server;
