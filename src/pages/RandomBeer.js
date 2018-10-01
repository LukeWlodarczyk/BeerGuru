import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import Spinner from "../components/common/Spinner";
import ErrorInfo from "../components/common/ErrorInfo";
import BeerItem from "../components/BeerItem";

import { getBeerById } from "../actions";

class RandomBeer extends Component {
  componentDidMount() {
    !Object.keys(this.props.beer.beer).length &&
      this.props.getBeerById("random", { details: true, similars: false });
  }

  getRandomBeer = () => {
    return this.props.getBeerById("random", { details: true, similars: false });
  };

  render() {
    const {
      beer: { beer, isLoading, isError }
    } = this.props;

    return (
      <div className="random-beer-container">
        <Helmet>
          <title>Random Beer - {beer.name}</title>
        </Helmet>
        <button className="btn-random" onClick={this.getRandomBeer}>
          Get Random Beer
        </button>
        {isError && <ErrorInfo />}
        {isLoading ? <Spinner /> : !isError && <BeerItem beer={beer} />}
      </div>
    );
  }
}

RandomBeer.propTypes = {
  beer: PropTypes.shape({
    beer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired
    }),
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  }).isRequired,
  getBeerById: PropTypes.func.isRequired
};

export const loadData = ({ dispatch }) =>
  dispatch(getBeerById("random", { details: true, similars: false }));

export default connect(
  ({ beer }) => ({ beer }),
  { getBeerById }
)(RandomBeer);
