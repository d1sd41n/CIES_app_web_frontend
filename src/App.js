import React, {useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
// core components
import Admin from "./layouts/Admin.jsx";
import Login from "./layouts/Login.jsx";
// core redux
import * as actions from './store/actions/actions';
//css
import "./assets/css/material-dashboard-react.css?v=1.7.0";


// routers
const hist = createBrowserHistory();

function App(props){

  useEffect(() => {
    props.onTryAutoSignup();
  });
  
  return (
    <Router history={hist}>
        {  props.isAuthenticated ? // if this.props.isAuthenticated is True 
          <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
          
           : // else
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/login" />
          </Switch>
        } 

    </Router>
    );
}


function mapStateToProps(state) { // this pass the items of the state we choose to the props of the components in connect function
  return {
    isAuthenticated: state.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);