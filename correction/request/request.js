var request = require('request');

request.get('http://api.icndb.com/jokes/random', {
  qs: {
    firstName: 'Florian'
  },
  json: true
}, function(err, resp, body) {
  console.log(body.value.joke);
});