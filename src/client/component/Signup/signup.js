import React, { Component } from 'react';
import {Link, withRouter}from 'react-router-dom';
import './signup.css';
import validator from 'validator';
import axios from 'axios';
import APIs from '../template/constants.js'
import classNames from 'classnames';

const styles={
  signupSvgStyle: {
    width:180,height:80,marginTop:10
  }
}

class Signup extends Component {
   constructor() {
        super();
        this.state = {
          name: {value: '', isValid: true, message: ''},
          username: {value: '', isValid: true, message: ''},
          email: {value: '', isValid: true, message: ''},
           type: {value: '', isValid: true, message: ''},
          password: {value: '', isValid: true, message: ''}
        };
      }
      componentWillMount(){
        if(localStorage.getItem("username") != null)/*Check user*/
        {
          this.props.history.push('/home');
        }
      }
      onChange = (e) => {
        var state = this.state;
        state[e.target.name].value = e.target.value;
        this.setState(state);
      }
      formIsValid = () => {
        var state = this.state;

        if (validator.isEmpty(state.name.value)) {
          state.name.isValid = false;
          state.name.message = 'Please Enter Name';
          this.setState(state);
          return false;
        }
        if (validator.isEmpty(state.username.value)) {
          state.username.isValid = false;
          state.username.message = 'Please Enter Username';
          this.setState(state);
          return false;
        }
        if (!validator.isEmail(state.email.value)) {
          state.email.isValid = false;
          state.email.message = 'Please enter valid email';
          this.setState(state);
          return false;
        }
        if (validator.isEmpty(state.password.value)) {
          state.password.isValid = false;
          state.password.message = 'Please Enter Password';
          this.setState(state);
          return false;
        }
        if(validator.isEmpty(state.type.value)) {
            state.type.isValid = false;
            state.type.message = 'Please select user type';
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

      signUpSubmit = (e,value) => {
        e.preventDefault();
        this.resetValidationStates();
        var state = this.state;
        if (this.formIsValid()) {
           console.log(this.state.type.value);
            axios.post(APIs.Signup,{
                "name":  this.state.name.value,
                "username": this.state.username.value,
                "email":  this.state.email.value,
                "type":  this.state.type.value,
                "password":  this.state.password.value
            }).then((response)=>{
              console.log(response.data);
              if(response.data.message == "success"){
                  axios.post(APIs.ValidateEmail,{
                     "email":  this.state.email.value
                  }).then((response)=>{
                    if (response.status == 200) {
                      alert("user create successfully");
                      this.props.history.push('/');
                    }
                  });
               }
            });
        }
      }


  render() {
        var {name,username,email,password,type} = this.state;
        var nameClass = classNames('form-group', {'has-error': !name.isValid});
        var usernameGroupClass = classNames('form-group', {'has-error': !username.isValid});
        var emailGroupClass = classNames('form-group', {'has-error': !email.isValid});
        var typeGroupClass = classNames('form-group', {'has-error': !type.isValid});
        var passwordGroupClass = classNames('form-group', {'has-error': !password.isValid});

    return (
          <div className="body_bg container-fluid">
            <div className="row posi_rel">
                {/*<div className="logo_align_login"><img src="images/logo.png" alt="Wipro" /> </div>*/}
                <section className="col-md-6 signupimg_mas">
                    <div className="signup_img">
                        <div className="headerBlk">
                            <h1>Lorum Ipsum</h1>
                            <h2>Lorem ipsum dolor sit</h2>
                            <p>Lorem ipsum dolor sit amet dignissim nibh, accumsan et vulputate consequat</p>
                        </div>
                        <div className="btm_bg1">
                            <ul>
                                <li>
                                    <h3>Lorem ipsum</h3>
                                    <p>Lorem ipsum dolor sit amet, dignissim nibh, accumsan et vulputate consequat</p>
                                </li>
                                <li>
                                    <h3>Lorem ipsum</h3>
                                    <p>Lorem ipsum dolor sit amet, dignissim nibh, accumsan et vulputate consequat</p>
                                </li>
                                <li>
                                    <h3>Lorem ipsum</h3>
                                    <p>Lorem ipsum dolor sit amet, dignissim nibh, accumsan et vulputate consequat</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </section>
                <section className="col-md-6">
                    <div className="col-md-6 col-xs-8 col-xs-offset-2">
                       <div className="login_panel_align"><img src="images/resoltz-bright-log-text.png" alt="ResoltZ" /></div>
                        <div className="signup-box-plain">
                            <form role="form" onSubmit={this.signUpSubmit.bind(this)}>
                                <div className={nameClass}>
                                   <input type="text" placeholder="Enter Name"
                                    className="form-control"
                                      name="name" value={name.value}
                                      onChange={this.onChange} />
                                     <span className="help-block">{name.message}</span>
                                </div>
                                <div className={usernameGroupClass}>
                                    <input type="text" placeholder="Username"
                                     className="form-control"
                                    value={username.value}
                                    name="username"
                                    onChange={this.onChange} />
                                   <span className="help-block">{username.message}</span>
                                </div>
                                 <div className={emailGroupClass}>
                                      <input type="text"
                                          className="form-control"
                                          name="email"
                                          placeholder="Email"
                                         value={email.value} onChange={this.onChange} />
                                         <span className="help-block">{email.message}</span>
                                  </div>
                                <div className={passwordGroupClass}>
                                      <input type="password" placeholder="Password"
                                        className="form-control"
                                        value={password.value}
                                         name="password"
                                        onChange={this.onChange} />
                                       <span className="help-block">{password.message}</span>
                                  </div>
                                  <div className={typeGroupClass}>
                                      <label className="radio-inline">
                                        <input type="radio" name="type"
                                        id="type" value="S"
                                        checked={this.state.type.value === "S"}
                                         onChange={this.onChange} />Student
                                      </label>
                                      <label className="radio-inline">
                                        <input type="radio" name="type"
                                         id="type" value="I"
                                         checked={this.state.type.value === "I"}
                                        onChange={this.onChange}/>Instuctor
                                      </label>
                                       <span className="help-block">{type.message}</span>
                                  </div>
                                <div className="form-actions">
                                    <button type="submit" className="btn btn-login">Submit</button>
                                </div>
                                <span className="ver_align">ver 1.0</span>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
  }
}

export default withRouter(Signup);
