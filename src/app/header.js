import React from 'react';
import { Link } from 'react-router-dom';

const links = [
	{
		to: '/',
		text: 'Homepage',
	},
	{
		to: '/about',
		text: 'About',
	},
];

const isCurrent = (to, current) => {
	if (to === '/' && current === to) {
		return true;
	}
	if (to !== '/' && current.includes(to)) {
		return true;
	}

	return false;
};

const HeaderLink = ({ to, text, current }) => (
	<li className={isCurrent(to, current) ? 'current' : ''}>
		<Link to={to}>{text}</Link>
	</li>
);

export default ({ isAuthenticated, current }) => (
	<header id="header">
		<h1 id="title">My awesome website</h1>
		<ul id="links">
			{links.map(link => {
				const TheLink = (
					<HeaderLink key={link.text} current={current} {...link} />
				);

				if (Object.prototype.hasOwnProperty.call(link, 'auth')) {
					if (link.auth && isAuthenticated) {
						return TheLink;
					}
					if (!link.auth && !isAuthenticated) {
						return TheLink;
					}

					return null;
				}

				return TheLink;
			})}
		</ul>
	</header>
);
