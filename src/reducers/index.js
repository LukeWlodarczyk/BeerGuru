import { combineReducers } from 'redux';

import beers from './beers';
import beer from './beer';
import searchedBeers from './searchedBeers';

export default combineReducers({
	beers,
	beer,
	searchedBeers,
});
