var src = './src';
var dest = './assets';

module.exports = {

	// Root source and destination
	src: src,
	dest: dest,

	// Task-specific configuration

	styles: {
		src: src + '/scss/app.scss',
		dest: dest + '/css'
	},

	scripts: {
		src: src + '/js/app.js',
		dest: dest + '/js'
	},

	notifier: {
		icon: './gulp/lib/amp.png'
	}

};
