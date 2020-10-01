"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "EventFactory", {
  enumerable: true,
  get: function get() {
    return _EventFactory["default"];
  }
});
Object.defineProperty(exports, "HTTPClient", {
  enumerable: true,
  get: function get() {
    return _httpClient["default"];
  }
});
Object.defineProperty(exports, "TCPClient", {
  enumerable: true,
  get: function get() {
    return _tcpClient["default"];
  }
});
exports["default"] = exports.tcp = exports.http = exports.eventFactory = void 0;

var _EventFactory = _interopRequireDefault(require("./EventFactory"));

var _httpClient = _interopRequireDefault(require("./httpClient"));

var _tcpClient = _interopRequireDefault(require("./tcpClient"));

var eventFactory = {
  NewEvent: function NewEvent() {
    console.warn("WARNING: geteventstore-promise - 'eventFactory.NewEvent(...)' has been deprecated (planned removal in 4.0). Please use 'new EventFactory(config).newEvent(...)' instead.");
    return new _EventFactory["default"]().newEvent.apply(this, arguments);
  }
};
exports.eventFactory = eventFactory;

var http = function http(config) {
  console.warn("WARNING: geteventstore-promise - 'http(config)' has been deprecated (planned removal in 4.0). Please use 'new HTTPClient(config)' instead.");
  return new _httpClient["default"](config);
};

exports.http = http;

var tcp = function tcp(config) {
  console.warn("WARNING: geteventstore-promise - 'tcp(config)' has been deprecated (planned removal in 4.0). Please use 'new TCPClient(config)' instead.");
  return new _tcpClient["default"](config);
};

exports.tcp = tcp;
var _default = {
  EventFactory: _EventFactory["default"],
  HTTPClient: _httpClient["default"],
  TCPClient: _tcpClient["default"],
  eventFactory: eventFactory,
  http: http,
  tcp: tcp
};
exports["default"] = _default;