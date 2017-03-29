const debug = require('debug')('geteventstore:assertProjection');
const req = require('request-promise');
const Promise = require('bluebird');
const assert = require('assert');
const _ = require('lodash');
const url = require('url');

const baseErr = 'Assert Projection - ';

const doesProjectionExist = (config, name) => Promise.resolve().then(() => {
    const getAllProjectionsInfo = require('./getAllProjectionsInfo')(config);
    return getAllProjectionsInfo().then(projectionsInfo => {
        const projection = _.find(projectionsInfo.projections, projection => projection.name === name);
        if (projection) return true;
        return false;
    });
});

const buildCreateOptions = (
    config,
    name,
    projectionContent,
    mode,
    enabled,
    emitEnabled,
    checkpointsEnabled
) => {
    const urlObj = JSON.parse(JSON.stringify(config));
    urlObj.pathname = `/projections/${mode}`;
    const uri = url.format(urlObj);

    const options = {
        uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        qs: {
            name,
            enabled: enabled ? 'yes' : 'no',
            emit: emitEnabled ? 'yes' : 'no',
            checkpoints: checkpointsEnabled ? 'yes' : 'no',
        },
        body: projectionContent
    };

    return options;
};

const buildUpdateOptions = (config, name, projectionContent, emitEnabled) => {
    const urlObj = JSON.parse(JSON.stringify(config));
    urlObj.pathname = `/projection/${name}/query`;
    const uri = url.format(urlObj);

    const options = {
        uri,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        qs: {
            emit: emitEnabled ? 'yes' : 'no',
        },
        body: projectionContent
    };

    return options;
};

module.exports = config => (name, projectionContent, mode, enabled, checkpointsEnabled, emitEnabled) => Promise.resolve().then(() => {
    assert(name, `${baseErr}Name not provided`);
    assert(projectionContent, `${baseErr}Projecion Contnet not provided`);

    mode = mode || 'continuous';
    enabled = enabled || true;
    checkpointsEnabled = mode === 'continuous' ? true : checkpointsEnabled || false;
    emitEnabled = emitEnabled || false;

    return doesProjectionExist(config, name).then(projectionExists => {
        debug('', 'Projection Exists: %j', projectionExists);
        let options = {};

        if (!projectionExists)
            options = buildCreateOptions(config, name, projectionContent, mode, enabled, emitEnabled, checkpointsEnabled);
        else
            options = buildUpdateOptions(config, name, projectionContent, emitEnabled);

        debug('', 'Options: %j', options);
        return req(options).then(response => {
            debug('', 'Response: %j', response);
            return JSON.parse(response);
        });
    });
});