import React from 'react';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontloadConnect } from '../../hocs/frontLoad';
import { Category } from '../../routes';
import CustomLink from '../../hocs/customLink';
import './index.scss';
import MarketActions from '../../store/market/actions';

const { getCategories } = MarketActions;

const frontload = async ({ handleGetCategories, categories }) => {
	if (!_.size(categories) || _.size(categories) === 1) {
		return await handleGetCategories();
	}
	return null;
};
const CategoriesList = ({ categories, loading, className }) => {
	if (loading) return 'Loading Categories';
	if (!_.size(categories)) return null;
	const categoriesArr = _.values(categories);

	const categoriestList = categoriesArr.map(category => (
		<li className="categories-item-list" key={category.slug}>
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
	return (
		<ul className={`categories-wrapper ${className || ''}`}>
			{categoriestList}
		</ul>
	);
};

const mapStateToProps = state => ({
	categories: state.market.categories,
	loading: state.market.loading,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ handleGetCategories: getCategories }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(CategoriesList)
);
