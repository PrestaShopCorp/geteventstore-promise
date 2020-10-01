"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connectionManager = _interopRequireDefault(require("./connectionManager"));

var _mapEvents = _interopRequireDefault(require("./utilities/mapEvents"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var debug = (0, _debug["default"])('geteventstore:eventEnumerator');
var baseErr = 'Event Enumerator - ';

var getNextBatch = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(config, streamName, state, count, direction, resolveLinkTos) {
    var connection, handleResult;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            handleResult = function _handleResult(result) {
              debug('', 'Result: %j', result);
              state.nextEventNumber = result.nextEventNumber.toNumber ? result.nextEventNumber.toNumber() : result.nextEventNumber;
              return {
                isEndOfStream: result.isEndOfStream,
                events: (0, _mapEvents["default"])(result.events)
              };
            };

            state.isFirstEnumeration = false;
            (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
            _context.next = 5;
            return _connectionManager["default"].create(config);

          case 5:
            connection = _context.sent;
            _context.prev = 6;

            if (!(direction === 'forward')) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return connection.readStreamEventsForward(streamName, state.nextEventNumber, count, resolveLinkTos, config.credentials).then(handleResult);

          case 10:
            return _context.abrupt("return", _context.sent);

          case 11:
            _context.next = 13;
            return connection.readStreamEventsBackward(streamName, state.nextEventNumber, count, resolveLinkTos, config.credentials).then(handleResult);

          case 13:
            return _context.abrupt("return", _context.sent);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](6);
            throw _context.t0;

          case 19:
            _context.prev = 19;
            connection.releaseConnection();
            return _context.finish(19);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 16, 19, 22]]);
  }));

  return function getNextBatch(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

var esDirectionWorkaroundHandler = function esDirectionWorkaroundHandler(direction) {
  var wasSwopped = false;

  if (direction === 'forward') {
    wasSwopped = true;
    direction = 'backward';
  }

  return {
    direction: direction,
    swopResult: function swopResult(state, count, result) {
      if (wasSwopped) {
        state.nextEventNumber += count + 1;
        result.events.reverse();
      }

      return result;
    }
  };
};

var stateHandler = function stateHandler(direction) {
  var Handler = /*#__PURE__*/function () {
    function Handler() {
      (0, _classCallCheck2["default"])(this, Handler);
      this.isFirstEnumeration = true;
      this.setToFirst();
    }

    (0, _createClass2["default"])(Handler, [{
      key: "setToFirst",
      value: function setToFirst() {
        this.nextEventNumber = direction === 'forward' ? 0 : -1;
      }
    }, {
      key: "setToLast",
      value: function setToLast(count) {
        this.nextEventNumber = direction === 'forward' ? -1 : count - 1;
      }
    }, {
      key: "setToPrevious",
      value: function setToPrevious(count) {
        if (!this.isFirstEnumeration) this.adjustByLength(count);
      }
    }, {
      key: "keepInBoundsAdjustment",
      value: function keepInBoundsAdjustment(count) {
        if (direction === 'backward') return count;
        var adjustment = count;

        if (this.nextEventNumber < -1) {
          adjustment -= Math.abs(this.nextEventNumber);
          this.nextEventNumber = 0;
        }

        return adjustment;
      }
    }, {
      key: "adjustByLength",
      value: function adjustByLength(count) {
        this.nextEventNumber += direction === 'forward' ? count * -1 : count;
      }
    }]);
    return Handler;
  }();

  return new Handler();
};

var _default = function _default(config) {
  return function (streamName, direction, resolveLinkTos) {
    direction = direction || 'forward';
    resolveLinkTos = resolveLinkTos === undefined ? true : resolveLinkTos;
    var state = stateHandler(direction);
    return {
      first: function first(count) {
        state.setToFirst();
        return getNextBatch(config, streamName, state, count, direction, resolveLinkTos);
      },
      last: function last(count) {
        state.setToLast(count);
        var handler = esDirectionWorkaroundHandler(direction);
        return getNextBatch(config, streamName, state, count, handler.direction, resolveLinkTos).then(function (result) {
          return handler.swopResult(state, count, result);
        });
      },
      previous: function previous(count) {
        state.setToPrevious(count);
        count = state.keepInBoundsAdjustment(count);
        return getNextBatch(config, streamName, state, count, direction, resolveLinkTos).then(function (result) {
          state.adjustByLength(count);
          return result;
        });
      },
      next: function next(count) {
        return getNextBatch(config, streamName, state, count, direction, resolveLinkTos);
      }
    };
  };
};

exports["default"] = _default;
module.exports = exports.default;