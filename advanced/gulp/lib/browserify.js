var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
var config = require('../config').scripts;

var browserifyThis = function (watch) {
	// Add custom browserify options here
	var customOpts = {
		entries: [config.src],
		debug: true
	};

	var opts = (watch) ? assign({}, watchify.args, customOpts) : customOpts;

	var b = browserify(opts);

	var bundle = function () {
		return b.bundle()
			// log errors if they happen
			.on('error', function (err) {
				// You can inspect / emit the entire error if you need to for debugging
				// purposes. It's a little verbose to keep in the normal flow.
				gutil.log(gutil.colors.red('Browserify error: ') + err.message);
				this.emit('end');
			})
			// Specify the desired output name here
			.pipe(source(path.basename(config.src)))
			// optional, remove if you don't need to buffer file contents
			.pipe(buffer())
			// optional, remove if you dont want sourcemaps
			.pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
			// Add transformation tasks to the pipeline here.
			.pipe(uglify()) // minify
			.pipe(sourcemaps.write('./')) // writes .map file
			.pipe(gulp.dest(config.dest));
	};

	if (watch) {
		// Wrap with watchify and rebundle on changes
		b = watchify(b);

		// Rebundle on update
		b.on('update', function () {
			gutil.log('Rebundling scripts.');
			bundle();
		});
	}

	return bundle();
};

module.exports = browserifyThis;
