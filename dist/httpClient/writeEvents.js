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

var debug = (0, _debug["default"])('geteventstore:writeEvents');
var baseErr = 'Write Events - ';

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamName, events, options) {
      var reqOptions, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              (0, _assert["default"])(events, "".concat(baseErr, "Events not provided"));

              _assert["default"].equal(true, events.constructor === Array, "".concat(baseErr, "Events should be an array"));

              if (!(events.length === 0)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              options = options || {};
              options.expectedVersion = !Number.isInteger(options.expectedVersion) ? -2 : options.expectedVersion;
              reqOptions = {
                url: "".concat(config.baseUrl, "/streams/").concat(streamName),
                headers: {
                  "Content-Type": "application/vnd.eventstore.events+json",
                  "ES-ExpectedVersion": options.expectedVersion
                },
                method: 'POST',
                data: events,
                timeout: config.timeout
              };
              debug('', 'Write events: %j', reqOptions);
              _context.next = 11;
              return (0, _axios["default"])(reqOptions);

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

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;