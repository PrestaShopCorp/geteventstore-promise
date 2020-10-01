"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(arr) {
  return arr.reduce(function (flat, next) {
    return flat.concat(next);
  }, []);
};

exports["default"] = _default;
module.exports = exports.default;