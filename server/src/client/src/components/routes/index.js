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
import ForgotPassword from '../forgotPassword/ForgotPassword';
import Navbar from '../customNavbar/CustomNavbar';
import Contect from '../contact/Contact';

import PasswordReset from '../passwordReset/PasswordReset';

import { AuthProvider } from '../../context/auth';

import AuthRoute from '../../utils/AuthRoute';

const Routes = () => (
    // This way every route has an access to Auth before doing actions
    <AuthProvider>
        <Router>

            <Navbar />

            <Switch>
                <Route exact path="/" render={props => <Home {...props} />}/>
                
                

                <Route  path='/forgot_password' component={ForgotPassword} />
                {/* <Route  path='/recover/passwd_reset/:token' component={PasswordReset}  /> */}
                <Route  path='/recover/passwd_reset/:token' render={props => <PasswordReset {...props} /> } />

                <Route path="/adminlayout" render={props => <Adminlayout {...props} />} />
                <Route path="/contact" render={props => <Contect {...props} />} />
                {/* <AuthRoute exact path="/adminlayout" render={props => <Adminlayout {...props} />} /> */}
                <AuthRoute exact path="/register" component={Register} />
                <AuthRoute exact path="/login" render={props => <Login {...props} />} />


            </Switch>

        </Router>   
    </AuthProvider>
)

export default Routes;