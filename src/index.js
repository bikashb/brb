import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Switch from  'react-router-dom/Switch'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Login from './client/component/Login/login.js';
import forgotPassword from './client/component/forgotPassword/forgotpassword.js';
import PasswordReset from './client/component/PasswordReset/passwordreset.js';
import Signup from './client/component/Signup/signup.js';
import Home from './client/component/Home/home.js';
import './App.css';
import './fnt.css';
import './default.css';

ReactDOM.render (
	<HashRouter>
	  <Switch>
			<Route path='/signup' component={Signup} />
			<Route exact path='/' component={Login} />
			<Route path='/passwordreset' component={PasswordReset} />
			<Route path='/forgotpassword' component={forgotPassword} />
			<Route path='/home' component={Home} />
	  </Switch>
	</HashRouter>,
	document.getElementById('root')
);
