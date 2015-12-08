var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
var config = require('../config').scripts;
var path = require('path');
var size = require('gulp-size');
var gFilter = require('gulp-filter');

var browserifyThis = function (options) {
	var defaults = {
		watch: false
	};

	options = assign({}, defaults, options);

	// Add custom browserify options here
	var customOpts = {
		entries: [config.src],
		debug: true
	};

	var opts = (options.watch) ? assign({}, watchify.args, customOpts) : customOpts;

	var b = browserify(opts);

	var bundle = function () {
		// Log when bundling starts
		bundleLogger.start(config.src);

		return b.bundle()
			// log errors if they happen
			.on('error', handleErrors)
			// Specify the desired output name here
			.pipe(source(path.basename(config.src)))
			// optional, remove if you don't need to buffer file contents
			.pipe(buffer())
			// optional, remove if you dont want sourcemaps
			.pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
			// Add transformation tasks to the pipeline here.
			.pipe(uglify()) // minify
			.pipe(sourcemaps.write('./')) // writes .map file
			.pipe(gulp.dest(config.dest))

			.pipe(gFilter(['*', '!*.map']))
			.pipe(size({
				showFiles: true
			}))
			.pipe(size({
				showFiles: true,
				gzip: true
			}))

			.on('end', reportFinished);
	};

	if (options.watch) {
		bundleLogger.watch(config.dest);

		// Wrap with watchify and rebundle on changes
		b = watchify(b);

		// Rebundle on update
		b.on('update', function (updated) {
			for (file in updated) {
				var filepath = updated[file];
				var filename = path.relative(config.src, filepath);

				gutil.log('Changed:', gutil.colors.yellow(filename));
			}

			bundle();
		});
	}

	return bundle();
};

var reportFinished = function () {
	// Log when bundling completes
	bundleLogger.end(config.src, config.dest);
};

module.exports = browserifyThis;
