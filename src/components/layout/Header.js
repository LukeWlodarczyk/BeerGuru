import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="header">
			<Link className="link logo" to="/">
				<span>BEER</span>GURU
			</Link>
			<nav>
				<ul className="nav">
					<li>
						<Link className="link" to="/random">
							Random
						</Link>
					</li>
					<li>
						<Link className="link" to="/search">
							Search
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
