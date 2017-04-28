import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import chartsReducer from './charts';

export default combineReducers({
    routing: routerReducer,
    charts: chartsReducer
});
