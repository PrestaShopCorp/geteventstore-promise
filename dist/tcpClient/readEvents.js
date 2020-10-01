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

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var debug = (0, _debug["default"])('geteventstore:readEvents');
var baseErr = 'Read Events - ';

var _default = function _default(config, direction) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamName, startPosition, count, resolveLinkTos) {
      var connection, handleResult;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              handleResult = function _handleResult(readResult) {
                debug('', 'Result: %j', readResult);
                if (readResult.error) throw new Error(readResult.error);
                var result = {};

                for (var key in readResult) {
                  if (result.key !== 'events') result[key] = readResult[key];
                }

                result.events = (0, _mapEvents["default"])(readResult.events);
                return result;
              };

              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              direction = direction || 'forward';
              startPosition = startPosition === undefined && direction === 'backward' ? -1 : startPosition || 0;
              count = count || 1000;
              resolveLinkTos = resolveLinkTos === undefined ? true : resolveLinkTos;

              if (count > 4096) {
                console.warn('WARNING: Max event count exceeded. Using the max of 4096');
                count = 4096;
              }

              _context.next = 9;
              return _connectionManager["default"].create(config);

            case 9:
              connection = _context.sent;
              _context.prev = 10;

              if (!(direction === 'forward')) {
                _context.next = 15;
                break;
              }

              _context.next = 14;
              return connection.readStreamEventsForward(streamName, startPosition, count, resolveLinkTos, config.credentials).then(handleResult);

            case 14:
              return _context.abrupt("return", _context.sent);

            case 15:
              _context.next = 17;
              return connection.readStreamEventsBackward(streamName, startPosition, count, resolveLinkTos, config.credentials).then(handleResult);

            case 17:
              return _context.abrupt("return", _context.sent);

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](10);
              throw _context.t0;

            case 23:
              _context.prev = 23;
              connection.releaseConnection();
              return _context.finish(23);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[10, 20, 23, 26]]);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;