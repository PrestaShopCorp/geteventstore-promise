"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _flattenArray = _interopRequireDefault(require("../utilities/flattenArray"));

var _mapEvents = _interopRequireDefault(require("./utilities/mapEvents"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var _axios = _interopRequireDefault(require("axios"));

var debug = (0, _debug["default"])('geteventstore:getAllStreamEvents');
var baseErr = 'Get All Stream Events - ';

var buildOptions = function buildOptions(config, streamName, startPosition, chunkSize, resolveLinkTos, embed) {
  return {
    url: "".concat(config.baseUrl, "/streams/").concat(streamName, "/").concat(startPosition, "/forward/").concat(chunkSize),
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
};

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(streamName, chunkSize, startPosition, resolveLinkTos) {
      var embed,
          events,
          getNextChunk,
          _args2 = arguments;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              embed = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : 'body';
              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              startPosition = startPosition || 0;
              chunkSize = chunkSize || 1000;
              resolveLinkTos = resolveLinkTos === undefined ? true : resolveLinkTos;

              if (chunkSize > 4096) {
                console.warn('WARNING: Max event chunk size exceeded. Using the max of 4096');
                chunkSize = 4096;
              }

              events = [];

              getNextChunk = /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                  var options, response, totalEntries, i;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          options = buildOptions(config, streamName, startPosition, chunkSize, resolveLinkTos, embed);
                          _context.next = 3;
                          return (0, _axios["default"])(options);

                        case 3:
                          response = _context.sent;
                          debug('', 'Result: %j', response.data);

                          if (embed === 'body') {
                            totalEntries = response.data.entries.length;

                            for (i = 0; i < totalEntries; i++) {
                              if (response.data.entries[i].data) response.data.entries[i].data = JSON.parse(response.data.entries[i].data);
                            }
                          }

                          events.push(response.data.entries.reverse());

                          if (!(response.data.headOfStream === true)) {
                            _context.next = 9;
                            break;
                          }

                          return _context.abrupt("return", (0, _mapEvents["default"])((0, _flattenArray["default"])(events)));

                        case 9:
                          startPosition += chunkSize;
                          return _context.abrupt("return", getNextChunk());

                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function getNextChunk() {
                  return _ref2.apply(this, arguments);
                };
              }();

              return _context2.abrupt("return", getNextChunk());

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;