import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { frontloadConnect } from '../../hocs/frontLoad';
import ProductActions from '../../store/product/actions';

const { getProducts } = ProductActions;

const frontload = async props =>
	await props.getProducts(props.match.params.slug);
export class Category extends Component {
	componentDidMount = () => {
		console.log('COMPONENT', this.props.products);
	};

	render() {
		return (
			<div>
				{this.props.match.params.slug} Category
				<Grid stackable columns={3}>
					{this.props.products.length &&
						this.props.products.map(product => (
							<Grid.Column key={product.title}>
								<Segment>{product.title}</Segment>
							</Grid.Column>
						))}
				</Grid>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	products: state.product.products,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getProducts }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(Category)
);
