var PEG, gutil, processFile, through, util;

PEG = require("pegjs");

util = require("util");

gutil = require("gulp-util");

through = require("through2");

processFile = function(file, options) {
  var grammar = file.contents.toString("utf8");
  var parser = PEG.buildParser(grammar, options);
  var source = options.wrapper(parser);
  file.path = gutil.replaceExtension(file.path, ".js");
  file.contents = new Buffer(source);
  return file;
};

module.exports = function(options) {
  if (options == null) {
    options = {};
  }

  if (!options.wrapper) {
    options.wrapper = function (parser) {
      if (options.angular) {
        return 'angular.module(\'' + options.angular.module + '\', []).factory(\'' + options.angular.factory + '\', function () { return ' + parser + '});';
      } else {
        return (typeof options.exportVar === 'string' ? options.exportVar : 'module.exports') + ' = ' + parser + ';';
      }
    };
  }
  if (options.output == null) {
    options.output = "source";
  }
  return through.obj(function(file, enc, cb) {
    var e;
    if (file.isStream()) {
      return this.emit("error", gutil.PluginError("gulp-peg", "Streams are not supported!"));
    } else if (file.isBuffer()) {
      try {
        this.push(processFile(file, options));
        return cb();
      } catch (_error) {
        e = _error;
        this.emit("error", e);
        return cb();
      }
    } else if (file.isNull()) {
      this.push(file);
      return cb();
    }
  });
};
