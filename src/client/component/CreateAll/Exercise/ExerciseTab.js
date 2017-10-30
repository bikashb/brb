import React, { Component } from 'react';
import axios from 'axios';
import APIs from '../../template/constants.js';
import ExerciseList from './ExerciseList';
import sweetalert from 'sweetalert';
import ReactPaginate from 'react-paginate';

export default class ExerciseTab extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'create',
      title: '', titleError: '',
      type: '', typeError: '',
      intensity: '', intensityError: '',
      description: '', descriptionError: '',
      video_url: '',
      file: '',
      fileError: '',
      currentExercise: {},
      currentIndex: -1,
      currentPageUpdateExercise:0,
      offsetUpdateExercise:12,
      searchTextUpdateExercise:''
    };
    this.resetFields = this.resetFields.bind(this);
    this.validationSuccess = this.validationSuccess.bind(this);
  }

	/*Create Exercise Starts*/
	createExercise = (exerciseDetails) => {
		exerciseDetails.preventDefault();
		let fileSelect = document.getElementById('myfile');
		let { description, title, intensity, type } = this.state;
    if(this.validationSuccess()) {
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
            console.log('create exercise response: ', response);
						sweetalert('New exercise created.', 'success');
						this.resetFields();
						this.props.callAllExercises();
					}).catch(error => {
						console.log(error);
					});
				});
			});
		}
	}
	/*Create Exercise Ends*/

  validationSuccess() {
    let { file, title, type, intensity, description } = this.state;
    let fileSelect = document.getElementById('myfile');
    if (title === '') {
      this.setState({titleError: 'Please enter Title'});
      return false;
    }
    if(type === '') {
     this.setState({typeError: 'Please enter Type'});
     return false;
    }
    if(intensity === '') {
      this.setState({intensityError: 'Please enter Intensity Numbers'});
      return false;
    } else if(isNaN(intensity)) {
       this.setState({intensityError: 'Please enter only Numbers'});
       return false;
    }
    if(description === ''){
      this.setState({descriptionError: 'Please enter Description'});
      return false;
    }
    if(file === '') {
      this.setState({fileError: 'Please select a video'});
      return false;
    }
    return true;
  }

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
      title: '', titleError: '',
      type: '', typeError: '',
      intensity: '', intensityError: '',
      description: '', descriptionError: '',
      video_url: '', fileError: '', file: '',
      currentExercise: {},
      currentIndex: -1
    });
  }

  render() {
    const { currentPageUpdateExercise, offsetUpdateExercise, searchTextUpdateExercise } = this.state;

    /*exercise update pagination*/
    let exerciseCopy = searchTextUpdateExercise.length ?
      this.props.AllExercises.filter(exercise =>
        exercise.title.toLowerCase()
        .startsWith(searchTextUpdateExercise.toLowerCase())) :
      [...this.props.AllExercises];

    return (
      <div><div className="col-md-5 col-lg-5 col-xs-12 createCourse create-exercise">
        <div className="create_up_btnMas">
          <span>
            <a onClick={(e) => this.resetFields()}
              className={
                this.state.mode === 'create' ?
                'createExerBtn' : ''
              }>
              Create
            </a>
          </span>
          <span>{' '}</span>
          <span>
            <a data-toggle="modal" data-target="#exercisesViewModal"
              className={
                this.state.mode !== 'create' ?
                'createExerBtn' : ''
              }>
              View/Update
            </a>
          </span>
        </div>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" placeholder="Title" value={this.state.title}
              onChange={(e) => this.setState({title: e.target.value, titleError: ''})} />
            <span style={{color:'red'}}>{this.state.titleError}</span>
          </div>
          <div className="form-group">
            <label>Type</label>
            <input type="text" placeholder="Type" value={this.state.type}
              onChange={(e) => this.setState({type: e.target.value, typeError: ''})} />
            <span style={{color:'red'}}>{this.state.typeError}</span>
          </div>
          <div className="form-group">
            <label>Intensity</label>
            <input type="text" placeholder="Intensity (1-10)" value={this.state.intensity}
              onChange={(e) => this.setState({intensity: e.target.value, intensityError: ''})} />
            <span style={{color:'red'}}>{this.state.intensityError}</span>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" placeholder="Description" value={this.state.description}
              onChange={(e) => this.setState({description: e.target.value, descriptionError: ''})} />
            <span style={{color:'red'}}>{this.state.descriptionError}</span>
          </div>
          <div className="form-group">
            <label>File input</label>
            <input id="myfile" name="myFile" encType="multipart/form-data" type="file"
              value={this.state.file} accept="video/*"
              onChange={(e) => this.setState({file: e.target.value, fileError: ''})}
              />
            <span style={{color:'red'}}>{this.state.fileError}</span>
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
            <div className="modal-content flt_left">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">All Exercises</h4>
                <div>
                  <div className="naivga1">
                    <ReactPaginate
                     previousLabel={'previous'}
                     nextLabel={'next'}
                     breakLabel={<a>...</a>}
                     breakClassName={'break-me'}
                     pageCount={exerciseCopy.length/offsetUpdateExercise}
                     pageRangeDisplayed={5}
                     onPageChange={(page)=>this.setState({currentPageUpdateExercise: page.selected})}
                     containerClassName={'pagination'}
                     subContainerClassName={'pages pagination'}
                     activeClassName={'active'} />
                  </div>
                  <div className="naivga1a">
                    <form>
                      <input className="searchTxt_pop_align" type="text" placeholder="Search Exercise" value={searchTextUpdateExercise}
                        onChange={(e)=>this.setState({searchTextUpdateExercise: e.target.value})} />
                      <a className="glyphicon glyphicon-remove-circle"
                        onClick={(e)=> {
                          e.preventDefault();
                          this.setState({searchTextUpdateExercise: ''});
                        }}>

                      </a>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <ExerciseList
                  AllExercises={this.props.AllExercises}
                  exerciseCopy={exerciseCopy}
                  deleteExercise={this.props.deleteExercise}
                  setupEditExercise={this.setupEditExercise.bind(this)}
                  searchTextUpdateExercise={searchTextUpdateExercise}
                  offsetUpdateExercise={offsetUpdateExercise}
                  currentPageUpdateExercise={currentPageUpdateExercise}
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
