import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import chartsReducer from './charts';
import currenciesReducer from './currencies';

export default combineReducers({
    routing: routerReducer,
    charts: chartsReducer,
    currencies: currenciesReducer
});
