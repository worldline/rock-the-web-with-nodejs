const EventEmitter = require('events').EventEmitter;
const countdown = new EventEmitter();

/**
 * The tick function is private to avoid external usage.
 * It decrement the duration, and emit 'tick' event, unless the countdown reach 0.
 * In this case, emit the 'stop' event
 * @param {Number} duration - remaining duration
 */
const tick = (duration) => {
  setTimeout(() => {
    duration--;
    if(duration === 0) {
      return countdown.emit('stop');
    }
    countdown.emit('tick', duration);
    tick(duration);
  }, 1000);
};

/**
 * Start will emit 'start' event and begin contdown.
 * @param {Number} n - number of seconds this countdown will last.
 */
countdown.start = function(n) {
  if(isNaN(+n)) {
    throw new Error('start must be called with a numeric parameter: '+ n);
  }
  this.emit('start', n);
  tick(n);
  return this;
};

module.exports = countdown;
