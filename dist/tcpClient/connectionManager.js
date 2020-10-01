"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeEventstoreClient = _interopRequireDefault(require("node-eventstore-client"));

var _genericPool = _interopRequireDefault(require("generic-pool"));

var _debug = _interopRequireDefault(require("debug"));

var debug = (0, _debug["default"])('geteventstore:connectionManager');
var _uniqueConfigConnectionPools = [];
var _default = {
  create: function create(config, onConnected) {
    var _arguments = arguments;
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var isSubscription, connectionPool, opts, factory;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              isSubscription = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : false;
              connectionPool = _uniqueConfigConnectionPools.find(function (pool) {
                return pool.config === config && pool.onConnected === onConnected;
              });

              if (!connectionPool) {
                opts = config.poolOptions || {
                  autostart: false
                };

                if (isSubscription) {
                  opts.min = 1;
                  opts.max = 1;
                }

                factory = {
                  create: function create() {
                    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                      var client;
                      return _regenerator["default"].wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return _nodeEventstoreClient["default"].EventStoreConnection.create(config, config.gossipSeeds || "".concat(config.protocol, "://").concat(config.hostname, ":").concat(config.port));

                            case 2:
                              client = _context.sent;

                              client.releaseConnection = function () {
                                return connectionPool.pool.release(client);
                              };

                              if (onConnected) {
                                client.once('connected', onConnected);
                              } else {
                                client.on('connected', function () {
                                  return debug('', "".concat(client._connectionName, " - Connection Connected"));
                                });
                              }

                              client.on('disconnected', function () {
                                return debug('', "".concat(client._connectionName, " - Connection Disconnected"));
                              });
                              client.on('reconnecting', function () {
                                return debug('', "".concat(client._connectionName, " - Connection Reconnecting..."));
                              });
                              client.on('closed', function (reason) {
                                debug('', "".concat(client._connectionName, " - Connection Closed: ").concat(reason));
                                factory.destroy(client);
                              });
                              client.on('error', function (err) {
                                debug('', "".concat(client._connectionName, " - Connection Error: ").concat(err.stack));
                                console.error("".concat(client._connectionName, " - EventStore: ").concat(err.stack));

                                try {
                                  factory.destroy(client);
                                } catch (ex) {//Do nothing
                                }
                              });
                              _context.next = 11;
                              return client.connect();

                            case 11:
                              return _context.abrupt("return", client);

                            case 12:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }))();
                  },
                  destroy: function destroy(client) {
                    return client.close();
                  }
                };
                connectionPool = {
                  config: config,
                  onConnected: onConnected,
                  pool: _genericPool["default"].createPool(factory, opts)
                };

                _uniqueConfigConnectionPools.push(connectionPool);
              }

              return _context2.abrupt("return", connectionPool.pool.acquire());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  closeAllPools: function closeAllPools() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Promise.all(_uniqueConfigConnectionPools.map(function (connectionPool) {
                return connectionPool.pool.clear();
              }));

            case 2:
              _uniqueConfigConnectionPools.splice(0, _uniqueConfigConnectionPools.length);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  close: function close(config) {
    var _this = this;

    return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var pool;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.getPool(config)();

            case 2:
              pool = _context4.sent;
              _context4.next = 5;
              return pool.clear();

            case 5:
              _uniqueConfigConnectionPools = _uniqueConfigConnectionPools.filter(function (_connectionPool) {
                return _connectionPool.pool !== pool;
              });

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
  },
  getPool: function getPool(config) {
    return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var connectionPool;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              connectionPool = _uniqueConfigConnectionPools.find(function (pool) {
                return pool.config === config;
              });

              if (connectionPool) {
                _context5.next = 3;
                break;
              }

              throw new Error("Connection Pool not found");

            case 3:
              return _context5.abrupt("return", connectionPool.pool);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
  }
};
exports["default"] = _default;
module.exports = exports.default;