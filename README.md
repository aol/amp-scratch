AMP Scratch
===========

Sample [AMP site](http://www.aolpublishers.com/support/documentation/sites/filebased.md) boilerplates. For reference!

This repo provides boilerplate front-end build processes for AMP sites using the [AMP Cli](http://www.aolpublishers.com/support/documentation/sites/filebased/dev/cli.md).

* Basic: gulp build using Sass for stylesheets and Browserify for scripts.

If you have a custom build that solves a particular need, please submit a pull request. We also accept useful modifications to existing boilerplates. Help make this repo useful for everybody!
Getting Started
---------------

The only global requirements are NodeJS (install via [Homebrew](http://brew.sh/) if you're on a Mac) and [gulp](http://gulpjs.com/).

If you've never used gulp before, you'll need to install it globally, first. You won't have to do this for future gulp projects on this machine.

```
$ npm install -g gulp
```

Cd to the boilerplate you want to use. Install the dependencies for the project that are listed in `package.json` with:

```
$ npm install
```

Using Gulp
----------

To build your project, just type:

```
$ gulp
```

That runs the `default` task. You can check out what it does in `gulpfile.js`.

The other thing you'll want to do a lot of the time is run the watch, which will rebuild files when the process detects changes:

```
$ gulp watch
```

Contributions Guide
===================

Until we get more formal specifications written, just try to follow the `basic` example as closely as possible. Please amply comment your code. Tabs, not spaces!
