import 'semantic-ui-css/semantic.min.css';
import 'rc-notification/assets/index.css';
import 'rc-slider/assets/index.css';
import 'rc-steps/assets/index.css';
import 'rc-table/assets/index.css';

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { ConnectedRouter } from 'connected-react-router';
import { Frontload } from './app/hocs/frontLoad';

import ApiClient from './app/store/ApiClient';
import createStore from './app/store';

import App from './app/app';

import './index.scss';

const client = new ApiClient();
// Create a store and get back itself and its history object
const { store, history } = createStore(undefined, client);

// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here

const root = document.querySelector('#root');
const renderApp = Component => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Frontload>
				<Component />
			</Frontload>
		</ConnectedRouter>
	</Provider>
);

Loadable.preloadReady().then(() => {
	hydrate(renderApp(App), root);
});

const isDev = process.env.NODE_ENV !== 'production';
if (isDev && module.hot) {
	module.hot.accept('./app/app.js', () => {
		const NextApp = require('./app/app.js').default;
		Loadable.preloadReady().then(() => {
			hydrate(renderApp(NextApp), root);
		});
	});
}
