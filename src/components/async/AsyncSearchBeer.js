import React from 'react';
import Loadable from 'react-loadable';
import Spinner from '../common/Spinner';

const AsyncSearchBeer = Loadable({
	loader: () => import('../../pages/SearchBeer'),
	loading: () => <Spinner />,
	modules: ['../../pages/SearchBeer'],
});

export default {
	component: AsyncSearchBeer,
};
