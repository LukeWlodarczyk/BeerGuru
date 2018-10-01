import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import BeerList from '../components/BeerList';
import Spinner from '../components/common/Spinner';
import ErrorInfo from '../components/common/ErrorInfo';

import { searchBeer } from '../actions';

class SearchBeer extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
		};
		this.timeout = null;
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState(
			{
				[name]: value,
			},
			() => this.debounce(this.search, 300)
		);
	};

	debounce = (fn, time) => {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(fn, time);
	};

	search = () => {
		this.state.name.trim() !== '' && this.props.searchBeer(this.state.name);
	};

	render() {
		const { name } = this.state;
		const {
			searchedBeers: { beers, isLoading, isError },
		} = this.props;

		return (
			<div className="search-beer-container">
				<Helmet>
					<title>Find beer you like</title>
				</Helmet>
				<input
					className="search-beer-input"
					type="text"
					onChange={this.handleChange}
					name="name"
					placeholder="beer name..."
					value={name}
				/>
				<ul>
					{isError && <ErrorInfo />}
					{isLoading && <Spinner />}
					{!isError &&
						!isLoading &&
						beers.length !== 0 && <BeerList beerList={beers} />}
					{!isError && !isLoading && beers.length === 0 && <p>No beers listed...</p>}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = ({ searchedBeers }) => ({ searchedBeers });

SearchBeer.propTypes = {
	searchedBeers: PropTypes.shape({
		isError: PropTypes.bool.isRequired,
		isLoading: PropTypes.bool.isRequired,
		beers: PropTypes.array.isRequired,
	}),
};

export default connect(
	mapStateToProps,
	{ searchBeer }
)(SearchBeer);
