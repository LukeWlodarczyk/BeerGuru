import axios from 'axios';

import {
	getBeerRequested,
	getBeerDone,
	getBeerFailed,
	getBeerSimilarsRequested,
	getBeerSimilarsDone,
	getBeerSimilarsFailed,
} from './beerActions';
import {
	getBeersRequested,
	getBeersDone,
	getBeersFailed,
} from './beersActions';
import {
	searchBeerRequested,
	searchBeerDone,
	searchBeerFailed,
} from './searchActions';

import randomBetween from '../helpers/getRandomBetween';

const base = 'https://api.punkapi.com/v2/beers';

export const getBeers = page => dispatch => {
	dispatch(getBeersRequested());

	return axios
		.get(`${base}?page=${page}&per_page=20`)
		.then(res => res.data)
		.then(data => {
			dispatch(getBeersDone(data));
		})
		.catch(error => {
			dispatch(getBeersFailed(error));
		});
};

export const getBeerById = (
	id,
	{ details, similars },
	fetchedBeer
) => async dispatch => {
	let beer = fetchedBeer;

	try {
		if (details) {
			dispatch(getBeerRequested());

			beer = await axios.get(`${base}/${id}`).then(res => res.data[0]);

			dispatch(getBeerDone(beer));
		}

		if (similars) {
			dispatch(getBeerSimilarsRequested());

			const { ibu, abv, ebc } = beer;

			const ibuParsed = parseInt(ibu, 10) || 0;

			const similarBeerIBUPromise = axios
				.get(
					`${base}?ibu_gt=${Math.max(0, ibuParsed - 5)}&ibu_lt=${ibuParsed + 5}`
				)
				.then(res => res.data[randomBetween(0, res.data.length)]);

			const abvParsed = parseInt(abv, 10) || 0;

			const similarBeerABVPromise = axios
				.get(
					`${base}?abv_gt=${Math.max(0, abvParsed - 2)}&abv_lt=${abvParsed + 2}`
				)
				.then(res => res.data[randomBetween(0, res.data.length)]);

			const ebcParsed = parseInt(ebc, 10) || 0;

			const similarBeerEBCPromise = axios
				.get(
					`${base}?ebc_gt=${Math.max(0, ebcParsed - 6)}&ebc_lt=${ebcParsed + 6}`
				)
				.then(res => res.data[randomBetween(0, res.data.length)]);

			const similarBeers = await Promise.all([
				similarBeerIBUPromise,
				similarBeerABVPromise,
				similarBeerEBCPromise,
			]).catch(err => dispatch(getBeerSimilarsFailed(err)));

			dispatch(
				getBeerSimilarsDone({
					originalBeerId: beer.id,
					similars: similarBeers,
				})
			);
		}
	} catch (error) {
		dispatch(getBeerFailed(error));
	}
};

export const searchBeer = name => dispatch => {
	dispatch(searchBeerRequested());

	return axios
		.get(`${base}/?beer_name=${name}`)
		.then(res => res.data)
		.then(beers => {
			dispatch(searchBeerDone(beers));
		})
		.catch(err => dispatch(searchBeerFailed(err)));
};
