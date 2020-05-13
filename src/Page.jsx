import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'; // BrowserRouter

import App from './App';
import AddUser from './containers/AddUser';
// import NoFind from './containers/NoFind';

export default props => {
  return (
    <HashRouter>
      <Switch>
        {/* <Route exact path="/404" component={NoFind} /> */}
        <Route exact path="/user/addUser" component={AddUser} />
        <Route path="/" component={App} />
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
  );
};
