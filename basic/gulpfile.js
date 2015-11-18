var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var watchify = require('watchify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

// Compile SCSS files using node-sass
gulp.task('styles', function () {

	gulp.src('src/scss/app.scss')
		// Initialize sourcemaps on the unmodified bundle of source files
		.pipe(sourcemaps.init())

		// Process and minify SCSS
		.pipe(sass()
			.on('error', function (err) {
				// You can inspect / emit the entire error if you need to for debugging
				// purposes. It's a little verbose to keep in the normal flow.
				gutil.log(gutil.colors.red('Sass error: ') + err.message);
			})
		)
		.pipe(minifyCss())
		.pipe(autoprefixer({ map: true }))

		// Write the sourcemap information to an external file
		.pipe(sourcemaps.write('./maps'))

		// Write the css files to assets
		.pipe(gulp.dest('assets/css'));
});

// Compile JS
var browserifyThis = function (watch) {
	// Add custom browserify options here
	var customOpts = {
		entries: ['src/js/app.js'],
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
			.pipe(source('app.js'))
			// optional, remove if you don't need to buffer file contents
			.pipe(buffer())
			// optional, remove if you dont want sourcemaps
			.pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
			// Add transformation tasks to the pipeline here.
			.pipe(uglify()) // minify
			.pipe(sourcemaps.write('./')) // writes .map file
			.pipe(gulp.dest('./assets/js'));
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

gulp.task('scripts', function () {
	browserifyThis();
});

// Use this task to watch over any set of files in the source directory, and
// trigger the right task in response to any changes
gulp.task('watch', ['build'], function () {
	gulp.watch('src/scss/**/*.scss', ['styles']);

	browserifyThis(true);
});

// Clean the assets folder. We want to make sure we're never dealing with
// source files.
gulp.task('clean', function () {
	return gulp.src(['assets'], {
		// Since we don't need to read the contents of the files in this stream
		// after cleaning, turning this off makes the task faster
		read: false
	})
		.pipe(clean());
});

// This is where everything required for a build should go
gulp.task('build', ['styles', 'scripts']);

gulp.task('default', ['clean'], function () {
	gulp.start('build');
});
