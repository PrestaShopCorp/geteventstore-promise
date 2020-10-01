"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _flattenArray = _interopRequireDefault(require("../utilities/flattenArray"));

var _connectionManager = _interopRequireDefault(require("./connectionManager"));

var _mapEvents = _interopRequireDefault(require("./utilities/mapEvents"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var debug = (0, _debug["default"])('geteventstore:getAllStreamEvents');
var baseErr = 'Get All Stream Events - ';

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(streamName, chunkSize, startPosition, resolveLinkTos) {
      var connection, events, getNextChunk, _getNextChunk;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _getNextChunk = function _getNextChunk3() {
                _getNextChunk = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(startPosition) {
                  var result;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return connection.readStreamEventsForward(streamName, startPosition, chunkSize, resolveLinkTos, config.credentials);

                        case 2:
                          result = _context.sent;
                          debug('', 'Result: %j', result);

                          if (!result.error) {
                            _context.next = 6;
                            break;
                          }

                          throw new Error(result.error);

                        case 6:
                          events.push(result.events);

                          if (!(result.isEndOfStream === false)) {
                            _context.next = 11;
                            break;
                          }

                          return _context.abrupt("return", getNextChunk(result.nextEventNumber));

                        case 11:
                          return _context.abrupt("return", (0, _mapEvents["default"])((0, _flattenArray["default"])(events)));

                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                return _getNextChunk.apply(this, arguments);
              };

              getNextChunk = function _getNextChunk2(_x5) {
                return _getNextChunk.apply(this, arguments);
              };

              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              chunkSize = chunkSize || 1000;

              if (chunkSize > 4096) {
                console.warn('WARNING: Max event chunk size exceeded. Using the max of 4096');
                chunkSize = 4096;
              }

              resolveLinkTos = resolveLinkTos === undefined ? true : resolveLinkTos;
              _context2.next = 8;
              return _connectionManager["default"].create(config);

            case 8:
              connection = _context2.sent;
              events = [];
              _context2.prev = 10;
              _context2.next = 13;
              return getNextChunk(startPosition || 0);

            case 13:
              return _context2.abrupt("return", _context2.sent);

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](10);
              throw _context2.t0;

            case 19:
              _context2.prev = 19;
              connection.releaseConnection();
              return _context2.finish(19);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[10, 16, 19, 22]]);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;