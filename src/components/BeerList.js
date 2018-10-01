import React from 'react';
import PropTypes from 'prop-types';

import BeerItem from './BeerItem';

const BeerList = ({ beerList }) => (
	<ul className="beer-list">
		{beerList.map(beer => (
			<li key={beer.id}>
				<BeerItem beer={beer} />
			</li>
		))}
	</ul>
);

BeerList.propTypes = {
	beerList: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			tagline: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			image_url: PropTypes.string.isRequired,
			food_pairing: PropTypes.arrayOf(PropTypes.string),
			ibu: PropTypes.number,
			abv: PropTypes.number,
		})
	).isRequired,
};

export default BeerList;
