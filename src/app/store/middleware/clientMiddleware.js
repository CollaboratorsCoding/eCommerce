import MetaData from '../metadata/actions';

export default function clientMiddleware(client) {
	return ({ dispatch, getState }) => next => action => {
		if (typeof action === 'function') {
			return action(dispatch, getState);
		}

		const { promise, types, metaData, ...rest } = action; // eslint-disable-line no-redeclare
		if (!promise) {
			return next(action);
		}

		const generatedTypes =
			types.length === 1
				? [types[0], `${types[0]}_SUCCESS`, `${types[0]}_FAILURE`]
				: types;

		const [REQUEST, SUCCESS, FAILURE] = generatedTypes;
		next({ ...rest, type: REQUEST });

		const actionPromise = promise(client);

		actionPromise
			.then(
				result => {
					if (metaData) {
						MetaData(dispatch, result.metaData);
					}
					return next({ ...rest, result, type: SUCCESS });
				},
				error => {
					if (metaData) {
						MetaData(dispatch, error.metaData);
					}
					return next({ ...rest, error, type: FAILURE });
				}
			)
			.catch(error => {
				console.error('MIDDLEWARE ERROR:', error);
				next({ ...rest, error, type: FAILURE });
			});

		return actionPromise;
	};
}
