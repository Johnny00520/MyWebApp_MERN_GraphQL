import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from '../home/Home';
import Register from '../register/Register';
import Login from '../login/Login';
import Adminlayout from '../adminlayout/Adminlayout';

import Navbar from '../customNavbar/CustomNavbar';

import { AuthProvider } from '../../context/auth';

import AuthRoute from '../../utils/AuthRoute';

const Routes = () => (
    // This way every route has an access to Auth before doing actions
    <AuthProvider>
        <Router>

            <Navbar />

            <Switch>
                <Route exact path="/" render={props => <Home {...props} />}/>

                {/* <Route path="/register" render={props => <Register  {...props} />} /> */}
                {/* <Route path="/login" render={props => <Login {...props} />} /> */}
                {/* <Route path="/adminlayout" render={props => <Adminlayout {...props} />} /> */}

                <Route path="/adminlayout" render={props => <Adminlayout {...props} />} />
                <AuthRoute path="/register" render={props => <Register  {...props} />} />
                <AuthRoute path="/login" render={props => <Login {...props} />} />

            </Switch>

        </Router>   
    </AuthProvider>
)

export default Routes;