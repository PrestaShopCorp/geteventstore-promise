"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _debug = _interopRequireDefault(require("debug"));

var debug = (0, _debug["default"])('geteventstore:aggRoot');

var AggRoot = function AggRoot(when) {
  var eventHandlers = when;

  this.handle = function (events) {
    debug('', 'Handling Events: %j', events);
    var self = this;

    if (events.length > 0) {
      for (var i = 0; i < events.length; i++) {
        var ev = events[i];

        if (eventHandlers[ev.eventType] !== undefined) {
          eventHandlers[ev.eventType].call(self, ev);

          if (ev.eventNumber !== undefined) {
            self._version = ev.eventNumber;
          }
        }
      }
    }
  };
};

var _default = AggRoot;
exports["default"] = _default;
module.exports = exports.default;