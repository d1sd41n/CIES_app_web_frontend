import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Login from "./layouts/Login.jsx";

// routers
const hist = createBrowserHistory();


function App() {
  return (
    <Router history={hist}>
        {/* {  props.isAuthenticated ? // if this.props.isAuthenticated is True 
          <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
          
           : // else */}
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/login" />
          </Switch>
        {/* }  */}

    </Router>
  );
}

export default App;
