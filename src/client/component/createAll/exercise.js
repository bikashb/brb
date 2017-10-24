import React, { Component } from 'react';
import axios from 'axios';
import APIs from '../template/constants.js';
import ExerciseList from './exerciseList.js';

export default class Exercise extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'create',
      title: '',
      type: '',
      intensity: '',
      description: '',
      video_url: '',
      currentExercise: {},
      currentIndex: -1
    };
    this.resetFields = this.resetFields.bind(this);
  }

	/*Create Exercise Starts*/
	createExercise = (exerciseDetails) => {
		exerciseDetails.preventDefault();
		let fileSelect = document.getElementById('myfile');
		let { description, title, intensity, type } = this.state;
		if(type==""||description==""||title==""||intensity==""||fileSelect.files.length==0) {
			alert("check all fields");
		} else {
			/* video upload */
			console.log("video uploading");
			let files = fileSelect.files;
			let formData = new FormData();
			let file = files[0];
			console.log(file);
			formData.append('myfile', file, file.name);
			console.log(file, formData)
			axios.post(APIs.UploadVideo, formData)
			.then((response)=> {
				this.setState({video_url: response.data.url},() => {
					console.log('video uri: ', this.state.video_url);
					axios.post(APIs.CreateExercise, {
						"id": localStorage.getItem("id"),
						"description": description,
						"duration": 3,
						"title": title,
						"type": type,
						"uri": this.state.video_url,
						"intensity":  intensity
					}).then((response) => {
						alert(response.statusText);
						description="";
						title="";
						type="";
						intensity="";
						this.props.callAllExercises();
					}).catch(error => {
						console.log(error);
					});
				});
			});
		}
	}
	/*Create Exercise Ends*/

  setupEditExercise(exercise, index) {
    this.setState({
      mode: 'update',
      currentExercise: exercise,
      currentIndex: index,
      title: exercise.title,
      type: exercise.type,
      description: exercise.description,
      intensity: exercise.intensity
    });
  }

  updateExercise(e) {
    e.preventDefault();
    let { currentIndex, currentExercise } = this.state;
    currentExercise.title = this.state.title;
    currentExercise.type = this.state.type;
    currentExercise.description= this.state.description;
    currentExercise.intensity = this.state.intensity;
    this.props.editExercise(currentExercise, currentIndex);
    this.resetFields();
  }

  resetFields() {
    this.setState({
      mode: 'create',
      title: '',
      type: '',
      intensity: '',
      description: '',
      video_url: '',
      currentExercise: {},
      currentIndex: -1
    });
  }

  render() {
    return (
      <div><div className="col-md-5 col-lg-5 col-xs-12 createCourse create-exercise">
        <div>
          <span>
            <a onClick={(e) => this.resetFields()}
              style={
                this.state.mode === 'create' ?
                {border: '2px solid blue', padding: '2px'} :
                {}
              }>
              Create
            </a>
          </span>
          <span>{' '}</span>
          <span>
            <a data-toggle="modal" data-target="#exercisesViewModal"
              style={
                this.state.mode !== 'create' ?
                {border: '2px solid blue', padding: '2px' } :
                {}
              }>
              View/Update
            </a>
          </span>
        </div>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" placeholder="Title" value={this.state.title}
              onChange={(e) => this.setState({title: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input type="text" placeholder="Type" value={this.state.type}
              onChange={(e) => this.setState({type: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Intensity</label>
            <input type="text" placeholder="Intensity (1-10)" value={this.state.intensity}
            onChange={(e) => this.setState({intensity: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" placeholder="Description" value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})} />
          </div>
          <div className="form-group">
            <label>File input</label>
            <input id="myfile" name="myFile" encType="multipart/form-data" type="file"/>
          </div>
          <ul id="fileList"></ul>
          {
              this.state.mode === 'create' ?
              <button className="btn btn-info" type="submit"
                onClick={(e)=>this.createExercise(e)}>
                Create Exercise
              </button> :
              <button className="btn btn-info" type="submit"
                onClick={(e)=>this.updateExercise(e)}>
                Update Exercise
              </button>
          }
        </form>
        <div id="exercisesViewModal" className="modal fade" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">All Exercises</h4>
              </div>
              <div className="modal-body">
                <ExerciseList
                  AllExercises={this.props.AllExercises}
                  deleteExercise={this.props.deleteExercise}
                  setupEditExercise={this.setupEditExercise.bind(this)}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-6 col-xs-12 rgt_frm_img1">
        <img src="images/create_exercise_img.png" />
        <div className="beaches-banner-content">
          <h4>Do you love Exercise?</h4>
          <p>
            Whedamet, consectetur adipiscing elit. Duis pharetra varius quam sit amet experience in the Caribbean for over 15 years!.
          </p>
        </div>
      </div></div>
    );
  }
}
