import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Page from '../../components/page';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';

const { getProduct, addToCartProduct } = MarketActions;

const frontload = async props =>
	await props.getProduct(props.match.params.slug_product);
export class Category extends Component {
	componentDidMount = () => {
		console.log('COMPONENT', this.props.product);
	};

	render() {
		const { product, addToCart } = this.props;
		if (!product) return null;
		const { description, imagePath, price, title } = product;
		return (
			<Page
				id="product"
				title={title}
				description={description}
				image={imagePath}
			>
				<div>
					<h1>{title}</h1>
					<div>Price: {price}</div>
					<Button
						onClick={() => {
							addToCart(product._id);
						}}
						basic
						color="green"
					>
						Add to Cart
					</Button>
					<img src={imagePath} alt={title} />
					<div>{description}</div>
				</div>
			</Page>
		);
	}
}
const mapStateToProps = state => ({
	product: state.market.product,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getProduct, addToCart: addToCartProduct }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(Category)
);
