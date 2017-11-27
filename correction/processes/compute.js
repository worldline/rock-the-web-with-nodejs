const compute = function(n) {
  let prime = 2;
  // results
  const primes = [prime];
  while (prime < n) {
    prime++;
    // prime is really prime if not divisible per existing primes
    let divisible = false;
    for (let i = 0; !divisible && i < primes.length; i++) {
      divisible = (prime % primes[i]) === 0;
    }
    if (!divisible) {
      primes.push(prime);
    }
  }
  // send last results
  console.log('primes : ', primes.length);
  return primes.pop();
};

// get value from father
process.on('message', (n) => {
  process.send(compute(n));
  process.exit(0);
});

module.exports = compute;
