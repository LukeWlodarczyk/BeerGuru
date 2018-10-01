import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import Spinner from "../components/common/Spinner";
import ErrorInfo from "../components/common/ErrorInfo";
import SimilarBeers from "./SimilarBeers";

class BeerDetails extends Component {
  componentDidMount() {
    const {
      getBeerById,
      beerIdParam,
      beerData: { isLoading, beer, beerSimilars }
    } = this.props;

    !isLoading && beer
      ? beer.id !== parseInt(beerIdParam, 10)
        ? getBeerById(beerIdParam, { details: true, similars: true })
        : beer.id !== beerSimilars.originalBeerId &&
          getBeerById(beerIdParam, { details: false, similars: true }, beer)
      : getBeerById(beerIdParam, { details: true, similars: true });
  }

  componentDidUpdate(prevProps) {
    if (this.props.beerIdParam !== prevProps.beerIdParam) {
      this.props.getBeerById(this.props.beerIdParam, {
        details: true,
        similars: true
      });
    }
  }

  closeModal = e => {
    e.target.dataset.close && this.props.history.push("/");
  };

  render() {
    const {
      beerData: { beer, isError, isLoading, beerSimilars }
    } = this.props;

    if (isError) {
      return (
        <div className="modal">
          <ErrorInfo />
        </div>
      );
    }

    return (
      <div data-close={true} className="modal" onClick={this.closeModal}>
        <Helmet>
          <title>
            {beer.name} - {beer.tagline}
          </title>
        </Helmet>
        <div className="beer-item-full">
          <button
            data-close={true}
            className="btn-close"
            onClick={this.closeModal}
          >
            +
          </button>

          {isLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              <div className="beer-item-full-main">
                <img
                  className="beer-img-full"
                  src={beer.image_url}
                  alt={`${beer.name}'s bottle`}
                />
                <div className="beer-full-details">
                  <h1 className="beer-name">{beer.name}</h1>
                  <p className="beer-tagline">{beer.tagline}</p>
                  <div className="props">
                    {beer.ibu && (
                      <p className="props-item">
                        <span>IBU:</span> {beer.ibu}
                      </p>
                    )}
                    {beer.abv && (
                      <p className="props-item">
                        <span>ABV:</span> {beer.abv}%
                      </p>
                    )}
                    {beer.ebc && (
                      <p className="props-item">
                        <span>EBC:</span> {beer.ebc}
                      </p>
                    )}
                  </div>
                  <p className="beer-description">{beer.description}</p>
                  {beer.food_pairing &&
                    beer.food_pairing.length && (
                      <div className="food-pairing">
                        <h2>Best served with:</h2>
                        <ul className="food-pairing-list">
                          {beer.food_pairing.map((f, i) => (
                            <li className="food-pairing-item" key={i}>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
              <div className="similars">
                <h3 className="similars-heading">You might also like:</h3>
                <SimilarBeers similarBeers={beerSimilars} />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

BeerDetails.propTypes = {
  beerData: PropTypes.shape({
    beer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      food_pairing: PropTypes.arrayOf(PropTypes.string),
      ibu: PropTypes.number.isRequired,
      abv: PropTypes.number.isRequired
    }),
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    beerSimilars: PropTypes.obj
  }).isRequired,
  getBeerById: PropTypes.func.isRequired,
  beerIdParam: PropTypes.string.isRequired
};

export default BeerDetails;
