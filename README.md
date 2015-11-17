AMP Scratch
===========

A sample [AMP site](http://www.aolpublishers.com/support/documentation/sites/filebased.md). For reference!

This is a simple demo to show you how to use gulp to manage a front-end build process for an AMP site using the [AMP Cli](http://www.aolpublishers.com/support/documentation/sites/filebased/dev/cli.md).

You can get way fancier than this setup when you're ready: the goal here is to provide simple enough building blocks for you to get an idea what's going on.

Getting Started
---------------

The only global requirements are NodeJS (install via [Homebrew](http://brew.sh/)) if you're on a Mac) and [gulp](http://gulpjs.com/).

If you've never used gulp before, you'll need to install it globally, first. You won't have to do this for future gulp projects on this machine.

```
$ npm install -g gulp
```

Install the dependencies for the project that are listed in `package.json` with:

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
