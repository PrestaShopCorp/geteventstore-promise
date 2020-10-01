"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connectionManager = _interopRequireDefault(require("./connectionManager"));

var _mapEvents = _interopRequireDefault(require("./utilities/mapEvents"));

var _nodeEventstoreClient = _interopRequireDefault(require("node-eventstore-client"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var debug = (0, _debug["default"])('geteventstore:subscribeToStream');
var baseErr = 'Subscribe to Stream - ';

var _default = function _default(config) {
  return function (streamName, onEventAppeared, onDropped) {
    var resolveLinkTos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return new Promise( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
        var connection, onEvent, onConnected;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));

                onEvent = function onEvent(sub, ev) {
                  var mappedEvent = (0, _mapEvents["default"])([ev])[0];
                  if (mappedEvent) onEventAppeared(sub, mappedEvent);
                };

                onConnected = /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                    var subscription;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return connection.subscribeToStream(streamName, resolveLinkTos, onEvent, onDropped, new _nodeEventstoreClient["default"].UserCredentials(config.credentials.username, config.credentials.password));

                          case 3:
                            subscription = _context.sent;
                            debug('', 'Subscription: %j', subscription);
                            resolve(subscription);
                            _context.next = 11;
                            break;

                          case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](0);
                            reject(_context.t0);

                          case 11:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[0, 8]]);
                  }));

                  return function onConnected() {
                    return _ref2.apply(this, arguments);
                  };
                }();

                _context2.prev = 3;
                _context2.next = 6;
                return _connectionManager["default"].create(config, onConnected, true);

              case 6:
                connection = _context2.sent;
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](3);
                reject(_context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 9]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };
};

exports["default"] = _default;
module.exports = exports.default;