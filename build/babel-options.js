var paths = require('./paths');
var path = require('path');

module.exports = {
  filename: '',
  filenameRelative: '',
  sourceMap: true,
  sourceMapTarget: '',
  sourceRoot: '',
  comments: false,
  compact: false,
  code:true,
  presets: [
    "stage-1",
    "es2015-loose"
  ],
  plugins: [
    "transform-class-properties",
    "transform-decorators-legacy",
    "transform-flow-strip-types"
  ]
};
