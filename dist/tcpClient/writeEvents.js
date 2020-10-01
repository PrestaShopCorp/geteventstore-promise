"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connectionManager = _interopRequireDefault(require("./connectionManager"));

var _chunkArray = _interopRequireDefault(require("../utilities/chunkArray"));

var _nodeEventstoreClient = _interopRequireDefault(require("node-eventstore-client"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var debug = (0, _debug["default"])('geteventstore:writeEvents');
var baseErr = 'Write Events - ';

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamName, events, options) {
      var eventsToWrite, connection, transaction, eventChunks, i, result;
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
              options.transactionWriteSize = options.transactionWriteSize || 250;
              options.expectedVersion = !Number.isInteger(options.expectedVersion) ? -2 : options.expectedVersion;
              eventsToWrite = events.map(function (ev) {
                return _nodeEventstoreClient["default"].createJsonEventData(ev.eventId, ev.data, ev.metadata, ev.eventType);
              });
              _context.next = 11;
              return _connectionManager["default"].create(config);

            case 11:
              connection = _context.sent;
              _context.prev = 12;
              _context.next = 15;
              return connection.startTransaction(streamName, options.expectedVersion, config.credentials);

            case 15:
              transaction = _context.sent;
              eventChunks = (0, _chunkArray["default"])(eventsToWrite, options.transactionWriteSize);
              i = 0;

            case 18:
              if (!(i < eventChunks.length)) {
                _context.next = 24;
                break;
              }

              _context.next = 21;
              return transaction.write(eventChunks[i]);

            case 21:
              i++;
              _context.next = 18;
              break;

            case 24:
              _context.next = 26;
              return transaction.commit();

            case 26:
              result = _context.sent;
              debug('', 'Result: %j', result);
              return _context.abrupt("return", result);

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](12);

              if (!transaction) {
                _context.next = 36;
                break;
              }

              _context.next = 36;
              return transaction.rollback();

            case 36:
              throw _context.t0;

            case 37:
              _context.prev = 37;
              connection.releaseConnection();
              return _context.finish(37);

            case 40:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[12, 31, 37, 40]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;