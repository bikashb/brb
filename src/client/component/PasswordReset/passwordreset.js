import React, { Component } from 'react';
import {Link, withRouter}from 'react-router-dom';
import validator from 'validator';
import classNames from 'classnames';
import axios from 'axios';

import APIs from '../template/constants.js'


const styles={
  signupSvgStyle: {
    width:180,height:80,marginTop:10
  }
}

class PasswordReset extends Component {
    constructor() {
        super();
        this.state = {
          email: {value: '', isValid: true, message: ''},
          password: {value: '', isValid: true, message: ''}
        };
      }
    onChange = (e) => {
        var state = this.state;
        state[e.target.name].value = e.target.value;

        this.setState(state);
      }

      formIsValid = () => {
        var state = this.state;
        //var username = document.getElementsByName("username");
       if (validator.isEmpty(state.email.value)) {
          state.email.isValid = false;
          state.email.message = 'Please enter Register Email';
          this.setState(state);
          return false;
        }
        if (validator.isEmpty(state.password.value)) {
          state.password.isValid = false;
          state.password.message = 'Please enter new password';
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
    passReset = (e, value) => {
        e.preventDefault();
        this.resetValidationStates();
        var state = this.state;
        if (this.formIsValid()) {
               axios.post(APIs.UpdatePassword,{
                 "email":  this.state.email.value,
                 "password":  this.state.password.value
            }).then((response)=>{
              console.log(response.status);
              if (response.status == 200) {
                alert("Password Reset Succesfully");
                 this.props.history.push('/');
              }
            });
          }
      }
  render() {
     var {email,password} = this.state;
        var emailClass = classNames('form-group', {'has-error': !email.isValid});
        var passwordClass = classNames('form-group', {'has-error': !password.isValid});

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
                               <p>Password Reset</p>
                                <form role="form" onSubmit={this.passReset.bind(this)}>
                                     <div className={emailClass}>
                                     <input type="text" placeholder="Email"
                                      id="email"
                                      className="form-control"
                                      value={email.value}
                                    name="email"
                                    onChange={this.onChange} />
                                    <span className="help-block">{email.message}</span>
                                    </div>
                                    <div className={passwordClass}>
                                     <input type="password" placeholder="New password"
                                      id="password"
                                      className="form-control"
                                      value={password.value}
                                    name="password"
                                    onChange={this.onChange} />
                                    <span className="help-block">{password.message}</span>
                                    </div>
                                    <div className="form-actions">
                                        <button className="btn btn-login" >
                                         Submit</button>
                                    </div>
                                </form>
                          </div>
                      </div>
                  </section>
              </div>
             </div>
    );
  }
}


export default withRouter(PasswordReset);
