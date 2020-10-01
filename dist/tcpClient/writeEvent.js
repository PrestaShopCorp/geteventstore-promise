"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _generateEventId = _interopRequireDefault(require("../utilities/generateEventId"));

var _connectionManager = _interopRequireDefault(require("./connectionManager"));

var _nodeEventstoreClient = _interopRequireDefault(require("node-eventstore-client"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var debug = (0, _debug["default"])('geteventstore:writeEvent');
var baseErr = 'Write Event - ';

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamName, eventType, data, metaData, options) {
      var event, connection, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              (0, _assert["default"])(eventType, "".concat(baseErr, "Event Type not provided"));
              (0, _assert["default"])(data, "".concat(baseErr, "Event Data not provided"));
              options = options || {};
              options.expectedVersion = !Number.isInteger(options.expectedVersion) ? -2 : options.expectedVersion;
              event = _nodeEventstoreClient["default"].createJsonEventData((0, _generateEventId["default"])(), data, metaData, eventType);
              _context.next = 8;
              return _connectionManager["default"].create(config);

            case 8:
              connection = _context.sent;
              _context.prev = 9;
              _context.next = 12;
              return connection.appendToStream(streamName, options.expectedVersion, [event], config.credentials);

            case 12:
              result = _context.sent;
              debug('', 'Result: %j', result);

              if (!result.error) {
                _context.next = 16;
                break;
              }

              throw new Error(result.error);

            case 16:
              return _context.abrupt("return", result);

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](9);
              throw _context.t0;

            case 22:
              _context.prev = 22;
              connection.releaseConnection();
              return _context.finish(22);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 19, 22, 25]]);
    }));

    return function (_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;