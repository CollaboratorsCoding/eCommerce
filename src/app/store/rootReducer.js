import { combineReducers } from 'redux';

import profile from './profile/reducer';
import market from './market/reducer';
import metadata from './metadata/reducer';

export default combineReducers({
	profile,
	market,
	metadata,
});
