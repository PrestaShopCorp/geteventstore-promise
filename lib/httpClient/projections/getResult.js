import debugModule from 'debug';
import assert from 'assert';
import axios from 'axios';

const debug = debugModule('geteventstore:getResult');
const baseErr = 'Get Projection Result - ';

export default (config) => async (name, options) => {
	assert(name, `${baseErr}Name not provided`);

	const params = {};
	options = options || {};

	if (options.partition) params.partition = options.partition;
	const urlOptions = {
		url: `${config.baseUrl}/projection/${name}/result`,
		headers: {
			"Content-Type": "application/vnd.eventstore.events+json"
		},
		method: 'GET',
		params
	};
	debug('', 'Options: %j', options);
	const response = await axios(urlOptions);
	debug('', 'Response: %j', response.data);
	return response.data;
};
