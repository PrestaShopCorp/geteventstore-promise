var eventFactory = require('./eventFactory');

module.exports = {
	eventFactory: eventFactory,
	http: require('./httpClient'),
	tcp: require('./tcpClient')
};