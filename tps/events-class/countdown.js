var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

/**
 * The tick function is private to avoid external usage.
 * It decrement the countdown, and emit 'tick' event, unless the countdown reach 0.
 * In this case, stop is invoked.
 * @param {Countdown} countdown - The concerned countdown.
 */
function tick(countdown) {
  countdown.timer = setTimeout(function() {
    countdown.remains--;
    if(countdown.remains === 0) {
      return countdown.stop();
    }
    countdown.emit('tick', countdown.remains);
    tick(countdown);
  }, 1000);
}

/**
 * Creates a simple class the extends EventEmitter.
 *
 * @event Countdown#start - When countdown begins with the remaining seconds
 * @type {Number}
 *
 * @event Countdown#tick - During countdown with the remaining seconds
 * @type {Number}
 *
 * @event Countdown#stop - When countdown reaches its end of if manually stopped, with the remaining seconds
 * @type {Number}
 */
var Countdown = function() {
  this.remains = 0;
  this.timer = null;
};
inherits(Countdown, EventEmitter);
//Countdown.prototype = Object.create(EventEmitter.prototype);
//Countdown.prototype.constructor = Countdown;

/**
 * Begins the contdown.
 * @param {Number} n - Number of seconds this countdown will last.
 *
 * @fires Countdown#start
 * @fires Countdown#tick
 */
Countdown.prototype.start = function start(n) {
  if(isNaN(+n)) {
    throw new Error('start must be called with a numeric parameter: '+ n);
  }
  // start new one.
  this.remains = n;
  this.emit('start', this.remains);
  tick(this);
};

/**
 * Stop countdown and reset inner state.
 * @fires Countdown#stop
 */
Countdown.prototype.stop = function start() {
  clearTimeout(this.timer);
  this.timer = null;
  this.emit('stop', this.remains);
};

module.exports = Countdown;
