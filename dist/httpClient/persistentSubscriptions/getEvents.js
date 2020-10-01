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

var debug = (0, _debug["default"])('geteventstore:getEventsPersistentSubscription');
var baseErr = 'Get persistent subscriptions events - ';

var createRequest = function createRequest(config, name, streamName, count, embed) {
  var request = {
    url: "".concat(config.baseUrl, "/subscriptions/").concat(streamName, "/").concat(name, "/").concat(count, "?embed=").concat(embed),
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.eventstore.competingatom+json'
    }
  };
  return request;
};

var appendLinkFunctions = function appendLinkFunctions(config, resultObject, links) {
  links.forEach(function (link) {
    return resultObject[link.relation] = function () {
      return _axios["default"].post(link.uri, {}, {
        auth: {
          username: config.credentials.username,
          password: config.credentials.password
        }
      });
    };
  });
};

var buildResultObject = function buildResultObject(config, response) {
  var result = {
    entries: []
  };
  appendLinkFunctions(config, result, response.links);
  result.entries = response.entries.map(function (entry) {
    if (entry.data) entry.data = JSON.parse(entry.data);
    var formattedEntry = {
      event: entry
    };
    appendLinkFunctions(config, formattedEntry, entry.links);
    return formattedEntry;
  });
  debug('', 'Result: %j', result);
  return result;
};

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, streamName, count, embed) {
      var options, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert["default"])(name, "".concat(baseErr, "Persistent Subscription Name not provided"));
              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              count = count === undefined ? 1 : count;
              embed = embed || 'Body';
              options = createRequest(config, name, streamName, count, embed);
              debug('', 'Options: %j', options);
              _context.next = 8;
              return (0, _axios["default"])(options);

            case 8:
              response = _context.sent;
              debug('', 'Response: %j', response.data);
              return _context.abrupt("return", buildResultObject(config, response.data));

            case 11:
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