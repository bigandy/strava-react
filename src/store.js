import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// Import the route reducer
import rootReducer from './reducers/index';

import runs from './data/runs';
