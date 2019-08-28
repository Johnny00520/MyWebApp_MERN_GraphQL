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
import Adminlayout from '../adminlayout/Adminlayout';

import Navbar from '../customNavbar/CustomNavbar';

// import { Container } from "semantic-ui-react";

const Routes = () => (
    <Router>
        {/* <Container> */}

            <Navbar />

            <Switch>
                <Route exact path="/" render={props => <Home {...props} />}/>
                <Route path="/register" render={props => <Register  {...props} />} />
                <Route path="/login" render={props => <Login {...props} />} />
                <Route path="/adminlayout" render={props => <Adminlayout {...props} />} />

            </Switch>
        {/* </Container> */}
        
    </Router>   
)

export default Routes;