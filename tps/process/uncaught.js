// count how many error where caught
var caught = 0;
process.on('uncaughtException', function(err) {
  // display which error was caught an optionnaly quit
  console.error('caught ', err.message);
  if (++caught === 3) {
    process.exit(1);
  }
});

// throw an error with the number given in parameter
var defered = function(i) {
  // register callback now, after throw it's too late...
  setTimeout(defered, 1000, i+1);
  throw new Error('unexpected error ' + i);
};
defered(1);
