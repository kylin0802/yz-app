import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'; // BrowserRouter

import App from './App';
import AddUser from './containers/AddUser';
import Record from './containers/Record';
// import NoFind from './containers/NoFind';

export default props => {
  return (
    <HashRouter>
      <Switch>
        {/* <Route exact path="/404" component={NoFind} /> */}
        <Route exact path="/user/addUser" component={AddUser} />
        <Route exact path="/user/record" component={Record} />
        <Route path="/" component={App} />
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
  );
};
