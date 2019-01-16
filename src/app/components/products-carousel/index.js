import React from 'react';

import Slider from 'react-slick';

import ProductCard from '../product-card';

export default function ProductsCarousel({ products, addToCart, loadingCart }) {
	const settings = {
		dots: false,
		infinite: true,
		arrows: false,
		slidesToShow: 5,
		slidesToScroll: 1,

		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 4000,
	};
	const slider = (
		<Slider {...settings}>
			{products.map(product => (
				<ProductCard
					key={product._id}
					product={product}
					addToCart={addToCart}
					loadingCart={loadingCart}
				/>
			))}
		</Slider>
	);
	return slider;
}
