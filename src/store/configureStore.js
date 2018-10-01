import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(
	createStore
);

export default (initialState = {}) =>
	createStoreWithMiddleware(rootReducer, initialState);
