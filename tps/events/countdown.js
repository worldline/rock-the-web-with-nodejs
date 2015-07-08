var EventEmitter = require('events').EventEmitter;
var countdown = new EventEmitter();

/**
 * The tick function is private to avoid external usage.
 * It decrement the duration, and emit 'tick' event, unless the countdown reach 0.
 * In this case, emit the 'stop' event 
 * @param duration [Number] remaining duration
 */
var tick = function(duration) {
  setTimeout(function() {
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
 * @param n [Number] number of seconds this countdown will last.
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