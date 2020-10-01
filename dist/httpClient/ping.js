"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _axios = _interopRequireDefault(require("axios"));

var debug = (0, _debug["default"])('geteventstore:ping');

var _default = function _default(config) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var options, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              url: "".concat(config.baseUrl, "/ping"),
              method: 'GET',
              timeout: config.timeout
            };
            debug('', 'Options: %j', options);
            _context.next = 4;
            return (0, _axios["default"])(options);

          case 4:
            response = _context.sent;
            debug('', 'Response: %j', response.data);
            return _context.abrupt("return", response.data);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};

exports["default"] = _default;
module.exports = exports.default;