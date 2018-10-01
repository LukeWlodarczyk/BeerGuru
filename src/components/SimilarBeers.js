import React from "react";
import PropTypes from "prop-types";

import Spinner from "./common/Spinner";
import ErrorInfo from "./common/ErrorInfo";
import Beer from "./SimilarBeer";

const SimilarBeers = ({ similarBeers: { similars, isLoading, isError } }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorInfo />;
  }

  return (
    <ul className="beer-list-similars">
      {similars
        .filter(beer => beer)
        .map((beer, i) => <Beer key={i} {...beer} />)}
    </ul>
  );
};

SimilarBeers.propTypes = {
  similarBeers: PropTypes.shape({
    similars: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
  })
};

export default SimilarBeers;
