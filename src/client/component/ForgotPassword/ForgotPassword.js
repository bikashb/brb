import React, { Component } from 'react';
import {Link, withRouter}from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import classNames from 'classnames';
import APIs from '../template/constants.js';

const styles={
  signupSvgStyle: {
    width:180,height:80,marginTop:10
  }
}

export default class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
          email: {value: '', isValid: true, message: ''}
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
    forgotPassword = (e, value) => {
        e.preventDefault();
        this.resetValidationStates();
        var state = this.state;
        if (this.formIsValid()) {
               axios.post(APIs.ForgotPassword,{
                 "email":  this.state.email.value
            }).then((response)=>{
              console.log(response);
              if (response.status == 200) {
                alert("An email sent for password reset");
               }
            });
          }
      }
  render() {
     var {email} = this.state;
        var emailClass = classNames('form-group', {'has-error': !email.isValid});

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
                               <p>Please Enter Email Id</p>
                                <form role="form"  onSubmit={this.forgotPassword.bind(this)}>
                                     <div className={emailClass}>
                                     <input type="email" placeholder="Email"
                                      id="email"
                                      className="form-control"
                                      value={email.value}
                                    name="email"
                                    onChange={this.onChange} />
                                    <span className="help-block">{email.message}</span>
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
