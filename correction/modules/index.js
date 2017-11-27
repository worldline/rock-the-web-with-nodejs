const actions = require('actions');
const stocks = require('./stocks');
const command = require('./command');

console.log(command(actions.drink, stocks.beers, 4));
console.log(command(actions.buy, stocks.beers, 2));
