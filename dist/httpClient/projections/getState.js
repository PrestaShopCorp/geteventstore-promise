"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var _axios = _interopRequireDefault(require("axios"));

var debug = (0, _debug["default"])('geteventstore:getProjectionState');
var baseErr = 'Get Projection State - ';

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, options) {
      var params, urlOptions, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert["default"])(name, "".concat(baseErr, "Name not provided"));
              params = {};
              options = options || {};
              if (options.partition) params.partition = options.partition;
              urlOptions = {
                url: "".concat(config.baseUrl, "/projection/").concat(name, "/state"),
                headers: {
                  "Content-Type": "application/vnd.eventstore.events+json"
                },
                method: 'GET',
                params: params
              };
              debug('', 'Options: %j', options);
              _context.next = 8;
              return (0, _axios["default"])(urlOptions);

            case 8:
              response = _context.sent;
              debug('', 'Response: %j', response.data);
              return _context.abrupt("return", response.data);

            case 11:
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