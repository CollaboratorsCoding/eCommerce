import React from 'react';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { Category } from '../../routes';
import CustomLink from '../../hocs/customLink';
import './index.scss';

export default function CategoriesList({ categories }) {
	if (!_.size(categories)) return null;
	const categoriesArr = _.values(categories);

	const categoriestList = categoriesArr.map(category => (
		<li className="categories-item-list">
			<CustomLink
				componentPromise={Category}
				className="category-item"
				to={`/c/${category.slug}`}
			>
				<span className="left-text"> {category.title}</span>
				<span className="right-text">
					<Icon name="angle right" size="large" />
				</span>
			</CustomLink>
		</li>
	));
	return <ul className="categories-wrapper">{categoriestList}</ul>;
}
