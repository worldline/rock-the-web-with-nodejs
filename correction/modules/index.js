var actions = require('actions');
var stocks = require('./stocks');
var command = require('./command');

console.log(command(actions.drink, stocks.beers, 4));
console.log(command(actions.buy, stocks.beers, 2));
