"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = function _default(readEventsForward, readEventsBackward) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamName, startPosition, count, direction, resolveLinkTos) {
      var embed,
          readEvents,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              embed = _args.length > 5 && _args[5] !== undefined ? _args[5] : 'body';
              readEvents = direction === 'backward' ? readEventsBackward : readEventsForward;
              _context.next = 4;
              return readEvents(streamName, startPosition, count, resolveLinkTos, embed);

            case 4:
              return _context.abrupt("return", _context.sent.events);

            case 5:
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