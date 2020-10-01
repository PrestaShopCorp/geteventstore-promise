"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mapEvents = _interopRequireDefault(require("./utilities/mapEvents"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var _axios = _interopRequireDefault(require("axios"));

var debug = (0, _debug["default"])('geteventstore:readEvents');
var baseErr = 'Read Events - ';

var _default = function _default(config, direction) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamName, startPosition, count, resolveLinkTos) {
      var embed,
          options,
          response,
          totalEntries,
          i,
          mappedEvents,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              embed = _args.length > 4 && _args[4] !== undefined ? _args[4] : 'body';
              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              count = count || 1000;

              if (count > 4096) {
                console.warn('WARNING: Max event count exceeded. Using the max of 4096');
                count = 4096;
              }

              direction = direction || 'forward';
              startPosition = startPosition === undefined && direction === 'backward' ? 'head' : startPosition || 0;
              resolveLinkTos = resolveLinkTos === undefined ? true : resolveLinkTos;
              options = {
                url: "".concat(config.baseUrl, "/streams/").concat(streamName, "/").concat(startPosition, "/").concat(direction, "/").concat(count),
                method: 'GET',
                headers: {
                  "Content-Type": "application/vnd.eventstore.events+json",
                  "ES-ResolveLinkTos": resolveLinkTos.toString()
                },
                params: {
                  embed: embed
                },
                timeout: config.timeout
              };
              debug('', 'Options: ', options);
              _context.next = 11;
              return (0, _axios["default"])(options);

            case 11:
              response = _context.sent;

              if (embed === 'body') {
                totalEntries = response.data.entries.length;

                for (i = 0; i < totalEntries; i++) {
                  if (response.data.entries[i].data) response.data.entries[i].data = JSON.parse(response.data.entries[i].data);
                }
              }

              mappedEvents = (0, _mapEvents["default"])(direction === 'forward' ? response.data.entries.reverse() : response.data.entries);
              delete response.data.entries;
              response.data.isEndOfStream = response.data.headOfStream;
              response.data.readDirection = direction;
              response.data.fromEventNumber = startPosition;
              response.data.nextEventNumber = !response.data.headOfStream && mappedEvents.length > 0 ? mappedEvents[mappedEvents.length - 1].eventNumber + (direction === 'forward' ? 1 : -1) : 0;
              response.data.events = mappedEvents;
              return _context.abrupt("return", response.data);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;