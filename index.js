'use strict';

var image_exts = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
var font_exts = ['eot', 'otf', 'ttf', 'woff', 'woff2'];

// Replace url(...jpg) -> image-url(...jpg)
// Replace url(...eot) -> font-url(...jpg)
function replaceUrlWithPrefixUrl(line) {
  var filepath = line.match(/require\("([^"]+)"/)[1];
  var extname = String(filepath.match(/\.(\w+)$/)[1]).toLowerCase();

  if (image_exts.indexOf(extname) !== -1) {
    return line.replace(/^url/, 'image-url');
  } else if (font_exts.indexOf(extname) !== -1) {
    return line.replace(/^url/, 'font-url');
  } else {
    return line;
  }
}

module.exports = function(source) {
  var image_exts = ['jpg', 'jpeg', 'png', 'gif', 'svg']
  var font_exts = ['eot', 'otf', 'ttf', 'woff', 'woff2']

  var result = source.replace(/url\("\s*\+\s*require\("(.+?)"\)/g, function(line) {
    return replaceUrlWithPrefixUrl(line);
  });

  return result;
};
