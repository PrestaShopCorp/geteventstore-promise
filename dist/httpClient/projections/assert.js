"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _assert = _interopRequireDefault(require("assert"));

var _axios = _interopRequireDefault(require("axios"));

var _debug = _interopRequireDefault(require("debug"));

var debug = (0, _debug["default"])('geteventstore:assertProjection');
var baseErr = 'Assert Projection - ';

var doesProjectionExist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(projectionsInfo, name) {
    var projection;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            projection = projectionsInfo.projections.find(function (projection) {
              return projection.name === name;
            });

            if (!projection) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", true);

          case 3:
            return _context.abrupt("return", false);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function doesProjectionExist(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var buildCreateOptions = function buildCreateOptions(config, name, projectionContent, mode, enabled, emitEnabled, checkpointsEnabled, trackEmittedStreams) {
  var options = {
    url: "".concat(config.baseUrl, "/projections/").concat(mode),
    method: 'POST',
    params: {
      name: name,
      enabled: enabled ? 'yes' : 'no',
      emit: emitEnabled ? 'yes' : 'no',
      checkpoints: checkpointsEnabled ? 'yes' : 'no',
      trackemittedstreams: trackEmittedStreams ? 'yes' : 'no'
    },
    data: projectionContent
  };
  return options;
};

var buildUpdateOptions = function buildUpdateOptions(config, name, projectionContent, emitEnabled) {
  var options = {
    url: "".concat(config.baseUrl, "/projection/").concat(name, "/query"),
    method: 'PUT',
    params: {
      emit: emitEnabled ? 'yes' : 'no'
    },
    data: projectionContent
  };
  return options;
};

var _default = function _default(config, getAllProjectionsInfo) {
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(name, projectionContent, mode, enabled, checkpointsEnabled, emitEnabled, trackEmittedStreams) {
      var projectionsInfo, projectionExists, options, response;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              (0, _assert["default"])(name, "".concat(baseErr, "Name not provided"));
              (0, _assert["default"])(projectionContent, "".concat(baseErr, "Projection Content not provided"));
              mode = mode || 'continuous';
              enabled = enabled || true;
              checkpointsEnabled = mode === 'continuous' ? true : checkpointsEnabled || false;
              emitEnabled = emitEnabled || false;
              trackEmittedStreams = trackEmittedStreams || false;
              _context2.next = 9;
              return getAllProjectionsInfo();

            case 9:
              projectionsInfo = _context2.sent;
              _context2.next = 12;
              return doesProjectionExist(projectionsInfo, name);

            case 12:
              projectionExists = _context2.sent;
              debug('', 'Projection Exists: %j', projectionExists);
              options = {};
              if (!projectionExists) options = buildCreateOptions(config, name, projectionContent, mode, enabled, emitEnabled, checkpointsEnabled, trackEmittedStreams);else options = buildUpdateOptions(config, name, projectionContent, emitEnabled);
              debug('', 'Options: %j', options);
              _context2.next = 19;
              return (0, _axios["default"])(options);

            case 19:
              response = _context2.sent;
              debug('', 'Response: %j', response.data);
              return _context2.abrupt("return", response.data);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4, _x5, _x6, _x7, _x8, _x9) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;