import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Root from './containers/Root/Root';
import configureStore from './store/configureStore';

injectTapEventPlugin();

const initialState = {};
const target = document.getElementById('root');

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const node = (
    <MuiThemeProvider>
        <Root store={store} history={history} />
    </MuiThemeProvider>
);

ReactDOM.render(node, target);
