"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var _axios = _interopRequireDefault(require("axios"));

var debug = (0, _debug["default"])('geteventstore:deleteStream');
var baseErr = 'Delete Stream - ';

var _default = function _default(config, checkStreamExists) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamName, hardDelete) {
      var exists, options, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              _context.next = 3;
              return checkStreamExists(streamName);

            case 3:
              exists = _context.sent;

              if (exists) {
                _context.next = 6;
                break;
              }

              throw new Error('Stream does not exist');

            case 6:
              options = {
                url: "".concat(config.baseUrl, "/streams/").concat(streamName),
                method: 'DELETE',
                timeout: config.timeout
              };

              if (hardDelete) {
                options.headers = {
                  "ES-HardDelete": "true"
                };
              }

              debug('', 'Options: %j', options);
              _context.next = 11;
              return (0, _axios["default"])(options);

            case 11:
              response = _context.sent;
              debug('', 'Response: %j', response.data);
              return _context.abrupt("return", response.data);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;