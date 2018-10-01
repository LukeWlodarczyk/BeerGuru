import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import Spinner from "../components/common/Spinner";

import { Portal } from "../components/common/Portal";
import BeerList from "../components/BeerList";
import BeerDetails from "../components/BeerDetails";

import { getBeers, getBeerById } from "../actions/index";

class HomeSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    const { getBeers } = this.props;
    !this.props.beerList.length && getBeers(1);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  shouldLoadMore = () =>
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    !this.props.isLoadingBeers &&
    !this.props.isErrorBeers &&
    this.state.page < 13;

  loadMore = () => {
    const { getBeers } = this.props;

    this.setState(
      ({ page }) => ({
        page: page + 1
      }),
      () => getBeers(this.state.page)
    );
  };

  onScroll = () => this.shouldLoadMore() && this.loadMore();

  render() {
    const {
      beerList,
      isErrorBeers,
      isLoadingBeers,
      beer,
      beerSimilars,
      isErrorBeer,
      isLoadingBeer,
      match,
      history
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>BeerGuru - Beers from all over the word!</title>
        </Helmet>
        {match.params.id && (
          <Portal history={history}>
            <BeerDetails
              getBeerById={this.props.getBeerById}
              beerIdParam={match.params.id}
              history={history}
              beerData={{
                beer,
                beerSimilars,
                isError: isErrorBeer,
                isLoading: isLoadingBeer
              }}
            />
          </Portal>
        )}
        <BeerList beerList={beerList} />
        {isLoadingBeers && <Spinner />}
        {isErrorBeers && (
          <button className="btn-more" onClick={this.loadMore}>
            Ooops! Try again
          </button>
        )}
      </div>
    );
  }
}

HomeSite.propTypes = {
  beerList: PropTypes.array.isRequired,
  isErrorBeers: PropTypes.bool.isRequired,
  isLoadingBeers: PropTypes.bool.isRequired,
  beer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    food_pairing: PropTypes.arrayOf(PropTypes.string),
    ibu: PropTypes.number.isRequired,
    abv: PropTypes.number.isRequired
  }),
  beerSimilars: PropTypes.shape({
    originalBeerId: PropTypes.number.isRequired,
    similars: PropTypes.array.isRequired
  }),
  isErrorBeer: PropTypes.bool,
  isLoadingBeer: PropTypes.bool,
  getBeers: PropTypes.func.isRequired,
  getBeerById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  beerList: state.beers.beers,
  isErrorBeers: state.beers.isError,
  isLoadingBeers: state.beers.isLoading,
  beer: state.beer.beer,
  beerSimilars: state.beer.similarBeers,
  isErrorBeer: state.beer.isError,
  isLoadingBeer: state.beer.isLoading
});

const Home = connect(
  mapStateToProps,
  { getBeers, getBeerById }
)(HomeSite);

const loadData = ({ dispatch }, { id }) =>
  Promise.all([
    dispatch(getBeers(1)),
    dispatch(getBeerById(id, { details: true, similars: true }))
  ]);

export default {
  component: Home,
  loadData
};
