import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
//   Redirect
} from 'react-router-dom'

import Home from '../home/Home';
import Register from '../register/Register';
import Login from '../login/Login';



const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" render={props => <Home {...props} />}/>
            <Route path="/register" render={props => <Register  {...props} />} />
            <Route path="/login" render={props => <Login {...props} />} />
        </Switch>
    </Router>   
)

export default Routes;