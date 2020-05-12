import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'; // BrowserRouter
import App from './App';
// import NoFind from './containers/NoFind';

export default props => {
  return (
    <HashRouter>
      <Switch>
        {/* <Route exact path="/404" component={NoFind} /> */}
        {/* <Route exact path="/login" component={Login} /> */}
        <Route path="/" component={App} />
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
  );
};
