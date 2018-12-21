import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { ConnectedRouter } from 'connected-react-router';
import { Frontload } from './app/hocs/frontLoad';
import createStore from './app/store';

import App from './app/app';

import './index.scss';

// Create a store and get back itself and its history object
const { store, history } = createStore();

// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here
const Application = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Frontload>
				<App />
			</Frontload>
		</ConnectedRouter>
	</Provider>
);

const root = document.querySelector('#root');

if (root.hasChildNodes() === true) {
	// If it's an SSR, we use hydrate to get fast page loads by just
	// attaching event listeners after the initial render
	Loadable.preloadReady().then(() => {
		hydrate(Application, root);
	});
} else {
	// If we're not running on the server, just render like normal
	render(Application, root);
}

if (module.hot) {
	module.hot.accept('./app/app.js', () => {
		const NextApp = require('./app/app.js').default;
		render(NextApp);
	});
}
