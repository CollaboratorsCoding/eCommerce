import React from 'react';

import Slider from 'react-slick';

import ProductCard from '../product-card';

export default function ProductsCarousel({ products, addToCart, loadingCart }) {
	const settings = {
		dots: false,
		infinite: true,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 1,

		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: [
			{
				breakpoint: 1124,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
				},
			},
			{
				breakpoint: 740,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 530,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
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
