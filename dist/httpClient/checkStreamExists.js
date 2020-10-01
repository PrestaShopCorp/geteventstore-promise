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

var debug = (0, _debug["default"])('geteventstore:checkStreamExists');
var baseErr = 'Check Stream Exists - ';

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamName) {
      var options, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              options = {
                url: "".concat(config.baseUrl, "/streams/").concat(streamName, "/head/backward/1"),
                method: 'GET',
                headers: {
                  "Content-Type": "application/vnd.eventstore.events+json"
                },
                timeout: config.timeout
              };
              debug('', 'Options: %j', options);
              _context.prev = 3;
              _context.next = 6;
              return (0, _axios["default"])(options);

            case 6:
              response = _context.sent;
              debug('', 'Response: %j', response.data);
              return _context.abrupt("return", true);

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);

              if (!(!_context.t0.response || _context.t0.response.status !== 404)) {
                _context.next = 15;
                break;
              }

              throw _context.t0;

            case 15:
              return _context.abrupt("return", false);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;