import { combineReducers } from 'redux';

import cart from './cart/reducer';
import profile from './profile/reducer';
import product from './product/reducer';

export default combineReducers({
	cart,
	profile,
	product,
});
