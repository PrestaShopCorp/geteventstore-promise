"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _generateEventId = _interopRequireDefault(require("./utilities/generateEventId"));

var _assert = _interopRequireDefault(require("assert"));

var EventFactory = /*#__PURE__*/function () {
  function EventFactory() {
    (0, _classCallCheck2["default"])(this, EventFactory);
  }

  (0, _createClass2["default"])(EventFactory, [{
    key: "newEvent",
    value: function newEvent(eventType, data, metadata, eventId) {
      (0, _assert["default"])(eventType);
      (0, _assert["default"])(data);
      var event = {
        eventId: eventId || (0, _generateEventId["default"])(),
        eventType: eventType,
        data: data
      };
      if (metadata !== undefined) event.metadata = metadata;
      return event;
    }
  }]);
  return EventFactory;
}();

exports["default"] = EventFactory;
module.exports = exports.default;