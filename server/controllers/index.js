import express from 'express';
import { matchRoutes } from 'react-router-config';

import serverRenderer from '../helpers/renderer';
import configureStore from '../../src/store/configureStore';
import Routes from '../../src/Routes';

const router = express.Router();
const path = require('path');

const actionIndex = async (req, res, next) => {
	const store = configureStore();

	const promises = matchRoutes(Routes, req.baseUrl || '/')
		.map(({ route: { loadData } }) => {
			return loadData ? loadData(store, req.params) : null;
		})
		.map(promise => {
			if (promise) {
				return new Promise((resolve, reject) => {
					promise.then(resolve).catch(resolve);
				});
			}
		});

	await Promise.all(promises);

	serverRenderer(store)(req, res, next);
};

router.use('/search', actionIndex);
router.use('/random', actionIndex);
router.use('^/$', actionIndex);

router.use(
	express.static(path.resolve(__dirname, '..', '..', 'build'), {
		maxAge: '30d',
	})
);

router.use('/:id', actionIndex);

export default router;
