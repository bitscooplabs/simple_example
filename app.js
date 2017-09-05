'use strict';

const BitScoop = require('bitscoop-sdk');
const config = require('config');
const express = require('express');
const httpErrors = require('http-errors');


let bitscoop = new BitScoop(config.bitscoop.apiKey);
let services = {};

for (let name in config.services) {
	if (!config.services.hasOwnProperty(name)) {
		break;
	}

	let serviceConfig = config.services[name];

	services[name] = {
		connector: bitscoop.api(serviceConfig.mapId),
		callOptions: serviceConfig.callOptions
	}
}

let app = express();

// Disable insecure header information.
app.disable('x-powered-by');

app.use('/:service/:endpoint', function(req, res, next) {
	let service = req.params.service;
	let endpoint = req.params.endpoint;

	if (!services.hasOwnProperty(service)) {
		return next(httpErrors(404, 'Service not found.'));
	}

	console.debug(`Calling ${req.params.endpoint} for service ${req.params.service}...`);

	services[service].connector
		.endpoint(endpoint)
		.method(req.method)(services[service].callOptions)
		.then(function(result) {
			let [body, ] = result;

			res.json(body);
		})
		.catch(function(err) {
			next(err);
		});
});

app.use(function(req, res) {
	if (!res.finished) {
		res.status(404);
		res.json({
			code: 404,
			message: 'Resource not found.'
		});
	}
});

app.use(function(err, req, res, next) {
	let code = (err instanceof httpErrors.HttpError) ? err.status : 500;

	console.error(err);

	if (!res.finished) {
		res.status(code);
		res.json({
			code: code,
			message: (err instanceof httpErrors.HttpError) ? err.message : 'Internal server error.'
		});
	}
});


(async function() {
	try {
		let server = await new Promise(function(resolve, reject) {
			let server = app.listen(8080, 'localhost');

			server.once('listening', function() {
				resolve(server);
			});

			server.once('error', reject);
		});

		console.info('HTTP server listening.', server.address());

		return server;
	} catch(err) {
		console.error(err);

		process.exit(1);
	}
})();
