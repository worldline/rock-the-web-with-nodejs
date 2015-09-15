var fork = require('child_process').fork;
// validate input
var n = +process.argv[2];
if (isNaN(n)) {
  console.error('usage: node primes N\nN is a number');
  process.exit(1);
}
// timeout each seconds
var duration = 0;
var display = function() {
  duration++;
  if (duration % 5 === 0) {
    process.stdout.write(''+duration);
  } else {
    process.stdout.write('.');
  }
  setTimeout(display, 1000);
};
// create processing child
var child = fork('compute', [n]);
setTimeout(display, 1000);
// get result and display it
child.on('message', function(result) {
  console.log('highest prime bellow ' + n + ':', result);
  process.exit(0);
});
// send number
child.send(n);
