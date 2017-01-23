// src/routes.js
import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './components/App';
import SingleRun from './components/SingleRun';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={ App } />
        <Match pattern="/activities/:runId" component={ SingleRun } />
        <Miss component={ NotFound } />
      </div>
    </BrowserRouter>
);

export default Routes;
