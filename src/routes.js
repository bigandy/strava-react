// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import SingleRun from './components/SingleRun';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="*" component={SingleRun} />
  </Router>
);

export default Routes;
