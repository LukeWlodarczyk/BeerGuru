import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SimilarBeer = ({ name, image_url, id }) => (
  <Link to={`/${id}`} className="similarBeer">
    <img className="beer-thumbnail" src={image_url} alt={`${name}'s bottle'`} />
    <h4>{name}</h4>
  </Link>
);

SimilarBeer.propTypes = {
  name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default SimilarBeer;
