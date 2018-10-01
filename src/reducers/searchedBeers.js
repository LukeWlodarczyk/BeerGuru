import {
	SEARCH_BEERS_REQUESTED,
	SEARCH_BEERS_DONE,
	SEARCH_BEERS_FAILED,
} from '../actions/types';

const initialState = {
	isLoading: false,
	isError: false,
	beers: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_BEERS_REQUESTED:
			return { ...state, isLoading: true, isError: false };
		case SEARCH_BEERS_DONE:
			return {
				...state,
				isLoading: false,
				beers: action.payload,
			};
		case SEARCH_BEERS_FAILED:
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
};
