import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import AuthenticatedRoute from '../components/authenticated-route';
// import UnauthenticatedRoute from '../components/unauthenticated-route';
import Loadable from 'react-loadable';

import NotFound from './not-found';

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

export const AddProduct = Loadable({
	loader: () => import(/* webpackChunkName: "add" */ './add'),
	loading: () => null,
	modules: ['add'],
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

// const Dashboard = Loadable({
//   loader: () => import(/* webpackChunkName: "dashboard" */ './dashboard'),
//   loading: () => null,
//   modules: ['dashboard']
// });

// const Login = Loadable({
//   loader: () => import(/* webpackChunkName: "login" */ './login'),
//   loading: () => null,
//   modules: ['login']
// });

// const Logout = Loadable({
//   loader: () => import(/* webpackChunkName: "logout" */ './logout'),
//   loading: () => null,
//   modules: ['logout']
// });

// const Profile = Loadable({
//   loader: () => import(/* webpackChunkName: "profile" */ './profile'),
//   loading: () => null,
//   modules: ['profile']
// });

export default () => (
	<Switch>
		<Route exact path="/" component={Homepage} />
		<Route exact path="/about" component={About} />
		<Route exact path="/add" component={AddProduct} />
		<Route exact path="/c/:slug_category/" component={Category} />
		<Route exact path="/p/:slug_product" component={Product} />

		<Route exact path="/cart" component={Cart} />

		{/* <Route exact path="/profile/:id" component={Profile} /> */}

		{/* <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />

    <UnauthenticatedRoute exact path="/login" component={Login} />
    <AuthenticatedRoute exact path="/logout" component={Logout} /> */}

		<Route component={NotFound} />
	</Switch>
);
