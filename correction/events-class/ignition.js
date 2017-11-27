const Countdown = require('./countdown');

const countdown = new Countdown();
// attach event handlers, and starts.
countdown.on('start', () => {
  console.log('The final countdown !');

}).on('tick', (remains) => {
  console.log('...'+remains);

}).on('stop', () => {
  console.log('IGNITION !');

}).start(5);
