import { combineReducers } from 'redux';

import cart from './cart/reducer';
import profile from './profile/reducer';
import market from './market/reducer';

export default combineReducers({
	cart,
	profile,
	market,
});
