module.exports = function(move, obj, number) {
  return new Date().toLocaleString() + ': ' + move(obj, number);
};
