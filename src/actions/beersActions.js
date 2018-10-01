import { GET_BEERS_REQUESTED, GET_BEERS_DONE, GET_BEERS_FAILED } from './types';

export const getBeersRequested = () => {
	return {
		type: GET_BEERS_REQUESTED,
	};
};

export const getBeersDone = data => {
	return {
		type: GET_BEERS_DONE,
		payload: data,
	};
};

export const getBeersFailed = () => {
	return {
		type: GET_BEERS_FAILED,
	};
};
