"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = function _default(getAllProjectionsInfo, startProjection) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var projectionsInfo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getAllProjectionsInfo();

          case 2:
            projectionsInfo = _context.sent;
            return _context.abrupt("return", Promise.all(projectionsInfo.projections.map(function (projection) {
              return startProjection(projection.name);
            })));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};

exports["default"] = _default;
module.exports = exports.default;