// Use a module from NPM
var assign = require('lodash.assign');

// Use a module from this project
var greet = require('./includes/greet');

// Include any old JS
require('./includes/consoler');

console.log('Hello from app.js');

// Use the greet module to greet somebody
console.log(greet('Dave'));

// Test the NPM module
var defaults = {
	state: 'sad',
	person: 'Dave'
};

var status = assign({}, defaults, {
	state: 'happy'
});

console.log(status.person + ' is ' + status.state + '.');
