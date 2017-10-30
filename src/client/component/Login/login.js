import React, { Component } from 'react';
import {withRouter}from 'react-router-dom';
import classNames from 'classnames';
import validator from 'validator';
import axios from 'axios';
import APIs from '../template/constants.js'

class Login extends Component {
   constructor() {
        super();
        this.state = {
          username: {value: '', isValid: true, message: ''},
          password: {value: '', isValid: true, message: ''},
          confirmPassword: {value: '', isValid: true, message: ''},
          loginView: false,
          signupView: false,
          startView: true,
          viewHeader: false,
          instructor :[]
        };

      }
      componentWillMount(){
        console.log(APIs);
        if(localStorage.getItem("username") != null)/*Check user*/
        {
          this.props.history.push('/home');
        }
      }

 viewSignup(){
    this.props.history.push('/signup');
  }
  viewForgotPassword(){
    this.props.history.push('/forgotpassword');
  }
      onChange = (e) => {
        var state = this.state;
        state[e.target.name].value = e.target.value;

        this.setState(state);
      }

      formIsValid = () => {
        var state = this.state;
       if (validator.isEmpty(state.username.value)) {
          state.username.isValid = false;
          state.username.message = 'Please Enter Username';
          this.setState(state);
          return false;
        }
        if (validator.isEmpty(state.password.value)) {
          state.password.isValid = false;
          state.password.message = 'Please Enter Pasword!!!';
          this.setState(state);
          return false;
        }
        return true;
      }

      resetValidationStates = () => {
        var state = this.state;
        Object.keys(state).map(key => {
          if (state[key].hasOwnProperty('isValid')) {
            state[key].isValid = true;
            state[key].message = '';
          }
        });
        this.setState(state);
      }

      loginSubmit = (e, value) => {
        e.preventDefault();
        this.resetValidationStates();
         var state = this.state;
        if (this.formIsValid()) {
            axios.post(APIs.Signin,{
                "username": this.state.username.value,
                "password": this.state.password.value
            })
            .then((response)=>{
              if (response.status == 200) {
                localStorage.setItem('username',response.data.user.user_name);
                localStorage.setItem('id',response.data.user.id);
                this.props.history.push({
                  pathname: '/home',
                  state: {user: response.data.user}
                });
              }
            }).catch((error) => {
               console.log(error);
            });
        }
      }
  render () {
     var {username, password} = this.state;
        var usernameGroupClass = classNames('form-group', {'has-error': !username.isValid});
        var passwordGroupClass = classNames('form-group', {'has-error': !password.isValid});
    return (
        <div className="body_bg container-fluid">
               <div className="row posi_rel">
                  <section className="col-md-5 login_img bnr_img">
                  <img src="images/login_pic.png" alt="ResoltZ" />
            </section>
                  <section className="col-md-7">
                      <div className="col-md-6 col-xs-8 col-xs-offset-2">
                      <div className="login_panel_align"><img src="images/resoltz-bright-log-text.png" alt="ResoltZ" /></div>
                          <div className="login-box-plain">
                               <form role="form" onSubmit={this.loginSubmit.bind(this)} >
                                  <div className={usernameGroupClass}>
                                      <i className="fa fa-envelope-o fa-fw"></i>
                                      <input type="text" placeholder="Username"
                                          name="username"
                                          className="form-control"
                                          value={username.value}
                                          onChange={this.onChange} />
                                         <span className="help-block">{username.message}</span>
                                  </div>
                                  <div className={passwordGroupClass}>
                                      <i className="fa fa-key fa-fw"></i>
                                      <input type="password" placeholder="Password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={password.value}
                                        onChange={this.onChange} />
                                       <span className="help-block">{password.message}</span>
                                  </div>
                                  <div className="wid_100_per">
                                     <div>
                                      <ul className="loginbtnlinks">
                                          <li><input type="checkbox" /> Remember me </li>
                                          <li> <a onClick={this.viewSignup.bind(this)}>New user ?</a></li>
                                          <li><a onClick={this.viewForgotPassword.bind(this)}>Forgot password</a></li>
                                      </ul>
                                      </div>
                                  </div>
                                  <div className="form-actions">
                                      <button className="btn btn-login" >
                                       Next</button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </section>
              </div>
             </div>
    )
  }
}

export default withRouter(Login);
