// get value from father
process.on('message', function(n) {
  var prime = 2;
  // results
  var results = [prime];
  while (prime < n) {
    prime++;
    // prime is really prime if not dividible per existing primes
    var dividible = false;
    for (var i = 0; !dividible && i < results.length; i++) {
      dividible = (prime % results[i]) === 0;
    }
    if (!dividible) {
      results.push(prime);
    }
  }
  // send last results
  process.send(results.pop());
}); 