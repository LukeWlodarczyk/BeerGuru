import App from './App';
import Home from './pages/Home';
import RandomBeer from './components/async/AsyncRandomBeer';
import SearchBeer from './components/async/AsyncSearchBeer';

export default [
	{
		...App,
		routes: [
			{
				...Home,
				exact: true,
				path: '/',
			},
			{
				...RandomBeer,
				path: '/random',
			},
			{
				...SearchBeer,
				path: '/search',
			},
			{
				...Home,
				exact: true,
				path: '/:id',
			},
		],
	},
];
