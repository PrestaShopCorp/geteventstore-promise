"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(array, chunk_size) {
  return Array(Math.ceil(array.length / chunk_size)).fill().map(function (_, index) {
    return index * chunk_size;
  }).map(function (begin) {
    return array.slice(begin, begin + chunk_size);
  });
};

exports["default"] = _default;
module.exports = exports.default;