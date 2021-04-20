import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ConverterPage from './pages/ConverterPage';
import CurrencyPage from './pages/CurrencyPage';

export default () => (
  <Switch>
    <Route path="/converter" exact>
      <ConverterPage />
    </Route>
    <Route path="/currency" exact>
      <CurrencyPage />
    </Route>
    <Redirect to="/converter" />
  </Switch>
);
