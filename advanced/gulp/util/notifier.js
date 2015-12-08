// A simple wrapper for node-notifier that sets our own defaults
//
var notifier = require('node-notifier');
var config = require('../config');
var assign = require('lodash.assign');

module.exports = function (options) {
	var defaults = {
		icon: config.notifier.icon
	};

	options = assign({}, defaults, options);
	return notifier.notify(options);
};
