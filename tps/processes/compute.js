var compute = function(n) {
  var prime = 2;
  // results
  var primes = [prime];
  while (prime < n) {
    prime++;
    // prime is really prime if not dividible per existing primes
    var dividible = false;
    for (var i = 0; !dividible && i < primes.length; i++) {
      dividible = (prime % primes[i]) === 0;
    }
    if (!dividible) {
      primes.push(prime);
    }
  }
  // send last results
  console.log('primes : ', primes.length);
  return primes.pop();
}

// get value from father
process.on('message', function(n) {
  process.send(compute(n));
});

module.exports = compute;
