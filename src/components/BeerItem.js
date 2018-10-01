import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BeerItem = ({ beer }) => (
	<Link className="link beer-card" to={`/${beer.id}`}>
		<img
			className="img-beer"
			src={beer.image_url}
			alt={`${beer.name}'s bottle`}
		/>
		<div className="beer-details">
			<h1 className="beer-heading">{beer.name}</h1>
			<p className="beer-tagline">{beer.tagline}</p>
		</div>
	</Link>
);

BeerItem.propTypes = {
	beer: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		image_url: PropTypes.string.isRequired,
	}).isRequired,
};

export default BeerItem;
