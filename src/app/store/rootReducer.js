import { combineReducers } from 'redux';

import profile from './profile/reducer';
import market from './market/reducer';

export default combineReducers({
	profile,
	market,
});
