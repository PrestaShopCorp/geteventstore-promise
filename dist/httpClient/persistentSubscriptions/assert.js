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

var debug = (0, _debug["default"])('geteventstore:assertPersistentSubscription');
var baseErr = 'Assert persistent subscriptions - ';

var createPersistentSubscriptionRequest = function createPersistentSubscriptionRequest(config, name, streamName, options) {
  return {
    url: "".concat(config.baseUrl, "/subscriptions/").concat(streamName, "/").concat(name),
    method: 'PUT',
    data: options
  };
};

var createPersistentSubscriptionOptions = function createPersistentSubscriptionOptions(options) {
  options = options || {};
  return {
    resolveLinkTos: options.resolveLinkTos,
    startFrom: options.startFrom === undefined ? 0 : options.startFrom,
    extraStatistics: options.extraStatistics,
    checkPointAfterMilliseconds: options.checkPointAfterMilliseconds,
    liveBufferSize: options.liveBufferSize,
    readBatchSize: options.readBatchSize,
    bufferSize: options.bufferSize,
    maxCheckPointCount: options.maxCheckPointCount,
    maxRetryCount: options.maxRetryCount,
    maxSubscriberCount: options.maxSubscriberCount,
    messageTimeoutMilliseconds: options.messageTimeoutMilliseconds,
    minCheckPointCount: options.minCheckPointCount,
    namedConsumerStrategy: options.namedConsumerStrategy
  };
};

var _default = function _default(config) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, streamName, options) {
      var persistentSubscriptionOptions, createRequest, response, updateRequest, _response;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert["default"])(name, "".concat(baseErr, "Persistent Subscription Name not provided"));
              (0, _assert["default"])(streamName, "".concat(baseErr, "Stream Name not provided"));
              persistentSubscriptionOptions = createPersistentSubscriptionOptions(options);
              createRequest = createPersistentSubscriptionRequest(config, name, streamName, persistentSubscriptionOptions);
              _context.prev = 4;
              debug('', 'Options: %j', createRequest);
              _context.next = 8;
              return (0, _axios["default"])(createRequest);

            case 8:
              response = _context.sent;
              debug('', 'Response: %j', response.data);
              return _context.abrupt("return", response.data);

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](4);

              if (!(_context.t0.response.status !== 409)) {
                _context.next = 17;
                break;
              }

              throw _context.t0;

            case 17:
              updateRequest = createPersistentSubscriptionRequest(config, name, streamName, persistentSubscriptionOptions);
              updateRequest.method = 'post';
              debug('', 'Update Options: %j', updateRequest);
              _context.next = 22;
              return (0, _axios["default"])(updateRequest);

            case 22:
              _response = _context.sent;
              debug('', 'Response: %j', _response.data);
              return _context.abrupt("return", _response.data);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 13]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;
module.exports = exports.default;