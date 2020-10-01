"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _assert = _interopRequireDefault(require("assert"));

var _debug = _interopRequireDefault(require("debug"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var debug = (0, _debug["default"])("geteventstore:getProjectionInfo");
var baseErr = "Get Projection Info - ";

var _default = function _default(getAllProjectionsInfo, getConfig) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, includeConfig) {
      var projectionsInfo, projectionInfo, config;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert["default"])(name, "".concat(baseErr, "Name not provided"));
              _context.next = 3;
              return getAllProjectionsInfo();

            case 3:
              projectionsInfo = _context.sent;
              projectionInfo = projectionsInfo.projections.find(function (projection) {
                return projection.name === name;
              });
              debug("", "Projection Info: %j", projectionInfo);

              if (!(includeConfig === true)) {
                _context.next = 12;
                break;
              }

              _context.next = 9;
              return getConfig(name);

            case 9:
              config = _context.sent;
              debug("", "Config: %j", config);
              return _context.abrupt("return", _objectSpread(_objectSpread({}, projectionInfo), {}, {
                config: config
              }));

            case 12:
              return _context.abrupt("return", projectionInfo);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;