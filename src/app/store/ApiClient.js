import superagent from 'superagent';
import { isServer } from '../utils';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path, req) {
	const adjustedPath = path[0] !== '/' ? `/${path}` : path;
	if (isServer) {
		// Prepend host and port of the API server to the path.
		return `http://${req.hostname}:3000/api${adjustedPath}`;
	}
	// Prepend `/api` to relative URL, to proxy to API server.
	return `/api${adjustedPath}`;
}

export default class ApiClient {
	constructor(req) {
		methods.forEach(
			/* eslint-disable-next-line */
			method =>
				(this[method] = (path, { params, data } = {}) =>
					new Promise((resolve, reject) => {
						const request = superagent[method](
							formatUrl(path, req)
						);

						if (params) {
							request.query(params);
						}

						if (isServer && req.get('cookie')) {
							request.set('cookie', req.get('cookie'));
						}

						if (data) {
							request.send(data);
						}

						request.end((err, { body } = {}) =>
							err ? reject(body || err) : resolve(body)
						);
					}))
		);
	}
}
