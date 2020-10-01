"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _EventFactory = _interopRequireDefault(require("../EventFactory"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var _axios = _interopRequireDefault(require("axios"));

var debug = (0, _debug["default"])('geteventstore:writeEvent');
var eventFactory = new _EventFactory["default"]();
var baseErr = 'Write Event - ';

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamName, eventType, data, metaData, options) {
      var events, reqOptions, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              (0, _assert["default"])(eventType, "".concat(baseErr, "Event Type not provided"));
              (0, _assert["default"])(data, "".concat(baseErr, "Event Data not provided"));
              options = options || {};
              options.expectedVersion = !Number.isInteger(options.expectedVersion) ? -2 : options.expectedVersion;
              events = [eventFactory.newEvent(eventType, data, metaData)];
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
              debug('', 'Write Event: %j', reqOptions);
              _context.next = 10;
              return (0, _axios["default"])(reqOptions);

            case 10:
              response = _context.sent;
              debug('', 'Response: %j', response.data);
              return _context.abrupt("return", response.data);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;