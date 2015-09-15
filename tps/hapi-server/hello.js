var string = require('joi').string;
var join = require('path').join;

exports.register = function(server, options, next) {
  server.route({
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
  });
  next();
};

exports.register.attributes = {
  name: 'hello',
  version: '1.0.0'
};
