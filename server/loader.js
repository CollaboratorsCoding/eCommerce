// Express requirements
import fs from 'fs';
import path from 'path';

// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import Loadable from 'react-loadable';
import { Frontload, frontloadServerRender } from '../src/app/hocs/frontLoad';
import ApiClient from '../src/app/store/ApiClient';

// Our store, entrypoint, and manifest
import createStore from '../src/app/store';
import App from '../src/app/app';
import manifest from '../build/client/asset-manifest.json';

// Some optional Redux functions related to user authentication

// LOADER
export default (req, res) => {
	if (!req.session || !req.session.lastVisitedProducts) {
		req.session.lastVisitedProducts = [];
	}
	/*
    A simple helper function to prepare the HTML markup. This loads:
      - Page title
      - SEO meta tags
      - Preloaded state (for Redux) depending on the current route
      - Code-split script tags depending on the current route
  */

	const injectHTML = (
		data,
		{
			html,
			title,
			meta,
			body,
			css,
			scripts,
			state,
			connectExist,
			frontloadsCount,
		}
	) => {
		const frontLoad = JSON.stringify({
			connectExist,
			frontloadsCount,
		}).replace(/</g, '\\u003c');

		data = data.replace('<html>', `<html ${html}>`);
		data = data.replace(/<title>.*?<\/title>/g, title);
		data = data.replace('</head>', `${meta}${css}</head>`);
		data = data.replace(
			'<div id="root"></div>',
			`<div id="root">${body}</div><script>window.__CONNECTED_EXIST__ = ${frontLoad}; window.__PRELOADED_STATE__ = ${state}</script>`
		);
		data = data.replace('</body>', `${scripts.join('')}</body>`);

		return data;
	};

	// Load in our HTML file from our build
	fs.readFile(
		path.join(`${process.cwd()}/build/client/template.html`),
		'utf8',
		(err, htmlData) => {
			// If there's an error... serve up something nasty
			if (err) {
				console.error('Read error', err);

				return res.status(404).end();
			}
			const client = new ApiClient(req);
			// Create a store (with a memory history) from our current url
			const { store } = createStore(req.url, client);

			// If the user has a cookie (i.e. they're signed in) - set them as the current user
			// Otherwise, we want to set the current state to be logged out, just in case this isn't the default

			const context = {};
			const modules = [];

			/*
        Here's the core funtionality of this file. We do the following in specific order (inside-out):
          1. Load the <App /> component
          2. Inside of the Frontload HOC
          3. Inside of a Redux <StaticRouter /> (since we're on the server), given a location and context to write to
          4. Inside of the store provider
          5. Inside of the React Loadable HOC to make sure we have the right scripts depending on page
          6. Render all of this sexiness
          7. Make sure that when rendering Frontload knows to get all the appropriate preloaded requests

        In English, we basically need to know what page we're dealing with, and then load all the appropriate scripts and
        data for that page. We take all that information and compute the appropriate state to send to the user. This is
        then loaded into the correct components and sent as a Promise to be handled below.
      */
			return frontloadServerRender(() =>
				renderToString(
					<Loadable.Capture report={m => modules.push(m)}>
						<Provider store={store}>
							<StaticRouter location={req.url} context={context}>
								<Frontload isServer>
									<App />
								</Frontload>
							</StaticRouter>
						</Provider>
					</Loadable.Capture>
				)
			).then(({ routeMarkup, connectExist, frontloadsCount }) => {
				// Otherwise, we carry on...
				// Let's give ourself a function to load all our page-specific JS assets for code splitting

				if (context.url) {
					return res.redirect(302, context.url);
				}
				const extractAssets = (assets, chunks) =>
					Object.keys(assets)
						.filter(
							asset =>
								chunks.indexOf(asset.replace('.js', '')) > -1
						)
						.map(k => assets[k]);
				const extractAssetsCSS = (assets, chunks) =>
					Object.keys(assets)
						.filter(
							asset =>
								chunks.indexOf(asset.replace('.css', '')) > -1
						)
						.map(k => assets[k]);

				// Let's format those assets into pretty <script> tags
				const extraChunks = extractAssets(manifest, modules).map(
					c =>
						`<script type="text/javascript" src="/${c.replace(
							/^\//,
							''
						)}"></script>`
				);
				const cssChunks = extractAssetsCSS(manifest, modules).map(
					c =>
						`<link rel="stylesheet" href="/${c.replace(
							/^\//,
							''
						)}"></link>`
				);

				// We need to tell Helmet to compute the right meta tags, title, and such
				const helmet = Helmet.renderStatic();

				// NOTE: Disable if you desire
				// Let's output the title, just to see SSR is working as intended

				// Pass all this nonsense into our HTML formatting function above

				const html = injectHTML(htmlData, {
					html: helmet.htmlAttributes.toString(),
					title: helmet.title.toString(),
					meta: helmet.meta.toString(),
					body: routeMarkup,
					css: cssChunks,
					scripts: extraChunks,
					state: JSON.stringify(store.getState()).replace(
						/</g,
						'\\u003c'
					),
					connectExist,
					frontloadsCount,
				});

				// We have all the final HTML, let's send it to the user already!
				return res.send(html);
			});
		}
	);
};
