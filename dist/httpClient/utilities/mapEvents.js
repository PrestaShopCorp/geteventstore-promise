"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(events) {
  return events.map(function (ev) {
    ev.created = ev.updated;
    return ev;
  });
};

exports["default"] = _default;
module.exports = exports.default;