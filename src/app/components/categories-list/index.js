import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Category } from '../../routes';
import CustomLink from '../../hocs/customLink';
import './index.scss';

export default function CategoriesList({ categories }) {
	if (!categories.length) return null;

	const categoriestList = categories.map(category => (
		<Grid.Column key={category.title}>
			<CustomLink
				componentPromis={Category}
				className="category-item"
				to={`/c/${category.title}`}
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
