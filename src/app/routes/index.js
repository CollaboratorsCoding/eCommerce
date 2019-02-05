import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import NotFound from './not-found';
import Authenticated from '../components/authenticated';
import Unauthenticated from '../components/unauthenticated';

export const Homepage = Loadable({
	loader: () => import(/* webpackChunkName: "homepage" */ './homepage'),
	loading: () => null,
	modules: ['homepage'],
});

export const About = Loadable({
	loader: () => import(/* webpackChunkName: "about" */ './about'),
	loading: () => null,
	modules: ['about'],
});

export const Authentication = Loadable({
	loader: () =>
		import(/* webpackChunkName: "authentication" */ './authentication'),
	loading: () => null,
	modules: ['authentication'],
});

export const Category = Loadable({
	loader: () => import(/* webpackChunkName: "c" */ './category'),
	loading: () => null,
	modules: ['c'],
});
export const Product = Loadable({
	loader: () => import(/* webpackChunkName: "p" */ './product'),
	loading: () => null,
	modules: ['p'],
});

export const Cart = Loadable({
	loader: () => import(/* webpackChunkName: "cart" */ './shopping-cart'),
	loading: () => null,
	modules: ['cart'],
});

export const OrderHistory = Loadable({
	loader: () =>
		import(/* webpackChunkName: "orders-history" */ './orders-history'),
	loading: () => null,
	modules: ['orders-history'],
});

export default () => (
	<Switch>
		<Route exact path="/" component={Homepage} />
		<Route exact path="/about" component={About} />
		<Authenticated exact path="/orders-history" component={OrderHistory} />
		<Route exact path="/c/:slug_category/" component={Category} />
		<Route exact path="/p/:slug_product" component={Product} />
		<Unauthenticated
			exact
			path="/authentication"
			component={Authentication}
		/>
		<Route exact path="/cart" component={Cart} />

		<Route component={NotFound} />
	</Switch>
);
