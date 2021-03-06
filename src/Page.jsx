import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'; // BrowserRouter

import App from './App';
import AddUser from './containers/AddUser';
import CarInfo from './containers/CarInfo';
import AddFamily from './containers/AddFamily';
import Record from './containers/Record';
import Member from './containers/Member';
import Binding from './containers/Binding';
import CheckHome from './containers/CheckHome';
import Modeling from './containers/Modeling';

// import NoFind from './containers/NoFind';

export default props => {
  return (
    <HashRouter>
      <Switch>
        {/* <Route exact path="/404" component={NoFind} /> */}
        <Route exact path="/user/addUser" component={AddUser} />
        <Route exact path="/user/record" component={Record} />
        <Route exact path="/user/carInfo" component={CarInfo} />
        <Route exact path="/user/addFamily" component={AddFamily} />
        <Route exact path="/user/member" component={Member} />
        <Route exact path="/user/binding" component={Binding} />
        <Route exact path="/user/CheckHome" component={CheckHome} />
        <Route exact path="/user/Modeling" component={Modeling} />
        <Route path="/" component={App} />
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
  );
};
