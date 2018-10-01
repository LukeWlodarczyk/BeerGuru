import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';

import { appendUniversalPortals } from 'react-portal-universal/lib/server';

import Routes from '../../src/Routes';

import App from '../../src/App';

import manifest from '../../build/asset-manifest.json';

const extractAssets = (assets, chunks) =>
	Object.keys(assets)
		.filter(asset => chunks.includes(asset.replace('.js', '')))
		.map(k => assets[k]);

const path = require('path');
const fs = require('fs');

export default store => (req, res, next) => {
	const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

	fs.readFile(filePath, 'utf8', (err, htmlData) => {
		if (err) {
			console.error('err', err);
			return res.status(404).end();
		}

		const modules = [];

		const html = ReactDOMServer.renderToString(
			<Provider store={store}>
				<StaticRouter location={req.baseUrl}>
					<Loadable.Capture report={m => modules.push(m)}>
						<div>{renderRoutes(Routes)}</div>
					</Loadable.Capture>
				</StaticRouter>
			</Provider>
		);

		const reduxState = serialize(store.getState());

		const extraChunks = extractAssets(manifest, modules).map(
			c => `<script type="text/javascript" src="/${c}"></script>`
		);

		const helmet = Helmet.renderStatic();

		const template = htmlData
			.replace('<title></title>', `${helmet.title.toString()}`)
			.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
			.replace('__REDUX_STATE__={}', `__REDUX_STATE__=${reduxState}`)
			.replace('</body>', extraChunks.join('') + '</body>');

		const markup = appendUniversalPortals(template);

		return res.status(200).send(markup);
	});
};
