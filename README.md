gulp-peg
========

[![Build Status](https://travis-ci.org/lazutkin/gulp-peg.svg?branch=develop)](https://travis-ci.org/lazutkin/gulp-peg)

Gulp plugin for [PEG](http://pegjs.majda.cz/) parsers compilation.

# Installation

Install plugin

```
npm install gulp-peg --save-dev
```

Add peg-compilation task into your gulp-file:

```
var $ = require('gulp-load-plugins')();

gulp.task('pegjs', function () {
  return gulp
    .src(paths.src + '/{app,components}/**/*.pegjs')
    .pipe($.peg({
      angular: {
          module: "angularModuleName",
          factory: "factoryName"
        }
      }).on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    }))
    .pipe(gulp.dest(paths.src))
});

```

Finish

## Options

Plugin redirects passed options directly to PEG, so read [its documentation](http://pegjs.majda.cz/documentation) for details.


### Wrappers

The generated source can be wrapped in different ways:

#### exportVar option

This option is inspired by [grunt-peg](https://github.com/dvberkel/grunt-peg) plugin, and defines variable to which the generated parser will be assigned in the output file. Default value is `module.exports`.

#### angular option

This option is inspired by [grunt-peg](https://github.com/dvberkel/grunt-peg) plugin. It creates an Angular module with a factory containing the generated source.

