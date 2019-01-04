import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import _ from 'lodash';
import { Category } from '../../routes';
import CustomLink from '../../hocs/customLink';
import './index.scss';

export default function CategoriesList({ categories }) {
	if (!_.size(categories)) return null;
	const categoriesArr = _.values(categories);

	const categoriestList = categoriesArr.map(category => (
		<Grid.Column key={category.title}>
			<CustomLink
				componentPromise={Category}
				className="category-item"
				to={`/c/${category.slug}`}
			>
				<Segment>{category.title}</Segment>
			</CustomLink>
		</Grid.Column>
	));
	return (
		<Grid stackable columns={2}>
			{categoriestList}
		</Grid>
	);
}
