"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _subscribeToStreamFrom = _interopRequireDefault(require("./subscribeToStreamFrom"));

var _getAllStreamEvents = _interopRequireDefault(require("./getAllStreamEvents"));

var _checkStreamExists = _interopRequireDefault(require("./checkStreamExists"));

var _subscribeToStream = _interopRequireDefault(require("./subscribeToStream"));

var _connectionManager = _interopRequireDefault(require("./connectionManager"));

var _getEventsByType = _interopRequireDefault(require("./getEventsByType"));

var _eventEnumerator = _interopRequireDefault(require("./eventEnumerator"));

var _nodeEventstoreClient = _interopRequireDefault(require("node-eventstore-client"));

var _deleteStream = _interopRequireDefault(require("./deleteStream"));

var _writeEvents = _interopRequireDefault(require("./writeEvents"));

var _writeEvent = _interopRequireDefault(require("./writeEvent"));

var _readEvents = _interopRequireDefault(require("./readEvents"));

var _getEvents = _interopRequireDefault(require("./getEvents"));

var _assert = _interopRequireDefault(require("assert"));

var _url = _interopRequireDefault(require("url"));

var baseErr = 'geteventstore-promise - TCP client - ';

var TCPClient = function TCPClient(config) {
  (0, _classCallCheck2["default"])(this, TCPClient);
  (0, _assert["default"])(config, "".concat(baseErr, "config not provided"));

  if (config.gossipSeeds) {
    (0, _assert["default"])(Array.isArray(config.gossipSeeds), "".concat(baseErr, "gossipSeeds must be an array"));
    (0, _assert["default"])(config.gossipSeeds.length >= 3, "".concat(baseErr, "at least 3 gossipSeeds are required"));
    config.gossipSeeds.forEach(function (seed) {
      (0, _assert["default"])(seed.hostname, "".concat(baseErr, "gossip seed must have a hostname"));
      (0, _assert["default"])(seed.port, "".concat(baseErr, "gossip seed must have a port"));
    });
  } else {
    (0, _assert["default"])(config.hostname, "".concat(baseErr, "hostname property not provided"));
    (0, _assert["default"])(config.port, "".concat(baseErr, "port property not provided"));
  }

  (0, _assert["default"])(config.credentials, "".concat(baseErr, "credentials property not provided"));
  (0, _assert["default"])(config.credentials.username, "".concat(baseErr, "credentials.username property not provided"));
  (0, _assert["default"])(config.credentials.password, "".concat(baseErr, "credentials.password property not provided")); //Add additional internal configuration properties

  var _config = JSON.parse(JSON.stringify(config));

  _config.protocol = _config.protocol || 'tcp';
  _config.host = _config.hostname;
  _config.auth = "".concat(_config.credentials.username, ":").concat(_config.credentials.password);
  _config.baseUrl = _url["default"].format(_config);

  if (_config.gossipSeeds && _config.gossipSeeds.length > 0) {
    _config.gossipSeeds = _config.gossipSeeds.map(function (seed) {
      return new _nodeEventstoreClient["default"].GossipSeed({
        host: seed.hostname,
        port: seed.port
      }, seed.hostHeader);
    });
  }

  this.checkStreamExists = (0, _checkStreamExists["default"])(_config);
  this.writeEvent = (0, _writeEvent["default"])(_config);
  this.writeEvents = (0, _writeEvents["default"])(_config);
  this.getAllStreamEvents = (0, _getAllStreamEvents["default"])(_config);
  this.readEventsForward = (0, _readEvents["default"])(_config, 'forward');
  this.readEventsBackward = (0, _readEvents["default"])(_config, 'backward');
  this.getEvents = (0, _getEvents["default"])(this.readEventsForward, this.readEventsBackward);
  this.getEventsByType = (0, _getEventsByType["default"])(this.getEvents);
  this.deleteStream = (0, _deleteStream["default"])(_config);
  this.eventEnumerator = (0, _eventEnumerator["default"])(_config);
  this.subscribeToStream = (0, _subscribeToStream["default"])(_config);
  this.subscribeToStreamFrom = (0, _subscribeToStreamFrom["default"])(_config);
  this.close = _connectionManager["default"].close(_config);
  this.getPool = _connectionManager["default"].getPool(_config);
  this.closeAllPools = _connectionManager["default"].closeAllPools;
};

exports["default"] = TCPClient;
module.exports = exports.default;