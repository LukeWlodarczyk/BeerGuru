import React from 'react';
import Loadable from 'react-loadable';
import Spinner from '../common/Spinner';

import { getBeerById } from '../../actions';

const AsyncRandomBeer = Loadable({
	loader: () => import('../../pages/RandomBeer'),
	loading: () => <Spinner />,
	modules: ['../pages/RandomBeer'],
});

const loadData = ({ dispatch }) =>
	dispatch(getBeerById('random', { details: true, similars: false }));

export default {
	component: AsyncRandomBeer,
	loadData,
};
