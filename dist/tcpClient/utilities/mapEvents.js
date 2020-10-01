"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(events) {
  return events.filter(function (ev) {
    return ev.event;
  }).map(function (ev) {
    var event = ev.event;
    var link = ev.link;
    var mappedEvent = {
      streamId: event.eventStreamId,
      eventId: event.eventId,
      eventNumber: event.eventNumber.toNumber ? event.eventNumber.toNumber() : event.eventNumber,
      eventType: event.eventType,
      created: event.created.toISOString(),
      metadata: event.metadata.toString(),
      isJson: event.isJson,
      data: event.isJson ? JSON.parse(event.data.toString()) : event.data.toString()
    };
    if (mappedEvent.metadata) mappedEvent.metadata = JSON.parse(mappedEvent.metadata);

    if (link) {
      mappedEvent.positionStreamId = link.eventStreamId;
      mappedEvent.positionEventId = link.eventId;
      mappedEvent.positionEventNumber = link.eventNumber.toNumber ? link.eventNumber.toNumber() : link.eventNumber;
      mappedEvent.positionCreated = link.created;
    }

    return mappedEvent;
  });
};

exports["default"] = _default;
module.exports = exports.default;