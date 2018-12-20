import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import rootReducer from './rootReducer';
import { isServer } from '../utils';

// A nice helper to tell us if we're on the server

export default (url = '/') => {
	// Create a history depending on the environment

	const history = isServer()
		? createMemoryHistory({
				initialEntries: [url],
		  })
		: createBrowserHistory();

	const enhancers = [];

	// Dev tools are helpful
	if (process.env.NODE_ENV === 'development' && !isServer) {
		const devToolsExtension = window.devToolsExtension;

		if (typeof devToolsExtension === 'function') {
			enhancers.push(devToolsExtension());
		}
	}

	const middleware = [thunk, routerMiddleware(history)];
	const composedEnhancers = compose(
		applyMiddleware(...middleware),
		...enhancers
	);

	// Do we have preloaded state available? Great, save it.

	const initialState =
		typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : {};

	// Delete it once we have it stored in a variable
	if (typeof window !== 'undefined') {
		delete window.__PRELOADED_STATE__;
	}

	// Create the store
	const store = createStore(
		connectRouter(history)(rootReducer),
		initialState,
		composedEnhancers
	);

	if (process.env.NODE_ENV !== 'production') {
		if (module.hot) {
			module.hot.accept('../store/', () => {
				store.replaceReducer(rootReducer);
			});
		}
	}
	return {
		store,
		history,
	};
};
