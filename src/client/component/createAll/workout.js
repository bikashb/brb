import React, { Component } from 'react';
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import WorkoutList from './workoutList.js';
import APIs from '../template/constants.js';
import sweetalert from 'sweetalert';
import ReactPaginate from 'react-paginate';

export default class Workout extends Component {
  constructor() {
    super();
    this.state = {
      offsetCreateWorkout:3,
      currentPageCreateWorkout:0,
      searchTextCreateWorkout:'',
      mode: 'create',
      title: '', titleError: '',
      description: '', descriptionError: '',
      intensity: '', intensityError: '',
      exercises: [],
      currentWorkout: {},
      currentIndex: -1,
      currentPageUpdateWorkout:0,
      offsetUpdateWorkout:4,
      searchTextUpdateWorkout:''
    };
    this.resetFields = this.resetFields.bind(this);
    this.validationSuccess = this.validationSuccess.bind(this);
  }

  componentWillMount() {
      console.log('workout list mounted: ', this.props.AllWorkouts);
  }

  setupEditWorkout(workout, index) {
    console.log('selected workout: ', workout)
    let exerciseIDs = workout.exercises.map(exercise => exercise.id);
    this.setState({
      mode: 'update',
      currentWorkout: workout,
      currentIndex: index,
      title: workout.title,
      description: workout.description,
      intensity: workout.intensity,
      exercises: exerciseIDs
    });
  }

  updateWorkout(e) {
    e.preventDefault();
    if(this.validationSuccess()) {
      let { currentIndex, currentWorkout } = this.state;
      currentWorkout.title = this.state.title;
      currentWorkout.description= this.state.description;
      currentWorkout.intensity = this.state.intensity;
      currentWorkout.list = this.state.exercises;

      this.props.editWorkout(currentWorkout, currentIndex);
      this.resetFields();
    }
  }

  resetFields() {
    this.setState({
      mode: 'create',
      title: '', titleError: '',
      description: '', descriptionError: '',
      intensity: '', intensityError: '',
      exercises: [],
      currentWorkout: {},
      currentIndex: -1
    });
  }

  /*Create Workout Starts*/
  selectExerciseChanged = (exercises) => {
    this.setState({exercises: exercises});
  }

  createWorkout = (e) => {
    let { title, intensity, description, exercises } = this.state;
    e.preventDefault();
    if( this.validationSuccess()) {
      axios.post(APIs.CreateWorkout, {
          "description": description,
          "id": localStorage.getItem("id"),
          "duration": 5,
		      "title": title,
		      "intensity": intensity,
		      "list": exercises/*list:[1,2,3]*/
        })
        .then((response) => {
          console.log('create workout response: ', response);
          sweetalert('New workout created.', 'success');
          this.resetFields();
          this.props.callAllWorkouts();
        });
    }
  }
  /*Create Workout Ends*/

  validationSuccess() {
    let { exercises, title, intensity, description } = this.state;
    if (title === '') {
      this.setState({titleError: 'Please enter Title.'});
      return false;
    }
    if(intensity === '') {
      this.setState({intensityError: 'Please enter Intensity Numbers.'});
      return false;
    } else if(isNaN(intensity)) {
       this.setState({intensityError: 'Please enter only Numbers.'});
       return false;
    }
    if(description === '') {
      this.setState({descriptionError: 'Please enter Description.'});
      return false;
    }
    if(exercises.length === 0) {
      sweetalert('Please select atleast one exercise.');
      return false;
    }
    return true;
  }

  render() {
    let { exercises, currentPageUpdateWorkout, offsetUpdateWorkout, searchTextUpdateWorkout,
    offsetCreateWorkout, currentPageCreateWorkout, searchTextCreateWorkout } = this.state;

    /*exercise update pagination*/
    let workoutCopy = searchTextUpdateWorkout.length ?
      this.props.AllWorkouts.filter(workout =>
        workout.title.toLowerCase()
        .startsWith(searchTextUpdateWorkout.toLowerCase())) :
      [...this.props.AllWorkouts];

      /*workout create pagination*/
    let exerciseCopy = searchTextCreateWorkout.length ?
    this.props.AllExercises.filter(exercise =>
      exercise.title.toLowerCase()
      .startsWith(searchTextCreateWorkout.toLowerCase())) :
    [...this.props.AllExercises];
    return (
      <div className="col-md-12 col-lg-12 col-xs-12 createCourse create-workout">
        {
          this.props.AllExercises.length ?
          <div>
            <div className="col-md-5 col-lg-5 col-xs-12 createCourse create-workout">
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
                  <a data-target='#workoutsViewModal' data-toggle='modal'
                    className={
                      this.state.mode !== 'create' ?
                      'createExerBtn' : ''
                    }>
                    View/Update
                  </a>
                </span>
              </div>
              <form role="form" >
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" placeholder="Title" name="Title"
                    value={this.state.title} className="form-control"
                    onChange={(e)=>this.setState({title: e.target.value, titleError: ''})} />
                  <span style={{color:'red'}}>{this.state.titleError}</span>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" placeholder="Description" name="Description"
                    value={this.state.description} className="form-control"
                    onChange={(e)=>this.setState({description: e.target.value, descriptionError: ''})} />
                  <span style={{color:'red'}}>{this.state.descriptionError}</span>
                </div>
                <div className="form-group">
                  <label>Intensity</label>
                  <input type="text" placeholder="Intensity (1-10)" name="Intensity"
                    value={this.state.intensity} className="form-control"
                    onChange={(e)=>this.setState({intensity: e.target.value, intensityError: ''})} />
                  <span style={{color:'red'}}>{this.state.intensityError}</span>
                </div>
                {
                  this.state.mode === 'create' ?
                  <button className="btn btn-info" type="submit"
                    onClick={(e)=>this.createWorkout(e)}>
                    Create Workout
                  </button> :
                  <button className="btn btn-info" type="submit"
                    onClick={(e)=>this.updateWorkout(e)}>
                    Update Workout
                  </button>
                }
              </form>
              <div className="naivga1a">
                <form>
                  <input  type="text" className="searchTxt_pop_align" placeholder="name" value={searchTextCreateWorkout}
                    onChange={(e)=>this.setState({searchTextCreateWorkout: e.target.value})} />
                  <a className="glyphicon glyphicon-remove-circle"
                    onClick={(e)=> {
                      e.preventDefault();
                      this.setState({searchTextCreateWorkout: ''});
                    }}>

                  </a>
                </form>
              </div>
            </div>
            <ul className="wrkoutulli">
              <CheckboxGroup
                  name="exercises"
                  value={this.state.exercises}
                  onChange={this.selectExerciseChanged}
                  >
                  {
                    exerciseCopy.splice(currentPageCreateWorkout*offsetCreateWorkout, offsetCreateWorkout).map((exercise, i) =>
                      <li key={i}>
                        <Checkbox value={exercise.id} className="inputchk4wrkout" />
                        <div>
                  				<div className="video_mas1">
                  					<video  controls>
                  						<source src={exercise.streaming_uri} type="video/mp4"/>
                  					</video>
                  				</div>
                  				<div className="videoBtmTypo">
                            <span>Title :</span> {exercise.title}
                          </div>
                  				<div className="videoBtmTypo">
                            <span>Description :</span><p>{exercise.description}</p>
                          </div>
                  				<div className="videoBtmTypo last1">
                            <span>Type :</span> {exercise.type}
                          </div>
                  			</div>
                      </li>
                    )
                  }
              </CheckboxGroup>
            </ul>
            <div className="naivga1">
              <ReactPaginate
               previousLabel={'previous'}
               nextLabel={'next'}
               breakLabel={<a>...</a>}
               breakClassName={'break-me'}
               pageCount={exerciseCopy.length/offsetCreateWorkout}
               pageRangeDisplayed={5}
               onPageChange={(page)=>this.setState({currentPageCreateWorkout: page.selected})}
               containerClassName={'pagination'}
               subContainerClassName={'pages pagination'}
               activeClassName={'active'} />
            </div>
            <div id="workoutsViewModal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">All Workouts</h4>
                    <div>
                      <div className="naivga1">
                        <ReactPaginate
                         previousLabel={'previous'}
                         nextLabel={'next'}
                         breakLabel={<a>...</a>}
                         breakClassName={'break-me'}
                         pageCount={workoutCopy.length/offsetUpdateWorkout}
                         pageRangeDisplayed={5}
                         onPageChange={(page)=>this.setState({currentPageUpdateWorkout: page.selected})}
                         containerClassName={'pagination'}
                         subContainerClassName={'pages pagination'}
                         activeClassName={'active'} />
                      </div>
                      <div className="naivga1a">
                        <form>
                          <input type="text" className="searchTxt_pop_align" placeholder="name" value={searchTextUpdateWorkout}
                            onChange={(e)=>this.setState({searchTextUpdateWorkout: e.target.value})} />
                          <a className="glyphicon glyphicon-remove-circle"
                            onClick={(e)=> {
                              e.preventDefault();
                              this.setState({searchTextUpdateWorkout: ''});
                            }}>

                          </a>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body">
                    <WorkoutList AllWorkouts={this.props.AllWorkouts}
                      workoutCopy={workoutCopy}
                      setupEditWorkout={this.setupEditWorkout.bind(this)}
                      deleteWorkout={this.props.deleteWorkout}
                      currentPageUpdateWorkout={currentPageUpdateWorkout}
                      offsetUpdateWorkout={offsetUpdateWorkout}
                      searchTextUpdateWorkout={searchTextUpdateWorkout}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <h2 className="nocsv">Currently no exercises available please create exercise !</h2>
        }
      </div>
    );
  }
}
