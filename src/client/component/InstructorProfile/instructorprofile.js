import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';
import APIs from '../template/constants.js';

export default class InstructorProfile extends Component {

  constructor() {
    super();
    this.state = {
      name: {value: '', isValid: true, message: ''},
      imagePath: {value: '', isValid: true, message: ''},
      description: {value: '', isValid: true, message: ''}
    };
    this.onChange = this.onChange.bind(this);
    this.getProfile = this.getProfile.bind(this)
    this.formIsValid = this.formIsValid.bind(this);
    this.resetValidationStates = this.resetValidationStates.bind(this);
  }

  componentWillMount() {
    console.log('myProfileModal: will mount');
    this.getProfile();
  }

  onChange(e) {
    let { state } = this;
    state[e.target.name].value = e.target.value;
    state[e.target.name].isValid = true;
    state[e.target.name].message = '';
    this.setState(state,
       () => {console.log('state modified: ', state);});
  }

  getProfile() {
    console.log('current user: ', localStorage.getItem('username'));
    axios.get(APIs.GetProfile+localStorage.getItem('username'))
    .then((response)=>{
      console.log('get profile response: ', response);
      let profile = {
        name: response.data.data.user_name,
        imagePath: response.data.data.profile_img_url,
        description: response.data.data.description
      };
      let { state, props } = this;
      Object.keys(profile).map(key => {
          if(key != 'imagePath') state[key].value = profile[key];
      });
      console.log('state: ', state)
      props.updateInstructorDetails({
        imagePath: response.data.data.profile_img_url ? response.data.data.profile_img_url : 'images/profile_img.jpg',
        description: response.data.data.description
      });
      this.setState(state,
         () => {console.log('profile received: ', state);});
    });
  }

  updateProfile() {
    let { state, props } = this;
    if(this.formIsValid()) {
      //document.getElementById('modalClose').setAttribute('data-dismiss', 'modal');
      if(state.imagePath.value) {
        /* upload file */
        try {
          console.log('updating profile with image... ', state.imagePath.value);
          let fileSelect = document.getElementById('imagePath');
          let files = fileSelect.files;
          let formData = new FormData();
          let file = files[0];
          console.log('File: ', file);
          formData.append('myfile', file, file.name);
                console.log('FormData: ', formData);
          axios.post(APIs.UploadVideo, formData)
          .then((response)=>{
            console.log('image upload response: ', response);
            this.setState({imagePath: response.data.url});

            /* update profile with image */
            let profile = {
              id: localStorage.getItem('id'),
              user_name: state.name.value,
              image_url: response.data.url,
              description: state.description.value
            };
            console.log('profile ready for updation: ', profile);
            axios.put(APIs.UpdateProfile, profile)
            .then((response)=>{
              console.log('profile updation response: ', response);
              props.updateInstructorDetails({
                imagePath: profile.image_url,
                description: state.description.value
              });
              //alert('profile updation success');
            }).catch((error)=>{
              console.log('profile updation error: ', error);
              //alert('error in updating profile');
            });
    }).catch((error)=>{
            console.log('image upload error1: ', error);
            //alert('error in uploading image (1)');
          });
    } catch(error) {
    console.log('image upload error2: ', error)
          //alert('error in uploading image (2)');
    }
      } else {
        console.log('updating profile without image...');
        /* update profile without image */
        let profile = {
          id: localStorage.getItem('id'),
          user_name: state.name.value,
          image_url: '',
          description: state.description.value
        };
        console.log('profile ready for updation: ', profile);
        axios.put(APIs.UpdateProfile, profile)
        .then((response)=>{
          console.log('profile updation response: ', response);
          props.updateInstructorDetails({
            imagePath: 'images/profile_img.jpg',
            description: state.description.value
          });
          //alert('profile updation success');
        }).catch((error)=>{
          console.log('profile updation error: ', error);
          //alert('error in updating profile');
        });
      }
    }
  }

  formIsValid() {
    let { state } = this;
    if (validator.isEmpty(state.name.value)) {
      state.name.isValid = false;
      state.name.message = 'This is a required field.';
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.description.value)) {
      state.description.isValid = false;
      state.description.message = 'This is a required field.';
      this.setState(state);
      return false;
    }
    return true;
  }

  resetValidationStates() {
    let { state } = this;
    Object.keys(state).map(key => {
      if (state[key].hasOwnProperty('isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });
    this.setState(state);
  }

  render() {
    let { state } = this;
    return (
      <div id="myProfileModal" className="modal fade" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">Update My Profile</h4>
          </div>
          <div className="modal-body createCourse">
            <form >
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Name"
                     name="name" id="name"
                     value={state.name.value}
                     onChange={this.onChange}
                     />
                   <span className="help-block">{state.name.message}</span>
                </div>
                <div className="form-group">
                  <label>About Me</label>
                  <textarea name="description" rows="10"
                    value={state.description.value}
                    onChange={this.onChange}>
                  </textarea>
                  <span className="help-block">{state.description.message}</span>
                </div>
                <div className="form-group">
                  <label>Display Pic</label>
                  <span>{'  '}</span>
                  <label>
                    <input type="file" name="imagePath"
                      onChange={this.onChange}
                      accept="image/*"
                      id="imagePath"
                    />
                  </label>
                  <span className="help-block">{state.imagePath.message}</span>
                </div>
            </form>
          </div>
          <div className="modal-footer">
            <div className="form-actions">
              <button className="btn btn-login"
                id="modalClose"
                data-dismiss="modal"
                onClick={this.updateProfile.bind(this)}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
