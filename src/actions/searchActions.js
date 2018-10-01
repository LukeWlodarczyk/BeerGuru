import {
	SEARCH_BEERS_REQUESTED,
	SEARCH_BEERS_DONE,
	SEARCH_BEERS_FAILED,
} from './types';

export const searchBeerRequested = () => {
	return {
		type: SEARCH_BEERS_REQUESTED,
	};
};

export const searchBeerDone = beers => {
	return {
		type: SEARCH_BEERS_DONE,
		payload: beers,
	};
};

export const searchBeerFailed = () => {
	return {
		type: SEARCH_BEERS_FAILED,
	};
};
