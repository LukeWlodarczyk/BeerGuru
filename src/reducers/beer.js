import {
  GET_BEER_REQUESTED,
  GET_BEER_DONE,
  GET_BEER_FAILED,
  GET_BEER_SIMILARS_REQUESTED,
  GET_BEER_SIMILARS_DONE,
  GET_BEER_SIMILARS_FAILED
} from "../actions/types";

const initialState = {
  isLoading: false,
  isError: false,
  beer: {},
  similarBeers: {
    originalBeerId: -1,
    similars: [],
    isLoading: false,
    isError: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BEER_REQUESTED:
      return {
        ...state,
        similarBeers: { ...state.similarBeers },
        isLoading: true,
        isError: false
      };
    case GET_BEER_DONE:
      return {
        ...state,
        similarBeers: { ...state.similarBeers },
        isLoading: false,
        beer: action.payload
      };
    case GET_BEER_FAILED:
      return {
        ...state,
        similarBeers: { ...state.similarBeers },
        isLoading: false,
        isError: true
      };

    case GET_BEER_SIMILARS_REQUESTED:
      return {
        ...state,
        similarBeers: {
          ...state.similarBeers,
          isLoading: true,
          isError: false
        }
      };
    case GET_BEER_SIMILARS_DONE:
      return {
        ...state,
        similarBeers: {
          ...state.similarBeers,
          isLoading: false,
          originalBeerId: action.payload.originalBeerId,
          similars: [...action.payload.similars]
        }
      };
    case GET_BEER_SIMILARS_FAILED:
      return {
        ...state,
        similarBeers: {
          ...state.similarBeers,
          isLoading: false,
          isError: true
        }
      };
    default:
      return state;
  }
};
